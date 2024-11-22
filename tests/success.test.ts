import { test, expect } from '@jest/globals'

import insist from '..';

const unexpectedErrorMessage = "UNEXPECTED_ERROR_SHOULD_NOT_HAPPEN";

test(
    'get pikachu',
    async () => {
        const maxRetry = 5;     

        insist(
            () => fetch(
                'https://pokeapi.co/api/v2/pokemon/pikachu'
            ),
            {
                maxRetries: maxRetry
            }
        )
        .then(
            (response) => response.json()
        )
        .then(
            (response) => {
                expect(
                    response.types[0].type.name
                ).toBe('electric');
            }
        ).catch(
            (err) => {
                throw err;
            }
        )
    }
);