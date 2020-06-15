import React from "react";
import { rootPath } from "./User";
import { Link, withRouter } from "react-router-dom";

class UserSingle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        user single
        <Link to={`/${rootPath}`}>list</Link>
      </>
    );
  }
}

export default withRouter(UserSingle);
