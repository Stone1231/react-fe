import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import UserList from "./UserList";
import UserSingle from "./UserSingle";

export const rootPath = "user";

const Root = () => (
  <div>
    <Router>
      <Route path={"/" + rootPath} exact component={UserList} />
      <Route path={"/" + rootPath + "/:id"} exact component={UserSingle} />
    </Router>
  </div>
);

export default Root;
