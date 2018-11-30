"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var offline_features_service_1 = require("./offline-features.service");
describe('OfflineFeaturesService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [offline_features_service_1.OfflineFeaturesService]
        });
    });
    it('should be created', testing_1.inject([offline_features_service_1.OfflineFeaturesService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=offline-features.service.spec.js.map