define([
    'angular',
    'ngRoute',
    './controllers-config',
    'underscore',

    'restangular',
    'ui.bootstrap-tpls',
    'angular-filter',
    'ngAnimate',
    'ngSanitize',
    'ngTranslate/angular-translate-loader-static-files/angular-translate-loader-static-files.min',
    'ngTranslate/angular-translate-loader-partial/angular-translate-loader-partial.min',
    'ngTranslate/angular-translate-storage-local/angular-translate-storage-local.min',
    //'ngTranslate/angular-translate-interpolation-messageformat/angular-translate-interpolation-messageformat.min',
    'ngTranslate/angular-translate-handler-log/angular-translate-handler-log.min',
    'ngCookies',
    'dataTables'
], function(angular, ngRoute, controllerConfig, _) {
    'use strict';
    var appDependencies = [
        'ngRoute',
        'restangular',
        'ui.bootstrap',
        'ngAnimate',
        'ngSanitize',
        'angular.filter',
        'pascalprecht.translate',
        'ngCookies',
        'dataTables'
    ];
    _.each(controllerConfig, function(i) {
        appDependencies.push(i);
    });


    angular.module('MyApp', appDependencies)
        .config(['RestangularProvider', function(RestangularProvider) {
            RestangularProvider.setBaseUrl('/api');

        }])
        .config(['$locationProvider', function($locationProvider) {
            $locationProvider.hashPrefix("");
        }])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.otherwise({
                redirectTo: '/'
            });
        }])
        .config([
            '$translateProvider',
            '$windowProvider',
            function($translateProvider, $windowProvider) {
                $translateProvider.useLoader('$translatePartialLoader', {
                    urlTemplate: '/i18n/{lang}/{part}.json'
                });
                //$translateProvider.useStaticFilesLoader({
                //    prefix: 'lang/locale-',
                //    suffix: ''
                //});
                $translateProvider.useLocalStorage();
                //$translateProvider.useMissingTranslationHandlerLog();
                //$translateProvider.addInterpolation('$translateMessageFormatInterpolation');
                //$translateProvider.useSanitizeValueStrategy('sanitize');

                $translateProvider.registerAvailableLanguageKeys(
                    ['en', 'fr'], {
                        'en*': 'en',
                        'fr*': 'fr',
                        '*': 'en'
                    }
                );
                $translateProvider.determinePreferredLanguage();
                $translateProvider.fallbackLanguage('en');
            }
        ])
        .directive('onEnter', function () {
            return {
                link: function (scope, element, attrs) {
                    element.bind('keydown', function(event) {
                        var code = event.keyCode || event.which;
                        if (code === 13) {
                            if (!event.shiftKey) {
                                event.preventDefault();
                                scope.$apply(attrs.onEnter);
                            }
                        }
                    });
                }
            };
        })
        /*.directive('googleMap', ['$timeout', '$cookies', function($timeout, $cookies) {
            return {
                restrict: 'A',
                scope: {
                    id: '@',
                    preload: '=',
                    googleMap: '='
                },
                link: function($scope, element, attributes) {
                    var preload = (typeof $scope.preload == "function") ? $scope.preload : function (callback) {
                        callback();
                    };

                    $timeout(function () {
                        preload(function (options) {
                            options = options || {};
                            options.center = options.center || {
                                lat: 43.6109200,
                                lng: 3.8772300
                            };
                            options.zoom = options.zoom || 12;
                            options.mapTypeId = google.maps.MapTypeId.ROADMAP;

                            var map = new google.maps.Map(document.getElementById($scope.id), options);
                            $scope.googleMap(map);
                        })
                    });
                }
            };
        }])*/
        .run(function($rootScope, $translate) {
            $rootScope.$on('$translatePartialLoaderStructureChanged', function() {
                $translate.refresh();
            });
        });
});
