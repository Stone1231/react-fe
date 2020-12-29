export const getKeyWord = (state) => {
  return state.user ? state.user.keyWord : "";
};

export const getRows = (state) => {
  return state.user ? state.user.rows : [];
};

export const getRow = (state) => {
  return state.user ? state.user.row : null;
};

export const getView = (state) => {
  return state.user ? state.user.vType : 0;
};
