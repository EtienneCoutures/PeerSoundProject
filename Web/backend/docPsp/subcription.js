/**
 * @api {get} /subscription/:id Read all subscription of a User
 * @apiVersion 1.0.0
 * @apiName Getsubscription
 * @apiGroup subscription
 * @apiPermission user
 *
 *
 * @apiParam {Number} id The Users-ID subscription.
 *
 * @apiExample Example usage:
 * curl -i http://localhost/subscription/1
 *
 * @apiSuccess {Number}       subscription_id    The subscription-ID.
 * @apiSuccess {datetime}    date                subscription-datetime.
 * @apiSuccess {Number}      usr_id              usr_id who subscribe.
 * @apiSuccess {Number}      playlist_id         id of playlist subcribe.
 * @apiSuccess {Enum}        usr_role            role of user.
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
function Getsubscription() { return; }

/**
 * @api {post} /subscription Create a new subscription
 * @apiVersion 1.0.0
 * @apiName Postsubscription
 * @apiGroup subscription
 * @apiPermission none
 *
 * @apiDescription In this case "apiErrorStructure" is defined and used.
 * Define blocks with params that will be used in several functions, so you dont have to rewrite them.
 *
 * @apiParam {String} name Name of the User invited.
 *
 * @apiSuccess {Number} id         The new Users-ID subscription.
 *
 * @apiUse CreatesubscriptionError
 */
function postsubscription() { return; }

/**
 * @api {put} /subscription/:id Change a User
 * @apiVersion 1.0.0
 * @apiName Putsubscription
 * @apiGroup subscription
 * @apiPermission none
 *
 * @apiDescription This function has same errors like POST /subscription, but errors not defined again, they were included with "apiErrorStructure"
 *
 * @apiParam {String} name Name of thesubscriptioner.
 *
 * @apiUse CreatesubscriptionError
 */
function putsubscription() { return; }
