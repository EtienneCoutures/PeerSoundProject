const dirDepth = '../../..';
const MVCR = dirDepth  + '/MVCR';

var db = require(MVCR + '/uri/models/uriDB.js');
var uriDB = new db();

class uriRepository {

  List(next) {
    uriDB.list(next);
  }

  Create(optMap, next) {
    uriDB.create(optMap, next);
  }

  Read(optMap, next) {
    uriDB.read(optMap, next);
  }

  Update(optMap, next) {
    uriDB.update(optMap, next);
  }

  Delete(optMap, next) {
    uriDB.delete(optMap, next);
  }

}

module.exports = uriRepository;
