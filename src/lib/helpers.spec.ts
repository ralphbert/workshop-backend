import {roundTo} from './helpers';

describe('roundTo', () => {
    it('should round correctly', async () => {
        let value = roundTo(0.146, 2);
        expect(value).toBe(0.15);

        value = roundTo(0.146, 0);
        expect(value).toBe(0);

        value = roundTo(11.56, 1);
        expect(value).toBe(11.6);
    });
});
