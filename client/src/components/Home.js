import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/absa_logo.jpg';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Card, Button } from 'flowbite-react';

const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        master_password: ""
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState([]);
    const navigate = useNavigate();

    function handleChange(e){
        setData((data) => 
        ({...data, [e.target.name]: e.target.value}))
    }
    function handleSubmit(e){
        e.preventDefault();

        axios.post("http://localhost:3000/login", data)
        .then((response) => {
            //setData({email: "", master_password: ""})
            //setSuccessMessage(response.data);
            console.log(response.data); 
            console.log(response.statusText); 
            navigate('/vault', { state: response.data});
        }).catch((error) => {
            setErrorMessage(error.response.data);
            console.log(error.response.data);
        })
    }

    // const success_toast = (message) => {
    //     const toast_id = 1;
    //     toast.success(message, {
    //         onClose: () => {
    //             navigate('/vault', { state: data});
    //         }
    //     });
    //     toast.dismiss(toast_id);
    //   }
      const error_toast = (message) => {
        const toast_id = 0;
        toast.error(message);
        toast.dismiss(toast_id);
      }

    return(
        <div className="col-span-3 col-start-2 mb-4 border -mt-52 h-60 sm:col-start-3 sm:col-span-6 md:col-start-4 xl:col-start-5 xl:col-span-4">
            <div className="p-4 bg-white border rounded-md border-gray">
                { 
                    errorMessage && error_toast(errorMessage)
                }
                {/* { 
                    successMessage && success_toast(successMessage)
                } */}
                <form onSubmit={handleSubmit}>
                    <label className="label-style">Email Address</label>
                    <input className="input-style" name="email" 
                        onChange={handleChange}
                        value={data.email}
                    />
                    <label className="label-style">Master password</label>
                    <input className="input-style" name="master_password" type="password" 
                        onChange={handleChange}
                        value={data.master_password}
                    />
                    <button className="text-sm text-red-600 hover:underline">
                        <Link to="/password_hint">Get master password hint</Link>
                    </button>
                    <hr className="mt-8" />
                    <div className="flex flex-row justify-between mt-4">
                        <button className="w-24 text-sm btn-submit sm:w-36 sm:text-base lg:w-48 xl:w-40" >Log in</button>
                        <button className="text-sm btn-cancel sm:w-36 sm:text-base lg:w-48 xl:w-40"><Link to="/register">Create account</Link></button>
                    </div>
                </form>
            </div>
        </div>
    )
}

function Home(){
    return(
        <div className="w-screen h-screen pt-16 bg-red-400">
            <div className="container w-full h-full px-12 mx-auto">
                <div className="grid h-full grid-cols-5 grid-rows-3 sm:grid-cols-10 md:grid-cols-12">
                    <div className="flex items-start h-16 col-span-3 col-start-2 sm:col-start-3 sm:col-span-6 md:col-start-4 md:justify-center justify-evenly">
                        <img src={logo} alt="Web application logo" />
                        <p className="font-sans text-2xl sm:text-3xl md:text-4xl md:ml-4"><span className="font-bold">Password</span> vault</p>
                    </div>
                    <div className="flex h-16 col-span-3 col-start-2 -mt-28 sm:col-start-3 sm:col-span-6 md:col-start-4 xl:col-start-5 xl:col-span-4">
                    <p className="text-base text-center sm:text-lg md:text-xl">Log in or create a new account to access
                        your secure vault</p>
                    </div>
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}

export default Home;