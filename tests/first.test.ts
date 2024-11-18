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
            ).then(
                () => ++x
            ),
            {
                maxRetry: 5
            }
        );
        return;
        expect(x).toBe(5);
    }
);