import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomeService from "./services/HomeService";
import Home from "./components/Home";
import User from "./components/User/User";
import UserPlus from "./components/UserPlus/User";
import UserRedux from "./components/UserRedux/User";
import Files from "./components/Files";
import { Login, LoginAfter } from "./components/Auth";
import Error from "./components/Error";
import Todos from "./components/Todos/App";

function SidebarTitle(props) {
  let style = { color: "blue" };
  if (props.style != null) {
    style = props.style;
  }
  return <div style={style}>{props.children}</div>;
}

const data = [
  {
    name: "React Demo",
    routes: [
      {
        path: "/",
        exact: true,
        title: "Home",
        description: "Backend",
        menu: true,
        main: () => <Home />,
      },
      {
        path: "/user",
        exact: true,
        title: "User",
        description: "User CRUD",
        menu: true,
        main: () => <User />,
      },
      {
        path: "/user_plus",
        exact: true,
        title: "User Plus",
        description: "User CRUD Plus",
        menu: true,
        main: () => <UserPlus />,
      },
      {
        path: "/user_redux",
        exact: true,
        title: "User Redux",
        description: "User CRUD Redux",
        menu: true,
        main: () => <UserRedux />,
      },
      {
        path: "/files",
        exact: true,
        title: "Files",
        description: "Files Upload",
        menu: true,
        main: () => <Files />,
      },
      {
        path: "/login",
        exact: true,
        title: "verify",
        description: "Login",
        menu: false,
        main: () => <Login />,
      },
      {
        path: "/login-after",
        exact: true,
        title: "verify",
        description: "get session values",
        menu: true,
        main: () => <LoginAfter />,
      },
      {
        path: "/error",
        exact: true,
        title: "error",
        description: "error handler",
        menu: true,
        main: () => <Error />,
      },
      {
        path: "/todos",
        exact: true,
        title: "Todos",
        description: "Todos redux",
        menu: true,
        main: () => <Todos />,
      },
    ],
  },
];

class BootstrapNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { backend: "" };
    (async () => {
      let res = await HomeService.get();
      this.setState({
        backend: res.data,
      });
    })();
  }

  render() {
    return (
      <Router>
        <div style={{ display: "flex" }}>
          <div
            style={{
              padding: "10px",
              width: "16%",
              background: "#f0f0f0",
            }}
          >
            {data.map((m) => (
              <ul style={{ listStyleType: "none", padding: 0 }}>
                <li>
                  <b>{m.name}</b>
                </li>
                {m.routes
                  .filter((m) => m.menu)
                  .map((route, index) => (
                    <li>
                      <Link to={route.path} style={route.style}>
                        {route.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            ))}
          </div>
          <div style={{ flex: 1, padding: "10px" }}>
            <Switch>
              {data.map((m) =>
                m.routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    children={
                      <SidebarTitle style={route.style}>
                        {route.description}
                      </SidebarTitle>
                    }
                  />
                ))
              )}
            </Switch>
            <Switch>
              {data.map((m) =>
                m.routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.main}
                  />
                ))
              )}
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default BootstrapNavbar;
