/**
 * ngTable: Table + Angular JS
 *
 * @author Vitalii Savchuk <esvit666@gmail.com>
 * @url https://github.com/esvit/ng-table/
 * @license New BSD License <http://creativecommons.org/licenses/BSD/>
 */

const templateUrl = require('./colspanRow.html');

ngTableColspanRow.$inject = [];

/**
 * directive that renders the sorting header row for a table 
 * @ngdoc directive
 * @example
 * ```html
 * <ng-table-colspan-row></ng-table-colspan-row>
 * ```
 */
export function ngTableColspanRow(){
    const directive = {
        restrict: 'E',
        replace: true,
        templateUrl: templateUrl,
        scope: true,
        // controller: 'ngTableSorterRowController',
        // controllerAs: '$ctrl'
    };
    return directive;
}