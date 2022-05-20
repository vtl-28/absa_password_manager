import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from './RegisterForm';

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