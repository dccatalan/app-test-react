import React, { useRef} from "react";

import {Ripple} from "primereact/ripple";
import {StyleClass} from "primereact/styleclass";
import logo from "../assets/logo/logo2.jpeg";
import {NavBarOption} from "../component/NavBarOption";


function MainApp(Component) {

    const btnRef22 = useRef(null);
    const btnRef23 = useRef(null);

    return (

        <div className="min-h-screen flex relative lg:static surface-ground">
            <div id="app-sidebar-5"
                 className="bg-gray-900 h-auto hidden lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 border-gray-800 w-18rem lg:w-7rem select-none">
                <div className="flex flex-column h-full">
                    <div className="flex align-items-center justify-content-center flex-shrink-0 bg-orange-500"
                         style={{height: '60px'}}>
                        <img src={logo} alt="Image" height="65" style={{width:'100%'}}/>
                    </div>
                    <div className="mt-3">
                        <ul className="list-none p-3 m-0">
                            <li>
                                <NavBarOption to="/app" name="Inicio" icon={"pi-home"} />
                            </li>
                            <li>
                                <NavBarOption to="/app/team" name="Equipo" icon={"pi-users"} />
                            </li>
                            <li>
                                <NavBarOption to="/app/service" name="Servicios y productos" icon={"pi-box"} />
                            </li>
                            <li>
                                <NavBarOption to="/app/client" name="Clientes" icon={"pi-credit-card"} />
                            </li>
                            <li>
                                <NavBarOption to="/app/car" name="Autos" icon={"pi-car"} />
                            </li>
                            <li>
                                <NavBarOption to="/app/users" name="Usuarios" icon={"pi-user"} />
                            </li>
                            <li>
                                <NavBarOption to="/app/work-order" name="Orden de trabajo" icon={"pi-file"} />
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
            <div className="min-h-screen flex flex-column relative flex-auto">
                <div
                    className="flex justify-content-between align-items-center px-5 surface-section relative lg:static border-bottom-1 surface-border"
                    style={{height: '60px'}}>
                    <div className="flex">
                        <StyleClass nodeRef={btnRef22} selector="#app-sidebar-5" enterClassName="hidden"
                                    enterActiveClassName="fadeinleft" leaveToClassName="hidden"
                                    leaveActiveClassName="fadeoutleft" hideOnOutsideClick>
                            <a ref={btnRef22} className="p-ripple cursor-pointer block lg:hidden text-700 mr-3">
                                <i className="pi pi-bars text-4xl"></i>
                                <Ripple/>
                            </a>
                        </StyleClass>
                        <span className="p-input-icon-left">
                </span>
                    </div>
                    <StyleClass nodeRef={btnRef23} selector="@next" enterClassName="hidden"
                                enterActiveClassName="fadein" leaveToClassName="hidden" leaveActiveClassName="fadeout"
                                hideOnOutsideClick>
                        <a ref={btnRef23} className="p-ripple cursor-pointer block lg:hidden text-700">
                            <i className="pi pi-ellipsis-v text-2xl"></i>
                            <Ripple/>
                        </a>
                    </StyleClass>
                    <ul className="list-none p-0 m-0 hidden lg:flex lg:align-items-center select-none lg:flex-row
    surface-section border-1 lg:border-none surface-border right-0 top-100 z-1 shadow-2 lg:shadow-none absolute lg:static">
                        <li>
                            <a className="p-ripple flex p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer
            transition-duration-150 transition-colors">
                                <i className="pi pi-sign-out text-base lg:text-2xl mr-2 lg:mr-0"></i>
                                <span className="block lg:hidden font-medium">Cerrar sesión</span>
                                <Ripple/>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="p-5 flex flex-column flex-auto">
                    <div className="border-2 border-double surface-border border-round surface-section flex-auto">
                        {Component}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default MainApp;
