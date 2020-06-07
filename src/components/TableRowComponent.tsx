import * as React from 'react'
import {IPassedGame} from "../shared/models/IPassedGame";

export interface ITableRowComponentProps {
    data: IPassedGame
    index?: number
}

export const TableRowComponent: React.FunctionComponent<ITableRowComponentProps> = React.memo(props => {
    const {index, data: {wpm, completionPercent, correctWordsCount}} = props

    return <tr>
        <td>{index ? index : 'Average'}</td>
        <td>{wpm}</td>
        <td>{completionPercent}</td>
        <td>{correctWordsCount}</td>
    </tr>
})
