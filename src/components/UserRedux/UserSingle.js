import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { rootPath } from "./User";
import UserService from "services/UserService";
import DeptService from "services/DeptService";
import ProjService from "services/ProjService";
import { IMG_URL } from "services/api";
import { UserActions as actions } from "stores/User/actions";
import { useSelector, useDispatch } from "stores/index";

const UserSingle = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [photoFile, setPhotoFile] = useState(null);
  useEffect(() => {
    if (id > 0) {
      dispatch(actions.Load(id));
    } else {
      dispatch(actions.Init());
    }
  }, [id]);
  const row = useSelector((state) => state.user.row);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: row,
  });
  const history = useHistory();
  useEffect(() => {
    // 轉成checkbox list對應的bool陣列
    if (row.projs && props.projs) {
      row.projs = props.projs.map(
        (m) => row.projs && -1 !== row.projs.indexOf(m.value)
      );
    }
    reset(row);
    console.log("row", row);
  }, [row]);
  const getFile = (e) => {
    let files = e.target.files;
    setPhotoFile(files[0]);
  };
  const onSubmit = async (data) => {
    if (photoFile) {
      await UserService.upload(photoFile).then((m) => {
        data.photo = m.data;
      });
    }
    data.projs = data.projs.filter((m) => m !== false).map((m) => +m); //解釋如下
    //data.projs = data.projs.filter((m) => m !== false) // 過濾掉false的值, 只取需要的值
    //data.projs = data.projs.map((m) => +m); // 這樣才轉成數值陣列
    if (id > 0) {
      dispatch(actions.Update(data));
    } else {
      dispatch(actions.Create(data));
    }

    history.push("/" + rootPath);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <table>
        <tbody>
          <tr>
            <th>id</th>
            <td>
              {id > 0 && id}
              <input
                name="id"
                type="hidden"
                ref={register({
                  valueAsNumber: true,
                })}
              />
            </td>
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
              <input
                name="hight"
                type="number"
                ref={register({ valueAsNumber: true, min: 100, max: 200 })}
              />
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
              <select
                name="dept"
                ref={register({
                  valueAsNumber: true,
                })}
              >
                <option key="" value="">
                  請選擇
                </option>
                {props.depts &&
                  props.depts.map((item) => (
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
                props.projs.map((item, i) => (
                  <span>
                    <label key={item.value}>
                      <input
                        key={item.value}
                        type="checkbox"
                        value={item.value}
                        name={"projs." + i}
                        ref={register({ valueAsNumber: true })}
                      />
                      {item.name}
                      {row.projs && -1 !== row.projs.indexOf(item.value)}
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
              <input name="photoFile" type="file" onChange={getFile} />
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
    this.state = { depts: null, projs: null, id: null };
    this.onBack = this.onBack.bind(this);
  }

  async componentDidMount() {
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
      id: this.props.match.params.id,
    });
  }

  onBack() {
    this.props.history.push("/" + rootPath);
    // this.props.history.goBack();
    //return <Redirect to={"/" + rootPath} />;
    // return <Redirect to="/user" />;
  }

  render() {
    return (
      <>
        <UserSingle
          depts={this.state.depts}
          projs={this.state.projs}
          onBack={this.onBack}
        />
      </>
    );
  }
}

export default UserSingleDisplay;
