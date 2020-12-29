import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { rootPath } from "./User";
import UserService from "services/UserService";
import DeptService from "services/DeptService";
import ProjService from "services/ProjService";
import { IMG_URL } from "services/api";
import { UserActions as actions } from "stores/User/actions";
import { useSelector, useDispatch } from "stores/index";

import { store } from "stores/index";

function SelectList(props) {
  return (
    <select name={props.name} ref={props.ref}>
      <option value="">請選擇</option>
      {props.list &&
        props.list.map((item) => (
          <option value={item.value}>{item.name}</option>
        ))}
    </select>
  );
}

const depts = [
  { value: 1, name: "dept1" },
  { value: 2, name: "dept2" },
  { value: 3, name: "dept3" },
];

const UserSingle = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.id > 0) {
      dispatch(actions.Load(props.id));
      // actions.Load(props.id);
    } else {
      dispatch(actions.Init());
      //actions.Init();
    }
  }, []);
  const row = useSelector((state) => state.user.row);
  const { register, handleSubmit, reset } = useForm({ defaultValues: row });
  // const { register, handleSubmit, reset } = useForm();
  // const { register, handleSubmit, setValue } = useForm({ defaultValues: row });

  // const watchAll = watch();
  // useEffect(() => {
  //   console.log("watchAll", watchAll);

  //   // UNCOMMENT THIS TO CAUSE AN INFINITE LOOP
  //   // setFiltered(_filtered)
  // }, [watchAll]);
  useEffect(
    () =>
      store.subscribe(() => {
        alert(JSON.stringify(row));
        reset(row);
      }),
    [store.user]
  );

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <table>
        <tbody>
          <tr>
            <th>id {row.dept}</th>
            <td>{props.id > 0 && props.id}</td>
          </tr>
          <tr>
            <th>name</th>
            <td>
              <input name="name" type="text" ref={register} />
            </td>
          </tr>
          <tr>
            <th>hight</th>
            <td>
              <input name="hight" type="number" ref={register} />
            </td>
          </tr>
          <tr>
            <th>birthday</th>
            <td>
              <input name="birthday" type="date" ref={register} />
            </td>
          </tr>
          <tr>
            <th>dept</th>
            <td>
              <select name="dept" ref={register}>
                <option key="" value="">
                  請選擇
                </option>
                {depts.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <th>
              proj
              {/* todo <input type="checkbox" onChange={this.selectProjAll} /> */}
            </th>
            <td>
              {props.projs &&
                props.projs.map((item) => (
                  <span>
                    <label>
                      <input
                        type="checkbox"
                        value={item.value}
                        name="projs"
                        ref={register}
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
              {row.photo && (
                <img
                  alt="member head"
                  height="200"
                  src={`${IMG_URL}/img/${row.photo}`}
                />
              )}
              <input name="photoFile" type="file" ref={register} />
            </td>
          </tr>
        </tbody>
      </table>
      <button type="submit">save</button>
      <button onClick={() => props.onBack()}>back</button>
    </form>
  );
};

class UserSingleDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { depts: null, projs: null };
    this.onBack = this.onBack.bind(this);
  }

  async componentDidMount() {
    // (async () => {
    //   const deptsGet = DeptService.get();
    //   const projsGet = ProjService.get();
    //   const depts = await deptsGet;
    //   const projs = await projsGet;

    //   const deptItems = depts.data.map((m) => {
    //     let item = {
    //       value: m.id,
    //       name: m.name,
    //     };
    //     return item;
    //   });

    //   const projItems = projs.data.map((m) => {
    //     let item = {
    //       value: m.id,
    //       name: m.name,
    //       checked: false,
    //     };
    //     return item;
    //   });

    //   this.setState({
    //     depts: deptItems,
    //     projs: projItems,
    //   });
    // })();

    const deptsGet = DeptService.get();
    const projsGet = ProjService.get();
    const depts = await deptsGet;
    const projs = await projsGet;

    const deptItems = depts.data.map((m) => {
      let item = {
        value: m.id,
        name: m.name,
      };
      return item;
    });

    const projItems = projs.data.map((m) => {
      let item = {
        value: m.id,
        name: m.name,
        checked: false,
      };
      return item;
    });

    this.setState({
      depts: deptItems,
      projs: projItems,
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

export default UserSingleDisplay;
