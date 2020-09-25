import React, { useState } from "react";
import FileService from "services/FileService";

export default function Files() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [files, setFiles] = useState(null);
  const [fileNames, setFileNames] = useState([]);

  function changeFile1(e) {
    let files = e.target.files;
    setFile1(files[0]);
  }
  function changeFile2(e) {
    let files = e.target.files;
    setFile2(files[0]);
  }
  function changeFiles(e) {
    setFiles(e.target.files);
  }

  async function saveFile1() {
    if (file1) {
      await FileService.uploadFile(file1).then((m) => {
        setFileNames([m.data]);
      });
    }
  }

  async function saveFile2() {
    await FileService.uploadFile2(file1, file2).then((m) => {
      setFileNames(m.data);
    });
  }

  async function saveFiles() {
    await FileService.uploadFiles(files).then((m) => {
      setFileNames(m.data);
    });
  }

  return (
    <table>
      <tr>
        <td>file1</td>
        <td>
          <input type="file" onChange={changeFile1} />
          <button onClick={saveFile1}>save file1</button>
        </td>
      </tr>
      <tr>
        <td>file2</td>
        <td>
          <input type="file" onChange={changeFile2} />
          <button onClick={saveFile2}>save file1 & file2</button>
        </td>
      </tr>
      <tr>
        <td>files</td>
        <td>
          <input type="file" multiple onChange={changeFiles} />
          <button onClick={saveFiles}>save files</button>
        </td>
      </tr>
      <tr>
        <td style={{ verticalAlign: "top" }}>result　</td>
        <td>
          <ul>
            {fileNames.map((fileName) => (
              <li>{fileName}</li>
            ))}
          </ul>
        </td>
      </tr>
    </table>
  );
}
