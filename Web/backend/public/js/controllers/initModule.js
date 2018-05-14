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

                $scope.display = 'all'

              /*  Restangular.one('playlist').get({
                }).then(function(result) {
                  $scope.playlist = result
                })
*/

                $scope.getMessage = function() {
                  Restangular.one('message').get({where: {
                    dest_id: $scope.myself.usr_id,
                  }}).then(function(result) {
                    $scope.myself.messages_read = []
                    $scope.myself.messages_unread = []
                    for (var i = 0 ; i != result.length ; ++i) {
                      result[i].is_read == true ? $scope.myself.messages_read.push(result[i]) :   $scope.myself.messages_unread.push(result[i])
                    }
                  })
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

                $scope.redirectTo = function(type, id) {
                  return $location.url('/' + type +'/' + id)
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
                    $scope.follow()
                    $scope.getMessage()
                  };

                  $scope.userQuery = function() {
                    /*if (document.getElementById("selectQuery").value) {
                      var type = document.getElementById("selectQuery").value }*/
                      var type = 'all'
                      var query = document.getElementById("search").value
                      if (query) {
                        if (['all', 'playlist', 'user', 'music'].indexOf(type) >= 0) {
                          $location.url('/result/' + type + '/' + query)
                        }
                      }
                  }

                /* searching fnct */

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
                  Restangular.one("musiclink").get().then(function(result) {
                    console.log(result);
                  }, function(result) {
                    console.log("bad")
                  });
                  /*var query = {
                    "music_name": "Blue Jeans",
                    "music_description": "Blue Jeans",
                    "music_comment": "Blue Jeans",
                    "music_picture_default": "Blue Jeans",
                    "music_source": "youtube",
                    "music_group": "Lana Del Rey",
                    "music_url": "uneadresse",
                    "music_date": "2015",
                    "usr_id": $scope.myself.usr_id,
                    "duration": "4.37"
                  }
                  Restangular.all("music").post(query).then(function() {
                    console.log("good")
                  }, function() {
                    console.log("bad")
                  })*/
                  /*var query = {
                    "invited_usr_id": 2,
                    "inviter_usr_id": 1,
                    "playlist_id": 3
                  };
                  Restangular.all("invitation").post(query).then(function() {
                    console.log("good")
                  }, function() {
                    console.log("bad")
                  })*/
                }
              }

                $scope.logout = function() {
                    if ($scope.myself && $scope.myself.messages) $scope.myself.messages = null;
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
