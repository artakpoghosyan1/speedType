import * as React from "react";
import {connect} from "react-redux";
import {css} from "emotion";
import Button from "react-bootstrap/Button";
import {ApiService} from "../shared/services/ApiService";
import {IState} from "../store/IState";
import {setPassedGame, setTypingText} from "../store/actionCreators";
import {Dispatch} from "redux";
import {typingTextSelector} from "../store/selectors/typingTextSelector";
import {HighlightedLetters} from "./HighlightedLetters";
import {typingHelper} from '../shared/helpers/typingHelper';
import {borderColor, highlightColor, highlightWrongColor} from "../constants/colors";
import {LoadingComponent} from "./LoadingComponent";
import {ProgressPanelComponent} from "./ProgressPanelComponent";
import {GAME_INTERVAL_SECONDS} from "../constants/gameInterval";
import {IPassedGame} from "../shared/models/IPassedGame";
import {PassedGamesComponent} from "./PassedGamesComponent";
import {HeaderComponent} from "./HeaderComponent";
import {getLocalStorage} from "../shared/utilities/localstorage";
import {passedGamesSelector} from "../store/selectors/passedGamesSelector";
import {userDataSelector} from "../store/selectors/userDataSelector";
import {IUser} from "../shared/models/IUser";
import {Alert} from "react-bootstrap";

interface IPlayComponentProps {
    setTypingText: (text: string) => void
    setPassedGame: (passedGame: IPassedGame[]) => void
    typingText: string
    passedGames: IPassedGame[]
    userData: IUser | null
}

const textClass = css`
    letter-spacing: 0.5px;
    margin-bottom: 20px;
    min-height: 150px;
    border: 1px solid ${borderColor};
    border-radius: 3px;
    padding: 12px;
    position: relative;
`

const inputClass = css`
    width: 100%;
    padding: 5px;
`

const startButtonClass = css`
    display: block;
    margin-top: 20px
`

const storage = getLocalStorage()

