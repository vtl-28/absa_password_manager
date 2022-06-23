import React from 'react';
export default function Sap(){
    return (
        <div className="flex flex-col mt-2">
            <h3 className="mb-2">There are no items to list</h3>
            <button className="w-24 p-1 text-sm font-semibold text-red-600 border bg-gray-50 hover:text-white hover:bg-red-700 sm:w-36 sm:text-base" type="button">
                <i className="fa-solid fa-plus"></i>Add item
            </button>
        </div>
    )
}