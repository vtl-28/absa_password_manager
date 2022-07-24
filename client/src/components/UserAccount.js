import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function UserAccout(){
    let { id } = useParams();
    const [ user, setUser ] = useState({})
    const [ data, setData ] = useState({email: '', name: '', password_hint: ''});
    const [ successMessage, setSuccessMessage ] = useState('');
    const [ errorMessage, setErrorMessage ] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/account/${id}`)
        .then(response => {
            setUser(response.data);
            console.log(response.data);
            
        }).catch(error => {
            console.log(error.response.data);
            
        })
    }, [])

    function handleChange(e){
        e.preventDefault();

        setData((data) => 
        ({...data, [e.target.name]: e.target.value}))
    }

    function handleSubmit(e){
        e.preventDefault();

        axios.put(`http://localhost:3000/account/${id}`, data)
        .then(response => {
            console.log(response.data);
            setSuccessMessage(response.data);
        }).catch(error => {
            console.log(error.response.data);
            setErrorMessage(error.response.data);
        })
    }

    const success_toast = (message) => {
        const toast_id = 1;
        toast.success(message, {
            onClose: () => {
               setTimeout(() => {
                    navigate('/vault', { state: data});
               }, 2000)
            }
        });
        toast.dismiss(toast_id);
      }
      const error_toast = (message) => {
        const toast_id = 0;
        toast.error(message);
        toast.dismiss(toast_id);
      }

    return(
        <div className="w-screen h-screen py-8 ">
            <div className="container w-9/12 h-full mx-auto">
                <h1 className="mb-1 text-2xl">My account</h1>
                { 
                    errorMessage && error_toast(errorMessage)
                }
                { 
                    successMessage && success_toast(successMessage)
                }
                <form className="flex flex-col py-4" onSubmit={handleSubmit} method="POST">
                    <label for="" className="text-sm font-semibold ">Email address</label>
                    <input placeholder={user.email} className="w-4/12 mt-1 mb-4 text-lg border-2 border-black border-opacity-10" name="email" type="email" 
                        onChange={handleChange}
                        value={data.email}
                    />
                
                    <label for="" class="text-sm font-semibold ">Your name</label>
                    <input placeholder={user.name}  class="w-4/12 mt-1 mb-4 text-lg border-2 border-black border-opacity-10" name="name" 
                        onChange={handleChange}
                        value={data.name}
                    />
                                            
                    <label for="" className="text-sm font-semibold ">Master password hint</label>
                    <input placeholder={user.master_password_hint}  className="w-4/12 mt-1 mb-4 text-lg border-2 border-black border-opacity-10" name="master_password_hint"
                        onChange={handleChange}
                        value={data.password_hint} />
                            
                    <hr className="mt-6" />
                    <button className="w-32 p-1 mt-4 font-semibold text-white bg-red-600 hover:bg-red-700 sm:w-36 lg:w-48 xl:w-40"><a>Update</a></button>      
                </form>
            </div>
        </div>
    )
}
export default UserAccout;
