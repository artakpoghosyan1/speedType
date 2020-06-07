import {IState} from "./IState";
import * as actionTypes from "./actions";

export interface IAction {
    type: string
    payload?: any
}

export const initialState = {
    typingText: '',
    passedGames: [],
    userData: null
}

export const reducer = (state: IState = initialState, action: IAction) => {
    switch(action.type) {
        case actionTypes.SET_TYPING_TEXT: {
            return {
                ...state,
                typingText: action.payload
            }
        }

        case actionTypes.SET_PASSED_GAME: {
            return {
                ...state,
                passedGames: action.payload ? action.payload : []
            }
        }

        case actionTypes.SET_USER_DATA: {
            return {
                ...state,
                userData: action.payload
            }
        }

        default: {
            return state
        }
    }
}
