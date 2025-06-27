import React, {useRef} from "react";
import {Ripple} from "primereact/ripple";
import {Badge} from "primereact/badge";
import {StyleClass} from "primereact/styleclass";
import {NavBarOption} from "../component/NavBarOption";
import {TopBarOption} from "../component/TopBarOption";


function TeamMenu(Component) {

    const btnRef26 = useRef(null);
    const btnRef27 = useRef(null);

    return (
        <div>

            <div className="bg-orange-500 px-6 shadow-2 flex relative lg:static" style={{minHeight: '75px'}}>
                <StyleClass nodeRef={btnRef26} selector="#profile-10" enterClassName="hidden"
                            enterActiveClassName="scalein" leaveToClassName="hidden" leaveActiveClassName="fadeout"
                            hideOnOutsideClick>
                    <div ref={btnRef26}
                         className="cursor-pointer flex p-3 align-items-center hover:bg-orange-600 transition-colors transition-duration-150 relative select-none">
                        <div className="hidden lg:block">
                            <span className="text-orange-100 block mb-1 text-lg font-medium white-space-nowrap">Luis Gajardo</span>
                            <p className="m-0 text-orange-200">Mecánico</p>
                        </div>
                        <i className="pi pi-chevron-down text-orange-200 ml-3 hidden lg:block"></i>
                        <div id="profile-10"
                             className="hidden absolute left-0 top-100 shadow-2 bg-orange-600 border-round-bottom w-15rem lg:w-full origin-top z-3">
                            <ul className="list-none m-0 p-3">
                                <li>
                                    <a className="p-ripple flex p-3 align-items-center text-orange-100 hover:text-orange-50 hover:bg-orange-600 transition-colors transition-duration-150 border-round">
                                        <i className="pi pi-user mr-2"></i>
                                        <span className="font-medium">Información</span>
                                        <Ripple/>
                                    </a>
                                </li>
                                <li>
                                    <a className="p-ripple flex p-3 align-items-center text-orange-100 hover:text-orange-50 hover:bg-orange-600 transition-colors transition-duration-150 border-round">
                                        <i className="pi pi-sign-out mr-2"></i>
                                        <span className="font-medium">Salir</span>
                                        <Ripple/>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </StyleClass>
                <div className="flex-auto flex pl-5 overflow-auto">
                    <ul className="flex list-none p-0 m-0">
                        <li className="h-full">
                           <TopBarOption icon="pi-home" to="/team" name="Inicio" />
                        </li>
                        <li className="h-full">
                            <TopBarOption icon="pi-car" to="/team/order" name="Generar Orden" />
                        </li>
                    </ul>
                </div>
                <div className="flex ml-5">
                    <StyleClass nodeRef={btnRef27} selector="@next" enterClassName="hidden" leaveToClassName="hidden"
                                hideOnOutsideClick>
                        <a ref={btnRef27}
                           className="p-ripple cursor-pointer inline-flex align-items-center justify-content-center lg:hidden text-white">
                            <i className="pi pi-bars text-4xl"></i>
                            <Ripple/>
                        </a>
                    </StyleClass>

                </div>
            </div>
            <div className="p-5 flex flex-column flex-auto">

                <div className="border-2 border-double surface-border border-round surface-section flex-auto">
                    {Component}
                </div>
            </div>

        </div>


    );
}

export default TeamMenu;
