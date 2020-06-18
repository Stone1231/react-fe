import React from "react";
import { Link, withRouter } from "react-router-dom";
import { rootPath } from "./User";
import UserService from "../services/UserService";
import { IMG_URL } from "../services/api";
import BaseComponent from "./Base";

class UserList extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = { list: [], keyWord: "" };
    this.getList = this.getList.bind(this);
    this.queryList = this.queryList.bind(this);
    // this.delete = this.delete.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    // this.getList();
  }

  componentDidMount() {
    this.getList();
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

  async delete(id) {
    let res = await UserService.delete(id);

    if (this.state.keyWord != "") {
      await this.queryList();
    } else {
      await this.getList();
    }
  }

  create() {
    this.props.history.push(`/${rootPath}/0`);
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
                  <Link to={`/${rootPath}/${item.id}`}>read</Link>
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

export default withRouter(UserList);
