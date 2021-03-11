import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { rootPath } from "./User";
import { IMG_URL } from "services/api";
import { UserActions as actions } from "stores/User/actions";
import { useSelector, useDispatch } from "stores/index";
import UserService from "../../services/UserService";

const UserList = (props) => {
  const defKeyword = useSelector((state) => state.user.keyWord);
  const [keyword, setKeyword] = useState(defKeyword);
  const dispatch = useDispatch();
  const list = useSelector((state) => state.user.rows);

  //進入畫面後, 第一次取得API資料
  useEffect(() => {
    dispatch(actions.SetQueryKeyWord(keyword));
  }, []);

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    setKeyword(value);
  };

  // useEffect(() => {
  //   dispatch(actions.SetQueryKeyWord(keyword));
  // }, [keyword]);

  // constructor(props) {
  //   super(props);
  //   this.state = { list: [], keyWord: "" };
  //   this.getList = this.getList.bind(this);
  //   this.queryList = this.queryList.bind(this);
  //   // this.delete = this.delete.bind(this);
  //   // this.handleInputChange = this.handleInputChange.bind(this);
  //   // this.getList();
  // }

  // async getList() {
  //   let res = await UserService.get();
  //   this.setState((state) => ({
  //     list: res.data,
  //   }));
  // }

  const queryList = () => {
    dispatch(actions.SetQueryKeyWord(keyword));
    // let res = await UserService.getQuery(this.state.keyWord);
    // this.setState((state) => ({
    //   list: res.data,
    // }));
  };

  const remove = (id) => {
    dispatch(actions.Remove(id));
  };

  // async delete(id) {
  //   let res = await UserService.delete(id);

  //   if (this.state.keyWord != "") {
  //     await this.queryList();
  //   } else {
  //     await this.getList();
  //   }
  // }

  const create = () => {
    props.history.push(`/${rootPath}/0`);
  };

  return (
    <>
      <input
        name="keyword"
        type="text"
        value={keyword}
        onChange={handleInputChange}
      />
      <button onClick={queryList}>query</button>
      <br />
      <button onClick={() => create()}>create</button>
      <table className="table">
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>hight</th>
            <th>birthday</th>
            <th>photo</th>
            <th>edit</th>
            <th>del</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.hight}</td>
              <td>{item.birthday}</td>
              <td>
                {item.photo && (
                  <img
                    alt="member's pic"
                    height="50"
                    src={`${IMG_URL}/img/${item.photo}`}
                  />
                )}
              </td>
              <td>
                <Link to={`/${rootPath}/${item.id}`}>read</Link>
              </td>
              <td>
                <button onClick={() => remove(item.id)}>del</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserList;
