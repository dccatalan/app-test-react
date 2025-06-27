import React, {useEffect, useRef, useState} from 'react';
import {Button} from 'primereact/button';
import {StyleClass} from 'primereact/styleclass';
import {Ripple} from 'primereact/ripple';
import logo from '../../assets/logo/logo2.jpeg'
import logoFord from '../../assets/logo/ford.png'
import logoPeugeot from '../../assets/logo/Peugeot-logo.png'
import logoKia from '../../assets/logo/kia.png'
import logoToyota from '../../assets/logo/toyota.png'
import logoMitsubishi from '../../assets/logo/mitsubishi.png'
import logoChevrolet from '../../assets/logo/chevrolet.png'
import logoAudi from '../../assets/logo/Audi_logo.png'
import logoMazda from '../../assets/logo/mazda.png'
import logoJeep from '../../assets/logo/jeep.png'
import logoRenault from '../../assets/logo/renault.png'
import logoHyundai from '../../assets/logo/hyundai.png'
import logoMercedez from '../../assets/logo/mercedez.png'


import backMain from '../../assets/background/photo3.jpg'
import {BodyHome} from "./BodyHome";
// import {loadGoogleMaps, removeGoogleMaps} from "./GoogleMaps";

export const LandingPage = () => {
    const btnRef3 = useRef(null);
    const [googleMapsReadyChillan, setGoogleMapsReadyChillan] = useState(true);
    const [googleMapsReadyTalca, setGoogleMapsReadyTalca] = useState(false);
    
    useEffect(() => {
        setGoogleMapsReadyChillan(true);
        setGoogleMapsReadyTalca(false);
    }, [])

    window.onscroll = function () {
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            document.getElementById("navbar").style.height = "62px";
        } else {
            document.getElementById("navbar").style.height = "100px";
        }
    };

    return (

        <div className="landing-body">
            <a href={'https://wa.me/+56986835533'}
               className="whatsapp_float"
               target="_blank"
               rel="noopener noreferrer">
                <i className="pi pi-whatsapp text-4xl" style={{paddingTop: '.8rem'}}></i>
            </a>

            { /* Header */}
            <div id="navbar" className="bg-gray-900 py-3 px-6 shadow-2 flex align-items-center justify-content-between fixed"
                 style={{width: '100%', zIndex: '100',transition: '0.4s'}}>
                <a id="logo" className="logo" aria-label="logo" href="#top">
                    <img src={logo} alt="Image" height="65"/>
                </a>
                <StyleClass nodeRef={btnRef3} selector="@next" enterClassName="hidden" leaveToClassName="hidden"
                            hideOnOutsideClick>
                    <a ref={btnRef3} className="cursor-pointer block lg:hidden text-gray-400">
                        <i className="pi pi-bars text-4xl"></i>
                    </a>
                </StyleClass>
                <div
                    className="bg-gray-900 align-items-center flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full left-0 top-100 px-6 lg:px-0 shadow-2 lg:shadow-none z-2">
                    <section></section>
                    <ul className="list-none text-lg  p-0 m-0 flex lg:align-items-center text-gray-400 select-none flex-column lg:flex-row cursor-pointer">

                        <li>
                            <a href="#service"
                               className="p-ripple flex px-0 lg:px-5 py-3 text-100 hover:text-orange-600 hover:bg-gray-800 border-round active:bg-black-alpha-10 focus:text-orange-600 font-medium transition-colors transition-duration-150   no-underline">
                                <span>Servicios</span>
                                <Ripple/>
                            </a>
                        </li>
                        <li>
                            <a href="#gallery"
                               className="p-ripple flex px-0 lg:px-5 py-3 text-100 hover:text-orange-600 hover:bg-gray-800 border-round active:bg-black-alpha-10 focus:text-orange-600 font-medium transition-colors transition-duration-150   no-underline">
                                <span>Galería</span>
                                <Ripple/>
                            </a>
                        </li>
                        <li>
                            <a href="#aboutus"
                               className="p-ripple flex px-0 lg:px-5 py-3 text-100 hover:text-orange-600 hover:bg-gray-800 border-round active:bg-black-alpha-10 focus:text-orange-600 font-medium transition-colors transition-duration-150   no-underline">
                                <span>Conócenos</span>
                                <Ripple/>
                            </a>
                        </li>
                        <li>
                            <a href="#team"
                               className="p-ripple flex px-0 lg:px-5 py-3 text-100 hover:text-orange-600 hover:bg-gray-800 border-round active:bg-black-alpha-10 focus:text-orange-600 font-medium transition-colors transition-duration-150   no-underline">
                                <span>Equipo</span>
                                <Ripple/>
                            </a>
                        </li>


                        <li>
                            <a href="#contact"
                               className="p-ripple flex px-0 lg:px-5 py-3 text-100 hover:text-orange-600 hover:bg-gray-800 border-round active:bg-black-alpha-10 focus:text-orange-600 font-medium transition-colors transition-duration-150   no-underline">
                                <span>Contacto</span>
                                <Ripple/>
                            </a>
                        </li>

                    </ul>
                    {/* <ul className="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row border-top-1 surface-border lg:border-top-none">
                        <li onClick={() => {
                                    //eslint-disable-next-line
                                    location.href = "#contact";
                                    setGoogleMapsReadyChillan(true);
                                    setGoogleMapsReadyTalca(false);
                                    }}>
                            {googleMapsReadyTalca ? 
                             <a className="p-ripple flex px-0 lg:px-5 py-3 text-100 hover:text-orange-600 hover:bg-gray-800 border-round active:bg-black-alpha-10 focus:text-orange-600 font-medium transition-colors transition-duration-150   no-underline" >
                                <i className="pi pi-home text-base lg:text-2xl mr-2 lg:mr-0"></i>
                                <span className="block font-medium" style={{padding: '0 10px 0'}}>Sucursal Chillán</span>

                                <Ripple />
                            </a>
                            : 
                            <a className="p-ripple flex px-0 lg:px-5 py-3 text-100 text-orange-600 hover:bg-gray-800 border-round active:bg-black-alpha-10 focus:text-orange-600 font-medium transition-colors transition-duration-150   no-underline" >
                                <i className="pi pi-home text-base lg:text-2xl mr-2 lg:mr-0"></i>
                                <span className="block font-medium" style={{padding: '0 10px 0'}}>Sucursal Chillán</span>

                                <Ripple />
                            </a>
                            }
                        </li>
                        <li onClick={() => {
                                    //eslint-disable-next-line
                                    location.href = "#contact";
                                    setGoogleMapsReadyChillan(false);
                                    setGoogleMapsReadyTalca(true);
                                    }}>
                            {googleMapsReadyTalca ? 
                              <a className="p-ripple flex px-0 lg:px-5 py-3 text-100 text-orange-600 hover:bg-gray-800 border-round active:bg-black-alpha-10 focus:text-orange-600 font-medium transition-colors transition-duration-150   no-underline" >
                                <i className="pi pi-home text-base lg:text-2xl mr-2 lg:mr-0"></i>
                                <span className="block font-medium" style={{padding: '0 10px 0'}}>Sucursal Talca</span>
                                <Ripple />
                            </a>
                            : 
                            <a className="p-ripple flex px-0 lg:px-5 py-3 text-100 hover:text-orange-600 hover:bg-gray-800 border-round active:bg-black-alpha-10 focus:text-orange-600 font-medium transition-colors transition-duration-150   no-underline" >
                                <i className="pi pi-home text-base lg:text-2xl mr-2 lg:mr-0"></i>
                                <span className="block font-medium" style={{padding: '0 10px 0'}}>Sucursal Talca</span>
                                <Ripple />
                            </a>
                            }
                       
                        </li>
                    </ul> */}
                    <div
                        className="flex justify-content-between lg:block border-top-1 lg:border-top-none border-gray-800 py-3 lg:py-0 mt-3 lg:mt-0">
                    </div>
                </div>
            </div>

            { /* Banner principal */}
            <div id="top" className="bg-gray-900 px-4 py-8 md:px-6 lg:px-8" style={{
                backgroundImage: `linear-gradient(to right, black, rgba(98, 98, 98, 0.73)), url(${backMain})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }}>
                <div className="flex flex-wrap" style={{padding: '40px 8% 40px'}}>
                    <div className="w-12 lg:w-6 p-4">
                        <div className="flex flex-wrap">
                            <h1 className="text-6xl text-white font-bold c mt-0 mb-3">Mecánica</h1><span
                            className="text-6xl font-bold c mt-0 mb-3 text-orange-500 underline">Fortaleza</span>
                        </div>

                        <p className="text-3xl text-white mt-0 mb-5">Realizamos todo tipo de trabajos relacionados con
                            la reparación y el cuidado de su vehículo.</p>
                        <ul className="list-none p-0 m-0">
                            <li className="mb-3 flex align-items-center"><i
                                className="pi pi-compass text-orange-500 text-xl mr-2"></i>
                                <span className="text-white line-height-3">Mantencionnes y reparaciónes de cajas automáticas y mecánicas.</span>
                            </li>
                            <li className="mb-3 flex align-items-center"><i
                                className="pi pi-compass text-orange-500 text-xl mr-2"></i>
                                <span className="text-white line-height-3">Ajustes y mantención de motores a gasolina y diésel.</span>
                            </li>
                            <li className="mb-3 flex align-items-center"><i
                                className="pi pi-compass text-orange-500 text-xl mr-2"></i>
                                <span className="text-white line-height-3">Scanner multimarca.</span>
                            </li>
                            <li className="mb-3 flex align-items-center"><i
                                className="pi pi-compass text-orange-500 text-xl mr-2"></i>
                                <span className="text-white line-height-3">Electromecánica.</span>
                            </li>
                            <li className="mb-3 flex align-items-center"><i
                                className="pi pi-compass text-orange-500 text-xl mr-2"></i>
                                <span className="text-white line-height-3">Desabolladura y pintura.</span>
                            </li>
                            <li className="mb-3 flex align-items-center"><i
                                className="pi pi-compass text-orange-500 text-xl mr-2"></i>
                                <span className="text-white line-height-3 font-bold"> Y Mucho más...</span>
                            </li>
                        </ul>
                        <div className="button-demo">
                            <div className="template">
                                <Button id="contactButtonChillan" className="amazon p-0 text-white font-bold" aria-label="Amazon" onClick={() => {
                                    //eslint-disable-next-line
                                    location.href = "#contact";
                                    setGoogleMapsReadyChillan(true);
                                    setGoogleMapsReadyTalca(false);
                                    }}>                                                                                                
                                    <i className="pi pi-map-marker px-2"></i>
                                    <span className="px-3">Visítanos en CHILLÁN</span>
                                </Button>
                                {/* <Button id="contactButtonTalca" className="amazon p-0 text-white font-bold" aria-label="Amazon" onClick={() => {
                                        //eslint-disable-next-line
                                        location.href = "#contact";
                                        setGoogleMapsReadyChillan(false);
                                        setGoogleMapsReadyTalca(true);
                                    }}>
                                    <i className="pi pi-map-marker px-2"></i>
                                    <span className="px-3">Visítanos en TALCA</span>
                                </Button> */}
                                <Button className="facebook p-0 font-bold" aria-label="Facebook" onClick={() => {
                                    //eslint-disable-next-line
                                    window.open('https://www.facebook.com/mecanica.fortaleza.3', '_blank')
                                }}>
                                    <i className="pi pi-facebook px-2"></i>
                                    <span className="px-3">Facebook</span>
                                </Button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            { /* Marcas */}
            <div className="surface-100 px-4 md:px-6 lg:px-4">
                <div className="flex justify-content-evenly flex-wrap" style={{padding: '40px 40px'}}>
                    <div className="p-1">
                        <img src={logoHyundai} alt="Image" height="50"/>
                    </div>
                    <div className="p-1">
                        <img src={logoPeugeot} alt="Image" height="50"/>
                    </div>
                    <div className="p-1">
                        <img src={logoMazda} alt="Image" height="50"/>
                    </div>
                    <div className="p-1">
                        <img src={logoMitsubishi} alt="Image" height="50"/>
                    </div>
                    <div className="p-1">
                        <img src={logoToyota} alt="Image" height="60"/>
                    </div>
                    <div className="p-1">
                        <img src={logoKia} alt="Image" height="50"/>
                    </div>
                    <div className="p-1">
                        <img src={logoAudi} alt="Image" height="50"/>
                    </div>
                    <div className="p-1">
                        <img src={logoJeep} alt="Image" height="50"/>
                    </div>
                    <div className="p-1">
                        <img src={logoChevrolet} alt="Image" height="50"/>
                    </div>
                    <div className="p-1">
                        <img src={logoMercedez} alt="Image" height="50"/>
                    </div>
                    <div className="p-1">
                        <img src={logoFord} alt="Image" height="50"/>
                    </div>
                    <div className="p-1">
                        <img src={logoRenault} alt="Image" height="50"/>
                    </div>
                </div>
            </div>

            { /* Body Desktop */}
            {(window.innerWidth > 768)?
                <div className="surface-100 px-4 md:px-8 lg:px-8">
                <div className="bg-white card" style={{padding: '40px 8% 40px'}}>
                   <BodyHome googleMapsReadyChillan={googleMapsReadyChillan} googleMapsReadyTalca={googleMapsReadyTalca}/>
                </div>
            </div>
            :<div className="md:hidden bg-white card">
                    <BodyHome googleMapsReadyChillan={googleMapsReadyChillan} googleMapsReadyTalca={googleMapsReadyTalca}/>
                </div>}

            { /* Footer */}
            <div className="grid grid-nogutter surface-section px-4 py-4 md:px-6 lg:px-8 border-top-1 surface-border">
                <div className="col-12 lg:col-6  surface-border">

                </div>

            </div>
            <div
                className="surface-900 py-6 lg:py-4 md:px-6 lg:px-8 flex flex-column lg:flex-row justify-content-between align-items-center">
                <ul className="list-none p-0 mb-0 flex flex-column md:flex-row flex-order-1 lg:flex-order-0 mt-4 lg:mt-0">
                    <li className="mr-4 mt-3 lg:mt-0">
                        <span className="text-500 block mt-4">Mecanica Fortaleza © 2022</span>
                    </li>
                </ul>

                <div className="flex align-items-center flex-order-0 lg:flex-order-1">
                    <a tabIndex="0" className="cursor-pointer mr-3 lg:mt-0 block">
                        <i className="pi pi-facebook surface-section p-1 text-sm border-circle text-900"></i>
                    </a>
                    <a tabIndex="0" className="cursor-pointer mr-3 lg:mt-0 block">
                        <i className="pi pi-twitter surface-section p-1 text-sm border-circle text-900"></i>
                    </a>
                    <a tabIndex="0" className="cursor-pointer mr-3 lg:mt-0 block">
                        <i className="pi pi-youtube surface-section p-1 text-sm border-circle text-900"></i>
                    </a>
                    <a tabIndex="0" className="cursor-pointer lg:mt-0 block">
                        <i className="pi pi-google surface-section p-1 text-sm border-circle text-900"></i>
                    </a>
                </div>
            </div>


        </div>
    );

}
