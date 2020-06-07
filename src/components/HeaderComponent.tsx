import * as React from "react";
import {useHistory} from "react-router-dom";
import {RiLogoutCircleRLine} from "react-icons/all";
import {resetButtonDefaultStyles} from "./styleHelper/mainStyles";
import {css} from "emotion";

import {useLogin} from "./hooks/useLogin";
import Navbar from "react-bootstrap/Navbar";
import {connect} from "react-redux";
import {IState} from "../store/IState";
import {userDataSelector} from "../store/selectors/userDataSelector";
import {IUser} from "../shared/models/IUser";
import {Dispatch} from "redux";
import {setPassedGame} from "../store/actionCreators";
import {IPassedGame} from "../shared/models/IPassedGame";

interface IHeaderComponentProps {
    userData: IUser | null
    setPassedGame: (passedGame: IPassedGame[] | null) => void
}

const headerClass = css`
    border-radius: 3px;
    color: #fff;
`

const logoutBtnClass = css`
    color: #fff;
`

const Header: React.FunctionComponent<IHeaderComponentProps> = React.memo((props) => {
    const history = useHistory()
    const {logout} = useLogin()

    const onLogoutClickHandler = () => {
        logout().then(() => {
            history.push('/login')
            props.setPassedGame(null)
        })
    }

    return <Navbar bg="dark" variant="dark" className={headerClass}>
        <div className='mr-auto'>
            Welcome <span className='font-weight-bold'>{props.userData!.fullName}</span>
        </div>

        <button className={`${resetButtonDefaultStyles} ${logoutBtnClass}`} onClick={onLogoutClickHandler}>
            Logout <RiLogoutCircleRLine size={27} color='#fff'/>
        </button>
    </Navbar>
})

const mapStateToProps = (state: IState) => ({
    userData: userDataSelector(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setPassedGame: (passedGames: IPassedGame[] | null) => dispatch(setPassedGame(passedGames))
})

export const HeaderComponent = connect(mapStateToProps, mapDispatchToProps)(Header)