const Play: React.FunctionComponent<IPlayComponentProps> = React.memo(props => {
    const [inputValue, setInputValue] = React.useState<string>('')
    const [text, setText] = React.useState<string>('')
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [isStarted, setIsStarted] = React.useState<boolean>(false)
    const [wrongChars, setWrongChars] = React.useState<string>('')
    const [correctChars, setCorrectChars] = React.useState<string>('')
    const [timer, setTimer] = React.useState<number>(GAME_INTERVAL_SECONDS)
    const [words, setWords] = React.useState<string[]>([])
    const [wpm, setWpm] = React.useState<number>(0)
    const [intervalId, setIntervalId] = React.useState<any>(null)
    const [passedWords, setPassedWords] = React.useState<string>('')
    const [fetchDataFailError, setFetchDataFailError] = React.useState<string>('')

    const inputRef: React.RefObject<HTMLInputElement> = React.useRef(null)
    const {getWpm, calculateCompletionPercent} = typingHelper()

    React.useEffect(() => {
        if (props.typingText) {
            const id = setInterval(() => {
                setTimer(timer => timer - 1)
            }, 1000)
            setIntervalId(id)
        }

        return () => {
            clearInterval(intervalId)
        }
    }, [props.typingText])

    React.useEffect(() => {
        setWpm(getWpm(passedWords.split(' ').join(''), timer))

        if (timer === 0) {
            finishGame()
        }
    }, [timer])

    React.useEffect(() => {
        if (props.passedGames.length) {
            storage.setItem(`passedGames-${props.userData!.id}`, props.passedGames)
        }
    }, [props.passedGames])

    const getTextHandler = () => {
        setIsLoading(true)
        setIsStarted(true)
        setFetchDataFailError('')

        ApiService().fetchData('https://cors-anywhere.herokuapp.com/https://baconipsum.com/api/?type=all-meat=1', 'GET')
            .then((data) => {
                start(data[0])
            })
            .catch((error) => {
                setIsLoading(false)
                setIsStarted(false)
                setFetchDataFailError(`${error}. Try again`)
                console.log(error)
            })
    }

    const start = (text: string): void => {
        props.setTypingText(text)
        setText(text)
        setWords(text.split(' '))
        setIsLoading(false)
        inputRef.current!.focus()
    }

    const finishGame = () => {
        clearInterval(intervalId)

        const passedWordsCount = passedWords ? passedWords.split(' ').length : 0
        const correctWordsCount = passedWords ? passedWords.split(' ').length : 0
        const passedGames = [...props.passedGames, {
            wpm,
            correctWordsCount,
            completionPercent: calculateCompletionPercent(passedWordsCount, text)
        }]
        props.setPassedGame(passedGames)

        setIsStarted(false)
        setTimer(GAME_INTERVAL_SECONDS)
        setText('')
        setWpm(0)
        setPassedWords('')
        setCorrectChars('')
        setWrongChars('')
        setInputValue('')
    }

    const isEventKeyControlledCharacter = (key: string): boolean => key.length > 1 && key !== 'Backspace'

    const onKeydownHandler = (event: any) => {
        if (isEventKeyControlledCharacter(event.key)) {
            return
        }

        highlightedChars(event.key)
        handleBackspace(event.key)
        typeCorrectWord(event.key)
    }

    const handleBackspace = (char: string): void => {
        if (char === 'Backspace') {
            if (wrongChars) {
                const deletedChar = wrongChars.substring(wrongChars.length - 1)
                setWrongChars(wrongChars.substring(0, wrongChars.length - 1))
                setText(`${deletedChar}${text}`)
            } else {
                const deletedChar = correctChars.substring(correctChars.length - 1)
                setCorrectChars(highlightedChars => highlightedChars.substring(0, highlightedChars.length - 1))
                setText(`${deletedChar}${text}`)
            }
        }
    }

    const highlightedChars = (char: string): void => {
        if (!wrongChars && text[0] === char && char !== 'Backspace') {
            setCorrectChars(highlightedChars => `${highlightedChars}${char}`)
            setText(text.substring(1))
        }

        if (((wrongChars && text[0] === char) || text[0] !== char) && char !== 'Backspace') {
            setWrongChars(`${wrongChars}${text[0]}`)
            setText(text.substring(1))
        }
    }

    const typeCorrectWord = (char: string): void => {
        if (char === ' ' && words[0] === correctChars && !wrongChars) {
            setInputValue('')
            setPassedWords(passedChars => `${passedChars}${correctChars} `)
            setCorrectChars('')
            setWrongChars('')
            setWords(words => {
                const newWords = [...words]
                newWords.splice(0, 1)
                return newWords
            })
        }
    }

    const onChangeHandler = (event: any): void => {
        setInputValue(event.target.value)

        if (event.target.value === '') {
            setText(`${correctChars}${wrongChars}${text}`)
            setCorrectChars('')
            setWrongChars('')
        }
    }

    return <div>
        <HeaderComponent/>
        {fetchDataFailError &&
            <Alert variant='danger'>
                {fetchDataFailError}
            </Alert>
        }
        <ProgressPanelComponent time={timer} wpm={wpm}/>

        <div className={textClass}>
            <LoadingComponent isLoading={isLoading}/>
            <HighlightedLetters
                characters={passedWords}
                showCursor={false}
                color={highlightColor}
                testId='passed-words'/>

            <HighlightedLetters
                characters={correctChars}
                showCursor={!wrongChars}
                color={highlightColor}
                testId='correct-chars'/>

            {wrongChars &&
            <HighlightedLetters
                characters={wrongChars}
                showCursor={!!wrongChars}
                color={highlightWrongColor}
                testId='wrong-chars'
            />
            }

            {text ? text : null}
        </div>

        <input
            disabled={!text}
            ref={inputRef}
            type="text"
            className={inputClass}
            onKeyDown={onKeydownHandler}
            onChange={onChangeHandler}
            placeholder='Type the above text here'
            value={inputValue}/>
        <Button disabled={isStarted} className={startButtonClass} onClick={getTextHandler}>Start</Button>

        <PassedGamesComponent/>
    </div>
})

const mapStateToProps = (state: IState) => ({
    typingText: typingTextSelector(state),
    passedGames: passedGamesSelector(state),
    userData: userDataSelector(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setTypingText: (text: string) => dispatch(setTypingText(text)),
    setPassedGame: (passedGames: IPassedGame[]) => dispatch(setPassedGame(passedGames))
})

export const PlayComponent = connect(mapStateToProps, mapDispatchToProps)(Play)
