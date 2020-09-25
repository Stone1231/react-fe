import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AuthService from "services/AuthService";

export function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  function changeUserName(e) {
    setUserName(e.target.value);
  }
  function changePassword(e) {
    setPassword(e.target.value);
  }
  async function login() {
    await AuthService.login({
      username: userName,
      pwd: password,
    }).then(() => {
      history.push("/login-after");
    });
  }

  return (
    <table>
      <tr>
        <td>user name:</td>
        <td>
          <input type="text" onChange={changeUserName} placeholder="user" />
        </td>
      </tr>
      <tr>
        <td>password:</td>
        <td>
          <input type="text" onChange={changePassword} placeholder="pwd" />
        </td>
      </tr>
      <tr>
        <td></td>
        <td>
          <input type="button" onClick={login} value="Login" />
        </td>
      </tr>
    </table>
  );
}

export function LoginAfter() {
  const [NameServer, setNameServer] = useState("");
  const [RoleServer, setRoleServer] = useState("");
  const [NameClient, setNameClient] = useState("");
  const [RoleClient, setRoleClient] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (!AuthService.checkLogin()) {
      history.push("/login");
      return;
    }

    (async () => {
      let auth = await AuthService.getJWTFromServer();
      setNameServer(auth.data.username);
      setRoleServer(auth.data.role);
    })();

    let local = AuthService.getJWTFromClient();
    setNameClient(local.username);
    setRoleClient(local.role);
  });

  return (
    <table>
      <tr>
        <td>Name Server:</td>
        <td>{NameServer} </td>
      </tr>
      <tr>
        <td>Role Server:</td>
        <td>{RoleServer}</td>
      </tr>
      <tr>
        <td>Name Client:</td>
        <td>{NameClient} </td>
      </tr>
      <tr>
        <td>Role Client:</td>
        <td>{RoleClient}</td>
      </tr>
    </table>
  );
}
