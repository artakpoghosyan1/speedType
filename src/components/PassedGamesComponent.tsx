import * as React from 'react'
import {Table} from 'react-bootstrap';
import {connect} from "react-redux";
import {IState} from "../store/IState";
import {passedGamesSelector} from "../store/selectors/passedGamesSelector";
import {IPassedGame} from "../shared/models/IPassedGame";
import {TableRowComponent} from "./TableRowComponent";
import {css} from "emotion";
import {typingHelper} from "../shared/helpers/typingHelper";
import {setPassedGame} from "../store/actionCreators";

export interface IPassedGamesComponentProps {
    passedGames: IPassedGame[]
}

const tableClass = css`
    margin-top: 50px;
`

export const PassedGames: React.FunctionComponent<IPassedGamesComponentProps> = React.memo(props => {
    const {getAverage} = typingHelper()
    const average = {
        wpm: getAverage(props.passedGames, 'wpm'),
        completionPercent: getAverage(props.passedGames, 'completionPercent'),
        correctWordsCount: getAverage(props.passedGames, 'correctWordsCount')
    }

    return props.passedGames.length ?
        <Table striped bordered hover className={tableClass} data-testid='passed-games-table'>
            <thead>
            <tr>
                <th>#</th>
                <th>WPM</th>
                <th>Completion %</th>
                <th>Correct words</th>
            </tr>
            </thead>
            <tbody>

            {props.passedGames.map((passedGame: IPassedGame, index: number) => (
                <TableRowComponent data={passedGame} index={++index} key={index}/>
            ))}

            <TableRowComponent data={average}/>
            </tbody>
        </Table> : null
})

const mapStateToProps = (state: IState) => ({
    passedGames: passedGamesSelector(state)
})

export const PassedGamesComponent = connect(mapStateToProps)(PassedGames)
