import { UserActionTypes as ActionTypes } from "./actions";

const initialState = {
  row: {
    id: 0,
    name: "",
    hight: 0,
    birthday: "0000-01-01",
    dept: 0,
    projs: [],
    photo: "",
  },
  rows: [],
  depts: [],
  projs: [],
  keyWord: "",
};

const user = (state = initialState, action) => {
  console.log("state :", state);
  console.log("action :", action);
  switch (action.type) {
    case ActionTypes.LoadListSuccess:
      return {
        ...state,
        rows: action.payload.rows,
      };
    case ActionTypes.LoadSuccess:
      return {
        ...state,
        row: action.payload.row,
      };
    case ActionTypes.QueryKeyWord:
      return {
        ...state,
        keyWord: action.payload.keyWord,
      };
    case ActionTypes.BackList:
      return {
        ...state,
      };
    case ActionTypes.CreateSuccess:
    case ActionTypes.UpdateSuccess:
    case ActionTypes.RemoveSuccess:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export { user };
