import React from "react";
import UserList from "./UserList";
import UserSingle from "./UserSingle";
import BaseComponent from "../Base";

export const rootPath = "user";

class User extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = { id: -1 };
    this.showList = this.showList.bind(this);
    this.loadSingle = this.loadSingle.bind(this);
    this.list = <UserList loadSingle={this.loadSingle} />;
  }
  showList() {
    this.setState({
      id: -1,
    });
  }
  loadSingle(id) {
    this.setState({
      id: id,
    });
  }

  render() {
    // let list = <UserList loadSingle={this.loadSingle} />;
    let single = <UserSingle id={this.state.id} showList={this.showList} />;
    if (this.state.id < 0) {
      return this.list;
    } else {
      return single;
    }
  }
}

export default User;
