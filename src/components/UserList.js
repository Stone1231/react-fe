import React from "react";
import { Link, withRouter } from "react-router-dom";
import { rootPath } from "./User";

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const id = 1;
    return (
      <div>
        user list
        <Link to={`/${rootPath}/${id}`}>read single</Link>
      </div>
    );
  }
}

export default withRouter(UserList);
