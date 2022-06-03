import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
//import RegisterForm from './RegisterForm';

const RegisterForm = () => {
    const [ data, setData] = useState({ email: "",
    name: "",
    master_password: "",
    confirm_master_password: "",
    master_password_hint: ""});

    function handleChange(e){
        setData((data) => 
        ({...data, [e.target.name]: e.target.value}))
    };
    function handleSubmit(e){
        e.preventDefault();

        axios.post("http://localhost:3000/user/create", data)
        .then((res) => {
            setData({ email: "", name: "",
            master_password: "",
            confirm_master_password: "",
            master_password_hint: ""});
            console.log(res.data);
        }).catch((err) => {
            console.log("Error couldn't create user");
            console.log(err.message);
        });
    
        
    }

    // const formik = useFormik({
    //   initialValues: {
    //     email: "",
    //     name: "",
    //     master_password: "",
    //     confirm_master_password: "",
    //     master_password_hint: "",
    //   },
    //   validationSchema: Yup.object({
    //     email: Yup.string().trim().email("Invalid email address").required("Email is required"),
    //     name: Yup.string().trim().required("Name is required"),
    //     master_password: Yup.string()
    //       .trim()
    //       .min(8)
    //       .required("Master password is required"),
    //     confirm_master_password: Yup.string()
    //       .trim()
    //       .min(8)
    //       .required("Master password confirmation is required")
    //   }),
    //   onSubmit: (values) => {
    //     alert(JSON.stringify(values, null, 2));
    //     resetForm({values: ""})
    //   },
    // });
    return (
      <div className="h-full col-span-10 col-start-2 -mt-14 sm:col-start-3 sm:col-span-8 md:col-start-4 md:col-span-6 xl:col-start-5 xl:col-span-4">
          <div className="p-4 bg-white">
              <form onSubmit={handleSubmit}>
              <label className="text-sm font-semibold">Email address</label><br />    
              <input
                className="w-full border-2 border-black border-opacity-10"
                name="email" type="text" onChange={handleChange}
                value={data.email}
                // onBlur={formik.handleBlur}
                // value={formik.values.email}
              />
              {/* { formik.errors.email && formik.touched.email ? ( <div className="ml-3 text-sm font-medium text-red-700 dark:text-red-800">{formik.errors.email}</div> ) : null } */}
              <label className="text-sm font-semibold">Your name</label><br />    
              <input
                className="w-full px-0 py-0 border-2 border-black border-opacity-10"
                name="name" type="text"  onChange={handleChange}
                value={data.name}
                // onBlur={formik.handleBlur}
                // value={formik.values.name}
              />
              {/* { formik.errors.name && formik.touched.name ? ( <div className="ml-3 text-sm font-medium text-red-700 dark:text-red-800">{formik.errors.name}</div> ) : null } */}
              <label className="text-sm font-semibold">Master password</label><br />     
              <input
                className="w-full px-0 py-0 border-2 border-black border-opacity-10"
                name="master_password" type="password"  onChange={handleChange}
                value={data.master_password}
                // onBlur={formik.handleBlur}
                // value={formik.values.master_password}
              />
              {/* { formik.errors.master_password && formik.touched.master_password ? ( <div className="ml-3 text-sm font-medium text-red-700 dark:text-red-800">{formik.errors.master_password}</div> ) : null } */}
              <p className="text-xs text-gray-500 lg:mb-2">
                The master password is the password you use to access your vault. It is
                very important that you do not forget your master password. There is no
                way to recover the password in the event that you forget it.
              </p>
              <label className="text-sm font-semibold">Re-type master password</label><br />  
              <input
                className="w-full px-0 py-0 mb-2 border-2 border-black border-opacity-10"
                name="confirm_master_password" type="password"  onChange={handleChange}
                value={data.confirm_master_password}
                // onBlur={formik.handleBlur}
                // value={formik.values.confirm_master_password}
              />
                {/* { formik.errors.confirm_master_password && formik.touched.confirm_master_password ? ( <div className="ml-3 text-sm font-medium text-red-700 dark:text-red-800">{formik.errors.confirm_master_password}</div> ) : null } */}
              <label className="text-sm font-semibold"> Master password hint(optional)  </label><br />
              <input
                className="w-full px-0 py-0 border-2 border-black border-opacity-10"
                name="master_password_hint" type="text" onChange={handleChange}
                value={data.master_password_hint}
                // onBlur={formik.handleBlur}
                // value={formik.values.master_password_hint}
              />
              <p className="text-xs text-gray-500 lg:mb-2">
                A master password hint can help you remember your password if you forget
                it.
              </p>
              <hr className="mt-6" />
              <div className="flex flex-row justify-between mt-4">
                <button type="submit" className="w-32 p-1 font-semibold text-white bg-red-600 hover:bg-red-700 sm:w-36 lg:w-48 xl:w-40">
                  Submit
                </button>
                <button className="w-32 p-1 font-semibold border-2 border-black border-opacity-25 hover:bg-gray-400 opacity-60 sm:w-36 lg:w-48 xl:w-40">
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