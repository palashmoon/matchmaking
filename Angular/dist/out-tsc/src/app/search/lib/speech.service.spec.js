import { TestBed, inject } from '@angular/core/testing';
import { SpeechService } from './speech.service';
var say = function (service, word) {
    service.recognition.onresult({
        resultIndex: 0,
        results: [{
                isFinal: true,
                0: {
                    confidence: 1,
                    transcript: word,
                },
            }],
    });
};
describe('SpeechService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [
                SpeechService,
                { provide: 'SPEECH_LANG', useValue: 'en-US' },
            ]
        });
    });
    it('should be created', inject([SpeechService], function (service) {
        expect(service).toBeTruthy();
    }));
    it('should recognize declared context', inject([SpeechService], function (service) {
        service.declareContext(['hello']);
        say(service, 'hello');
        service.context.subscribe(function (context) {
            expect(context).toBe('hello');
        });
    }));
    it('should recognize a sub context if parent context is active', inject([SpeechService], function (service) {
        service.declareContext(['hello']);
        service.declareContext(['hello', 'world']);
        say(service, 'hello');
        say(service, 'world');
        service.context.subscribe(function (context) {
            expect(context).toBe('hello/world');
        });
    }));
    it('should not recognize a sub context if parent context is not active', inject([SpeechService], function (service) {
        service.declareContext(['hello']);
        service.declareContext(['hello', 'world']);
        say(service, 'world');
        service.context.subscribe(function (context) {
            expect(context).toBe('');
        });
    }));
    it('should always recognize a first-level context', inject([SpeechService], function (service) {
        service.declareContext(['bye']);
        service.declareContext(['hello']);
        service.declareContext(['hello', 'world']);
        say(service, 'hello');
        say(service, 'world');
        say(service, 'bye');
        service.context.subscribe(function (context) {
            expect(context).toBe('bye');
        });
    }));
    it('should recognize a command if parent context is active', inject([SpeechService], function (service) {
        service.declareContext(['hello']);
        service.declareContext(['hello', 'world']);
        service.declareCommand('ok', ['hello', 'world']);
        say(service, 'hello');
        say(service, 'world');
        say(service, 'ok');
        service.command.subscribe(function (context) {
            expect(context).toBe('ok');
        });
    }));
    it('should not recognize a command if parent context is not active', inject([SpeechService], function (service) {
        service.declareContext(['hello']);
        service.declareContext(['hello', 'world']);
        service.declareCommand('ok', ['hello', 'world']);
        say(service, 'hello');
        say(service, 'ok');
        service.command.subscribe(function (context) {
            expect(context).toBe('ok');
        });
    }));
    it('should recognize a global context command', inject([SpeechService], function (service) {
        service.declareCommand('ok', []);
        say(service, 'ok');
        service.command.subscribe(function (context) {
            expect(context).toBe('ok');
        });
    }));
    it('should recognize a global context command when we are in a context', inject([SpeechService], function (service) {
        service.declareContext(['hello']);
        service.declareCommand('ok', []);
        say(service, 'hello');
        say(service, 'ok');
        service.command.subscribe(function (context) {
            expect(context).toBe('ok');
        });
    }));
});
//# sourceMappingURL=speech.service.spec.js.map