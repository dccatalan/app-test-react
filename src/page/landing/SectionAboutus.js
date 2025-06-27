import React from 'react';
import team from '../../assets/logo/teams.png'

export const SectionAboutus = () => {
   
    return (
        <div>
            { /* Nosotros */}
            <div id="aboutus" className="surface-section px-4 py-8 md:px-6 lg:px-8 border-top-1 surface-border">
                <div className="flex flex-wrap">
                    <div className="w-full xl:w-6 p-3 pr-5">
                        <span className="text-organge-600 text-4xl font-bold mb-4 block">Conócenos</span>
                        <div className="font-bold text-900 text-5xl mb-4">¿Quienes somos?</div>
                        <div className="mt-0 mb-5 text-700 line-height-3 text-xl align-items-center mb-4">
                            <div>
                                <p className="text-700 text-base text-justify mb-1">Somos un taller mecánico
                                    multimarca
                                    focalizado en brindar un servicio completo y de calidad.
                                </p>
                                <p className="text-700 text-base text-justify ">
                                    Todos nuestros trabajos están garantizados y son realizados con
                                    especialistas
                                    certificados por área. Nos especializamos en todo tipo de diagnósticos y
                                    resolución de problemas de distintos tipos de vehículos y de todas las
                                    marcas
                                    del mercado.
                                </p>
                                <p className="text-700 text-base text-justify mb-1">
                                    Entendemos que su vehículo representa una gran inversión y todo trabajo
                                    se
                                    realiza pensando en lo que significa para usted de la manera más rápida
                                    y
                                    eficiente posible.
                                </p>
                                <p className="text-700 text-base text-justify mb-1">
                                    Nuestra política de calidad refleja la confianza en nuestro trabajo y la
                                    calidad
                                    de nuestros especialistas.
                                </p>
                            </div>
                        </div>
                    </div>
                    <img src={team} alt="Image"
                         className="w-full xl:w-6 p-3 flex align-items-center justify-content-center bg-orange-50 p-4 lg:p-3 mt-5 xl:mt-0"
                         style={{borderRadius: '30px'}}/>


                </div>
            </div>
        </div>
    );

}
