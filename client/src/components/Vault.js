import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, Routes, Route, Outlet, Link } from 'react-router-dom';

import Dropdown from 'react-bootstrap/Dropdown';
//import DropdownButton from 'react-bootstrap/DropdownButton';


// function VaultMain(){
//     return (
//         <div className="col-span-7 row-span-3 bg-white">
//             <div className="flex justify-between">
//                 <h1 className="text-xl font-semibold sm:text-2xl">My Vault</h1>
//                 <button className="w-24 p-1 text-sm font-semibold text-red-600 border bg-gray-50 hover:text-white hover:bg-red-700 sm:w-36 sm:text-base" type="button" data-modal-toggle="authentication-modal">
//                     <i className="fa-solid fa-plus"></i>Add item
//                 </button>
//             </div>
//             <hr className="mt-1" />
            
//         </div>
//     )
// }

// function VaultSideMenu(){
//     return (
//         <div className="flex flex-col col-span-3 row-span-3 bg-white border border-opacity-100 rounded border-gray">
//             <div className="flex items-center justify-center h-12 bg-gray-100 bg-opacity-50 border-b-2 border-gray-300">
//                 <h1 className="font-semibold uppercase ">Filters</h1>
//             </div>
//             <input className="pl-1 mt-6 text-xs border-2 border-black h-7 border-opacity-10 sm:text-center md:mx-2 md:text-base" placeholder="Search Vault" />
//             <div className="flex flex-col items-center mt-10 ">
//                 <h1 className="mb-3 font-semibold">Types</h1>
//                 <nav>
//                     <Link>d_absa</Link>
//                     <Link>sessions</Link>
//                     <Link>sap</Link>
//                     <Link>client</Link>
//                 </nav>
                
//             </div>
//         </div>
//     )
// }

function DropDownMenu(){
    
    return (
       <div>
            {/* <button id="dropdownInformationButton" data-dropdown-toggle="dropdownInformation" data-dropdown-placement="bottom-end" className="flex" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="red" stroke="red" viewBox="0 0 448 512"><path d="M272 304h-96C78.8 304 0 382.8 0 480c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32C448 382.8 369.2 304 272 304zM48.99 464C56.89 400.9 110.8 352 176 352h96c65.16 0 119.1 48.95 127 112H48.99zM224 256c70.69 0 128-57.31 128-128c0-70.69-57.31-128-128-128S96 57.31 96 128C96 198.7 153.3 256 224 256zM224 48c44.11 0 80 35.89 80 80c0 44.11-35.89 80-80 80S144 172.1 144 128C144 83.89 179.9 48 224 48z"/></svg>
                <svg className="w-8 h-8 -mt-1" fill="red" stroke="red" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>

            <div id="dropdownInformation" className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                <div className="px-4 py-3 text-gray-900 dark:text-white">
                    <span className="block text-sm">Logged in as</span>
                    <span className="block text-sm font-medium truncat"></span>
                </div>
                <ul className="py-1" aria-labelledby="dropdownInformationButton">
                    <li>
                        <a href="<%= `/${authenticated_user._id}/edit_user` %>" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">My account</a>
                    </li>
                </ul>
                <div className="py-1">
                    <a href="./logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Log out</a>
                </div>
            </div> */}
            {/* <Dropdown drop="down">
                <Dropdown.Toggle id="dropdown-basic" split />
            
                <Dropdown.Menu align="end">
                    <Dropdown.Item href="#/action-1" as="a" className="text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">My account</Dropdown.Item>
                    <Dropdown.Item href="#/action-2" as="a" className="text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Log out</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown> */}

       </div>
    )
}

// function WelcomeMessage(){
//     const [user, setUser] = useState({});
//     const location = useLocation();
//     // console.log(location.state.email);
    
//     useEffect(() => {
//         axios.get(`http://localhost:3000/user/${location.state.email}`).then(response => {
//             setUser(response.data)
//             //console.log(response.data);
//         }).catch(error => {
//             // console.log(error.response.data);
//         })
//     }, [])
    
//     return (
//         <div>
//             <h1 className="text-2xl">Welcome, {user.name}</h1>
//              <Dropdown drop="down">
//                 <Dropdown.Toggle id="dropdown-basic" split />
            
//                 <Dropdown.Menu align="end">
//                     <Dropdown.Item href="account/`${user._id}`" as={Link} className="text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">My account</Dropdown.Item>
//                     <Dropdown.Item href="#/action-2" as={Link} className="text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Log out</Dropdown.Item>
//                 </Dropdown.Menu>
//             </Dropdown>
//         </div>
        
//     )
// }

function Header(){
    const [user, setUser] = useState({});
    const location = useLocation();
    // console.log(location.state.email);
    
    useEffect(() => {
        axios.get(`http://localhost:3000/user/${location.state.email}`).then(response => {
            setUser(response.data)
            //console.log(response.data);
        }).catch(error => {
            // console.log(error.response.data);
        })
    }, [])

    return (
        <div className="flex flex-row justify-between">
            <h1 className="text-2xl">Welcome, {user.name}</h1>
             <Dropdown drop="down">
                <Dropdown.Toggle id="dropdown-basic" split />
            
                <Dropdown.Menu align="end">
                    <Dropdown.Item as="a" className="text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"><Link to={`/account/${user._id}`}>My account</Link></Dropdown.Item>
                    <Dropdown.Item as="a" className="text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Log out</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

function Vault(){
    return (
        <div className="w-screen h-screen py-8">
            <div className="container w-9/12 h-full mx-auto">
                <Header />
                <div className="grid h-full grid-cols-10 grid-rows-4 gap-10 pt-10">
                    <div className="flex flex-col col-span-3 row-span-3 bg-white border border-opacity-100 rounded border-gray">
                        <div className="flex items-center justify-center h-12 bg-gray-100 bg-opacity-50 border-b-2 border-gray-300">
                            <h1 className="font-semibold uppercase ">Filters</h1>
                        </div>
                        <input className="pl-1 mt-6 text-xs border-2 border-black h-7 border-opacity-10 sm:text-center md:mx-2 md:text-base" placeholder="Search Vault" />
                        <div className="flex flex-col items-center mt-10 ">
                            <h1 className="mb-3 font-semibold">Types</h1>
                            <nav className="flex flex-col">
                                <Link to="d_absa">D_Absa</Link>
                                <Link to="sessions">Sessions</Link>
                                <Link to="sap">Sap</Link>
                                <Link to="client">Client</Link>
                            </nav>
                        </div>
                     </div>
                     <div className="col-span-7 row-span-3 bg-white">
                        <div className="flex justify-between">
                            <h1 className="text-xl font-semibold sm:text-2xl">My Vault</h1>
                            <button className="w-24 p-1 text-sm font-semibold text-red-600 border bg-gray-50 hover:text-white hover:bg-red-700 sm:w-36 sm:text-base" type="button" data-modal-toggle="authentication-modal">
                                <i className="fa-solid fa-plus"></i>Add item
                            </button>
                        </div>
                        <hr className="mt-1" />
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Vault;