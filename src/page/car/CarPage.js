import React, {useEffect, useRef, useState} from 'react';
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {Toast} from "primereact/toast";
import {Toolbar} from "primereact/toolbar";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dialog} from "primereact/dialog";
// import {classNames} from "primereact/utils";

import {getAll as getAllCar} from '../../services/car/CarService'

import { DialogDataCar } from './DialogDataCar';

export const CarPage = () => {
    let emptyCar = {
        id: null,
        mark: '', // validar 
        model: '',  // validar 
        version: '',
        cc: '',  // validar 
        fuel: '',  // validar 
        transmission: '',  // validar 
        traction: '',  // validar 
        year: null,  // validar // Debe quedar null para la vista
        color: '',
        category: '',  // validar 
        chasis: '',
        engine: '',
        patent: '',  // validar 
        description: '',
        kilometres: '', //Definir almacenamiento por OT
        status: '',
        dateIngress:''
    };


    const [cars, setCars] = useState(null);
    const [carDialog, setCarDialog] = useState(false);
    const [deleteCarDialog, setDeleteCarDialog] = useState(false);
    const [deleteCarsDialog, setDeleteCarsDialog] = useState(false);
    const [car, setCar] = useState(emptyCar);
    const [selectedCars, setSelectedCars] = useState(null);
    // const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

 
    useEffect(() => {
        setCars(getAllCar())

    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const openNew = () => {
        setCar(emptyCar);
        car.dateIngress = new Date();
        setCar(car);
        // setSubmitted(false);
         setCarDialog(true);
    }


    const hideDeleteProductDialog = () => {
        setDeleteCarDialog(false);
    }

    const hideDeleteProductsDialog = () => {
        setDeleteCarsDialog(false);
    }

    const editCar = (car) => {
        setCar({...car});
        setCarDialog(true);
    }

    const confirmDeleteCar = (car) => {
        setCar(car);
        setDeleteCarDialog(true);
    }

    const deleteCar = () => {
        let _products = cars.filter(val => val.id !== car.id);
        setCars(_products);
        setDeleteCarDialog(false);
        setCar(emptyCar);
        toast.current.show({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
    }

    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const confirmDeleteSelected = () => {
        setDeleteCarsDialog(true);
    }

    const deleteSelectedCars = () => {
        let _products = cars.filter(val => !selectedCars.includes(val));
        setCars(_products);
        setDeleteCarsDialog(false);
        setSelectedCars(null);
        toast.current.show({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Nuevo" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew}/>
                <Button label="Eliminar" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected}
                        disabled={!selectedCars || !selectedCars.length}/>
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

    const concatVersionBodyTemplate = (rowData) => {
        return <span
            className={`car-badge status-${rowData.model}`}>{rowData.model}, {rowData.version}, año {new Date(rowData.year).getFullYear()}</span>;
    }
    
    const setFormatDate = (rowData) => {
        return <span >{setNumberMonthAndYear(new Date(rowData.dateIngress).getUTCDate())}/{setNumberMonthAndYear(new Date(rowData.dateIngress).getMonth()+1)}/{(new Date(rowData.dateIngress).getFullYear())}</span>;
    }

    const setNumberMonthAndYear= (value) => {
        if (value < 10) {
            return '0' + value;
        } 
        return value;
    }

    const statusBodyTemplate = (rowData) => {
        return <span
            className={`status-badge  ${statusColorCard(rowData.status)}`}>{rowData.status}</span>;
    }
    // OT
    // 1 -> Ingresado
    // 2 -> En Proceso 
    // 3 -> Pago Pendiente
    // 4 -> Retiro Pendiente
    // 5 -> Finalizada

    // SERVICIO  => Tipo de Servicio Interno/Externo
    // 1 -> Asignado 
    // 2 -> Iniciado
    // 3 -> Pendiente -> Detalle en comentarios  o historial
    // 4 -> Finalizado

    // Pendiente revision de status propios de servicios
    
    const statusColorCard = (status) =>{
        let statusCSS = "";
        switch (status) {
            case ('Pago Pendiente'):
                statusCSS ="status-pending";
                break;
            case ('Retiro Pendiente'):
                statusCSS ="status-pending-delivery";
                break;
            case ('Ingresado'):
                statusCSS ="status-received";
                break;
            case ('Finalizado'):
                statusCSS ="status-ready";
                break;
            default:
                break;
        }
        return statusCSS;
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2"
                        onClick={() => editCar(rowData)}/>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning"
                        onClick={() => confirmDeleteCar(rowData)}/>
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Autos</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search"/>
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..."/>
            </span>
        </div>
    );

    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog}/>
            <Button label="Sí" icon="pi pi-check" className="p-button-text" onClick={deleteCar}/>
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog}/>
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedCars}/>
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

                                        <DataTable ref={dt} value={cars} selection={selectedCars}
                                                   onSelectionChange={(e) => setSelectedCars(e.value)}
                                                   dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                                                   paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                                   currentPageReportTemplate="Viendo {last} de un total de  {totalRecords} Vehiculos"
                                                   globalFilter={globalFilter} header={header}
                                                   responsiveLayout="stack" breakpoint="960px">
                                            <Column selectionMode="multiple" headerStyle={{width: '3rem'}}
                                                    exportable={false}></Column>
                                            <Column field="patent" header="Patente" sortable
                                                    style={{minWidth: '8rem'}}></Column>
                                            <Column field="mark" header="Marca" sortable 
                                                    style={{minWidth: '10rem'}}></Column>
                                            <Column field="transmission" header="Transmision" sortable 
                                                    style={{minWidth: '10rem'}}></Column>
                                            <Column field="traction" header="Tracción" sortable 
                                                    style={{minWidth: '8rem'}}></Column>
                                            <Column field="category" header="Categoria" sortable 
                                                    style={{minWidth: '8rem'}}></Column>
                                            <Column field="model" header="Modelo" body={concatVersionBodyTemplate} sortable
                                                    style={{minWidth: '10rem'}}></Column>
                                            <Column field="dateIngress" header="Fecha Ingreso" body={setFormatDate} sortable
                                                    style={{minWidth: '12rem'}}></Column>
                                            <Column field="status" header="Estado en OT" body={statusBodyTemplate}
                                                    sortable style={{minWidth: '12rem'}}></Column>
                                            <Column body={actionBodyTemplate} exportable={false}
                                                    style={{minWidth: '8rem'}}></Column>
                                        </DataTable>
                                    </div>

                                    <DialogDataCar carDialog={carDialog} setCarDialog={setCarDialog} car={car} setCar={setCar} cars={cars} setCars={setCars}/>

                                    <Dialog visible={deleteCarDialog} style={{width: '450px'}} header="Confirm"
                                            modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                                        <div className="confirmation-content">
                                            <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
                                            {car &&
                                            <span>Está seguro de eliminar al cliente <b>{car.name}</b>?</span>}
                                        </div>
                                    </Dialog>

                                    <Dialog visible={deleteCarsDialog} style={{width: '450px'}} header="Confirm"
                                            modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                                        <div className="confirmation-content">
                                            <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
                                            {car &&
                                            <span>Está seguro de eliminar a los autos seleccionados?</span>}
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
