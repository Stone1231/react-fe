import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserList from "./UserList";
import UserSingle from "./UserSingle";

export const rootPath = "user";

const Root = () => (
  <Router>
    <Switch>
      <Route path={"/" + rootPath} exact component={UserList} />
      <Route path={"/" + rootPath + "/:id"} exact component={UserSingle} />
    </Switch>
  </Router>
);

export default Root;
