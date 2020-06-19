import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import {
  Navbar,
  Nav,
  NavDropdown,
  NavItem,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import HomeService from "./services/HomeService";
import Home from "./components/Home";
import User from "./components/User";
import Files from "./components/Files";
import { Login, LoginAfter } from "./components/Auth";

const data = [
  {
    name: "DEFAULT",
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
        <div className="row">
          <div className="col-sm-2">
            <Navbar
              bg="dark"
              variant="dark"
              sticky="top"
              className="flex-column"
              expand="lg"
            >
              <Navbar.Brand href="#home">React Demo</Navbar.Brand>
              <span className="text-muted">
                backend is {this.state.backend}
              </span>
              <Navbar.Collapse id="basic-navbar-nav" aria-expanded="true">
                <Nav className="flex-column">
                  {data.map((m) =>
                    m.routes
                      .filter((m) => m.menu)
                      .map((route, index) => (
                        <Nav.Link href={route.path}>{route.title}</Nav.Link>
                      ))
                  )}
                </Nav>
              </Navbar.Collapse>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </Navbar>
          </div>
          <div className="col-sm-10 body-content">
            <div className="row-sm-1">
              <Switch>
                {data.map((m) =>
                  m.routes.map((route, index) => (
                    <Route exact path={route.path}>
                      {route.title}
                    </Route>
                  ))
                )}
              </Switch>
            </div>
            <div className="row-sm-10">
              <Switch>
                {data.map((m) =>
                  m.routes.map((route, index) => (
                    <Route exact path={route.path}>
                      {route.main()}
                    </Route>
                  ))
                )}
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default BootstrapNavbar;
