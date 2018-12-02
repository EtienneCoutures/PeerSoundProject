"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/router/testing");
var app_component_1 = require("./app.component");
var core_1 = require("@ngx-translate/core");
var electron_service_1 = require("./providers/electron.service");
describe('AppComponent', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                app_component_1.AppComponent
            ],
            providers: [
                electron_service_1.ElectronService
            ],
            imports: [
                testing_2.RouterTestingModule,
                core_1.TranslateModule.forRoot()
            ]
        }).compileComponents();
    }));
    it('should create the app', testing_1.async(function () {
        var fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        var app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
var TranslateServiceStub = /** @class */ (function () {
    function TranslateServiceStub() {
    }
    TranslateServiceStub.prototype.setDefaultLang = function (lang) {
    };
    return TranslateServiceStub;
}());
//# sourceMappingURL=app.component.spec.js.map