"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var playlist_service_1 = require("./playlist.service");
describe('PlaylistService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [playlist_service_1.PlaylistService]
        });
    });
    it('should be created', testing_1.inject([playlist_service_1.PlaylistService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=playlist.service.spec.js.map