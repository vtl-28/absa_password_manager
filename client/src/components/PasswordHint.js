import React from 'react';
import { Link } from 'react-router-dom';

function PasswordHint(){
    return (
        <div className="w-screen h-screen py-8 bg-red-400">
            <div className="container w-full h-full px-12 mx-auto">
                <div className="grid h-full grid-cols-12 grid-rows-6">
                    <div className="flex items-start justify-center h-8 col-span-6 col-start-4 sm:col-start-5 sm:col-span-4">
                        <h3 className="text-2xl md:text-3xl">Password hint</h3>
                    </div>
                    <div className="h-full col-span-10 col-start-2 -mt-10 sm:col-start-3 sm:col-span-8 md:col-start-4 md:col-span-6 lg:col-start-5 lg:col-span-4 xl:col-start-5 xl:col-span-4">
                        <div className="p-4 bg-white">
                            <form>
                                <label className="text-sm font-semibold ">Email address</label>
                                <input className="w-full mt-2 border-2 border-black border-opacity-10" name="email" />
                                <p className="mb-2 text-xs text-gray-500">Enter your email address to receive your master password hint</p>
                                <hr className="mt-6" />
                                <div className="flex flex-row justify-between mt-4">
                                    <button className="w-32 p-1 font-semibold text-white bg-red-600 hover:bg-red-700 sm:w-36 lg:w-32 xl:w-40"><Link>Submit</Link></button>
                                    <button className="w-32 p-1 font-semibold border-2 border-black border-opacity-25 hover:bg-gray-400 opacity-60 sm:w-36 lg:w-32 xl:w-40"><Link to="/">Cancel</Link></button>
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