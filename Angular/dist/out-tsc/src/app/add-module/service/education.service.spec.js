import { TestBed } from '@angular/core/testing';
import { EducationService } from './education.service';
describe('EducationService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(EducationService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=education.service.spec.js.map