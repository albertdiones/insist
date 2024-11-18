import { test, expect } from '@jest/globals'

import insist from '..';

test(
    'first test',
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
                maxRetry: maxRetry
            }
        );
        expect(x).toBe(maxRetry);
        return;
    }
);