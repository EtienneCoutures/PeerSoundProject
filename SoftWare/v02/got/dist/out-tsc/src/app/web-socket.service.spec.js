"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var web_socket_service_1 = require("./web-socket.service");
describe('WebSocketService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [web_socket_service_1.WebSocketService]
        });
    });
    it('should be created', testing_1.inject([web_socket_service_1.WebSocketService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=web-socket.service.spec.js.map