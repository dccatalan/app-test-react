import React, {useEffect, useRef, useState} from 'react';
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {Toast} from "primereact/toast";
import {Toolbar} from "primereact/toolbar";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dialog} from "primereact/dialog";
// import {classNames} from "primereact/utils";
import { useFormik } from 'formik';


import { DialogDataService } from './DialogDataService';
import {getAll as getAllServicesAndproduct}  from '../../services/service-product/ServicesAndProductoService'

export const ServicePage = () => {
    let emptyObject = {
        id: null,
        dateCreation:'',
        categoryCar: '',
        typeObject: '',
        typeService: '',
        typeTraction: '',
        typeEngine: '',
        typeTransmission: '',
        typePintura: '',
        description: '',
        cost: '',
        statusService: ''
    }
    
    const [servicesAndProducts, setServicesAndProducts] = useState(null);
    const [objectDialog, setObjectDialog] = useState(false);

    const [deleteObjectDialog, setDeleteObjectDialog] = useState(false);
    const [deleteObjectsDialog, setDeleteObjectsDialog] = useState(false);
    const [object, setObject] = useState(emptyObject);

    const [selectedObjects, setSelectedObjects] = useState(null);
    // const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

 
    useEffect(() => {
        setServicesAndProducts(getAllServicesAndproduct());
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const openNew = () => {
        setObject(emptyObject);
        // setSubmitted(false);
        setObjectDialog(true);
    }

    // const hideDialog = () => {
    //     setSubmitted(false);
    //     setObjectDialog(false);
    // }

    const hideDeleteProductDialog = () => {
        setDeleteObjectDialog(false);
    }

    const hideDeleteProductsDialog = () => {
        setDeleteObjectsDialog(false);
    }

    // const saveClient = () => {
    //     setSubmitted(true);
    //     if (object.name.trim()) {
    //         let _products = [...servicesAndProducts];
    //         let _product = {...object};
    //         if (object.id) {
    //             toast.current.show({severity: 'success', summary: 'Acción exitosa', detail: 'Cliente Actualizado', life: 3000});
    //         } else {
    //             toast.current.show({severity: 'success', summary: 'Acción exitosa', detail: 'Cliente Creado', life: 3000});
    //         }
    //         setServicesAndProducts(_products);
    //         setObjectDialog(false);
    //         setObject(emptyObject);
    //     }
    // }

    const editClient = (object) => {
        setObject({...object});
        setObjectDialog(true);
    }

    const confirmDeleteClient = (object) => {
        setObject(object);
        setDeleteObjectDialog(true);
    }

    const deleteClient = () => {
        let _products = servicesAndProducts.filter(val => val.id !== object.id);
        setServicesAndProducts(_products);
        setDeleteObjectDialog(false);
        setObject(emptyObject);
        toast.current.show({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
    }

    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const confirmDeleteSelected = () => {
        setDeleteObjectsDialog(true);
    }

    const deleteSelectedClients = () => {
        let _products = servicesAndProducts.filter(val => !selectedObjects.includes(val));
        setServicesAndProducts(_products);
        setDeleteObjectsDialog(false);
        setSelectedObjects(null);
        toast.current.show({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Nuevo" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew}/>
                <Button label="Eliminar" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected}
                        disabled={!selectedObjects || !selectedObjects.length}/>
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

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2"
                        onClick={() => editClient(rowData)}/>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning"
                        onClick={() => confirmDeleteClient(rowData)}/>
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Productos y Servicios</h5>
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
            <div className="flex flex-column relative flex-auto">
                <div className="p-5 flex flex-column flex-auto">
                    <div className="grid">
                        <div className="col-12 lg:col-12">
                            <div className="p4 border-round p-fluid">
                                <div className="datatable-crud-demo">
                                    <Toast ref={toast}/>
                                    <div className="card">
                                        <Toolbar className="mb-4" left={leftToolbarTemplate}
                                                 right={rightToolbarTemplate}></Toolbar>

                                        <DataTable ref={dt} value={servicesAndProducts} selection={selectedObjects}
                                                   onSelectionChange={(e) => setSelectedObjects(e.value)}
                                                   dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                                                   paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                                   currentPageReportTemplate="Viendo {last} de un total de  {totalRecords} elementos"
                                                   globalFilter={globalFilter} header={header}
                                                   esponsiveLayout="stack" breakpoint="960px">
                                            <Column selectionMode="multiple" headerStyle={{width: '3rem'}}
                                                    exportable={false}></Column>
                                            <Column field="typeObject" header="Tipo" sortable
                                                    style={{minWidth: '10rem'}}></Column>
                                            <Column field="categoryCar" header="Categoria vehiculo" sortable
                                                    style={{minWidth: '8rem'}}></Column>
                                            <Column field="typeService" header="Area" sortable 
                                                    style={{minWidth: '12rem'}}></Column>
                                            <Column field="description" header="Descripcion" sortable
                                                    style={{minWidth: '16rem'}}></Column>
                                            <Column field="cost" header="Costo" sortable 
                                                    style={{minWidth: '12rem'}}></Column>
                                            <Column body={actionBodyTemplate} exportable={false}
                                                    style={{minWidth: '8rem'}}></Column>
                                        </DataTable>
                                    </div>

                                    <DialogDataService objectDialog={objectDialog} setObjectDialog={setObjectDialog} object={object} setObject={setObject} servicesAndProducts={servicesAndProducts} setServicesAndProducts={setServicesAndProducts}/>

                                    <Dialog visible={deleteObjectDialog} style={{width: '450px'}} header="Confirm"
                                            modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                                        <div className="confirmation-content">
                                            <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
                                            {object &&
                                            <span>Está seguro de eliminar al elemento <b>{object.name}</b>?</span>}
                                        </div>
                                    </Dialog>

                                    <Dialog visible={deleteObjectsDialog} style={{width: '450px'}} header="Confirm"
                                            modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                                        <div className="confirmation-content">
                                            <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
                                            {object &&
                                            <span>Está seguro de eliminar a los elementos seleccionados?</span>}
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
