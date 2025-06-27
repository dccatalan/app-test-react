import React from 'react';


const Topbar = (props) => {

    return (
            <>
                <div
                    className="flex justify-content-between align-items-center px-5 surface-section shadow-2 relative lg:static border-bottom-1 surface-border"
                    style={{height: "70px"}}>

                    {/**
                     Menú pantalla móvil
                     */}
                    <div className="flex"><a href="/some/valid/uri" className="p-ripple cursor-pointer block lg:hidden text-700 mr-3" onClick={()=>props.setMenuLeft(!props.menuLeft)}><i
                        className="pi pi-bars text-4xl"></i><span className="p-ink"></span></a><span
                        className="p-input-icon-left"></span>
                    </div>
                    <div ></div>
                    <a  href="/some/valid/uri"  className="p-ripple cursor-pointer block lg:hidden text-700" ><i className="pi pi-sign-out text-2xl"></i><span className="p-ink"></span></a>

                    {/**
                     Menú pantalla grande
                     */}

                    <ul className="list-none p-0 m-0 hidden lg:flex lg:align-items-center select-none lg:flex-row surface-section border-1 lg:border-none surface-border right-0 top-100 z-1 shadow-2 lg:shadow-none absolute lg:static">
                        <li className="border-top-1 surface-border lg:border-top-none"><a href="/some/valid/uri"
                            className="p-ripple flex p-3 lg:px-3 lg:py-2 align-items-center hover:surface-100 font-medium border-round cursor-pointer transition-duration-150 transition-colors w-full">
                            <i className="pi pi-sign-out text-base lg:text-2xl mr-2 lg:mr-0"></i><span
                            className="block lg:hidden font-medium">Logout</span>
                        </a></li>
                    </ul>
                </div>
            </>
    );
}

export default Topbar;
