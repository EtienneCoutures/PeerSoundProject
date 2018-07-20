angular.module('dataTables', [])
    .directive('datatable', [
        '$parse',
        function ($parse) {
            return {
                restrict: 'AE',
                scope:  {
                    dtColumns: '=',
                    dtOptions: '=',
                    dtRefresh: '=',
                    dtRowActions: '='
                },
                templateUrl: 'datatable.html',
                link: function ($scope, element, attrs) {
                    $scope.request = {
                        limit: 20,
                        page: 1,
                        filters: {
                        },
                        sort: {
                            field: null,
                            asc: true
                        }
                    };
                    $scope.results = {
                        rows: [],
                        count: 0,
                        start: 0,
                        end: 0,
                        pages: []
                    };

                    $scope.refresh = function() {
                        $scope.dtRefresh($scope.request, function(data) {
                            $scope.results = {
                                rows: data.rows,
                                count: data.count,
                                start: data.count <= 0 ? 0 : $scope.request.limit * ($scope.request.page - 1) + 1,
                                end: data.count <= 0 ? 0 : $scope.request.limit * ($scope.request.page - 1) + data.rows.length,
                                pages: []
                            };
                            var p = $scope.request.page <= 5 ? 1 : $scope.request.page - 5;
                            for (var i = 0; i < 10 && p < $scope.results.count / $scope.request.limit + 1; i++, p++) $scope.results.pages.push(p);

                            $scope.info = attrs.dtInfo || 'Displaying {{START}}-{{END}} of {{COUNT}} result.';
                        });
                    };
                    $scope.selectPage = function(page) {
                        if (page > 0 && page != $scope.request.page && page <= $scope.results.count / $scope.request.limit) {
                            $scope.request.page = page;
                            $scope.refresh();
                        }
                    };
                    $scope.sort = function(column) {
                        if (column.sortable) {
                            if ($scope.request.sort.field == column.field) {
                                $scope.request.sort.asc = !$scope.request.sort.asc;
                            } else {
                                $scope.request.sort.field = column.field;
                                $scope.request.sort.asc = true;
                            }
                            $scope.refresh();
                        }
                    };
                    $scope.getValue = function(row, column) {
                        var getter = $parse(column.field);
                        return getter(row);
                    };
                    $scope.rowAction = function (row, action) {
                        if (!row.disabled) {
                            action(row);
                        }
                    };
                    $scope.dtRowActions = $scope.dtRowActions($scope.refresh);

                    $scope.refresh();
                }
            };
        }])
    .run([
        '$templateCache',
        function ($templateCache) {
            var datatable =
                '<table class="table-striped table-bordered table-hover table">'
                + '<thead>'
                    + '<tr>'
                        + '<th ng-repeat="column in dtColumns">'
                            + '<a href="javascript:;" ng-if="column.sortable !== false" class="sort-link" ng-click="sort(column)"><span translate>{{column.label}}</span> <span ng-if="request.sort.field == column.field" class="glyphicon glyphicon-triangle-{{request.sort.asc ? \'bottom\' : \'top\'}}"></span></a>'
                            + '<span ng-if="column.sortable === false" translate>{{column.label}}</span>'
                        + '</th>'
                        + '<th style="text-align: center" translate>Action</th>'
                    + '</tr>'
                    + '<tr>'
                        + '<td ng-repeat="column in dtColumns">'
                            + '<input class="form-control" type="text" ng-if="column.filter == \'text\'" ng-model="request.filters[column.field]" ng-change="refresh()"/>'
                            + '<select class="form-control" ng-if="column.filter == \'enum\'" ng-model="request.filters[column.field]" ng-change="refresh()">'
                                + '<option ng-repeat="value in column.values" value="{{value}}">{{value | translate}}</option>'
                            + '</select>'
                        + '</td>'
                    + '</tr>'
                + '</thead>'
                    + '<tr ng-repeat="row in results.rows" ng-class="{disabled: row.disabled}">'
                        + '<td ng-repeat="column in dtColumns" style="vertical-align: middle;" translate>{{getValue(row, column)}}'
                        + '</td>'
                        + '<td class="action-buttons center" style="padding-left: 0; padding-right: 0">'
                            + '<a style="margin: 0 7px" href="javascript:;" class="action-button {{options.class}}" ng-class="{disabled: row.disabled}" ng-repeat="options in dtRowActions" ng-click="rowAction(row, options.action)"><span class="action-buttons {{options.icon}}" translate>{{options.label}}</span></a>'
                        + '</td>'
                    + '</tr>'
                + '<tbody>'
                + '</tbody>'
                + '</table>'
                + '<div class="row">'
                    + '<div class="col-xs-6"><div class="dataTables_info" translate="{{info}}" translate-values="{START: results.start, END: results.end, COUNT: results.count}"></div></div>'
                    + '<div class="col-xs-6 dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_bootstrap pagination">'
                        + '<div class="dataTables_paginate paging_simple_numbers">'
                            + '<a class="previous {{results.start > 1 ? \'\' : \'disabled\'}}" aria-controls="data-table" ng-click="selectPage(request.page - 1)" translate>< Previous</a>'
                            + '<a ng-repeat="page in results.pages" class="{{page == request.page ? \'current\': \'\'}}" ng-click="selectPage(page)">{{page}}</a>'
                            + '<a class="next {{results.count / request.limit > request.page ? \'\' : \'disabled\'}}" aria-controls="data-table" ng-click="selectPage(request.page + 1)" translate>Next ></a>'
                        + '</div>'
                    + '</div>'
                + '</div>';
            $templateCache.put('datatable.html', datatable);
        }]);