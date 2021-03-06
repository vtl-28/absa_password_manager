import React, { useState } from "react";
import axios from "axios";
import copy from "copy-to-clipboard";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

function ApplicationPasswordCard({ pass, handleDelete }) {
  const { _id, application_name, username, password } = pass;

  const copyUsernameToClipboard = () => {
    copy(username);
    alert(`Copied!`);
  };
  const copyPasswordToClipboard = () => {
    axios
      .get(`http://localhost:3000/decrypt_password/${password}`)
      .then((response) => {
        copy(response.data);
      });
    alert(`Copied!`);
  };

  return (
    <li key={_id}>
      <a className="grid grid-cols-12 rounded-md hover:bg-gray-100" href="#">
        <div className="col-span-4 col-start-2">
          <h3 className="text-red-600">{username}</h3>
          <small>{application_name}</small>
        </div>
        <div className="flex justify-between w-9/12 col-span-10 col-start-6">
          <button onClick={copyUsernameToClipboard} className="text-sm">
            Copy username
          </button>
          <button onClick={copyPasswordToClipboard} className="text-sm">
            Copy password
          </button>
          <button
            name={_id}
            onClick={handleDelete}
            className="text-sm text-red-600"
          >
            Delete
          </button>
        </div>
      </a>
    </li>
  );
}

export default function Sap() {
  const [applicationPassword, setApplicationPassword] = useState({
    department: "Sap",
    application_name: "",
    username: "",
    application_password: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [app, setApp] = useState([]);
  const [open, setOpen] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [openAddItem, setOpenAddItem] = useState(true);
  const [id, setId] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  function handleOpenModal(e) {
    setId(e.target.name);
    setOpen(true);
  }
  function handleCloseModal() {
    setId("");
    setOpen(false);
  }
  function handleChange(e) {
    setApplicationPassword((applicationPassword) => ({
      ...applicationPassword,
      [e.target.name]: e.target.value,
    }));
  }
  function handleDelete(e) {
    if (confirm("Are you sure you want to delete this record?") == true) {
      axios.delete(`http://localhost:3000/delete_password/${e.target.name}`);
      setApp(app.filter((app) => app._id !== e.target.name));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3000/create_password", applicationPassword)
      .then((response) => {
        setApp([...app, response.data]);
        setOpenList((openList) => !openList);
        setOpenAddItem((openAddItem) => !openAddItem);
        setSuccessMessage("Application password successfully created");
        setShowSuccess((showSuccess) => !showSuccess);
      })
      .catch((error) => {
      });
  }

  let successAlert = (
    <Alert className="px-3 py-1 bg-green-100 border-2 border-green-500 border-opacity-25 rounded-md">
      <div className="flex flex-row justify-between">
        <p className="text-sm text-green-500">{successMessage}</p>
        <Button
          className="text-green-500"
          onClick={() => setShowSuccess(false)}
        >
          x
        </Button>
      </div>
    </Alert>
  );

  const displayApplication = (
    <ul>
      {app.map((pass) => (
        <ApplicationPasswordCard pass={pass} handleDelete={handleDelete} />
      ))}
    </ul>
  );
  const addApplication = (
    <div>
      <h3 className="mb-2">There are no items to list</h3>
      <button onClick={handleOpenModal} className="btn-add-item" type="button">
        <i className="fa-solid fa-plus"></i>Add item
      </button>
    </div>
  );

  return (
    <div className="flex flex-col mt-2">
      {openAddItem ? addApplication : ""}
      {openList ? displayApplication : ""}
      {open ? (
        <div>
          <form
            onSubmit={handleSubmit}
            className="px-3 pt-4 pb-4 lg:px-8 sm:pb-6 xl:pb-8"
          >
            {successMessage && showSuccess ? successAlert : ""}
            <select
              disabled
              value={applicationPassword.department}
              className="w-full mb-2"
              name="department"
              onChange={handleChange}
            >
              <option value="D_Absa">D_Absa</option>
              <option value="Sessions">Sessions</option>
              <option value="Sap">Sap</option>
              <option value="Client">Client</option>
            </select>
            <label className="label-style">Application Name</label>
            <input
              onChange={handleChange}
              value={applicationPassword.application_name}
              className="input-style"
              name="appication_name"
            />
            <label className="label-style">Username</label>
            <input
              onChange={handleChange}
              value={applicationPassword.username}
              className="input-style"
              name="username"
            />
            <label className="label-style">Password</label>
            <input
              onChange={handleChange}
              value={applicationPassword.application_password}
              className="input-style"
              name="application_password"
              type="password"
            />
            <div className="flex flex-row justify-between mt-4">
              <button className="btn-submit w-28" type="submit">
                Save
              </button>
              <button onClick={handleCloseModal} className="btn-cancel w-28">
                {successMessage ? "Back" : "Cancel"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
