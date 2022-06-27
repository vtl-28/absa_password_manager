import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

function ApplicationPasswordModal({handleClose}){
    const [ applicationPassword, setApplicationPassword ] = useState({ department: "D_Absa", application_name: "", username: "",application_password: ""});
    const [ success, setSuccess ] = useState('');
    
    function handleChange(e){
        setApplicationPassword((applicationPassword) => 
        ({...applicationPassword, [e.target.name]: e.target.value}));

    }
    
    function handleSubmit(e){
        e.preventDefault();
        axios.post("http://localhost:3000/create_password", applicationPassword)
        .then(response => {
            console.log(response.data);
            setSuccess(response.data);
        }).catch(error => {
            console.log(error.response.data);
        })  
    }
   
    return(
        <form onSubmit={handleSubmit} className="px-6 pt-4 pb-4 lg:px-8 sm:pb-6 xl:pb-8"> 
            <select disabled value={applicationPassword.department} className="w-full mb-2" name="department" onChange={handleChange}>
                <option value="D_Absa">D_Absa</option>
                <option value="Sessions">Sessions</option>
                <option value="Sap">Sap</option>
                <option value="Client">Client</option>
            </select>                
            <label>Application Name</label>
            <input onChange={handleChange} value={applicationPassword.application_name} className="w-full mb-2 border-2 border-black border-opacity-10" name="appication_name" />
            <label>Username</label>
            <input onChange={handleChange} value={applicationPassword.username} className="w-full mb-2 border-2 border-black border-opacity-10" name="username" />
            <label>Password</label>
            <input onChange={handleChange} value={applicationPassword.application_password} className="w-full mb-2 border-2 border-black border-opacity-10" name="application_password" type="password" />
            <div className="flex flex-row justify-between mt-4">
                <button className="p-1 font-semibold text-white bg-red-600 hover:bg-red-700 w-28" type="submit"><a>Save</a></button>
                <button onClick={handleClose} className="p-1 font-semibold border-2 border-black border-opacity-25 hover:bg-gray-400 opacity-60 w-28"><a>Cancel</a></button>
            </div>
        </form>
    )
}

export default function DAbsa(){
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(""); 

    
    function handleOpenModal(e){
        setId(e.target.name);
        setOpen(true);
    }
    function handleClose() {
        setId("");
        setOpen(false);
    }

    return (
        <div className="flex flex-col mt-2">
            <h3 className="mb-2">There are no items to list</h3>
            <button onClick={handleOpenModal} className="w-24 p-1 text-sm font-semibold text-red-600 border bg-gray-50 hover:text-white hover:bg-red-700 sm:w-36 sm:text-base" type="button">
                <i className="fa-solid fa-plus"></i>Add item
            </button>
            { open ? (
                <div>
                    <ApplicationPasswordModal handleClose={handleClose} />
                </div>
            ) : (
                ""
            )}
        </div>
    )
}