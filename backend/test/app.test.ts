import App from '../src/app';
import feathers from '@feathersjs/feathers';

describe('The App', () => {
    it('should export an app', () => {
        expect(App).toBeTruthy();
    });
});
