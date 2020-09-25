import React from "react";
import { Link } from "react-router-dom";
import { rootPath } from "./User";
import UserService from "services/UserService";
import { IMG_URL } from "services/api";
import BaseComponent from "components/Base";

class UserList extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = { list: [], keyWord: "" };
    this.getList = this.getList.bind(this);
    this.queryList = this.queryList.bind(this);
    // this.delete = this.delete.bind(this);
    // this.handleInputChange = this.handleInputChange.bind(this);
    // this.getList();
    this.reloadList = this.reloadList.bind(this);
  }

  componentDidMount() {
    (async () => {
      await this.getList();
    })();
  }

  componentDidUpdate(prevProps) {
    const willUpdate = this.props.id !== prevProps.id && this.props.id == -1;
    if (!willUpdate) {
      return;
    }
    (async () => {
      await this.reloadList();
    })();
  }

  async getList() {
    let res = await UserService.get();
    this.setState((state) => ({
      list: res.data,
    }));
  }

  async queryList() {
    let res = await UserService.getQuery(this.state.keyWord);
    this.setState((state) => ({
      list: res.data,
    }));
  }

  async reloadList() {
    if (this.state.keyWord != "") {
      await this.queryList();
    } else {
      await this.getList();
    }
  }

  async delete(id) {
    let res = await UserService.delete(id);
    await this.reloadList();
  }

  create() {
    this.props.loadSingle(0);
  }

  loadSingle(id) {
    this.props.loadSingle(id);
  }

  render() {
    return (
      <>
        <input
          name="keyWord"
          type="text"
          value={this.state.keyWord}
          onChange={this.handleInputChange}
        />
        <button onClick={this.queryList}>query</button>
        <br />
        <button onClick={() => this.create()}>create</button>
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
            {this.state.list.map((item) => (
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.hight}</td>
                <td>{item.birthday}</td>
                <td>
                  {item.photo && (
                    <img height="50" src={`${IMG_URL}/img/${item.photo}`} />
                  )}
                </td>
                <td>
                  <Link onClick={() => this.loadSingle(item.id)}>read</Link>
                </td>
                <td>
                  <button onClick={() => this.delete(item.id)}>del</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default UserList;
