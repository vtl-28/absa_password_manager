import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import FlashMessage from 'react-flash-message';
import { toast } from 'react-toastify';


//import RegisterForm from './RegisterForm';

const RegisterForm = () => {
    const [ data, setData] = useState({ email: "",
    name: "",
    master_password: "",
    confirm_master_password: "",
    master_password_hint: ""});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState([]);
    const navigate = useNavigate();

    const success_toast = (message) => {
      const toast_id = 1;
      toast.success(message, {
        onClose: () => {
          navigate('/', { replace: true});
        }
      });
      toast.dismiss(toast_id);
    }
    const error_toast = (message) => {
      const toast_id = 0;
      toast.error(message);
      toast.dismiss(toast_id);
    }

    function handleChange(e){
        setData((data) => 
        ({...data, [e.target.name]: e.target.value}))
    };
    function handleSubmit(e){
        e.preventDefault();
      
        axios.post("http://localhost:3000/user/create", data)
        .then((response) => {
            setData({ email: "", name: "",
            master_password: "",
            confirm_master_password: "",
            master_password_hint: ""});
            setSuccessMessage(response.data);
            console.log(response.data);
        }).catch((error) => {
          setErrorMessage(error.response.data);
          console.log(error.response.data);
          
        });
    }
  
    return (
      <div className="h-full col-span-10 col-start-2 -mt-14 sm:col-start-3 sm:col-span-8 md:col-start-4 md:col-span-6 xl:col-start-5 xl:col-span-4">
          <div className="p-4 bg-white border rounded-md border-gray">
          { 
            errorMessage && error_toast(errorMessage) 
          }
          { 
            successMessage && success_toast(successMessage)
          }
              <form onSubmit={handleSubmit}>
              <label className="label-style">Email address</label><br />    
              <input
                className="input-style"
                name="email" type="text" onChange={handleChange}
                value={data.email}              
              />

              <label className="label-style">Your name</label><br />    
              <input
                className="input-style"
                name="name" type="text"  onChange={handleChange}
                value={data.name}   
              />

              <label className="label-style">Master password</label><br />     
              <input
                className="input-style"
                name="master_password" type="password"  onChange={handleChange}
                value={data.master_password}
              />
             
              <p className="text-xs text-gray-500">
                The master password is the password you use to access your vault. It is
                very important that you do not forget your master password. There is no
                way to recover the password in the event that you forget it.
              </p>
              <label className="label-style">Re-type master password</label><br />  
              <input
                className="input-style"
                name="confirm_master_password" type="password"  onChange={handleChange}
                value={data.confirm_master_password}        
              />
               
              <label className="label-style"> Master password hint(optional)  </label><br />
              <input
                className="input-style"
                name="master_password_hint" type="text" onChange={handleChange}
                value={data.master_password_hint}           
              />
              <p className="text-xs text-gray-500">
                A master password hint can help you remember your password if you forget
                it.
              </p>
              <hr className="mt-6" />
              <div className="flex flex-row justify-between mt-4">
                <button type="submit" className="w-32 p-1 btn-submit sm:w-36 lg:w-48 xl:w-40">
                  Submit
                </button>
                <button className="w-32 p-1 btn-cancel sm:w-36 lg:w-48 xl:w-40">
                  <Link to="/">Cancel</Link>
                </button>
              </div>
            </form>
          </div>
      </div>
      
    );
  };

function Register(){
    return (
        <div className="w-screen h-screen py-8 bg-red-400">
            <div className="container w-full h-full px-12 mx-auto">
                <div className="grid h-full grid-cols-12 grid-rows-6">
                    <div className="flex items-start justify-center h-8 col-span-6 col-start-4 sm:col-start-5 sm:col-span-4">
                         <h3 className="text-xl md:text-2xl">Create account</h3>
                    </div>
                    <RegisterForm />
                </div>
            </div>
        </div>
    )
}
export default Register;