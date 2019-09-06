/**
 * ngTable: Table + Angular JS
 *
 * @author Bruno Oliveira <321.bruno@gmail.com>
 * @url https://github.com/esvit/ng-table/
 * @license New BSD License <http://creativecommons.org/licenses/BSD/>
 */

 
import * as ng1 from 'angular';
ngTablePaginationScroll.$inject = ['$window', '$document', '$timeout'];

/**
 * @ngdoc directive
 * @name ngTable.directive:ngTablePaginationScroll
 * @restrict A
 */

export function ngTablePaginationScroll<T>($window: ng1.IWindowService, $document: ng1.IDocumentService, $timeout: ng1.ITimeoutService): ng1.IDirective {

    return {
        restrict: 'A',
        scope: true,
        link: function(scope:any, elem, attrs: any){
            let checkWhenEnabled:any;
            let scrollDistance:any;
            let scrollEnabled:any;
            let timedOut = false;

            const _window = ng1.element($window);
            scrollDistance = 10;
            if (attrs.infiniteScrollDistance != null) {
                scope.$watch(attrs.infiniteScrollDistance, (value:any) => {
                    return scrollDistance = parseInt(value, 10);
                });
            }
            scrollEnabled = true;
            checkWhenEnabled = false;
            if (attrs.infiniteScrollDisabled != null) {
                scope.$watch(attrs.infiniteScrollDisabled, (value:any) => {
                    scrollEnabled = !value;
                    if (scrollEnabled && checkWhenEnabled) {
                        checkWhenEnabled = false;
                        return handler();
                    }
                    return;
                });
            }

            function handler() {
                if (timedOut) return;

                const elementBottom = elem[0].offsetTop + elem[0].scrollHeight;
                const windowInnerHeight = $window.innerHeight;
                const shouldScroll = (($document.scrollTop() + windowInnerHeight >= $document.height() - ($document.height() * scrollDistance/100)) && elementBottom > windowInnerHeight);
                if (shouldScroll && scrollEnabled) {
                    const total = scope.params.total();
                    const qtyItems = scope.params.data.length;
                    const qtyPages = Math.ceil(total / scope.params.count());
                    const pageCurrent = scope.params.page();
                    const pageNew = pageCurrent + 1;
                    if(qtyItems<=total && pageNew<=qtyPages){
                        timedOut = true;
                        scope.params.page( pageNew );
                        scope.$apply(scope);
                        $timeout(() => {
                            timedOut = false;
                        }, 200);
                        // .then(() => {
                        //     isGettingPage = false;
                        // });
                    }
                } else if (shouldScroll) {
                    return checkWhenEnabled = true;
                }
                return;
            }

            _window.on('scroll', handler);
            scope.$on('$destroy', function() {
                return _window.off('scroll', handler);
            });

            return $timeout(() => {
                if (attrs.infiniteScrollImmediateCheck) {
                    if (scope.$eval(attrs.infiniteScrollImmediateCheck)) {
                        return handler();
                    }
                }
                return;
            }, 300);
        }
    };
}