import React, {useEffect, useState} from 'react';
import {Divider} from "primereact/divider";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {AutoComplete} from 'primereact/autocomplete';
import {getAll} from '../../services/client/ClientService'
import {DialogDataClient} from "../client/DialogDataClient";

export const WorkOrderStepClient = ({setMenu}) => {

    let emptyClient = {
        id: null,
        run: '',
        names: '',
        fatherName: '',
        motherName: '',
        email: '',
        dateIngress: '',
        address: '',
        phone: 0,
        whatsapp: 0,

    };

    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(emptyClient);
    const [filteredClients, setFilteredClients] = useState(null);
    const [dialogClient, setDialogClient] = useState(false);

    useEffect(() => {
        setClients(getAll())
    }, [])

    const searchClient = (event) => {
        setTimeout(() => {
            let _filteredClients;
            if (!event.query.trim().length) {
                _filteredClients = [...clients];
            } else {
                _filteredClients = clients.filter((client) => {
                    return client.run.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }

            setFilteredClients(_filteredClients);
        }, 250);
    }


    const itemTemplate = (item) => {
        return (
            <>
               {item.run+" "+item.names+" "+item.fatherName+" "+item.motherName}
            </>
        );
    }

    return (
        <div className="surface-card p-5 shadow-2 border-round flex-auto">
            <div className="text-900 font-semibold text-lg mt-3">Datos del cliente</div>
            <Divider></Divider>
            <div className="flex gap-5 flex-column-reverse md:flex-row">
                <div className="flex-auto p-fluid">
                    <div className="col-12 lg:col-12">
                        <div className="p-4 p-fluid">
                            <div className="grid formgrid p-fluid">
                                <div className="field mb-4 col-12 md:col-12">
                                    <label htmlFor="run" className="font-medium text-900">RUN</label>
                                    <AutoComplete id="run" value={selectedClient} suggestions={filteredClients}
                                                  completeMethod={searchClient} field="run" itemTemplate={itemTemplate}
                                                  onChange={(e) => setSelectedClient(e.value)} aria-label="Clientes"
                                                  dropdownAriaLabel="Ingrese un RUN"/>
                                </div>
                                {filteredClients && filteredClients.length == 0 && !selectedClient.id && <Button icon="pi pi-pencil" label={"Crear cliente"} className="p-button-rounded p-button-success mr-2"
                                                                                                             onClick={() => setDialogClient(true)}/>}
                                {filteredClients && filteredClients.length > 0 && selectedClient.id && <Button icon="pi pi-pencil" label={"Ver"} className="p-button-rounded p-button-success mr-2"
                                                                                                             onClick={() => setDialogClient(true)}/>}
                            </div>
                        </div>
                    </div>
                    {selectedClient && <DialogDataClient clientDialog={dialogClient} setClientDialog={setDialogClient}  client={selectedClient} setClient={setSelectedClient}/>}

                    <div>
                        <Button label="Continuar" className="p-ripple w-auto back"  onClick={()=>setMenu("car")}/>
                    </div>
                </div>
            </div>
        </div>
    );

}
