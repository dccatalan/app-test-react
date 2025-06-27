import React, {useEffect, useRef, useState} from 'react';
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {Dialog} from "primereact/dialog";
import {classNames} from "primereact/utils";
import { Calendar } from 'primereact/calendar';
import {Toast} from "primereact/toast";

export const DialogDataTeam = ({teamDialog, setTeamDialog, team, setTeam, teams, setTeams}) => {
  
    let emptyTeam = {
        id: null,
        run: '',
        names: '',
        fatherName: '',
        motherName: '',
        email: '',
        dateIngress: '',
        address: '',
        phone: '',
        whatsapp: '',
        availability: ''
    };

    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);

    

    useEffect(() => {
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const hideDialog = () => {
        setSubmitted(false);
        setTeam(emptyTeam);
        setTeamDialog(false);

    }

    const saveClient = () => {
        setSubmitted(true);
        let _clients = [...teams];
        let _client = {...team};
        if (team.id) {
            const index = findIndexById(team.id);
            _clients[index] = team; 
            toast.current.show({severity: 'success', summary: 'Acción exitosa', detail: 'Cliente Actualizado', life: 3000});
            setSubmitted(false);
            setTeams(_clients);
            setTeamDialog(false);
            setTeam(emptyTeam);
        } else {
            if (team.run !== "" && team.names !== "" && team.fatherName !== "" && team.motherName !== "" && team.address !== "" && team.phone !== "" ) {
                _client.id = createId();
                _clients.push(_client);              
                toast.current.show({severity: 'success', summary: 'Acción exitosa', detail: 'Cliente Creado', life: 3000});                   
                setSubmitted(false);
                setTeams(_clients);
                setTeamDialog(false);
                setTeam(emptyTeam);
            }              
        }
    }

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < teams.length; i++) {
            if (teams[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _client = {...team};
        _client[`${name}`] = val;

        setTeam(_client);
    }
    
    const onInputChangeYear = (e, name) => {
        if ( e != null && e.length > 3) {
            const val = (e) || '';
            let _client = {...team};
            _client[`${name}`] = val+"";
            setTeam(_client);
        }
    }
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog}/>
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveClient}/>
        </React.Fragment>
    );

    return (
        <div>
            <div className="flex flex-column relative flex-auto">
                <div className="p-5 flex flex-column flex-auto">
                    <div className="grid">
                        <div className="col-12 lg:col-12">
                            <div className="p4 border-round p-fluid">
                                <div className="datatable-crud-demo">                             
                                    <Toast ref={toast}/>
                                    <Dialog visible={teamDialog} style={{width: '450px'}} header="Detalles de colaborador"
                                            modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                                        <div className="field">
                                            <label htmlFor="dateIngress">Fecha Ingreso</label>
                                            <Calendar id="dateIngress" value={new Date(team.dateIngress)} onChange={(e) => onInputChangeYear(e.value, 'dateIngress')} dateFormat="dd/mm/yy" disabled/>                                            
                                        </div>
                                        <div className="field">
                                            <label htmlFor="run">Run</label>
                                            <InputText id="run" value={team.run}
                                                       onChange={(e) => onInputChange(e, 'run')} required autoFocus
                                                       className={classNames({'p-invalid': submitted && !team.run})}/>
                                            {submitted && !team.run &&
                                            <small className="p-error">El RUN es requerido.</small>}
                                        </div>
                                        <div className="field">
                                            <label htmlFor="names">Nombre</label>
                                            <InputText id="names" value={team.names}
                                                       onChange={(e) => onInputChange(e, 'names')} required autoFocus
                                                       className={classNames({'p-invalid': submitted && !team.names})}/>
                                            {submitted && !team.names &&
                                            <small className="p-error">El nombre es requerido.</small>}
                                        </div>
                                        <div className="field">
                                            <label htmlFor="fatherName">Apellido Paterno</label>
                                            <InputText id="fatherName" value={team.fatherName}
                                                       onChange={(e) => onInputChange(e, 'fatherName')} required autoFocus
                                                       className={classNames({'p-invalid': submitted && !team.fatherName})}/>
                                            {submitted && !team.fatherName &&
                                            <small className="p-error">Apellido requerido.</small>}
                                        </div>
                                        <div className="field">
                                            <label htmlFor="motherName">Apellido Materno</label>
                                            <InputText id="motherName" value={team.motherName}
                                                       onChange={(e) => onInputChange(e, 'motherName')} required autoFocus
                                                       className={classNames({'p-invalid': submitted && !team.motherName})}/>
                                            {submitted && !team.motherName &&
                                            <small className="p-error">Apellido requerido.</small>}
                                        </div>
                                        <div className="field">
                                            <label htmlFor="phone">Teléfono</label>
                                            <InputText id="phone" value={team.phone}
                                                       onChange={(e) => onInputChange(e, 'phone')} required autoFocus
                                                       className={classNames({'p-invalid': submitted && !team.phone})}/>
                                            {submitted && !team.phone &&
                                            <small className="p-error">El teléfono es requerido.</small>}
                                        </div>
                                        <div className="field">
                                            <label htmlFor="whatsapp">Whatsapp</label>
                                            <InputText id="whatsapp" value={team.whatsapp}
                                                       onChange={(e) => onInputChange(e, 'whatsapp')} required autoFocus/>
                                            {/* {submitted && !team.whatsapp &&
                                            <small className="p-error">Whatapp es requerido.</small>} */}
                                        </div>
                                        <div className="field">
                                            <label htmlFor="email">Correo</label>
                                            <InputText id="email" value={team.email}
                                                       onChange={(e) => onInputChange(e, 'email')} required autoFocus/>
                                            {/* {submitted && !team.email &&
                                            <small className="p-error">El correo es requerido.</small>} */}
                                        </div>
                                        <div className="field">
                                            <label htmlFor="address">Dirección</label>
                                            <InputText id="address" value={team.address}
                                                       onChange={(e) => onInputChange(e, 'address')} required autoFocus
                                                       className={classNames({'p-invalid': submitted && !team.address})}/>
                                            {submitted && !team.address &&
                                            <small className="p-error">La dirección es requerida.</small>}
                                        </div>
                                    </Dialog>                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
