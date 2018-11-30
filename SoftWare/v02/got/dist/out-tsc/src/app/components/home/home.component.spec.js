"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var home_component_1 = require("./home.component");
var core_1 = require("@ngx-translate/core");
describe('HomeComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [home_component_1.HomeComponent],
            imports: [
                core_1.TranslateModule.forRoot()
            ]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(home_component_1.HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
    it('should render title in a h1 tag', testing_1.async(function () {
        var compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('PAGES.HOME.TITLE');
    }));
});
//# sourceMappingURL=home.component.spec.js.map