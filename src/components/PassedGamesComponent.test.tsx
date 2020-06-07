import React from 'react'
import {render, cleanup} from '@testing-library/react'
import {PassedGames} from './PassedGamesComponent'
import {IPassedGame} from "../shared/models/IPassedGame";

describe('PassedGameComponent', () => {
    afterEach(cleanup)

    test('should render table if passedGames prop is not empty array', () => {
        const passedGames: IPassedGame[] = [{
            wpm: 20,
            correctWordsCount: 12,
            completionPercent: 23
        }]

        const {getByTestId} = render(<PassedGames passedGames={passedGames}/>)
        expect(getByTestId('passed-games-table')).toBeTruthy();
    });

    test('should not render table if passedGames is empty array', () => {
        const {queryByTestId} = render(<PassedGames passedGames={[]}/>)
        expect(queryByTestId('passed-games-table')).toBeFalsy();
    });
})
