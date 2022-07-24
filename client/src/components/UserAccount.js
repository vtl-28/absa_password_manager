import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UserAccout(){
    let { id } = useParams();
    const [ user, setUser ] = useState('')

    useEffect(() => {
        axios.get(`http://localhost:3000/account/${id}`)
        .then(response => {
            setUser(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error.response.data);
        })
    }, [])

    return(
        <div className="w-screen h-screen py-8 ">
            <div className="container w-9/12 h-full mx-auto">
                <h1 className="mb-1 text-2xl">My account</h1>
                <hr />
                <form className="flex flex-col py-4" action="<%= `/${user._id}/update_user?_method=PUT` %>" method="POST">
                    <label for="" className="text-sm font-semibold ">Email address</label>
                    <input contentEditable="true" className="w-4/12 mt-1 mb-4 text-lg border-2 border-black border-opacity-10" name="email" type="email" value={user.email} />
                
                    <label for="" class="text-sm font-semibold ">Your name</label>
                    <input contentEditable="true" class="w-4/12 mt-1 mb-4 text-lg border-2 border-black border-opacity-10" name="name" value={user.name} />
                                            
                    <label for="" className="text-sm font-semibold ">Master password hint</label>
                    <input contentEditable="true" className="w-4/12 mt-1 mb-4 text-lg border-2 border-black border-opacity-10" name="master_password_hint" value={user.master_password_hint} />
                            
                    <hr className="mt-6" />
                    <button className="w-32 p-1 mt-4 font-semibold text-white bg-red-600 hover:bg-red-700 sm:w-36 lg:w-48 xl:w-40"><a>Update</a></button>      
                </form>
            </div>
        </div>
    )
}
export default UserAccout;
