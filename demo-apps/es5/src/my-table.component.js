(function () {
    'use strict';

    angular.module('demo-app')
        .component('myTable', {
            templateUrl: 'src/my-table.component.html',
            controller: myTableController
        });

    myTableController.$inject = ['NgTableParams', '$timeout', '$filter'];
    function myTableController(NgTableParams, $timeout, $filter) {
        var data = [
            { name: "Moroni", age: 50 },
            { name: "Tiancum", age: 43 },
            { name: "Jacob", age: 27 },
            { name: "Nephi", age: 29 },
            { name: "Enos", age: 34 },
            { name: "Tiancum", age: 43 },
            { name: "Jacob", age: 27 },
            { name: "Nephi", age: 29 },
            { name: "Enos", age: 34 },
            { name: "Tiancum", age: 43 },
            { name: "Jacob", age: 27 },
            { name: "Nephi", age: 29 },
            { name: "Enos", age: 34 },
            { name: "Tiancum", age: 43 },
            { name: "Jacob", age: 27 },
            { name: "Nephi", age: 29 },
            { name: "Enos", age: 34 }
        ];

        this.tableParams = new NgTableParams({}, {
            dataset: data,
            dataOptions: {
                applyFilter: false,
                applyPaging: false,
                applySort: false,
                customGetData: customGetData
            }
        });

        function customGetData(params) {
            $timeout(function() {
                data.push({name: 'test ' + new Date().getTime(), age: 30});
            }, 200);
            return data;
        }
    }

})();