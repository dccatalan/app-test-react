import React from 'react';
import {Ripple} from "primereact/ripple";
import {Link} from "react-router-dom";

export const TopBarOption = ({to,name, icon}) => {
    return (
        <Link to={to} className="no-underline">
            <a className="p-ripple cursor-pointer h-full inline-flex align-items-center justify-content-center px-5 text-orange-100 hover:text-orange-50 hover:bg-orange-600 transition-colors transition-duration-150">
                <i className={"pi "+icon+" text-2xl"}></i>
                <span className="m-1 font-medium inline text-base lg:text-xs lg:block">{name}</span>
                <Ripple/>
            </a>
        </Link>
    );
}
