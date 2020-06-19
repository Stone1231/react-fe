import React from "react";
import { rootPath } from "./User";
import { withRouter } from "react-router-dom";
import UserService from "../services/UserService";
import DeptService from "../services/DeptService";
import ProjService from "../services/ProjService";
import BaseComponent from "./Base";
import { IMG_URL } from "../services/api";

function SelectList(props) {
  return (
    <select name={props.name} value={props.value} onChange={props.onChange}>
      <option value="">請選擇</option>
      {props.list &&
        props.list.map((item) => (
          <option value={item.value}>{item.name}</option>
        ))}
    </select>
  );
}

class UserSingle extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      row: {
        // id: null,
        name: null,
        hight: null,
        dept: 0,
        projs: null,
        photo: null,
        birthday: null,
      },
      photo: null,
      photoFile: null,
    };
    this.selectProjAll = this.selectProjAll.bind(this);
    this.changeProj = this.changeProj.bind(this);
    this.getFile = this.getFile.bind(this);
    this.read = this.read.bind(this);
  }
  componentDidMount() {
    // (async () => {
    //   await this.getDeptItems();
    //   await this.getProjItems();
    // })().then(() => {
    //   let id = this.props.match.params.id;
    //   if (id > 0) {
    //     this.read(id);
    //   }
    // });
    if (this.props.id > 0) {
      this.read(this.props.id);
    }
  }

  read(id) {
    UserService.getSingle(id).then((m) => {
      this.setState((state) => ({
        row: m.data,
        photo: m.data.photo,
        // projs: this.state.row.projs.map(
        //   (m) =>
        //     (m.checked =
        //       this.row.projs && -1 !== this.row.projs.indexOf(m.value))
        // ),
      }));
    });
    // this.service.getSingle(id.toString()).subscribe((d) => {
    //   this.row = d;
    //   this.photo = d.photo;
    //   this.projs.map(
    //     (m) =>
    //       (m.checked = this.row.projs && -1 !== this.row.projs.indexOf(m.value))
    //   );
    // });
  }

  selectProjAll(e) {
    let checked = e.target.checked;
    let projs = [];
    if (checked) {
      projs = this.props.projs.map((m) => m.value);
    }
    let row = this.state.row;
    row.projs = projs;
    this.setState((state) => ({
      row: row,
    }));
  }

  changeProj(e) {
    let projs = [];
    if (this.state.row.projs) {
      projs = [...this.state.row.projs];
    }

    let v = parseInt(e.target.value);
    let index = projs.indexOf(v);
    if (e.target.checked) {
      if (index < 0) {
        projs.push(v);
      }
    } else {
      if (index > -1) {
        projs.splice(index, 1);
      }
    }

    let row = this.state.row;
    row.projs = projs;
    this.setState((state) => ({
      row: row,
    }));
  }

  async save() {
    let row = this.state.row;
    // row.projs = this.props.projs.filter((m) => m.checked).map((m) => m.value);
    row.id = parseInt(this.props.id);
    // row.dept = parseInt(row.dept);
    // this.setState((state) => ({
    //   row: {
    //     projs: this.state.projs.filter((m) => m.checked).map((m) => m.value),
    //     id: this.props.id,
    //   },
    // }));

    if (this.state.photoFile) {
      await UserService.upload(this.state.photoFile).then((m) => {
        row.photo = m.data;
        // this.setState((state) => ({
        //   row: {
        //     photo: res.data,
        //   },
        // }));
      });
    }

    if (row.id > 0) {
      await UserService.put(row);
    } else {
      await UserService.post(row);
    }
    this.props.onBack();
  }

  getFile(e) {
    //let files:FileList = e.target.value;
    let files = e.target.files;
    this.setState((state) => ({
      photoFile: files[0],
    }));
  }

  render() {
    return (
      <>
        <table>
          <tbody>
            <tr>
              <th>id</th>
              <td>{this.props.id > 0 && this.props.id}</td>
            </tr>
            <tr>
              <th>name</th>
              <td>
                <input
                  name="row.name"
                  type="text"
                  value={this.state.row.name}
                  onChange={this.handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <th>hight</th>
              <td>
                <input
                  name="row.hight"
                  type="number"
                  value={this.state.row.hight}
                  onChange={this.handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <th>birthday</th>
              <td>
                <input
                  name="row.birthday"
                  type="date"
                  value={this.state.row.birthday}
                  onChange={this.handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <th>dept</th>
              <td>
                <SelectList
                  name="row.dept"
                  list={this.props.depts}
                  value={this.state.row.dept}
                  onChange={this.handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <th>
                proj
                <input type="checkbox" onChange={this.selectProjAll} />
              </th>
              <td>
                {this.props.projs &&
                  this.props.projs.map((item) => (
                    <span>
                      <label>
                        <input
                          type="checkbox"
                          onChange={this.changeProj}
                          checked={
                            this.state.row.projs &&
                            -1 !== this.state.row.projs.indexOf(item.value)
                          }
                          value={item.value}
                        />
                        {item.name}
                      </label>
                    </span>
                  ))}
              </td>
            </tr>
            <tr>
              <th>photo</th>
              <td>
                {this.state.photo && (
                  <img
                    height="200"
                    src={`${IMG_URL}/img/${this.state.photo}`}
                  />
                )}
                <input type="file" onChange={this.getFile} />
              </td>
            </tr>
          </tbody>
        </table>
        <button onClick={() => this.save()}>save</button>
        <button onClick={() => this.props.onBack()}>back</button>
      </>
    );
  }
}

class UserSingleDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { depts: null, projs: null };
    this.onBack = this.onBack.bind(this);
  }

  async componentDidMount() {
    await DeptService.get().then((m) => {
      this.setState({
        depts: m.data.map((m) => {
          let item = {
            value: m.id,
            name: m.name,
          };
          return item;
        }),
      });
    });
    await ProjService.get().then((m) => {
      this.setState({
        projs: m.data.map((m) => {
          let item = {
            value: m.id,
            name: m.name,
            checked: false,
          };
          return item;
        }),
      });
    });
  }

  onBack() {
    this.props.history.push("/" + rootPath);
    // this.props.history.goBack();
    //return <Redirect to={"/" + rootPath} />;
    // return <Redirect to="/user" />;
  }

  render() {
    const id = this.props.match.params.id;
    return (
      <UserSingle
        id={id}
        depts={this.state.depts}
        projs={this.state.projs}
        onBack={this.onBack}
      />
    );
  }
}

export default withRouter(UserSingleDisplay);
