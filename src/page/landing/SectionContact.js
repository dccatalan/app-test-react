import React from 'react';

import {GMap} from 'primereact/gmap';

const locations =   {  
    chillan: {
        dir: "Blanco Encalda 267, Chillán, Ñuble",
        lat: -36.6068668,
        lng: -72.0877673,
        cel: "+56986835533",
        title: "Mecanica Fortaleza Chillán"
    },
    talca:{
        dir: "6 Oriente 0197, Talca, Maule",
        lat: -35.4487428,
        lng: -71.664418,
        cel: "+56986835533",
        title: "Mecanica Fortaleza Talca"

    }
}
export const SectionContact = ({googleMapsReadyChillan,googleMapsReadyTalca}) => {

    const optionsChillan = {
        center: {lat: locations.chillan.lat, lng: locations.chillan.lng},
        zoom: 15
    }
    const optionsTalca = {
        center: {lat: locations.talca.lat, lng: locations.talca.lng},
        zoom: 15
    }
    // eslint-disable-next-line
    const marksChillan = [new google.maps.Marker({
        position: {lat: locations.chillan.lat, lng: locations.chillan.lng},
        title: locations.chillan.title
    })]
    // eslint-disable-next-line
    const marksTalca = [new google.maps.Marker({
        position: {lat: locations.talca.lat, lng: locations.talca.lng},
        title: locations.talca.title
    })]


    const onOverlayClick = (event) => {
        let isMarker = event.overlay.getTitle !== undefined;
        if(isMarker) {
            if (googleMapsReadyChillan) {
                window.open('https://www.google.com/maps/place/Taller+mecanica+fortaleza+s.p.a/@-36.6068975,-72.0877171,15z/data=!4m2!3m1!1s0x0:0xce14cb12425fbc4a?sa=X&ved=2ahUKEwiuy9LppZv8AhUtLbkGHbQXBm4Q_BJ6BAhjEAg', '_blank')
            } else {
                window.open('https://www.google.com/maps/place/Calle+6+Ote.+197,+Talca,+Maule/@-35.4487428,-71.6686937,16z/data=!4m5!3m4!1s0x9665c15502480bd3:0xb46d2ebb03851312!8m2!3d-35.448367!4d-71.6643861', '_blank')

            }
        }
    }
    return (
        <div>

            { /* Contacto */}
            <div id="contact" className="surface-section px-4 py-8 md:px-6 lg:px-8 border-top-1 surface-border">
                <div>
                    <div className="surface-section px-4 py-8 md:px-6 lg:px-8">
                        <div className="grid">
                            <div className="col-12 lg:col-6">
                                <div className="text-900 text-2xl font-bold mb-4">Contacto</div>
                                <p className="text-700 line-height-3 pr-0 lg:pr-5">Visítanos en nuestra sucursal de <span className="text-1xl text-900 mb-2 font-bold"> {googleMapsReadyTalca ? 'Talca': 'Chillán'} </span>o contáctanos a través de Nuestro WhatsApp.</p>
                            </div>
                            <div className="col-12 md:col-6 lg:col-3">
                                <div className="flex align-items-start">
                                    <div>
                                        <span className="flex align-items-center justify-content-center bg-red-500 border-round mr-3"
                                            style={{height: '3rem', width: '3rem'}}>
                                            <i className="pi pi-map-marker text-100 text-4xl"></i>
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-2xl text-900 mb-2 font-medium">Dirección</span>
                                        <p className="text-700 line-height-3">  {googleMapsReadyTalca ? locations.talca.dir: locations.chillan.dir}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-6 lg:col-3">
                                <div className="flex align-items-start">
                                    <div>
                                        <span className="flex align-items-center justify-content-center bg-green-500 border-round mr-3"
                                            style={{height: '3rem', width: '3rem'}}>
                                            <i className="pi pi-whatsapp text-100 text-4xl"></i>
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-2xl text-900 mb-2 font-medium">Whatsapp</span>
                                        <p className="text-700 line-height-3">{googleMapsReadyTalca ? locations.talca.cel: locations.chillan.cel}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        googleMapsReadyTalca && (
                            <div className="card">
                                <GMap overlays={marksTalca} options={optionsTalca} onOverlayClick={onOverlayClick}
                                    style={{width: '100%', minHeight: '320px'}}/>
                            </div>
                        )                           
                    }
                    {
                        googleMapsReadyChillan && (
                            <div className="card">
                                <GMap overlays={marksChillan} options={optionsChillan} onOverlayClick={onOverlayClick}
                                    style={{width: '100%', minHeight: '320px'}}/>
                            </div>
                        )
                    }
                </div>

            </div>
        </div>
    );

}
