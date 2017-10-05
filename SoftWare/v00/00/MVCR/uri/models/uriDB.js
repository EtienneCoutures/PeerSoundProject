const dirDepth = '../../..';
const MVCR = dirDepth  + '/MVCR';

var SQLEntity = require(MVCR + "/common/sqlServer/SQLEntity.js")

class uriDB extends SQLEntity {

  constructor() {
    super("URIs");
  }

  list(optMap, next) {
    this.List(next);
  }

  create(optMap, next) {
    this.Create(optMap, next);
  }

  read(optMap, next) {
    this.Read(optMap, next);
  }

  update(optMap, next) {
    this.Update(optMap, next);
  }

  delete(optMap, next) {
    this.Delete(optMap, next);
  }

}

module.exports = uriDB;
