import React from 'react';
import {Carousel} from 'primereact/carousel';
import photo3 from '../../assets/gallery/photo3.jpeg'
import photo4 from '../../assets/gallery/photo4.jpeg'
import photo7 from '../../assets/gallery/photo7.jpeg'
import photo8 from '../../assets/gallery/photo8.jpeg'
import photo11 from '../../assets/gallery/photo11.jpeg'


export const SectionService = () => {

        const services = [
        {
            title: 'Cajas de cambio',
            description: '▸ Scanner y diagnósticos de todas las marcas y tipos de caja automáticas y mecánicas.\n' +
                '▸ Revisión y reparación de cajas automáticas CVT, ATF, DSG, TRIPTONIC\n' +
                '▸ Cambios de aceite\n' +
                '▸ Diagnósticos preventivos\n' +
                '▸ Mantenciones en general',
            img: photo4
        },
        {
            title: 'Electromecánica',
            description: '▸\tScanner Multimarca\n' +
                '▸\tRegeneración DPF\n' +
                '▸\tConfiguración y limpieza de inyectores\n' +
                '▸\tRevisión e instalación de alarmas \n' +
                '▸\tRevisión de batería, alternadores, motores de arranque.\n' +
                '▸\tDiagnósticos de fallas eléctricas generales.',
            img: photo8
        }
        , {
            title: 'Motores',
            description: '▸\tCambios de aceite\n' +
                '▸\tMantenciones en general\n' +
                '▸\tAjustes y semi-ajustes\n' +
                '▸\tReparación de fugas',
            img: photo3
        }
        , {
            title: 'Mecánica general',
            description: '▸\tTren delantero\n' +
                '▸\tSuspensión\n' +
                '▸\tRevisión y reparación de frenos\n' +
                '▸\tRevisión de ruidos',
            img: photo7
        }, {
            title: 'Desabolladura y pintura ',
            description: '▸\tTodo tipo de desabolladuria \n' +
                '▸\tPinturas tricapa\n' +
                '▸\tPinturas perladas\n' +
                '▸\tTodo trabajo correctivo, uso mínimo de masilla.\n' +
                '▸\tSimunizado',
            img: photo11
        }
    ]
    const serviceTemplate = (service) => {
        return (

            <>
                {(window.innerWidth > 768)?
                    <div className="surface-card border-round flex shadow-2 border-round"
                         style={{margin: '6px 6px 6px 6px'}}>
                        <div className="surface-50 flex align-items-center justify-content-center py-3 px-5">
                            <img src={service.img} width={300} height={210} alt="Image" className="mx-auto block mb-2 "/>
                        </div>
                        <div className="py-3 px-5 flex flex-column align-items-start">
                            <div className="text-900 font-medium mb-3 text-xl">{service.title}</div>
                            <p className="mt-0 mb-4 p-0 text-left  line-height-3"
                               style={{whiteSpace: 'pre-line'}}>{service.description}</p>
                        </div>
                    </div>
                :


                <div className="surface-card border-round shadow-2 p-4 text-center">
                    <img src={service.img} alt="Image" className="mx-auto block mb-4 w-full"/>
                    <div className="text-900 font-medium mb-3 text-xl">{service.title}</div>
                    <p className="mt-0 mb-4 p-0 line-height-3 text-left"
                       style={{whiteSpace: 'pre-line'}}>{service.description}</p>
                </div>}

            </>

        );
    }
    return (
        <div>

        { /* Servicios */}

        <div id="service" className="surface-section px-4 py-8 md:px-6 lg:px-8 text-center">

            <div className="font-bold text-orange-600 text-3xl mb-3 text-center">Deja tu auto en nuestras manos
            </div>
            <div className="lg:ml-6 p-3 text-center bg-orange-500"
                style={{borderRadius: '12px', width: '90%'}}>
                            <span
                                className="inline-flex justify-content-center align-items-center bg-orange-600 border-circle mb-3"
                                style={{width: '49px', height: '49px'}}>
                                <i className="pi pi-users text-xl text-white"></i>
                            </span>
                <span className="text-orange-100 font-medium text-gray-50 font-bold ml-2">Estamos orientados en brindar la mejor atención y
                            servicio en la mantención de su vehículo, dándole un valor agregado y ofreciéndole la seguridad que su inversión siempre estará en buenas manos.</span>
            </div>
            <div className="py-4">
                <Carousel value={services} numVisible={1} numScroll={1} circular autoplayInterval={6000}
                        itemTemplate={serviceTemplate}/>
            </div>
        </div>

        </div>
    );

}
