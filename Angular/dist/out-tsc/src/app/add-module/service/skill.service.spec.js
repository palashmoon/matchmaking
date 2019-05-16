import { TestBed } from '@angular/core/testing';
import { SkillService } from './skill.service';
describe('SkillService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(SkillService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=skill.service.spec.js.map