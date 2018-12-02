"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var login_service_1 = require("./login.service");
describe('LoginService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [login_service_1.LoginService]
        });
    });
    it('should be created', testing_1.inject([login_service_1.LoginService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=login.service.spec.js.map