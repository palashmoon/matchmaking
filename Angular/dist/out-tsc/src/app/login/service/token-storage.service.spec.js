import { TestBed } from '@angular/core/testing';
import { TokenStorageService } from './token-storage.service';
describe('TokenStorageService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(TokenStorageService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=token-storage.service.spec.js.map