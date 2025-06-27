import React, {useRef, useState} from 'react';

import {Ripple} from 'primereact/ripple';
import {StyleClass} from 'primereact/styleclass';
import {Badge} from 'primereact/badge';
import {InputText} from 'primereact/inputtext';
import {InputTextarea} from 'primereact/inputtextarea';
import {Checkbox} from 'primereact/checkbox';
import car from "../assets/logo/png-clipart-car-wiring-diagram-car-parts-compact-car-sedan.png";
import { Slider } from 'primereact/slider';

export const Dashboard = () => {
    const btnRef10 = useRef(null);
    const btnRef11 = useRef(null);
    const btnRef12 = useRef(null);
    const btnRef13 = useRef(null);
    const [value1, setValue1] = useState(null);

    return (
        <div>

            <div className="min-h-screen flex relative lg:static surface-ground">
                <div id="app-sidebar-9"
                     className="h-full lg:h-auto surface-section hidden lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border w-18rem lg:w-7rem select-none">
                    <div className="flex flex-column h-full" style={{background: "black"}}>
                        <div className="flex align-items-center justify-content-center flex-shrink-0"
                             style={{height: '60px'}}>
                            <img src="assets/images/blocks/logos/hyper-cyan.svg" alt="Image" height="30"/>
                        </div>
                        <div className="mt-3">
                            <ul className="list-none p-0 m-0">
                                <li>
                                    <a className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center text-cyan-600 border-left-2 border-cyan-600 hover:border-300 transition-duration-150 transition-colors">
                                        <i className="pi pi-home mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-2xl"></i>
                                        <span className="font-medium inline text-base lg:text-xs lg:block">Inicio</span>
                                        <Ripple/>
                                    </a>
                                </li>
                                <li>
                                    <a className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center text-600 border-left-2 border-transparent hover:border-300 transition-duration-150 transition-colors">
                                        <i className="pi pi-car mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-2xl"></i>
                                        <span className="font-medium inline text-base lg:text-xs lg:block">Generar OT</span>
                                        <Ripple/>
                                    </a>
                                </li>
                                <li>
                                    <a className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center text-600 border-left-2 border-transparent hover:border-300 transition-duration-150 transition-colors">
                                        <i className="pi pi-users mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-2xl"></i>
                                        <span className="font-medium inline text-base lg:text-xs lg:block">Clientes</span>
                                        <Ripple/>
                                    </a>
                                </li>
                                <li>
                                    <a className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center text-600 border-left-2 border-transparent hover:border-300 transition-duration-150 transition-colors">
                                        <i className="pi pi-users mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-2xl"></i>
                                        <span className="font-medium inline text-base lg:text-xs lg:block">Administrador de usuario</span>
                                        <Ripple/>
                                    </a>
                                </li>
                                <li className="relative">
                                    <StyleClass nodeRef={btnRef10} selector="@next" enterClassName="hidden"
                                                leaveToClassName="hidden" hideOnOutsideClick>
                                        <a ref={btnRef10}
                                           className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center text-600 border-left-2 border-transparent hover:border-300 transition-duration-150 transition-colors">
                                            <i className="pi pi-chart-line mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-2xl p-overlay-badge"><Badge
                                                severity="danger">3</Badge></i>
                                            <span
                                                className="font-medium inline text-base lg:text-xs lg:block">Informes</span>
                                            <i className="pi pi-chevron-down ml-auto lg:hidden"></i>
                                            <Ripple/>
                                        </a>
                                    </StyleClass>
                                    <ul className="list-none pl-3 pr-0 py-0 lg:p-3 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out static border-round-right lg:absolute left-100 top-0 z-1 surface-overlay shadow-none lg:shadow-2 w-full lg:w-15rem">
                                        <li>
                                            <StyleClass nodeRef={btnRef11} selector="@next" toggleClassName="hidden">
                                                <a ref={btnRef11}
                                                   className="p-ripple flex align-items-center cursor-pointer p-3 hover:surface-100 hover:text-900 border-round text-600 hover:text-700 transition-duration-150 transition-colors">
                                                    <i className="pi pi-chart-line mr-2"></i>
                                                    <span className="font-medium">Autos en el taller</span>
                                                    <i className="pi pi-chevron-down ml-auto"></i>
                                                    <Ripple/>
                                                </a>
                                            </StyleClass>
                                            <ul className="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 hover:surface-100 hover:text-900 border-round text-600 hover:text-700 transition-duration-150 transition-colors">
                                                        <i className="pi pi-table mr-2"></i>
                                                        <span className="font-medium">Informe de ganancias</span>
                                                        <Ripple/>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 hover:surface-100 hover:text-900 border-round text-600 hover:text-700 transition-duration-150 transition-colors">
                                                        <i className="pi pi-search mr-2"></i>
                                                        <span className="font-medium">Informe</span>
                                                        <Ripple/>
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a className="p-ripple flex align-items-center cursor-pointer p-3 hover:surface-100 hover:text-900 border-round text-600 hover:text-700 transition-duration-150 transition-colors">
                                                <i className="pi pi-chart-line mr-2"></i>
                                                <span className="font-medium">Expenses</span>
                                                <Ripple/>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center text-600 border-left-2 border-transparent hover:border-300 transition-duration-150 transition-colors">
                                        <i className="pi pi-server mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-2xl"></i>
                                        <span className="font-medium inline text-base lg:text-xs lg:block">Administrador de productos</span>
                                        <Ripple/>
                                    </a>
                                </li>
                                <li>
                                    <a className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center text-600 border-left-2 border-transparent hover:border-300 transition-duration-150 transition-colors">
                                        <i className="pi pi-server mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-2xl"></i>
                                        <span className="font-medium inline text-base lg:text-xs lg:block">Administrador de servicios</span>
                                        <Ripple/>
                                    </a>
                                </li>
                                <li>
                                    <a className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center text-600 border-left-2 border-transparent hover:border-300 transition-duration-150 transition-colors">
                                        <i className="pi pi-cog mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-2xl"></i>
                                        <span
                                            className="font-medium inline text-base lg:text-xs lg:block">Configuraciones</span>
                                        <Ripple/>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-auto">
                            <hr className="mb-3 mx-3 border-top-1 border-none surface-border"/>
                            <a className="p-ripple m-3 flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center hover:surface-200 border-round text-600 transition-duration-150 transition-colors">
                                <img src="assets/images/blocks/avatars/circle/avatar-f-1.png" className="mr-2 lg:mr-0"
                                     style={{width: '32px', height: '32px'}}/>
                                <span className="font-medium inline lg:hidden">Amy Elsner</span>
                                <Ripple/>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="min-h-screen flex flex-column relative flex-auto">
                    <div
                        className="flex justify-content-between align-items-center px-5 surface-section relative lg:static border-bottom-1 surface-border"
                        style={{height: '60px'}}>
                        <div className="flex">
                            <StyleClass nodeRef={btnRef12} selector="#app-sidebar-9" enterClassName="hidden"
                                        enterActiveClassName="fadeinleft" leaveToClassName="hidden"
                                        leaveActiveClassName="fadeoutleft" hideOnOutsideClick>
                                <a ref={btnRef12} className="p-ripple cursor-pointer block lg:hidden text-700 mr-3">
                                    <i className="pi pi-bars text-4xl"></i>
                                    <Ripple/>
                                </a>
                            </StyleClass>
                            <span className="p-input-icon-left">
                    <i className="pi pi-search"></i>
                    <InputText className="border-none w-10rem sm:w-20rem" placeholder="Search"/>
                </span>
                        </div>
                        <StyleClass nodeRef={btnRef13} selector="@next" enterClassName="hidden"
                                    enterActiveClassName="fadein" leaveToClassName="hidden"
                                    leaveActiveClassName="fadeout" hideOnOutsideClick>
                            <a ref={btnRef13} className="p-ripple cursor-pointer block lg:hidden text-700">
                                <i className="pi pi-ellipsis-v text-2xl"></i>
                                <Ripple/>
                            </a>
                        </StyleClass>
                        <ul className="list-none p-0 m-0 hidden lg:flex lg:align-items-center select-none lg:flex-row
    surface-section border-1 lg:border-none surface-border right-0 top-100 z-1 shadow-2 lg:shadow-none absolute lg:static">
                            <li>
                                <a className="p-ripple flex p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer
            transition-duration-150 transition-colors">
                                    <i className="pi pi-inbox text-base lg:text-2xl mr-2 lg:mr-0"></i>
                                    <span className="block lg:hidden font-medium">Inbox</span>
                                    <Ripple/>
                                </a>
                            </li>
                            <li>
                                <a className="p-ripple flex p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer
            transition-duration-150 transition-colors">
                                    <i className="pi pi-bell text-base lg:text-2xl mr-2 lg:mr-0 p-overlay-badge"><Badge
                                        severity="danger"/></i>
                                    <span className="block lg:hidden font-medium">Notifications</span>
                                    <Ripple/>
                                </a>
                            </li>
                            <li className="border-top-1 surface-border lg:border-top-none">
                                <a className="p-ripple flex p-3 lg:px-3 lg:py-2 align-items-center hover:surface-100 font-medium border-round cursor-pointer
            transition-duration-150 transition-colors">
                                    <img src="assets/images/blocks/avatars/circle/avatar-f-1.png"
                                         className="mr-3 lg:mr-0" style={{width: '32px', height: '32px'}}/>
                                    <div className="block lg:hidden">
                                        <div className="text-900 font-medium">Amy Elsner</div>
                                        <span className="text-600 font-medium text-sm">Marketing Specialist</span>
                                    </div>
                                    <Ripple/>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="p-5 flex flex-column flex-auto">
                        <div className="grid">
                            <div className="col-12 lg:col-6">
                                <div className="surface-card p-4 shadow-2 border-round p-fluid">
                                    <div className="grid formgrid p-fluid">
                                        <div className="field mb-4 col-12 md:col-12">
                                            <label htmlFor="company_name" className="font-medium text-900">Nombre</label>
                                            <InputText id="company_name" type="text"/>
                                        </div>
                                        <div className="field mb-4 col-12 md:col-12">
                                            <label htmlFor="invoice_id" className="font-medium text-900">Domicilio</label>
                                            <InputText id="invoice_id" type="text"/>
                                        </div>
                                        <div className="field mb-4 col-12 md:col-12">
                                            <label htmlFor="customer_name" className="font-medium text-900">Telefono</label>
                                            <InputText id="customer_name" type="text"/>
                                        </div>
                                        <div className="field mb-4 col-12 md:col-12">
                                            <label htmlFor="customer_email" className="font-medium text-900">Whatsap</label>
                                            <InputText id="customer_email" type="text"/>
                                        </div>
                                        <div className="field mb-4 col-12 md:col-12">
                                            <label htmlFor="customer_email" className="font-medium text-900">Correo</label>
                                            <InputText id="customer_email" type="text"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 lg:col-6">
                                <div className="surface-card p-4 shadow-2 border-round p-fluid">
                                    <div className="grid formgrid p-fluid">
                                        <div className="field mb-4 col-12 md:col-12">
                                            <label htmlFor="company_name" className="font-medium text-900">Patente</label>
                                            <InputText id="company_name" type="text"/>
                                        </div>
                                        <div className="field mb-4 col-12 md:col-12">
                                            <label htmlFor="invoice_id" className="font-medium text-900">Marca</label>
                                            <InputText id="invoice_id" type="text"/>
                                        </div>
                                        <div className="field mb-4 col-12 md:col-12">
                                            <label htmlFor="customer_name" className="font-medium text-900">Modelo</label>
                                            <InputText id="customer_name" type="text"/>
                                        </div>
                                        <div className="field mb-4 col-12 md:col-12">
                                            <label htmlFor="customer_email" className="font-medium text-900">Nro Serie</label>
                                            <InputText id="customer_email" type="text"/>
                                        </div>
                                        <div className="field mb-4 col-12 md:col-12">
                                            <label htmlFor="customer_email" className="font-medium text-900">Nro Motor</label>
                                            <InputText id="customer_email" type="text"/>
                                        </div>
                                        <div className="field mb-4 col-12 md:col-12">
                                            <label htmlFor="customer_email" className="font-medium text-900">Kilometraje</label>
                                            <InputText id="customer_email" type="text"/>
                                        </div>
                                        <div className="field mb-4 col-12 md:col-12">
                                            <label htmlFor="customer_email" className="font-medium text-900">Gasolina</label>
                                            <Slider value={value1} onChange={(e) => setValue1(e.value)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 lg:col-12">

                                <div className="surface-card p-4 shadow-2 border-round p-fluid">
                                    <div className="grid">
                                    <div className="col-12 lg:col-6" >
                                        <div className="field-checkbox">
                                            <Checkbox inputId="city1" name="city" value="Chicago"  />
                                            <label htmlFor="city1">Luces Frontales</label>
                                        </div>
                                        <div className="field-checkbox">
                                            <Checkbox inputId="city2" name="city" value="Los Angeles" />
                                            <label htmlFor="city2">1/4 Luces</label>
                                        </div>
                                        <div className="field-checkbox">
                                            <Checkbox inputId="city3" name="city" value="New York"  />
                                            <label htmlFor="city3">Antena</label>
                                        </div>
                                        <div className="field-checkbox">
                                            <Checkbox inputId="city4" name="city" value="San Francisco" />
                                            <label htmlFor="city4">Espejos laterales</label>
                                        </div>
                                        <div className="field-checkbox">
                                            <Checkbox inputId="city1" name="city" value="Chicago"  />
                                            <label htmlFor="city1">Cristales</label>
                                        </div>
                                        <div className="field-checkbox">
                                            <Checkbox inputId="city2" name="city" value="Los Angeles" />
                                            <label htmlFor="city2">Emblemas</label>
                                        </div>
                                        <div className="field-checkbox">
                                            <Checkbox inputId="city3" name="city" value="New York"  />
                                            <label htmlFor="city3">Llantas</label>
                                        </div>
                                        <div className="field-checkbox">
                                            <Checkbox inputId="city4" name="city" value="San Francisco" />
                                            <label htmlFor="city4">Tapon de ruedas</label>
                                        </div>
                                        <div className="field-checkbox">
                                            <Checkbox inputId="city1" name="city" value="Chicago"  />
                                            <label htmlFor="city1">Moldura completas</label>
                                        </div>
                                        <div className="field-checkbox">
                                            <Checkbox inputId="city2" name="city" value="Los Angeles" />
                                            <label htmlFor="city2">Tapon de gasolina</label>
                                        </div>
                                        <div className="field-checkbox">
                                            <Checkbox inputId="city3" name="city" value="New York"  />
                                            <label htmlFor="city3">Limpiadores</label>
                                        </div>
                                        <div className="field-checkbox">
                                            <Checkbox inputId="city4" name="city" value="San Francisco" />
                                            <label htmlFor="city4">Instrumetos tablero</label>
                                        </div>

                                    </div>
                                    <div className="col-12 lg:col-6" >
                                        <img src={car} alt="Image"  style={{ height: '400px', top: '-2rem', right: '-1rem' }} />
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="col-12 lg:col-12">


                                <div className="surface-card p-4 shadow-2 border-round p-fluid">
                                    <div className="grid formgrid p-fluid">

                                        <div className="field mb-4 col-12">
                                            <label htmlFor="notes"
                                                   className="font-medium text-900">Observaciones</label>
                                            <InputTextarea id="notes" autoResize rows={5}/>
                                        </div>
                                        <div className="surface-border border-top-1 opacity-50 mb-4 col-12"></div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );

}
