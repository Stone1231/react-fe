import React from "react";
import UserList from "./UserList";
import UserSingle from "./UserSingle";
import BaseComponent from "components/Base";
import DeptService from "services/DeptService";
import ProjService from "services/ProjService";

export const rootPath = "user";

class User extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = { id: -1, depts: null, projs: null };
    this.showList = this.showList.bind(this);
    this.loadSingle = this.loadSingle.bind(this);
    // this.list = <UserList loadSingle={this.loadSingle} />;
    this.displayList = this.displayList.bind(this);
    this.displaySingle = this.displaySingle.bind(this);

    (async () => {
      let depts = await DeptService.get();
      this.setState({
        depts: depts.data.map((m) => {
          let item = {
            value: m.id,
            name: m.name,
          };
          return item;
        }),
      });

      let projs = await ProjService.get();
      this.setState({
        projs: projs.data.map((m) => {
          let item = {
            value: m.id,
            name: m.name,
            checked: false,
          };
          return item;
        }),
      });
    })();
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
  displayList() {
    let display = "none";
    if (this.state.id < 0) {
      display = "block";
    }
    return display;
  }
  displaySingle() {
    let display = "block";
    if (this.state.id < 0) {
      display = "none";
    }
    return display;
  }

  render() {
    return (
      <>
        <div style={{ display: this.displayList() }}>
          <UserList id={this.state.id} loadSingle={this.loadSingle} />
        </div>
        <div style={{ display: this.displaySingle() }}>
          <UserSingle
            id={this.state.id}
            depts={this.state.depts}
            projs={this.state.projs}
            onBack={this.showList}
          />
        </div>
      </>
    );
    // let list = <UserList loadSingle={this.loadSingle} />;
    // let single = (
    //   <UserSingle
    //     style={{ display: this.displayList }}
    //     id={this.state.id}
    //     showList={this.showList}
    //   />
    // );
    // if (this.state.id < 0) {
    //   return this.list;
    // } else {
    //   return single;
    // }
  }
}

export default User;
