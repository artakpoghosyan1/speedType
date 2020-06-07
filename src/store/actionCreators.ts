import * as actions from './actions'
import {IPassedGame} from "../shared/models/IPassedGame";
import {IAction} from "./reducer";
import {IUser} from "../shared/models/IUser";
import {Dispatch} from "redux";

export function setTypingText(text: string): IAction {
    return {
        type: actions.SET_TYPING_TEXT,
        payload: text
    }
}

export function setPassedGame(passedGame: IPassedGame): IAction {
    return {
        type: actions.SET_PASSED_GAME,
        payload: passedGame
    }
}

export function setUserData(userData: IUser) {
    return function (dispatch: Dispatch) {
        return dispatch({
            type: actions.SET_USER_DATA,
            payload: userData
        })
    }
}
