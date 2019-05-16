import { TestBed, inject } from '@angular/core/testing';
import { SpeechContextDirective } from './speech-context.directive';
import { SpeechService } from './speech.service';
describe('SpeechContextDirective', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [
                SpeechService,
                { provide: 'SPEECH_LANG', useValue: 'en-US' },
            ],
        });
    });
    it('should create an instance', inject([SpeechService], function (service) {
        var directive = new SpeechContextDirective(service);
        expect(directive).toBeTruthy();
    }));
});
//# sourceMappingURL=speech-context.directive.spec.js.map