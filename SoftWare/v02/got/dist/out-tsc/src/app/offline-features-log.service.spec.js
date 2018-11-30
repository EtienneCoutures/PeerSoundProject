"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var offline_features_log_service_1 = require("./offline-features-log.service");
describe('OfflineFeaturesLogService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [offline_features_log_service_1.OfflineFeaturesLogService]
        });
    });
    it('should be created', testing_1.inject([offline_features_log_service_1.OfflineFeaturesLogService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=offline-features-log.service.spec.js.map