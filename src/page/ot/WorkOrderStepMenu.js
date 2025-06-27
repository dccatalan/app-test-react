import React from 'react';
import {Ripple} from "primereact/ripple";

export const WorkOrderStepMenu= ({setMenu}) => {

    return (
        <ul className="list-none m-0 p-0 flex flex-row lg:flex-column justify-content-evenly md:justify-content-between lg:justify-content-start mb-5 lg:pr-8 lg:mb-0">
            <li>
                <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-800 hover:surface-hover transition-duration-150 transition-colors" onClick={()=>setMenu("client")}>
                    <i className="pi pi-user md:mr-2"></i>
                    <span className="font-medium hidden md:block">Datos del cliente</span>
                    <Ripple/>
                </a>
            </li>
            <li>
                <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-800 hover:surface-hover transition-duration-150 transition-colors"  onClick={()=>setMenu("car")}>
                    <i className="pi pi-car md:mr-2"></i>
                    <span className="font-medium hidden md:block">Datos del vehículo</span>
                    <Ripple/>
                </a>
            </li>
            <li>
                <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-800 hover:surface-hover transition-duration-150 transition-colors"  onClick={()=>setMenu("generalStatus")}>
                    <i className="pi pi-wrench md:mr-2"></i>
                    <span className="font-medium hidden md:block">Estado general del vehículo</span>
                    <Ripple/>
                </a>
            </li>
            <li>
                <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-800 hover:surface-hover transition-duration-150 transition-colors"  onClick={()=>setMenu("mainProblem")}>
                    <i className="pi pi-times-circle md:mr-2"></i>
                    <span className="font-medium hidden md:block">Problema principal del vehículo</span>
                    <Ripple/>
                </a>
            </li>

            <li>
                <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-800 hover:surface-hover transition-duration-150 transition-colors"  onClick={()=>setMenu("photos")}>
                    <i className="pi pi-images md:mr-2"></i>
                    <span className="font-medium hidden md:block">Agregar fotos</span>
                    <Ripple/>
                </a>
            </li>

        </ul>

    );

}
