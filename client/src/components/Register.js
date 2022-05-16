import React from 'react';
import { Link } from 'react-router-dom';

function Register(){
    return (
        <div className="w-screen h-screen py-8 bg-red-400">
            <div className="container w-full h-full px-12 mx-auto">
                <div className="grid h-full grid-cols-12 grid-rows-6">
                    <div className="flex items-start justify-center h-8 col-span-6 col-start-4 sm:col-start-5 sm:col-span-4">
                         <h3 className="text-xl md:text-2xl">Create account</h3>
                    </div>
                    <div className="h-full col-span-10 col-start-2 -mt-14 sm:col-start-3 sm:col-span-8 md:col-start-4 md:col-span-6 xl:col-start-5 xl:col-span-4">
                        <div className="p-4 bg-white">
                            <form>
                                <label className="text-sm font-semibold">Email address</label><br />
                                <input className="w-full border-2 border-black border-opacity-10" name="email" />
                                <label className="text-sm font-semibold">Your name</label><br />
                                <input className="w-full border-2 border-black border-opacity-10" name="name" />
                                <label className="text-sm font-semibold">Master password</label><br />
                                <input className="w-full border-2 border-black border-opacity-10" name="master_password" type="password" />
                                <p className="text-xs text-gray-500 lg:mb-2">The master password is the password you use to access your vault. It is very important that you do not forget your master password. There is no way to recover the password in the event that you forget it.</p>                           
                                <label className="text-sm font-semibold">Re-type master password</label><br />
                                <input className="w-full mb-2 border-2 border-black border-opacity-10" name="confirm_master_password" type="password" /><br />
                                <label className="text-sm font-semibold">Master password hint(optional)</label><br />
                                <input className="w-full border-2 border-black border-opacity-10" name="master_password_hint" />
                                <p className="text-xs text-gray-500 lg:mb-2">A master password hint can help you remember your password if you forget it.</p>
                                <hr className="mt-6" />
                                <div className="flex flex-row justify-between mt-4">
                                    <button className="w-32 p-1 font-semibold text-white bg-red-600 hover:bg-red-700 sm:w-36 lg:w-48 xl:w-40"><Link to="">Submit</Link></button>
                                    <button className="w-32 p-1 font-semibold border-2 border-black border-opacity-25 hover:bg-gray-400 opacity-60 sm:w-36 lg:w-48 xl:w-40"><Link to="/">Cancel</Link></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register;