import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

function PasswordHint(){
    const [ email, setEmail ] = useState('');
    const [ successMessage, setSuccessMessage ] = useState('');
    const [ errorMessage, setErrorMessage ] = useState('');
    const navigate = useNavigate();
    const [ showError, setShowError ] = useState(false);
    const [ showSuccess, setShowSuccess ] = useState(false);


    let errorAlert = (<Alert className="px-3 py-1 bg-red-100 border-2 border-red-500 border-opacity-25 rounded-md">
                        <div className="flex flex-row justify-between">
                            <p className="text-sm text-red-500">{errorMessage}</p> 
                            <Button className="text-red-500" onClick={() => setShowError(false)}>x</Button>
                        </div>                                               
                    </Alert>);
    let successAlert = (<Alert className="px-3 py-1 bg-green-100 border-2 border-green-500 border-opacity-25 rounded-md">
                            <div className="flex flex-row justify-between">
                                <p className="text-sm text-green-500">{successMessage}</p> 
                                <Button className="text-green-500" onClick={() => setShowSuccess(false)}>x</Button>
                            </div>                                               
                        </Alert>);  


    function handleChange(e){
        setEmail(e.target.value);
    }
    // const success_toast = (message) => {
    //     const toast_id = 1;
    //     toast.success(message, {
    //       onClose: () => {
    //         navigate('/');
    //       }
    //     });
    //     toast.dismiss(toast_id);
    //   }
    //   const error_toast = (message) => {
    //     const toast_id = 0;
    //     toast.error(message);
    //     toast.dismiss(toast_id);
    //   }

    function handleSubmit(e){
        e.preventDefault();
           
        axios.post("http://localhost:3000/password_hint", email)
        .then(response => {
            console.log(response.data);
            setSuccessMessage(response.data);
            setShowSuccess(showSuccess => !showSuccess);
        }).catch(error => {
            console.log(error.response.data);
            setErrorMessage(error.response.data);
            setShowError(showError => !showError);
        });
        
    }
    return (
        <div className="w-screen h-screen py-8"  style={{backgroundColor: "#F0325A"}}>
            <div className="container w-full h-full px-12 mx-auto">
                <div className="grid h-full grid-cols-12 grid-rows-6">
                    <div className="flex items-start justify-center h-8 col-span-6 col-start-4 sm:col-start-5 sm:col-span-4">
                        <h3 className="text-2xl md:text-3xl">Password hint</h3>
                    </div>
                    <div className="h-full col-span-10 col-start-2 -mt-10 sm:col-start-3 sm:col-span-8 md:col-start-4 md:col-span-6 lg:col-start-5 lg:col-span-4 xl:col-start-5 xl:col-span-4">
                        <div className="p-4 bg-white border rounded-md border-gray">
                        { 
                            errorMessage && showError ? errorAlert : '' 
                        }
                        { 
                            successMessage && showSuccess ? successAlert: ''
                        }
                            <form onSubmit={handleSubmit}>
                                <label className="label-style ">Email address</label>
                                <input className="input-style" value={email} name="email" onChange={handleChange}/>
                                <p className="mb-2 text-xs text-gray-500">Enter your email address to receive your master password hint</p>
                                <hr className="mt-6" />
                                <div className="flex flex-row justify-between mt-4">
                                    <button className="w-32 btn-submit sm:w-36 lg:w-32 xl:w-40">Submit</button>
                                    <button className="w-32 btn-cancel sm:w-36 lg:w-32 xl:w-40"><Link to="/">Cancel</Link></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PasswordHint;