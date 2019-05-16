import { TestBed } from '@angular/core/testing';
import { RegisterService } from './register.service';
describe('RegisterService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(RegisterService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=register.service.spec.js.map