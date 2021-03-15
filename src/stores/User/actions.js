import UserService from "services/UserService";
import { rootPath } from "components/UserRedux/User";

export const UserActionTypes = {
  LoadAll: "[User] Load all",
  Load: "[User] Load",
  Init: "[User] Init",
  QueryKeyWord: "[User] Query KeyWord",
  Query: "[User] Query",
  Create: "[User] Create",
  Update: "[User] Update",
  Remove: "[User] Remove",
  LoadListSuccess: "[User] Load list success",
  LoadSuccess: "[User] Load success",
  CreateSuccess: "[User] Create success",
  UpdateSuccess: "[User] Update success",
  RemoveSuccess: "[User] Remove success",
  BackList: "[User] Back list",
};

const LoadAll = () => {
  return (dispatch) => {
    UserService.get().then((res) => {
      const rows = res.data;
      dispatch({ type: UserActionTypes.LoadListSuccess, payload: { rows } });
    });
  };
};

const Query = () => {
  return (dispatch, getState) => {
    const state = getState();
    const keyword = state.user.keyWord;
    UserService.getQuery(keyword).then((res) => {
      const rows = res.data;
      dispatch({ type: UserActionTypes.LoadListSuccess, payload: { rows } });
    });
  };
};

const SetQueryKeyWord = (keyWord) => {
  return (dispatch) => {
    dispatch({ type: UserActionTypes.QueryKeyWord, payload: { keyWord } });
    dispatch(UserActions.Query());
  };
};

const Load = (id) => {
  return (dispatch) => {
    UserService.getSingle(id).then((res) => {
      const row = res.data;
      dispatch({ type: UserActionTypes.LoadSuccess, payload: { row } });
    });
  };
};

const Init = () => {
  return (dispatch) => {
    const row = {
      id: 0,
      name: "",
      hight: null,
      dept: 0,
      projs: [],
      photo: "",
      birthday: "0000-01-01",
    };
    dispatch({ type: UserActionTypes.LoadSuccess, payload: { row } });
  };
};

const Create = (user) => {
  return (dispatch) => {
    UserService.post(user).then((row) => {
      // dispatch({ type: UserActionTypes.LoadListSuccess, payload: { row } });
      dispatch(UserActions.Query());
    });
  };
};

const Update = (user) => {
  return (dispatch) => {
    UserService.put(user).then((row) => {
      dispatch(UserActions.Query());
    });
  };
};

const Remove = (id) => {
  return (dispatch) => {
    UserService.delete(id).then(() => {
      dispatch(UserActions.Query());
    });
  };
};

const BackList = () => {
  return (dispatch) => {
    dispatch({ type: UserActionTypes.BackList, payload: {} });
  };
};

export const UserActions = {
  LoadAll,
  Load,
  SetQueryKeyWord,
  Query,
  Init,
  Create,
  Update,
  Remove,
  BackList,
};
