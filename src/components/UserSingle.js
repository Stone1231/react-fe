import React from "react";
import { rootPath } from "./User";
import { Link, withRouter, useParams } from "react-router-dom";
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
      row: { name: null },
      depts: null,
      projs: null,
      photo: null,
      photoFile: null,
    };
    this.selectProjAll = this.selectProjAll.bind(this);
    this.getFile = this.getFile.bind(this);
    this.getDeptItems = this.getDeptItems.bind(this);
    this.read = this.read.bind(this);
  }
  componentDidMount() {
    (async () => {
      await this.getDeptItems();
      await this.getProjItems();
    })().then(() => {
      let { id } = useParams();
      if (id > 0) {
        this.read(id);
      }
    });
  }

  async getDeptItems() {
    await DeptService.get().then((m) => {
      this.setState((state) => ({
        depts: m.data.map((m) => {
          let item = {
            value: m.id,
            name: m.name,
          };
          return item;
        }),
      }));
    });
  }

  async getProjItems() {
    await ProjService.get().then((m) => {
      this.setState((state) => ({
        projs: m.data.map((m) => {
          let item = {
            value: m.id,
            name: m.name,
            checked: false,
          };
          return item;
        }),
      }));
    });
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
      projs = this.state.projs.map((m) => m.value);
    }
    this.setState((state) => ({
      row: {
        projs: projs,
      },
    }));
  }

  // save() {
  //   //console.log(this.row);
  //   this.row.projs = this.projs.filter((m) => m.checked).map((m) => m.value);
  //
  //   if (this.row.id > 0) {
  //     var updateOb = this.service.put(this.row.id.toString(), this.row);
  //
  //     if (this.photoFile) {
  //       var fileOb = this.service.postFile(this.photoFile);
  //
  //       fileOb.subscribe((res) => {
  //         this.row.photo = res;
  //         updateOb.subscribe((res) => {
  //           this.onSave.emit();
  //         });
  //       });
  //     } else {
  //       updateOb.subscribe((res) => {
  //         this.onSave.emit();
  //       });
  //     }
  //   } else {
  //     var postOb = this.service.post(this.row);
  //
  //     if (this.photoFile) {
  //       var fileOb = this.service.postFile(this.photoFile);
  //
  //       fileOb.subscribe((res) => {
  //         this.row.photo = res;
  //         postOb.subscribe((res) => {
  //           this.onSave.emit();
  //         });
  //       });
  //     } else {
  //       postOb.subscribe((res) => {
  //         this.onSave.emit();
  //       });
  //     }
  //   }
  // }

  getFile(e) {
    //let files:FileList = e.target.value;
    this.setState((state) => ({
      photoFile: e.target.files[0],
    }));
  }

  render() {
    return (
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
                list={this.state.depts}
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
              {this.state.row.projs &&
                this.state.projs.map((item) => (
                  <span>
                    <label>
                      <input
                        type="checkbox"
                        checked={
                          this.state.row.projs &&
                          -1 !== this.state.row.projs.indexOf(item.value)
                        }
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
                <img height="200" src={`${IMG_URL}/img/${this.state.photo}`} />
              )}
              <input type="file" onChange={this.getFile} />
            </td>
          </tr>
        </tbody>
      </table>
      // <>
      //   user single
      //   <Link to={`/${rootPath}`}>list</Link>
      // </>
    );
  }
}

export default withRouter(UserSingle);
