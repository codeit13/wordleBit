export const fetchStateFromLocalStorage = (reducer) => {
  try {
    const serialState = localStorage.getItem(reducer);
    if (serialState === null) {
      return undefined;
    }
    return JSON.parse(serialState);
  } catch (err) {
    return undefined;
  }
};

export const saveStateToLocalStorage = (reducer, state) => {
  try {
    const serialState = JSON.stringify(state);
    localStorage.setItem(reducer, serialState);
  } catch (err) {
    console.log(err);
  }
};
