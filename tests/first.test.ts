import { test, expect } from '@jest/globals'

import insist from '..';

test(
    'first test',
    async () => {
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
                maxRetry: 2
            }
        );
        expect(x).toBe(2);
        return;
    }
);