import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

function UserAccout() {
  let { id } = useParams();
  const [user, setUser] = useState({});
  const [data, setData] = useState({
    email: "",
    name: "",
    master_password_hint: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/account/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
      });
  }, []);

  let errorAlert = (
    <Alert className="px-3 py-1 bg-red-100 border-2 border-red-500 border-opacity-25 rounded-md">
      <div className="flex flex-row justify-between">
        <p className="text-sm text-red-500">{errorMessage}</p>
        <Button className="text-red-500" onClick={() => setShowError(false)}>
          x
        </Button>
      </div>
    </Alert>
  );
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

  function handleChange(e) {
    e.preventDefault();

    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .put(`http://localhost:3000/account/${id}`, data)
      .then((response) => {
        setSuccessMessage(response.data);
        setShowSuccess((showSuccess) => !showSuccess);
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
        setShowError((showError) => !showError);
      });
  }

  return (
    <div
      className="w-screen h-screen py-8 "
      style={{ backgroundColor: "#F0325A" }}
    >
      <div className="container w-9/12 h-full mx-auto">
        <div className="grid h-full grid-cols-12 grid-rows-4">
          <div className="flex items-start justify-center h-8 col-span-6 col-start-4 mt-6 sm:col-start-5 sm:col-span-4">
            <h3 className="text-xl md:text-2xl">My account</h3>
          </div>
          <div className="h-full col-span-10 col-start-2 -mt-14 sm:col-start-3 sm:col-span-8 md:col-start-4 md:col-span-6 xl:col-start-5 xl:col-span-4">
            <div className="p-4 bg-white border rounded-md border-gray">
              {errorMessage && showError ? errorAlert : ""}
              {successMessage && showSuccess ? successAlert : ""}
              <form
                className="flex flex-col py-4"
                onSubmit={handleSubmit}
                method="POST"
              >
                <label className="label-style">Email address</label>
                <input
                  placeholder={user.email}
                  className="input-style"
                  name="email"
                  onChange={handleChange}
                  value={data.email}
                />

                <label class="label-style">Your name</label>
                <input
                  placeholder={user.name}
                  class=" mt-1 text-lg input-style"
                  name="name"
                  onChange={handleChange}
                  value={data.name}
                />

                <label className="label-style">Master password hint</label>
                <input
                  placeholder={user.master_password_hint}
                  className="mt-1 text-lg input-style"
                  name="master_password_hint"
                  onChange={handleChange}
                  value={data.master_password_hint}
                />

                <hr className="mt-6" />
                <div className="flex flex-row justify-between mt-4">
                  <button
                    type="submit"
                    className="w-32 btn-submit sm:w-36 lg:w-48 xl:w-40"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => navigate("/vault", { state: user })}
                    className="w-32 btn-cancel sm:w-36 lg:w-48 xl:w-40"
                  >
                    {successMessage ? "Back" : "Cancel"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserAccout;
