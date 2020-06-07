import * as React from 'react'
import {render, cleanup} from '@testing-library/react'
import {ILoadingComponentProps, LoadingComponent} from "./LoadingComponent";

jest.mock('react-icons/all', () => ({
    RiLoader2Line: () => ''
}))

describe('TableRowComponent', () => {
    afterEach(cleanup)

    const initialProps: ILoadingComponentProps = {
        isLoading: false
    }


    test('should render loading component if isLoading props is true', () => {
        const {queryByTestId} = render(<LoadingComponent isLoading={true} />)

        expect(queryByTestId('loading')).toBeTruthy();
    })

    test('should not render loading component if isLoading props is false', () => {
        const {queryByTestId} = render(<LoadingComponent isLoading={false} />)

        expect(queryByTestId('loading')).toBeFalsy();
    })
})
