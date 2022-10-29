import { wordsAcceptedAsInput } from "../../constants";
import { randomInteger } from "../../helpers";

import {
  SET_WORD,
  PUSH_LETTER_TO_INPUTBOXES,
  POP_LETTER_FROM_INPUTBOXES,
  SET_CURRENT_ATTEMPT_INDEX,
  SET_LETTER_CLASSES,
  SET_GAME_OVER,
  RESET_WORDLE_STATE,
} from "../CONSTANTS";
import { fetchStateFromLocalStorage } from "../utils/localStorage";

const persistedState = fetchStateFromLocalStorage("userAuth");

const INITIAL_STATE = {
  config: {
    layOut: ["qwertyuiop", "asdfghjkl", "#zxcvbnm!"],
  },
  inputBoxes: [...Array(6)].map((e) =>
    Array(5).fill({ letter: "", className: "" })
  ),
  // letterClasses: [...Array(6)].map((e) => Array(5).fill("")),
  currentAttempt: 0,
  wordToGuess:
    wordsAcceptedAsInput[randomInteger(0, wordsAcceptedAsInput.length - 1)],
  isGameOver: false,
  ...persistedState,
};

export default function wordleState(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_WORD:
      return {
        ...state,
        wordToGuess: action.data,
      };
    case PUSH_LETTER_TO_INPUTBOXES:
      return {
        ...state,
        inputBoxes: state.inputBoxes.map((attempArr, attemptIndex) => {
          if (attemptIndex === action.data.attemptIndex)
            return attempArr.map((letterObj, letterIndex) => {
              if (letterIndex === action.data.letterIndex)
                return {
                  ...letterObj,
                  letter: action.data.inputLetter,
                };
              else return letterObj;
            });
          else return attempArr;
        }),
      };
    case POP_LETTER_FROM_INPUTBOXES:
      return {
        ...state,
        inputBoxes: state.inputBoxes.map((attempArr, attemptIndex) => {
          if (attemptIndex === action.data.attemptIndex)
            return attempArr.map((letterObj, letterIndex) => {
              if (letterIndex === action.data.letterIndex)
                return {
                  ...letterObj,
                  letter: "",
                };
              else return letterObj;
            });
          else return attempArr;
        }),
      };
    case SET_CURRENT_ATTEMPT_INDEX:
      return {
        ...state,
        currentAttempt: action.data.currentAttempt,
      };
    case SET_LETTER_CLASSES:
      return {
        ...state,
        inputBoxes: state.inputBoxes.map((attemptArr, attemptIndex) => {
          if (attemptIndex === action.data.currentAttempt) {
            return attemptArr.map((letterObj, letterIndex) => {
              if (letterIndex === action.data.letterIndex) {
                return {
                  ...letterObj,
                  className: action.data.className,
                };
              } else {
                return letterObj;
              }
            });
          } else {
            return attemptArr;
          }
        }),
      };
    case SET_GAME_OVER:
      return {
        ...state,
        isGameOver: true,
      };
    case RESET_WORDLE_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
}
