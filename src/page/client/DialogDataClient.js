import React, {useEffect, useRef, useState} from 'react';
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {Dialog} from "primereact/dialog";
import {classNames} from "primereact/utils";
import { Calendar } from 'primereact/calendar';
import {Toast} from "primereact/toast";

export const DialogDataClient = ({clientDialog, setClientDialog, client, setClient, clients, setClients}) => {
    let emptyClient = {
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

    };

    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);

    

    useEffect(() => {
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const hideDialog = () => {
        setSubmitted(false);
        setClient(emptyClient);
        setClientDialog(false);

    }

    const saveClient = () => {
        setSubmitted(true);
        let _clients = [...clients];
        let _client = {...client};
        if (client.id) {
            const index = findIndexById(client.id);
            _clients[index] = client; 
            toast.current.show({severity: 'success', summary: 'Acción exitosa', detail: 'Cliente Actualizado', life: 3000});
            setSubmitted(false);
            setClients(_clients);
            setClientDialog(false);
            setClient(emptyClient);
        } else {
            if (client.run !== "" && client.names !== "" && client.fatherName !== "" && client.motherName !== "" && client.address !== "" && client.phone !== "" ) {
                _client.id = createId();
                _clients.push(_client);              
                toast.current.show({severity: 'success', summary: 'Acción exitosa', detail: 'Cliente Creado', life: 3000});                   
                setSubmitted(false);
                setClients(_clients);
                setClientDialog(false);
                setClient(emptyClient);
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
        for (let i = 0; i < clients.length; i++) {
            if (clients[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    const onInputChange = (e, name) => {
        // console.log(e);
        const val = (e.target && e.target.value) || '';
        let _client = {...client};
        _client[`${name}`] = val;

        setClient(_client);
    }
    
    const onInputChangeYear = (e, name) => {
        if ( e != null && e.length > 3) {
            const val = (e) || '';
            let _client = {...client};
            _client[`${name}`] = val+"";
            setClient(_client);
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

                                    <Dialog visible={clientDialog} style={{width: '450px'}} header="Detalles del cliente"
                                            modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                                        <div className="field">
                                            <label htmlFor="dateIngress">Fecha Ingreso</label>
                                            <Calendar id="dateIngress" value={new Date(client.dateIngress)} onChange={(e) => onInputChangeYear(e.value, 'dateIngress')} dateFormat="dd/mm/yy" disabled/>                                            
                                        </div>
                                        <div className="field">
                                            <label htmlFor="run">Run</label>
                                            <InputText id="run" value={client.run}
                                                       onChange={(e) => onInputChange(e, 'run')} required autoFocus
                                                       className={classNames({'p-invalid': submitted && !client.run})}/>
                                            {submitted && !client.run &&
                                            <small className="p-error">El RUN es requerido.</small>}
                                        </div>
                                        <div className="field">
                                            <label htmlFor="names">Nombre</label>
                                            <InputText id="names" value={client.names}
                                                       onChange={(e) => onInputChange(e, 'names')} required autoFocus
                                                       className={classNames({'p-invalid': submitted && !client.names})}/>
                                            {submitted && !client.names &&
                                            <small className="p-error">El nombre es requerido.</small>}
                                        </div>
                                        <div className="field">
                                            <label htmlFor="fatherName">Apellido Paterno</label>
                                            <InputText id="fatherName" value={client.fatherName}
                                                       onChange={(e) => onInputChange(e, 'fatherName')} required autoFocus
                                                       className={classNames({'p-invalid': submitted && !client.fatherName})}/>
                                            {submitted && !client.fatherName &&
                                            <small className="p-error">Apellido requerido.</small>}
                                        </div>
                                        <div className="field">
                                            <label htmlFor="motherName">Apellido Materno</label>
                                            <InputText id="motherName" value={client.motherName}
                                                       onChange={(e) => onInputChange(e, 'motherName')} required autoFocus
                                                       className={classNames({'p-invalid': submitted && !client.motherName})}/>
                                            {submitted && !client.motherName &&
                                            <small className="p-error">Apellido requerido.</small>}
                                        </div>
                                        <div className="field">
                                            <label htmlFor="phone">Teléfono</label>
                                            <InputText id="phone" value={client.phone}
                                                       onChange={(e) => onInputChange(e, 'phone')} required autoFocus
                                                       className={classNames({'p-invalid': submitted && !client.phone})}/>
                                            {submitted && !client.phone &&
                                            <small className="p-error">El teléfono es requerido.</small>}
                                        </div>
                                        <div className="field">
                                            <label htmlFor="whatsapp">Whatsapp</label>
                                            <InputText id="whatsapp" value={client.whatsapp}
                                                       onChange={(e) => onInputChange(e, 'whatsapp')} required autoFocus/>
                                            {/* {submitted && !client.whatsapp &&
                                            <small className="p-error">Whatapp es requerido.</small>} */}
                                        </div>
                                        <div className="field">
                                            <label htmlFor="email">Correo</label>
                                            <InputText id="email" value={client.email}
                                                       onChange={(e) => onInputChange(e, 'email')} required autoFocus/>
                                            {/* {submitted && !client.email &&
                                            <small className="p-error">El correo es requerido.</small>} */}
                                        </div>
                                        <div className="field">
                                            <label htmlFor="address">Dirección</label>
                                            <InputText id="address" value={client.address}
                                                       onChange={(e) => onInputChange(e, 'address')} required autoFocus
                                                       className={classNames({'p-invalid': submitted && !client.address})}/>
                                            {submitted && !client.address &&
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
