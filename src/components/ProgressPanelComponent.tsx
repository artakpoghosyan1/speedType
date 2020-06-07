import * as React from 'react'
import {css} from "emotion";

interface IProgressPanelComponentProps {
    time: number
    wpm: number
}

const resultClass = css`
    display: flex;
    padding: 20px 0;
    span:first-child {
        margin-right: 20px
    }
`

export const ProgressPanelComponent: React.FunctionComponent<IProgressPanelComponentProps> = React.memo(props => {
    return <div className={resultClass}>
        <span>TIME: {props.time}</span>
        <span>WPM: {props.wpm}</span>
    </div>
})
