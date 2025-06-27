import React, {useEffect, useRef, useState} from 'react';
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {Toast} from "primereact/toast";
import {Toolbar} from "primereact/toolbar";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dialog} from "primereact/dialog";
import { Sidebar } from 'primereact/sidebar';

// import {classNames} from "primereact/utils";
import { DialogDataClient } from './DialogDataClient';
import {getAll} from '../../services/client/ClientService';
import {DetailOTsClient} from "./../ot/detail-client/DetailOTsClient";


export const ClientPage = () => {
    let emptyClient = {
        id: null,
        run: '', // validate
        names: '', // validate
        fatherName: '', // validate
        motherName: '', // validate
        email: '', 
        dateIngress: '',
        address: '', // validate
        phone: '', // validate
        whatsapp: '',

    };

    const [clients, setClients] = useState(null);
    const [clientDialog, setClientDialog] = useState(false);
    const [deleteClientDialog, setDeleteClientDialog] = useState(false);
    const [deleteClientsDialog, setDeleteClientsDialog] = useState(false);
    const [client, setClient] = useState(emptyClient);
    const [pendingPaymentDialog, setPendingPaymentDialog] = useState(false)
    const [selectedClients, setSelectedClients] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        setClients(getAll())
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const openNew = () => {
        setClient(emptyClient);
        client.dateIngress = new Date();
        setClient(client);
        // setSubmitted(false);
        setClientDialog(true);
    }

    const hideDeleteProductDialog = () => {
        setDeleteClientDialog(false);
    }

    const hideDeleteProductsDialog = () => {
        setDeleteClientsDialog(false);
    }

    const editClient = (client) => {
        setClient({...client});
        setClientDialog(true);
    }

    const confirmDeleteClient = (client) => {
        setClient(client);
        setDeleteClientDialog(true);
    }

    const deleteClient = () => {
        let _clients = clients.filter(val => val.id !== client.id);
        setClients(_clients);
        setDeleteClientDialog(false);
        setClient(emptyClient);
        toast.current.show({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
    }

    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const confirmDeleteSelected = () => {
        setDeleteClientsDialog(true);
    }

    const deleteSelectedClients = () => {
        let _clients = clients.filter(val => !selectedClients.includes(val));
        setClients(_clients);
        setDeleteClientsDialog(false);
        setSelectedClients(null);
        toast.current.show({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Nuevo" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew}/>
                <Button label="Eliminar" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected}
                        disabled={!selectedClients || !selectedClients.length}/>
            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Exportar" icon="pi pi-upload" className="p-button-help" onClick={exportCSV}/>
            </React.Fragment>
        )
    }

    const phoneBodyTemplate = (rowData) => {
        return rowData.phone;
    }
    
    const namesBodyTemplate = (rowData) => {
        return <span
            className={`client-badge status-${rowData.names}`}>{rowData.names} {rowData.fatherName} {rowData.motherName}</span>;

    }

    const statusBodyTemplate = (rowData) => {
        return <span
            className={`status-badge ${statusColorCard(rowData.statusPayment)}`}>{rowData.statusPayment}</span>;
    }

    const statusColorCard = (status) =>{
        let statusCSS = "";
        switch (status) {
            case ('Pago Pendiente'):
                statusCSS ="status-pending";
                break;
            case ('Sin deuda'):
                statusCSS ="status-ready";
                break;
            default:
                break;
        }
        return statusCSS;
    }

    const showPendingPayment = (client)=>{
        setPendingPaymentDialog(true)
        setClient(client)
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                {/* {rowData.statusPayment === "Pago Pendiente" && <Button icon="pi pi-info-circle" className="p-button-rounded p-button-info mr-2"
                                                                  onClick={() => showPendingPayment(rowData)}/>} */}
                <Button icon="pi pi-info-circle" className="p-button-rounded p-button-info mr-2"
                        onClick={() => showPendingPayment(rowData)}/>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2"
                        onClick={() => editClient(rowData)}/>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning"
                        onClick={() => confirmDeleteClient(rowData)}/>
            </React.Fragment> 
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Clientes</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search"/>
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..."/>
            </span>
        </div>
    );

    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog}/>
            <Button label="Sí" icon="pi pi-check" className="p-button-text" onClick={deleteClient}/>
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog}/>
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedClients}/>
        </React.Fragment>
    );


    return (
        <div>
            <div className=" flex flex-column relative flex-auto">
                <div className="p-5 flex flex-column flex-auto">
                    <div className="grid">

                        <div className="col-12 lg:col-12">

                            <div className="p4 border-round p-fluid">
                                <div className="datatable-crud-demo">
                                    <Toast ref={toast}/>

                                    <div className="card">
                                        <Toolbar className="mb-4" left={leftToolbarTemplate}
                                                 right={rightToolbarTemplate}></Toolbar>

                                        <DataTable ref={dt} value={clients} selection={selectedClients}
                                                   onSelectionChange={(e) => setSelectedClients(e.value)}
                                                   dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                                                   paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                                   currentPageReportTemplate="Viendo {last} de un total de {totalRecords} clientes"
                                                   globalFilter={globalFilter} header={header}
                                                   esponsiveLayout="stack" breakpoint="960px">
                                            <Column selectionMode="multiple" headerStyle={{width: '3rem'}}
                                                    exportable={false}></Column>
                                            <Column field="names" header="Nombre" body={namesBodyTemplate}
                                                    sortable style={{minWidth: '16rem'}}></Column>
                                            <Column field="run" header="Run" sortable
                                                    style={{minWidth: '12rem'}}></Column>
                                            <Column field="whatsapp" header="Teléfono" body={phoneBodyTemplate} sortable
                                                    style={{minWidth: '8rem'}}></Column>
                                            <Column field="email" header="Correo" sortable
                                                    style={{minWidth: '10rem'}}></Column>
                                            <Column field="statusPayment" header="Estado" body={statusBodyTemplate}
                                                    sortable style={{minWidth: '12rem'}}></Column>
                                            <Column body={actionBodyTemplate} exportable={false}
                                                    style={{minWidth: '8rem'}}></Column>
                                        </DataTable>
                                    </div>
                                    
                                    <DialogDataClient clientDialog={clientDialog} setClientDialog={setClientDialog} client={client} setClient={setClient} clients={clients} setClients={setClients}/>


                                    <Dialog visible={deleteClientDialog} style={{width: '450px'}} header="Confirm"
                                            modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                                        <div className="confirmation-content">
                                            <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
                                            {client &&
                                            <span>Está seguro de eliminar al cliente <b>{client.names}</b>?</span>}
                                        </div>
                                    </Dialog>

                                    <Dialog visible={deleteClientsDialog} style={{width: '450px'}} header="Confirm"
                                            modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                                        <div className="confirmation-content">
                                            <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
                                            {client &&
                                            <span>Está seguro de eliminar a los clientes seleccionados?</span>}
                                        </div>
                                    </Dialog>

                                    <Sidebar className="surface-200" visible={pendingPaymentDialog} fullScreen onHide={() => setPendingPaymentDialog(false)}>
                                        {client && client.id && <DetailOTsClient client={client} />}
                                    </Sidebar>

                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
}
