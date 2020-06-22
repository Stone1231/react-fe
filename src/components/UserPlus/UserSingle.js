import React from "react";
import { rootPath } from "./User";
import UserService from "../../services/UserService";
import DeptService from "../../services/DeptService";
import ProjService from "../../services/ProjService";
import BaseComponent from "../Base";
import { IMG_URL } from "../../services/api";

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

class UserRow {
  get name() {
    if (this._name !== undefined) {
      return this._name;
    } else {
      return "";
    }
  }
  set name(value) {
    this._name = value;
  }

  get hight() {
    if (this._hight !== undefined) {
      return this._hight;
    } else {
      return "";
    }
  }
  set hight(value) {
    this._hight = value;
  }

  get dept() {
    if (this._dept !== undefined) {
      return this._dept;
    } else {
      return 0;
    }
  }
  set dept(value) {
    this._dept = value;
  }

  get projs() {
    if (this._projs !== undefined) {
      return this._projs;
    } else {
      return [];
    }
  }
  set projs(value) {
    this._projs = value;
  }

  get photo() {
    if (this._photo !== undefined) {
      return this._photo;
    } else {
      return "";
    }
  }
  set photo(value) {
    this._photo = value;
  }

  get birthday() {
    if (this._birthday !== undefined) {
      return this._birthday;
    } else {
      return "";
    }
  }
  set birthday(value) {
    this._birthday = value;
  }

  toJSON() {
    return {
      name: this.name,
      hight: this.hight,
      dept: this.dept,
      projs: this.projs,
      photo: this.photo,
      birthday: this.birthday,
    };
  }
}

class UserSingle extends BaseComponent {
  constructor(props) {
    super(props);
    let user = new UserRow();
    this.state = {
      row: user,
      // row: {
      //   // id: null,
      //   name: null,
      //   hight: null,
      //   dept: 0,
      //   projs: [],
      //   photo: null,
      //   birthday: null,
      // },
      photoFile: null,
    };
    this.selectProjAll = this.selectProjAll.bind(this);
    this.changeProj = this.changeProj.bind(this);
    this.getFile = this.getFile.bind(this);
    this.read = this.read.bind(this);
    this.default = this.default.bind(this);
  }
  componentDidMount() {
    if (this.props.id > 0) {
      this.read(this.props.id);
    }
  }
  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   return true;
  // }
  componentDidUpdate(prevProps) {
    const willUpdate = this.props.id !== prevProps.id;
    if (!willUpdate) {
      return;
    }
    if (this.props.id > 0) {
      this.read(this.props.id);
    } else if (this.props.id == 0) {
      this.default();
    }
  }

  default() {
    let user = new UserRow();
    this.setState((state) => ({
      row: user,
      // row: {
      //   // id: null,
      //   name: "",
      //   hight: "",
      //   dept: 0,
      //   projs: [],
      //   photo: "",
      //   birthday: "",
      // },
    }));
  }

  read(id) {
    UserService.getSingle(id).then((m) => {
      this.setState((state) => ({
        row: m.data,
      }));
    });
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
    // row.id = parseInt(this.props.id);
    row.id = this.props.id;

    if (this.state.photoFile) {
      await UserService.upload(this.state.photoFile).then((m) => {
        row.photo = m.data;
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
                {this.state.row.photo && (
                  <img
                    height="200"
                    src={`${IMG_URL}/img/${this.state.row.photo}`}
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

export default UserSingle;
