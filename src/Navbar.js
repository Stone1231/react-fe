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
import Home from "./App";

const data = [
  {
    name: "DEFAULT",
    routes: [
      {
        path: "/",
        exact: true,
        title: "Home 1",
        main: () => <Home />,
      },
      {
        path: "/a",
        exact: true,
        title: "Home 2",
        main: () => <Home />,
      },
      {
        path: "/b",
        exact: true,
        title: "Home 3",
        main: () => <Home />,
      },
    ],
  },
];

class BootstrapNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { backend: "" };

    let res = HomeService.get();
    this.setState({
      backend: res,
    });
    // (async () => {
    //   let res = await HomeService.get();
    //   this.setState({
    //     backend: res,
    //   });
    // })();
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
                    m.routes.map((route, index) => (
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
