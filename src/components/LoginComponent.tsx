import * as React from "react";
import {useHistory} from "react-router-dom";
import {Alert, Button, Form} from "react-bootstrap";
import {css} from "emotion";
import {inputClass, mainBtnClass} from "./styleHelper/mainStyles";
import {useLogin} from "./hooks/useLogin";
import {getLocalStorage} from "../shared/utilities/localstorage";
import {Dispatch} from "redux";
import {setUserData} from "../store/actionCreators";
import {connect} from "react-redux";
import {IUser} from "../shared/models/IUser";

interface ILoginComponentProps {
    setUserData: (userData: IUser) => void
}

const loginWrapperClass = css`
    padding-top: 50px;
`

const loginFormClass = css`
    text-align: center;
    max-width: 400px;
    margin: 0 auto;
`

const loginBtnClass = css`
    margin-top: 30px;
`

const storage = getLocalStorage()

export const Login: React.FunctionComponent<ILoginComponentProps> = React.memo((props) => {
    const usernameRef: React.RefObject<HTMLInputElement> = React.useRef(null)
    const passwordRef: React.RefObject<HTMLInputElement> = React.useRef(null)
    const history = useHistory()
    const {login, userData, error} = useLogin()

    const onSubmitHandler = (): void => {
        const username = usernameRef.current!.value
        const password = passwordRef.current!.value

        login(username, password)
    }

    const handleEnterKeyPress = (event: any) => {
        if(event.key === 'Enter') {
            onSubmitHandler()
        }
    }

    React.useEffect(() => {
        document.addEventListener('keypress', handleEnterKeyPress)

        return () => {
            document.removeEventListener('keypress', handleEnterKeyPress)
        }
    }, [])

    React.useEffect(() => {
        if(userData) {
            storage.setItem('user', userData)
            props.setUserData(userData)
            history.push('/play')
        }
    }, [userData])

    return (
        <div className={loginWrapperClass}>
            <Form className={loginFormClass} onSubmit={onSubmitHandler}>
                {error &&
                <Alert variant='danger'>
                    {error}
                </Alert>
                }
                <Form.Group controlId="validationCustom01">
                    <Form.Control
                        required
                        ref={usernameRef}
                        className={`${inputClass} `}
                        type="text"
                        placeholder='Username'
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Control
                        required
                        ref={passwordRef}
                        className={`${inputClass}`}
                        type="password"
                        placeholder='Password'
                    />
                </Form.Group>

                <Button className={`${mainBtnClass} ${loginBtnClass}`} type="button" onClick={onSubmitHandler}>
                    Login
                </Button>
            </Form>
        </div>
    );
})

const mapDispatchToProps = (dispatch: any) => ({
    setUserData: (userData: IUser) => dispatch(setUserData(userData))
})

export const LoginComponent = connect(null, mapDispatchToProps)(Login)
