const dirDepth = '../../..';
const MVCR = dirDepth  + '/MVCR';

var View = require(MVCR + '/uri/views/uriView.js')
var Repo = require(MVCR + "/uri/models/uriRepository.js");

var uriRepo = new Repo();
var uriView = new View();

class uri {

  contructor (optMap = {}) {
    this.optMap = optMap;
    console.log("NEW URI: ", optMap);
  }

  List(optMap, next) {
    uriRepo.List(next);
  }

  Create(next, optMap = this.optMap) {
    console.log("Create Uri: ", optMap);
    uriRepo.Create(optMap, next);
  }

  Read(next, optMap = this.optMap) {
    uriRepo.Read(optMap, next);
  }

  Update(next, optMap = this.optMap) {
    uriRepo.Update(optMap, next);
  }

  Delete(next, optMap = this.optMap) {
    uriRepo.Delete(optMap, next);
  }

  Draw(next) {
    uriView.Draw(next);
  }
}

module.exports = new uri({});
