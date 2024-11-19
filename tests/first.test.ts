import { test, expect } from '@jest/globals'

import insist from '..';

test(
    'basic retry with default timeout',
    async () => {
        const maxRetry = 5;
        let x = 0;
        expect(insist).not.toBeFalsy()
        await insist(
            () => fetch(
                'http://aaaaaaaaa.bbbbb/zzzzz'
            ).catch(
                (e) => {
                    ++x;
                    throw e;
                }
            ),
            {
                maxRetries: maxRetry
            }
        );
        expect(x).toBe(maxRetry);
        return;
    }
);


test(
    'retry with timeout declaration',
    async () => {
        const maxRetry = 10;
        const timeout = 20;
        const expectedMinimumElapsedTime = maxRetry * timeout;
        const startTime = Date.now();
        expect(insist).not.toBeFalsy()
        await insist(
            () => fetch(
                'http://aaaaaaaaa.bbbbb/zzzzz'
            ),
            {
                maxRetries: maxRetry,
                timeout: timeout
            }
        );
        const timeElapsed = Date.now() - startTime;
        expect(timeElapsed).toBeGreaterThanOrEqual(expectedMinimumElapsedTime);
    }
);