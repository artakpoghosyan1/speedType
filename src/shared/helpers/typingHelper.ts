import {GAME_INTERVAL_SECONDS} from "../../constants/gameInterval";
import {IPassedGame} from "../models/IPassedGame";

export function typingHelper() {
    const getWpm = (characters: string, timer: number) => {
        return Math.round((characters.length * GAME_INTERVAL_SECONDS) / (timer * 5))
    }

    const calculateCompletionPercent = (wordsCount: number, text: string): number => {
        const textWordsCount = text.split(' ').length
        return Math.round(wordsCount / textWordsCount * 100)
    }

    const getAverage = (array: IPassedGame[], value: 'wpm' | 'correctWordsCount' | 'completionPercent'): number => {
        return Math.round(array.reduce((acc: number, item: IPassedGame) => {
            return acc + item[value]
        }, 0) / array.length)
    }

    return {
        getWpm,
        calculateCompletionPercent,
        getAverage
    }
}
