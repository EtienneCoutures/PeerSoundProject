/**
 * Init Module (loaded on page load)
 */
define([
    'angular',
    'moment'
], function(angular, moment) {
    'use strict';
    return angular
        .module('initModule', [])
        .controller('InitController', [
            '$scope',
            '$translatePartialLoader',
            '$location',
            '$translate',
            '$cookies',
            'Restangular',
            '$route',
            function($scope, $translatePartialLoader, $location, $translate, $cookies, Restangular, $route) {
                $translatePartialLoader.addPart('system');
                $translatePartialLoader.addPart('site');

                $scope.myself = false;
                $scope.sender_usr = []

                $scope.searchResult = {
                  type : "",
                  result : [],
                  count: 0
                }

                $scope.getMessage = function() {
                  Restangular.one('message').get({where: {
                    dest_id: $scope.myself.usr_id,
                    is_read: false
                  }}).then(function(result) {
                    $scope.myself.messages = result
                    for (var i = 0 ; i != $scope.myself.messages.length ; ++i) {
                    Restangular.one('user').get({where: {
                      usr_id: $scope.myself.messages[i].sender_id
                    }}).then(function(result) {
                        $scope.sender_usr.push(result[0])
                    })
                  }
                  })
                }

                $scope.sendMessage = function(to, mess) {
                  if (!mess) return
                  Restangular.all('message').post({sender_id: $scope.myself.usr_id, dest_id: to, content: mess}).then(function(result) {
                    console.log(result)
                  });
                }

                Restangular.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
                    if (data.code == -2) {
                        $location.url('/login');
                    }
                    return data;
                });

                $scope.redirectToUser = function(name) {
                  Restangular.one('user/', name).get().then(function(result) {
                    if (result.User.usr_id == $scope.myself.id)
                      return $location.url('/myself')
                    return $location.url('/user/' + result.User.usr_id)
                  });
                }

                $scope.$on('$routeChangeStart', function() {
                    if (!$scope.myself && $location.path() != '/login') {
                        Restangular.one('auth', 'me').get().then(function(result) {
                            $scope.myself = result.account;
                            $scope.loaded = true;
                            $scope.getMessage()
                        }).catch(function(err) {
                            $location.url('/login');
                            $scope.loaded = true;
                        });
                    } else if ($location.path() == '/login') {
                        $scope.loaded = true;
                    }
                });

                $scope.login = function(user) {
                  $scope.myself = user;
                  console.log("ji")

                    $scope.follow()
                    $scope.getMessage()
                  };

                  $scope.userQuery = function() {
                      var type = document.getElementById("selectQuery").value
                      var query = document.getElementById("search").value
                      if (query) {
                        if (['all', 'playlist', 'user', 'music'].indexOf(type) >= 0) {
                          console.log("Le type recherche " + query + " dans " + type)
                          $scope.searchIn(type, query)
                        }
                      }
                  }

                  $scope.searchIn = function(type, value) {
                    if (type == "user") $scope.searchUser(type, value)
                    else if (type == "playlist") $scope.searchPlaylist(type, value)
                    else if (type == "music") $scope.searchMusic(type, value)
                    else console.log("En construction")
                  }

                /* searching fnct */
                $scope.searchUser = function(type, value) {
                  Restangular.one('user').get({where : {
                    'usr_login': value
                  }
                }).then(function(result) {
                  $scope.redirectSearch(type, result)
                })
              }
              $scope.searchPlaylist = function(type, value) {
                Restangular.one('playlist').get({where : {
                  'playlist_name': value
                }
              }).then(function(result) {
                $scope.redirectSearch(type, result)
              })
            }
            $scope.searchMusic = function(type, value) {
              Restangular.one('music').get({where : {
                'music_name': value
              }
            }).then(function(result) {
              $scope.redirectSearch(type, result)
            })
          }


          $scope.goTo = function(path, id) {
            return $location.url((path + id).toString());
          }

          $scope.redirectSearch = function(type, result) {
            $scope.searchResult.type = type,
            $scope.searchResult.result = result
            $scope.searchResult.count = result.length
            $location.url('/result');
          }


                $scope.follow = function() {
                if ($scope.myself.usr_id)
                {
                  Restangular.one("follow/followerNb/", $scope.myself.usr_id).get().then(function(result) {
                    $scope.nbFollowed = result.count;
                  });
                  Restangular.one("follow/followedNb/", $scope.myself.usr_id).get().then(function(result) {
                    $scope.nbFollowers = result.count;
                  });
                }
              }

                $scope.logout = function() {
                    if ($scope.myself && $scope.myself.messages) $scope.myself.messages = null;
                    console.log($scope.myself.messages)
                    $scope.myself = null;
                    $location.url('/login');
                    Restangular.one('auth', 'logout').get().then(function(result) {
                    });
                };

                if (!$translate.use()) {
                    $translate.use($scope.language);
                }
            }
        ]);
});
