import * as React from 'react'
import {render, cleanup} from '@testing-library/react'
import {IHighlightedLettersProps, HighlightedLetters} from './HighlightedLetters'

export const getStylesOfElement = (className: string) => {
    const element: HTMLElement | Element = document.querySelector(className)!
    return window.getComputedStyle(element)
}

describe('HighlightedLetters', () => {
    afterEach(cleanup)

    const initialProps: IHighlightedLettersProps = {
        characters: 'string',
        showCursor: true,
        color: 'blue',
        testId: 'passed-words'
    }

    const renderComponent = (props = initialProps) => (
        render(<HighlightedLetters {...props}/>)
    )

    test('should add correct styles for passed words', () => {
        renderComponent()

        const styleOfHighlightedElement = getStylesOfElement('[data-testid=passed-words]')

        expect(styleOfHighlightedElement.color).toBe('blue')
    })

    test('should add correct styles for correct words', () => {
        const props = {
            ...initialProps,
            testId: 'correct-words'
        }

        renderComponent(props)

        const styleOfHighlightedElement = getStylesOfElement('[data-testid=correct-words]')
        expect(styleOfHighlightedElement.color).toBe('blue')
    })

    test('should add correct styles for wrong words', () => {
        const props = {
            ...initialProps,
            testId: 'wrong-words',
            color: 'red'
        }

        renderComponent(props)

        const styleOfHighlightedElement = getStylesOfElement('[data-testid=wrong-words]')
        expect(styleOfHighlightedElement.color).toBe('red')
    })
})
