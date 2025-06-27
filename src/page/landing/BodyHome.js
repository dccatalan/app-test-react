import React from 'react';

import { SectionService } from './SectionService';
import { SectionContact } from './SectionContact';
import { SectionTeam } from './SectionTeam';
import { SectionGallery } from './SectionGallery';
import { SectionAboutus } from './SectionAboutus';

export const BodyHome = ({googleMapsReadyChillan, googleMapsReadyTalca}) => {
    
    return (

        <>
            {/* Services */}
            <SectionService />

            { /* Galería */}
            <SectionGallery/>

            { /* Nosotros */}
            <SectionAboutus />          
            
            {/* Equipo* */}
            <SectionTeam />

            { /* Contacto */}
            <SectionContact googleMapsReadyChillan={googleMapsReadyChillan} googleMapsReadyTalca={googleMapsReadyTalca} />

        </>
    );

}
