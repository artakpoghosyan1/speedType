import
{css, injectGlobal} from "emotion"
import {
    inputFocusedShadowColor, inputOutlineColor,
    inputShadowColor,
    mainBg,
    mainColor,
    mainTextColor, secondaryColor
} from "../../constants/colors";

injectGlobal`
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap');
    
    body {
        color: ${mainTextColor};
        background-color: ${mainBg};
        font-family: 'Open Sans', sans-serif;
    }
`

export const inputClass = css`
    padding-top: 25px; 
    padding-bottom: 25px;
    border-color: #f1f1f1;
    box-shadow: 0 0 9px ${inputShadowColor};
    
    &:focus {
        outline: 1px solid ${inputOutlineColor};
        border-color: transparent;
        box-shadow: 0 0 9px ${inputFocusedShadowColor};
    }
`

export const mainBtnClass = css`
    width: 80%;
    background-color: ${mainColor};
    border-radius: 18px;
    padding-top: 8px;
    padding-bottom: 8px;
`

export const resetButtonDefaultStyles = css`
    border: none;
    padding: 0;
    background: none;
    cursor: pointer;
    
    &:focus {
        outline: none;
    }
`
