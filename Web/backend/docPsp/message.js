/**
 * @api {get} /message/:id Read all message of a User
 * @apiVersion 1.0.0
 * @apiName Getmessage
 * @apiGroup message
 * @apiPermission user
 *
 *
 * @apiParam {Number} id The Users-ID message.
 *
 * @apiExample Example usage:
 * curl -i http://localhost/message/1
 *
 * @apiSuccess {Number}       id                    The message-ID.
 * @apiSuccess {datetime}    date                   message-datetime.
 * @apiSuccess {Number}      sender_id             sender of message.
 * @apiSuccess {Number}      dest_id      destinataire of the message.
 * @apiSuccess {String}      content          content of the message.
 * @apiSuccess {Enum}      is_read           read or not.
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
function Getmessage() { return; }

/**
 * @api {post} /message Create a new message
 * @apiVersion 1.0.0
 * @apiName Postmessage
 * @apiGroup message
 * @apiPermission none
 *
 * @apiDescription In this case "apiErrorStructure" is defined and used.
 * Define blocks with params that will be used in several functions, so you dont have to rewrite them.
 *
 * @apiParam {String} name Name of the User send message.
 *
 * @apiSuccess {Number} id         The new Users-ID message.
 *
 * @apiUse CreatemessageError
 */
function postmessage() { return; }

/**
 * @api {put} /message/:id Change a User
 * @apiVersion 1.0.0
 * @apiName Putmessage
 * @apiGroup message
 * @apiPermission none
 *
 * @apiDescription This function has same errors like POST /message, but errors not defined again, they were included with "apiErrorStructure"
 *
 * @apiParam {String} name Name of the message.
 *
 * @apiUse CreatemessageError
 */
function putmessage() { return; }
