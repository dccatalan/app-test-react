import React from 'react';
import photoPerson01 from '../../assets/gallery/persona01.png'



export const SectionTeam = () => {

    return (
        <div>
            { /* TEAM */}
            <div id="team" className="surface-section px-4 py-8 md:px-6 lg:px-8 border-top-1 surface-border">
                <div className="mb-3 font-bold text-4xl">
                    <span className="text-900 ">Un Equipo, </span>
                    <span className="text-orange-500">Muchas Soluciones</span>
                </div>
                <div className="text-center text-xl line-height-3 text-600 mb-6">Nuestro equipo está conformado con los mejores especialistas enfocados en ofrecer un servicio rápido y eficiente.</div>
                <div className="grid">
                    <div className="col-12 md:col-4 text-center mb-5">
                        <img src={photoPerson01} alt="avatar-f-1" className="mb-3" />
                        <div className="text-xl text-900 font-medium mb-3">Nestor Jaime Cabrera Valencia</div>
                        <div className="text-blue-600 text-xl mb-3">Jefe de taller</div>
                        <div className="mb-3"><span className="text-700 line-height-3">Coordinador, encargado de la gestión y control de calidad del taller.</span></div>
                    </div>
                    {/* <div className="col-12 md:col-4 text-center mb-5">
                        <img src={photoPerson01} alt="avatar-f-2" className="mb-3" />
                        <div className="text-xl text-900 font-medium mb-3">Argenis Gonzalez</div>
                        <div className="text-blue-600 text-xl mb-3">Cajas automáticas y mecánicas</div>
                        <div className="mb-3"><span className="text-700 line-height-3">Especialista en el funcionamiento de cajas de cambio en sus distintas versiones.</span></div>
                    </div> */}
                    <div className="col-12 md:col-4 text-center mb-5">
                        <img src={photoPerson01} alt="avatar-m-1" className="mb-3" />
                        <div className="text-xl text-900 font-medium mb-3">Johan Manuel Galindo Rico</div>
                        <div className="text-blue-600 text-xl mb-3">Electricidad Automotriz</div>
                        <div className="mb-3"><span className="text-700 line-height-3">Reparación de Módulos TCM, PCM, codificación de computadoras, reprogramaciones y todo en electromecánica.</span></div>
                    </div>
                    {/* <div className="col-12 md:col-4 text-center mb-5">
                        <img src={photoPerson01} alt="avatar-m2" className="mb-3" />
                        <div className="text-xl text-900 font-medium mb-3">JJ Rodriguez</div>
                        <div className="text-blue-600 text-xl mb-3">Motores diésel y mecénica general</div>
                        <div className="mb-3"><span className="text-700 line-height-3">Especialista en vehiculos diésel y mecánica general multimarca.</span></div>
                    </div> */}
                    <div className="col-12 md:col-4 text-center mb-5">
                        <img src={photoPerson01} alt="avatar-m-1" className="mb-3" />
                        <div className="text-xl text-900 font-medium mb-3">Carlos Rodriguez Valencia</div>
                        <div className="text-blue-600 text-xl mb-3">Motores a gasolina y mecánica general</div>
                        <div className="mb-3"><span className="text-700 line-height-3">Especialista en vehículos a gasolina multimarca y mecánica general.</span></div>
                    </div>
                    <div className="col-12 md:col-4 text-center mb-0 md:mb-5">
                        <img src={photoPerson01} alt="avatar-m-1" className="mb-3" />
                        <div className="text-xl text-900 font-medium mb-3">Gioanny Ramirez Smith</div>
                        <div className="text-blue-600 text-xl mb-3">Area de desabolladura y Pintura </div>
                        <div className="mb-3"><span className="text-700 line-height-3">Especialista en pintura y desabolladuria de todo tipo de vehículos y carroserías.</span></div>
                    </div>
                </div>
            </div>
        </div>
    );

}
