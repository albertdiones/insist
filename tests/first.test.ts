import { test, expect } from '@jest/globals'

import insist from '..';

const unexpectedErrorMessage = "UNEXPECTED_ERROR_SHOULD_NOT_HAPPEN";

test(
    'basic retry with default timeout',
    async () => {
        const maxRetry = 5;
        let x = 0;
      

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
        ).then(
            () => {
                throw unexpectedErrorMessage;
            }
        ).catch(
            (err) => {
                expect(err).not.toBe(unexpectedErrorMessage);
                expect(x).toBe(maxRetry);
            }
        )
    }
);


test(
    'retry with timeout declaration',
    async () => {
        const maxRetry = 3;
        const timeout = 3000;
        const expectedMinimumElapsedTime = (maxRetry-1) * timeout;
        const startTime = Date.now();
        await insist(
            () => fetch(
                'http://aaaaaaaaa.bbbbb/zzzzz'
            ),
            {
                maxRetries: maxRetry,
                timeout: timeout
            }
        ).then(
            () => {
                throw unexpectedErrorMessage;
            }
        ).catch(
            (err) => {
                expect(err).not.toBe(unexpectedErrorMessage);
                const timeElapsed = Date.now() - startTime;
                expect(timeElapsed).toBeGreaterThanOrEqual(expectedMinimumElapsedTime);
            }
        );
    }
);