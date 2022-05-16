import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/absa_logo.jpg';

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
                    <div className="col-span-3 col-start-2 mb-4 border -mt-52 h-60 sm:col-start-3 sm:col-span-6 md:col-start-4 xl:col-start-5 xl:col-span-4">
                        <div className="p-4 bg-white">
                            <form>
                                <label className="font-semibold">Email Address</label>
                                <input className="w-full mb-4 border-2 border-black border-opacity-10" name="email" />
                                <label className="font-semibold">Master password</label>
                                <input className="w-full border-2 border-black border-opacity-10" name="master_password" type="password" />
                                <Link className="text-sm text-red-600 hover:underline" to="/passwordHint">Get master password hint</Link>
                                <hr className="mt-8" />
                                <div className="flex flex-row justify-between mt-4">
                                    <button className="w-24 p-1 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 sm:w-36 sm:text-base lg:w-48 xl:w-44"><Link to="/vault">Log in</Link></button>
                                    <button className="p-1 text-sm font-semibold border-2 border-black border-opacity-25 hover:bg-gray-400 opacity-60 sm:w-36 sm:text-base lg:w-48 xl:w-44"><Link to="/register">Create account</Link></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;