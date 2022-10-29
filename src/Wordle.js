import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Notyf } from "notyf";

import { wordsList } from "./constants/";
import { randomInteger } from "./helpers";

import {
  setWord,
  pushLetterToInputBoxes,
  popLetterToInputBoxes,
  setCurrentAttemptIndex,
  setLetterClasses,
  setGameOver,
  resetWordleState,
} from "./services/actions/wordleActions";

import { ReactComponent as BACKSPACE_SVG } from "./assets/svgs/backspace.svg";

import "notyf/notyf.min.css";
import "./wordle.css";

const notyf = new Notyf({
  duration: 2000,
  position: {
    x: "center",
    y: "top",
  },
  types: [
    {
      type: "success",
      background: "green",
    },
    {
      type: "error",
      background: "indianred",
    },
    {
      type: "warning",
      background: "orange",
    },
  ],
});

const Wordle = ({
  wordleState,
  setWordHandler,
  pushLetterToInputBoxesHandler,
  setCurrentAttemptIndexHandler,
  popLetterToInputBoxesHandler,
  setLetterClassesHandler,
  setGameOverHandler,
  resetWordleStateHandler,
}) => {
  function addHints(currentWord) {
    let correctWordArr = Array.from(wordleState.wordToGuess);
    let guessedWordArr = Array.from(currentWord);

    let wonCounter = 0;

    for (let i = 0; i < 5; i++) {
      let iterationLetterObject =
        wordleState.inputBoxes[wordleState.currentAttempt][i];
      if (guessedWordArr[i] === correctWordArr[i]) {
        setLetterClassesHandler({
          currentAttempt: wordleState.currentAttempt,
          letterIndex: i,
          className: "correct",
        });
        wonCounter++;
      } else {
        if (correctWordArr.includes(iterationLetterObject.letter)) {
          setLetterClassesHandler({
            currentAttempt: wordleState.currentAttempt,
            letterIndex: i,
            className: "semi",
          });
        } else {
          setLetterClassesHandler({
            currentAttempt: wordleState.currentAttempt,
            letterIndex: i,
            className: "incorrect",
          });
        }
      }
    }

    if (wonCounter === 5) {
      notyf.success("CONGRATULATIONS...YOU WON 🌼");
      setGameOverHandler();
    } else if (wordleState.currentAttempt === 5) {
      notyf.error("SORRY...YOU LOST 😕");
      setGameOverHandler();
    }
  }

  function makeAttempt(currentWord) {
    currentWord = currentWord.replace(/[^a-z]+/gi, "").toLowerCase();
    if (wordleState.isGameOver) {
      notyf.warning("Game has already Finished");
    } else if (currentWord.length !== 5) {
      notyf.error("Not enough letters!");
    } else if (!wordsList.includes(currentWord)) {
      notyf.warning("Word is not in dictionary");
    } else {
      addHints(currentWord);

      setCurrentAttemptIndexHandler({
        currentAttempt: wordleState.currentAttempt + 1,
      });
    }
  }
  function onType(e) {
    const key = e.key;
    if (!wordleState.isGameOver)
      if (key === "Enter") {
        if (wordleState.currentAttempt <= 5) {
          let currentTypedWord = wordleState.inputBoxes[
            wordleState.currentAttempt
          ].reduce((pre, current) => pre + current.letter, "");

          makeAttempt(currentTypedWord);
        }

        if (typeof e.preventDefault === "function") {
          e.preventDefault();
          e.stopPropagation();
        }
      } else if (/Backspace|Delete/.test(key)) {
        popLetterToInputBoxesHandler({
          inputBoxes: wordleState.inputBoxes,
          currentAttempt: wordleState.currentAttempt,
        });
      } else if (/^[a-z]$/i.test(key)) {
        if (wordleState.currentAttempt <= 5) {
          pushLetterToInputBoxesHandler({
            inputBoxes: wordleState.inputBoxes,
            inputLetter: key,
            currentAttempt: wordleState.currentAttempt,
          });
        }
      }
  }
  useEffect(() => {
    // window.addEventListener("keydown", onType, { capture: true });

    setWordHandler(wordsList[randomInteger(0, wordsList.length - 1)]);
  }, [setWordHandler, pushLetterToInputBoxesHandler]);

  return (
    <section>
      <div className="header">
        <div className="title">
          <span>Wordle Bit</span>
          {wordleState.wordToGuess}
          <span></span>
        </div>
      </div>
      <div className="words">
        {wordleState.inputBoxes.map((attemptRow, attemptIndex) => {
          return (
            <div className="word attempted" key={attemptIndex}>
              {attemptRow.map((letterObj, index) => (
                <div className={`letter ${letterObj.className}`} key={index}>
                  <span>{letterObj.letter.toUpperCase()}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <span id="candidates-left" style={{ marginTop: "16px" }}></span>
      <div style={{ position: "relative", marginTop: "16px" }}>
        {wordleState.isGameOver ? (
          <div className="flex-justify-content-center">
            <button
              className="play-again"
              onClick={() => {
                resetWordleStateHandler();
              }}
            >
              PLAY AGAIN
            </button>
          </div>
        ) : (
          <div className="keyboard">
            {wordleState.config.layOut.map((row, index) => (
              <div className="keyboard-row" key={index}>
                {row.split("").map((key, i) => {
                  return (
                    <button
                      key={i}
                      className={
                        key === "#"
                          ? "keyboard-button key-enter larger"
                          : key === "!"
                          ? "keyboard-button key-backspace larger"
                          : `keyboard-button key-${key}`
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onType({
                          key:
                            key === "#"
                              ? "Enter"
                              : key === "!"
                              ? "Backspace"
                              : key,
                        });
                      }}
                    >
                      {key === "#" ? (
                        "Enter"
                      ) : key === "!" ? (
                        <BACKSPACE_SVG />
                      ) : (
                        key
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    wordleState: state.wordleState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setWordHandler: (data) => {
      dispatch(setWord(data));
    },
    pushLetterToInputBoxesHandler: (data) => {
      dispatch(pushLetterToInputBoxes(data));
    },
    popLetterToInputBoxesHandler: (data) => {
      dispatch(popLetterToInputBoxes(data));
    },
    setCurrentAttemptIndexHandler: (data) => {
      dispatch(setCurrentAttemptIndex(data));
    },
    setLetterClassesHandler: (data) => {
      dispatch(setLetterClasses(data));
    },
    setGameOverHandler: () => {
      dispatch(setGameOver());
    },
    resetWordleStateHandler: () => {
      dispatch(resetWordleState());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wordle);
