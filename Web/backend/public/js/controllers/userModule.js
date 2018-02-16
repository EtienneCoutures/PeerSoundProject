/**
 * User Module
 */
define([
    'angular',
    'underscore',
    'string',
    'moment'
], function (angular, _, S, moment) {
    'use strict';
    return angular
        .module('userModule', [])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/user', {
                    templateUrl: '/partials/user/index',
                    controller: 'UserController'
                })
                .when('/user/:usr_id', {
                    templateUrl: '/partials/user/user',
                    controller: 'SeeUserController'
                })
                .when('/unknowUser', {
                  templateUrl: '/partials/user/unknowUser',
                  controller: 'UnknowUserController'
                })
                .when('/message', {
                  templateUrl: '/partials/user/message',
                  controller: 'MessageController'
                })
                .when('/myself', {
                  templateUrl: '/partials/user/form',
                  controller: 'SaveUserController'
                });
        }])
        .controller('UserController', [
            '$scope',
            '$translatePartialLoader',
            '$location',
            'Restangular',
            function ($scope, $translatePartialLoader, $location, Restangular) {
                var query = $location.search(),
                    pending = !!query.pending;
                $translatePartialLoader.addPart('user');



                $scope.UserColumns = [{
                    field: 'usr_login',
                    label: 'usr_login',
                    sortable: true,
                    filter: 'text'
                }, {
                    field: 'usr_email',
                    label: 'usr_email',
                    sortable: true,
                    filter: 'text'
                }, {
                    field: 'usr_firstname',
                    label: 'usr_firstname',
                    sortable: true,
                    filter: 'text'
                }, {
                    field: 'usr_lastname',
                    label: 'usr_lastname',
                    sortable: true,
                    filter: 'text'
                }, {
                    field: 'usr_role',
                    label: 'usr_role',
                    sortable: true,
                    filter: 'enum',
                    values: ["super-admin","admin","member"]
                }, {
                    field: 'usr_status',
                    label: 'usr_status',
                    sortable: true,
                    filter: 'enum',
                    values: ["waiting","active","lock"]
                }];

                $scope.loadUserList = function (dtRequest, dtRefresh) {
                    if (typeof dtRequest != "object" || typeof dtRefresh != "function") return;

                    return Restangular.all('user').get('', {
                        where: dtRequest.filters,
                        limit: dtRequest.limit,
                        page: dtRequest.page,
                        sort: dtRequest.sort
                    }).then(function (result) {
                        dtRefresh(result);
                    });
                };

                $scope.UserActions = function (refresh) {
                    return [{
                        class: 'btn btn-primary',
                        label: 'Edit',
                        action: function (row) {
                            $location.url('/user/' + row.usr_id);
                        }
                    }]
                };
            }
        ])
        .controller('SeeUserController', [
            '$scope',
            '$routeParams',
            '$location',
            'Restangular',
            function ($scope, $routeParams, $location, Restangular) {
              $scope.id = $routeParams.usr_id;
              if ($scope.id == $scope.myself.usr_id) {
                return $location.url('/myself'); }

                $scope.displayMessageInpunt = false

              Restangular.one('user', $scope.id).get().then(function(result){
                  if (result.code == 1) {
                  $location.url('/unknowUser');
                  }
                    $scope.user_login = result.User.usr_login;
                })

                $scope.toogleDisplayMessage = function(value) {
                  $scope.displayMessageInpunt = value
                }

                $scope.messageContent = function() {
                  return document.getElementById('messageInput').value
                }

                $scope.isFollowed = function() {
                  Restangular.one('follow').get({
                    where :{
                      "followed_usr_id": $scope.id,
                      "follower_usr_id": $scope.myself.usr_id
                    }
                  }).then(function(result) {
                    if (result.length  > 0) {
                      $scope.follow_date = result.date;
                      $scope.followed = true;
                    }
                    else {
                      $scope.followed = false
                    }
                  })
                }


                $scope.Follow = function() {
                  Restangular.all("/follow"/* + id + "/" + $scope.myself.usr_id*/).post({
                      follower_usr_id : $scope.myself.usr_id,
                      followed_usr_id : $scope.id
                  }).then(function(result) {
                      if (result.code == 0) {$scope.followed = true}
                  })
                }

                $scope.unFollow = function() {



                  Restangular.one('follow').remove({
                      "followed_usr_id": $scope.id,
                      "follower_usr_id": $scope.myself.usr_id
                     }).then(function(result) {
                    if (result.code == 0)  {
                      $scope.followed = false
                    }
                      $scope.errors = result.errors;
                      $scope.querying = false;
                  });
                }


            }])
            .controller('UnknowUserController', [
                '$scope',
                function ($scope) {
                }
            ])
            .controller('MessageController', [
                '$scope',
                '$location',
                'Restangular',
                '$timeout',
                '$route',
                function ($scope, $location, Restangular, $timeout, $route) {
                  //if (!$scope.myself.messages) {return $location.url('/')}

                  $scope.goDeleteMessage = function(params) {
                    Restangular.one('message').remove({
                        "message_id": params,
                       }).then(function(result) {

                    });
                  }

                  $scope.readMessage = function(params) {
                    Restangular.all('message').post({message_id: params, is_read: true}).then(function(result) {
                    })
                  }
                }
            ])
        .controller('SaveUserController', [
            '$scope',
            '$translatePartialLoader',
            '$location',
            '$routeParams',
            'Restangular',
            '$translate',
            function ($scope, $translatePartialLoader, $location, $routeParams, Restangular, $translate) {
                var usr_id = $scope.myself.usr_id;
                $translatePartialLoader.addPart('user');

                $scope.User = {
                    isNew: true
                };
                if (Number.isInteger(parseInt(usr_id))) {
                    $scope.User.isNew = false;

                    Restangular.one('user', usr_id).get().then(function(result) {
                        if (result.code != 0) return $location.url('/user');

                        $scope.User = result.User;
                        $scope.old_password = $scope.User.usr_password;
                    });
                }

                $scope.save = function() {
                    $scope.querying = true;
                    if ($scope.old_password == $scope.User.usr_password) {
                      Restangular.all('user/mod').post($scope.User).then(function(result) {
                          if (result.code == 0) return $location.url('/user');
                          $scope.errors = result.errors;
                          $scope.querying = false;
                      });
                    }
                    else {
                      Restangular.all('user').post($scope.User).then(function(result) {
                          if (result.code == 0) return $location.url('/user');
                          $scope.errors = result.errors;
                          $scope.querying = false;
                      });
                    }
                };
            }
        ]);
});
