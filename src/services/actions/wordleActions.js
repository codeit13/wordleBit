import {
  SET_WORD,
  PUSH_LETTER_TO_INPUTBOXES,
  POP_LETTER_FROM_INPUTBOXES,
  SET_CURRENT_ATTEMPT_INDEX,
  SET_LETTER_CLASSES,
  SET_GAME_OVER,
  RESET_WORDLE_STATE,
} from "../CONSTANTS";

export const setWord = (data) => {
  return {
    type: SET_WORD,
    data: data,
  };
};

export const setCurrentAttemptIndex = (data) => {
  return {
    type: SET_CURRENT_ATTEMPT_INDEX,
    data: data,
  };
};

export const pushLetterToInputBoxes = (data) => {
  const inputBoxes = data.inputBoxes.map((attemptArr) => {
    return attemptArr.filter((letterObj) => letterObj.letter !== "");
  });

  const attemptIndex = data.currentAttempt;

  const letterIndex = inputBoxes[attemptIndex].length;

  return {
    type: PUSH_LETTER_TO_INPUTBOXES,
    data: {
      attemptIndex,
      letterIndex,
      inputLetter: data.inputLetter,
    },
  };
};

export const popLetterToInputBoxes = (data) => {
  const inputBoxes = data.inputBoxes.map((attemptArr) => {
    return attemptArr.filter((letterObj) => letterObj.letter !== "");
  });

  const attemptIndex = data.currentAttempt;

  const letterIndex = inputBoxes[attemptIndex].length - 1;

  return {
    type: POP_LETTER_FROM_INPUTBOXES,
    data: {
      attemptIndex,
      letterIndex,
    },
  };
};

export const setLetterClasses = (data) => {
  return {
    type: SET_LETTER_CLASSES,
    data: data,
  };
};

export const setGameOver = () => {
  return {
    type: SET_GAME_OVER,
    data: {},
  };
};

export const resetWordleState = () => {
  return {
    type: RESET_WORDLE_STATE,
    data: {},
  };
};
