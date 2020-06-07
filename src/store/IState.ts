import {IPassedGame} from "../shared/models/IPassedGame";
import {IUser} from "../shared/models/IUser";

export interface IState {
    typingText: string
    passedGames: IPassedGame[]
    userData: IUser | null
}
