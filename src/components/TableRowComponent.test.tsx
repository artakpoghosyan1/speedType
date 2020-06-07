import * as React from 'react'
import {render, cleanup} from '@testing-library/react'
import {ITableRowComponentProps, TableRowComponent} from './TableRowComponent'

describe('TableRowComponent', () => {
    afterEach(cleanup)

    const initialProps: ITableRowComponentProps = {
        data: {
            wpm: 10,
            correctWordsCount: 23,
            completionPercent: 30
        },
        index: 2
    }

    const renderComponent = (props = initialProps) => (
        render(<TableRowComponent {...props}/>)
    )

    test('should render cells with correct values', () => {
        const {queryByText} = renderComponent()

        expect(queryByText('2')).toBeTruthy();
        expect(queryByText('10')).toBeTruthy();
        expect(queryByText('23')).toBeTruthy();
        expect(queryByText('30')).toBeTruthy();
        expect(queryByText('Average')).toBeFalsy();
    })

    test('should render "Average" word if index prop is undefined', () => {
        const props = {
            ...initialProps,
            index: undefined
        }
        const {queryByText} = renderComponent(props)

        expect(queryByText('Average')).toBeTruthy();
    })
})
