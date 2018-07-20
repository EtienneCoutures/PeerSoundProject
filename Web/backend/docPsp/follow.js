/**
 * @api {get} /follow/:id Read all follower of a User
 * @apiVersion 1.0.0
 * @apiName GetFollower
 * @apiGroup follow
 * @apiPermission user
 *
 *
 * @apiParam {Number} id The Users-ID followed.
 *
 * @apiExample Example usage:
 * curl -i http://localhost/follow/1
 *
 * @apiSuccess {Number}     id                  The Users-ID.
 * @apiSuccess {datetime}     date              follower-datetime.
 * @apiSuccess {Number}     follower_id         id of the User follower.
 * @apiSuccess {Number}   followed_id           id of the User followed.
 *
 * @apiError NoAccessRight Only authenticated Admins can access the data.
 * @apiError UserNotFound   The <code>id</code> of the User was not found.
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401 Not Authenticated
 *     {
 *       "error": "NoAccessRight"
 *     }
 */
function GetFollower() { return; }

/**
 * @api {post} /follow Create a new follower
 * @apiVersion 1.0.0
 * @apiName Postfollow
 * @apiGroup Follow
 * @apiPermission none
 *
 * @apiDescription In this case "apiErrorStructure" is defined and used.
 * Define blocks with params that will be used in several functions, so you dont have to rewrite them.
 *
 * @apiParam {String} name Name of the User follwer.
 *
 * @apiSuccess {Number} id         The new Users-ID follower.
 *
 * @apiUse CreateFollowError
 */
function postFollow() { return; }

/**
 * @api {put} /follow/:id Change a User
 * @apiVersion 1.0.0
 * @apiName Putfollow
 * @apiGroup follow
 * @apiPermission none
 *
 * @apiDescription This function has same errors like POST /follow, but errors not defined again, they were included with "apiErrorStructure"
 *
 * @apiParam {String} name Name of thefollower.
 *
 * @apiUse CreateFollowerError
 */
function putFollow() { return; }
