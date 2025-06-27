import React, {useEffect, useRef, useState} from 'react';
import {Divider} from "primereact/divider";
import {Button} from "primereact/button";
import {AutoComplete} from 'primereact/autocomplete';
import {getAll} from '../../services/team/TeamService'
import {Dropdown} from "primereact/dropdown";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Toast} from 'primereact/toast';

export const SelectTeamMember = ({serviceToSetHistory, setServiceToSetHistory}) => {


    const [members, setMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [valuefilterTypeService, setValuefilterTypeService ] = useState('');
    const [valuefilterTypeFuel, setValuefilterTypeFuels ] = useState('');
    const [valuefilterTypeTransmission, setValuefilterTypeTransmission ] = useState('');
    const toast = useRef(null);

    const typeService = [
        { name: 'Todas las areas', id: 'ALL' },
        { name: 'Motor', id: 'MOT' },
        { name: 'Transmision', id: 'CAJ' },
        { name: 'Pintura', id: 'PINT' },
        { name: 'Electricidad', id: 'ELEC' },        
        { name: 'Carroseria', id: 'CARR' }
    ];
    
    const typesFuels = [
        { name: 'Diésel', id: 'D' },
        { name: 'Gasolina', id: 'G' },
        { name: 'Híbrido', id: 'H' }       
    ];

    const typesTransmissions = [
        { name: 'Automática', id: 'AUT' },
        { name: 'Mecánica', id: 'MEC' }       
    ];

    // const [listToTeamDatatable, setListTeamDatatable ] = useState([]);


    useEffect(() => {
        setMembers(getAll())
        // setListTeamDatatable(serviceToSetHistory.team)
    }, [])

    const searchClient = (event) => {
        setTimeout(() => {
            let filteredMembers = [];
            if (!event.query.trim().length) {
                filteredMembers = [...members];
            } else {
                filteredMembers = members.filter((member) => {
                    return member.names.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }
            setFilteredMembers(filteredMembers);
        }, 250);
    }


    const itemTemplate = (item) => {
        return (
            <>
               {item.run+" "+item.names}
            </>
        );
    }

    const addTeamFromService = () => {
        let _teamIngress = {
            // id: (serviceToSetHistory.team.length)+1,
            id: selectedMember.id,
            name: selectedMember.names
        };
        serviceToSetHistory.team.push(_teamIngress);        
        setServiceToSetHistory(serviceToSetHistory);
        toast.current.show({
            severity: 'success',
            summary: 'Elemento eliminado de listado',
            detail: "Actualizacion Exitosa",
            life: 3000
        });
        // setValuefilterTypeServiceBudget('');
        setSelectedMember('');
    }

    const deleteTeamTableTeam = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-minus-circle" className="p-button-rounded p-button-danger mr-2"
                    onClick={() => deleteTeamAsignToService(rowData)}/>
            </React.Fragment>
        );
    }

    const deleteTeamAsignToService = (rowData) => {
        console.log(rowData)
        console.log("Eliminar personal")
        deleteTeamOfList(rowData.id)
        console.log("Agregar texto a eliminacion")
        console.log("Agregar Evento a Historial")
    }

    const deleteTeamOfList = (id) => {
        let _serviceToSetHistory = serviceToSetHistory.team.filter(val => val.id !== id);
        serviceToSetHistory.team = _serviceToSetHistory
        setServiceToSetHistory(serviceToSetHistory);

        toast.current.show({
            severity: 'success',
            summary: 'Tecnico desvinculado de servicio',
            detail: "Actualizacion Exitosa",
            life: 3000
        });
        // setValuefilterTypeServiceBudget('');
        setSelectedMember(' ');    
    }

    return (
        <div>
            <div className="text-900 font-semibold text-lg">Selección técnico</div>
            <Divider></Divider>
            <Toast ref={toast}/>
            <div className="surface-card p-3 shadow-2 border-round p-fluid">
                <div className="grid formgrid p-fluid">
                    <div className="field lg:col-6 mb-4 col-4 ">
                        <label htmlFor="typeService" className="font-medium text-900">Filtro por Area</label>
                        <Dropdown valueTemplate={valuefilterTypeService} options={typeService} onChange={(e) => setValuefilterTypeService(e.target.value.name )} optionLabel="name" placeholder="Seleccione area de servicio" />
                    </div>
                    {(valuefilterTypeService === 'Motor') && <div className="field lg:col-6 mb-4 col-4 ">
                        <label htmlFor="fuel" className="font-medium text-900">Combustible</label>
                        <Dropdown valueTemplate={valuefilterTypeFuel} options={typesFuels} onChange={(e) => setValuefilterTypeFuels(e.target.value.name )} optionLabel="name" placeholder="Seleccione Combustible" />
                    </div>}
                    {(valuefilterTypeService === 'Transmision') && <div className="field lg:col-6 mb-4 col-4 ">
                        <label htmlFor="transmission" className="font-medium text-900">Transmisión</label>
                        <Dropdown valueTemplate={valuefilterTypeTransmission} options={typesTransmissions} onChange={(e) => setValuefilterTypeTransmission(e.target.value.name )} optionLabel="name" placeholder="Seleccione Transmisión" />
                    </div>}
                </div>
                <div className="grid formgrid p-fluid">
                    <div className="field mb-4 col-12">
                        <label htmlFor="team" className="font-medium text-900">Seleccion de Tecnico</label>                                
                        <div className="flex m-1">
                            <div className="col-10 ml-2">
                                <AutoComplete value={selectedMember} suggestions={filteredMembers}
                                    completeMethod={searchClient} field="names" dropdown forceSelection
                                    onChange={(e) => setSelectedMember(e.value)} aria-label="Tecnicos"
                                    dropdownAriaLabel="Seleccione un Tecnico" />
                            </div>                                   
                            <div className="ml-2">
                                <Button label="Asignar" disabled={(selectedMember == null || filteredMembers == null)? true : false}  onClick={() => addTeamFromService()}/> 
                            </div>
                        </div>
                    </div>
                </div>
                {/* {console.log(listToTeamDatatable)} */}
                <div className="col-12 p-2 lg:col-12">                          
                    <DataTable value={serviceToSetHistory.team} header="Equipo asignado" responsiveLayout="stack"
                            breakpoint="960px">
                        <Column selectionMode="multiple" headerStyle={{width: '3rem'}}
                                exportable={false}></Column>
                        {/* <Column field="id" header="ID" sortable
                                style={{minWidth: '4rem'}}></Column> */}
                        <Column field="name" header="Nombre" sortable
                                style={{minWidth: '14rem'}}></Column>
                        <Column field="category" header="Area" sortable
                                style={{minWidth: '14rem'}}></Column>
                        <Column body={deleteTeamTableTeam} exportable={false}
                                style={{minWidth: '3rem'}}></Column>
                    </DataTable>
                </div>                 
            </div>
        </div>
    );

}
