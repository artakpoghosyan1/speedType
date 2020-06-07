import * as React from 'react'
import {keyframes} from 'emotion'
import styled from '@emotion/styled'

export interface IHighlightedLettersProps {
    characters: string
    showCursor: boolean
    color: string
    testId?: string
}

const cursorAnimation = keyframes`
    from {
        opacity: 0;
    }
    
    to {
        opacity: 1;
    }
`

const HighlightedStyled = styled.span<{color: string, showCursor: boolean}>`
    color: ${props => props.color};
    position: relative;
    
    ${props => props.showCursor &&`
        &:after {
            animation: ${cursorAnimation} 0.4s linear infinite alternate;
            content: '';
            position: absolute;
            width: 1px;
            height: 100%;
            right: 0;
            background-color blue;
        }
    `}
`

export const HighlightedLetters: React.FunctionComponent<IHighlightedLettersProps> = React.memo(props => {
    return props.characters ? <HighlightedStyled
        color={props.color}
        showCursor={props.showCursor}
        data-testid={props.testId}>

        {props.characters}
    </HighlightedStyled> : null
})
