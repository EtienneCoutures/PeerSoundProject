/**
 * @api {get} /user/:id Read data of a User
 * @apiVersion 1.0.0
 * @apiName GetUser
 * @apiGroup User
 * @apiPermission admin
 *
 *
 * @apiParam {Number} id The Users-ID.
 *
 * @apiExample Example usage:
 * curl -i http://localhost/user/1
 *
 * @apiSuccess {Number}     id                  The Users-ID.
 * @apiSuccess {String}     login               login.
 * @apiSuccess {String}     password            password of the User.
 * @apiSuccess {String[]}   pseudo              List of Users pseudo (Array of Strings).
 * @apiSuccess {String      email               email of user
 * @apiSuccess {string}     gender(man,woman)   gender User.
 * @apiSuccess {Enum}       usr-role              User role.
 * @apiSuccess {Number}     nb_followers         List of Users followers.
 * @apiSuccess {Number}     nb_following         List of Users following.
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
function getUser() { return; }

/**
 * @api {post} /user Create a new User
 * @apiVersion 1.0.0
 * @apiName PostUser
 * @apiGroup User
 * @apiPermission none
 *
 * @apiDescription In this case "apiErrorStructure" is defined and used.
 * Define blocks with params that will be used in several functions, so you dont have to rewrite them.
 *
 * @apiParam {String} name Name of the User.
 *
 * @apiSuccess {Number} id         The new Users-ID.
 *
 * @apiUse CreateUserError
 */
function postUser() { return; }

/**
 * @api {put} /user/:id Change a User
 * @apiVersion 1.0.0
 * @apiName PutUser
 * @apiGroup User
 * @apiPermission none
 *
 * @apiDescription This function has same errors like POST /user, but errors not defined again, they were included with "apiErrorStructure"
 *
 * @apiParam {String} name Name of the User.
 *
 * @apiUse CreateUserError
 */
function putUser() { return; }
