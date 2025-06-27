import React from 'react';
import {Ripple} from "primereact/ripple";
import {Link} from "react-router-dom";

export const NavBarOption = ({to,name, icon}) => {
    return (
        <Link to={to} className="no-underline">
            <a className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center hover:bg-gray-800 border-round text-gray-300 hover:text-white transition-duration-150 transition-colors w-full">
                {icon && <i className={`pi ${icon} mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-lg`}></i>}
                <span className="font-medium inline text-base lg:text-xs lg:block">{name}</span>
                <Ripple/>
            </a>
        </Link>
    );
}
