import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import {Sidebar} from "primereact/sidebar";
import {WorkOrderAssigned} from "./WorkOrderAssigned";

import {getAll as getAllCustomerLarge} from '../../services/ot/customers-large'


import './DataTableOTs.css';

export const WorkOrderDataTable = () => {
    const [customers1, setCustomers1] = useState(null);
    const [filters1, setFilters1] = useState(null);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const [loading1, setLoading1] = useState(true);
    const statuses = ['Pendiente Presupuesto', 'Ingresada', 'Iniciada', 'Finalizada', 'Cancelada'  ];

    // const customerService = new CustomerService();

    useEffect(() => {
        // customerService.getCustomersLarge().then(data => { setCustomers1(getCustomers(data)); setLoading1(false) });
        // customerService.getCustomersLarge().then(data => { setCustomers2(getCustomers(data)); setLoading2(false) });
        setCustomers1(getAllCustomerLarge());
        setLoading1(false);

        initFilters1();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const getCustomers = (data) => {
        return [...data || []].map(d => {
            d.date = new Date(d.date);
            return d;
        });
    }

    const formatDate = (value) => {
        return <span >{setNumberMonthAndYear(new Date(value).getUTCDate())}/{setNumberMonthAndYear(new Date(value).getMonth()+1)}/{(new Date(value).getFullYear())}</span>;
    }

    const setNumberMonthAndYear= (value) => {
        if (value < 10) {
            return '0' + value;
        } 
        return value;
    }
    const formatCurrency = (value) => {
        return value.toLocaleString('en-ES', { style: 'currency', currency: 'CLP' });
    }

    const clearFilter1 = () => {
        initFilters1();
    }

    const onGlobalFilterChange1 = (e) => {
        const value = e.target.value;
        let _filters1 = { ...filters1 };
        _filters1['global'].value = value;

        setFilters1(_filters1);
        setGlobalFilterValue1(value);
    }

    const initFilters1 = () => {
        setFilters1({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'representative': { value: null, matchMode: FilterMatchMode.IN },
            'date': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
            'balance': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            'status': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            'activity': { value: null, matchMode: FilterMatchMode.BETWEEN },
            'verified': { value: null, matchMode: FilterMatchMode.EQUALS }
        });
        setGlobalFilterValue1('');
    }

    const renderHeader1 = () => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" className="p-button-outlined" onClick={clearFilter1} />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Keyword Search" />
                </span>
            </div>
        )
    }

    const dateBodyTemplate = (rowData) => {
        return formatDate(rowData.date);
    }

    const dateFilterTemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />
    }

    const balanceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.balance);
    }

    const balanceFilterTemplate = (options) => {
        return <InputNumber value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} mode="currency" currency="USD" locale="en-US" />
    }

    const statusBodyTemplate = (rowData) => {
        return <span className={`status-badge ${statusColorCard(rowData.status)}`}>{rowData.status}</span>;
    }

    const statusColorCard = (status) =>{
        let statusCSS = "";
        switch (status) {
            case ('Pendiente Aprobacion'):
                statusCSS ="status-ot-pending";
                break;
            case ('Ingresada'):
                statusCSS ="status-ot-admitted";
                break;
            case ('Iniciada'):
                statusCSS ="status-ot-started";
                break;
            case ('Finalizada'):
                statusCSS ="status-ot-ready";
                break;
            case ('Cancelada'):
                statusCSS ="status-ot-cancel";
                break;
            default:
                break;
        }
        return statusCSS;
    }



    const statusFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Seleccione Estado" className="p-column-filter" showClear />;
    }

    const statusItemTemplate = (option) => {
        return <span className={`customer-badge status-${option}`}>{option}</span>;
    }

    const header1 = renderHeader1();
    
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-info-circle" className="p-button-rounded p-button-info mr-2" onClick={() => showDetailOrder(rowData)}/>
            </React.Fragment>
        );
    }

    const showDetailOrder = (order)=>{
        setShowDetailOrderDialog(true)
        setOrder(orderData)       
    }
    const orderData ={
        "id":"1000",
        "fechaIngreso": "02-12-2022",
        "fechaTermino": "01-01-2023",
        "mainProblem": "Cambio de aceite",
        "statusOT": "FINALIZADO",
        "client": {
            "run": "12345678-9",
            "names": "Juan Alejandro",
            "fatherName": "Perez",
            "motherName": "Rojas",
            "phone": "+56999998888",
            "whatsapp": "+56999998888",
        },
        "car": {
            "licensePlate": "PPJJ44",
            "vehiculo": "Mazda 3, 2016, Sedán, Blanco"
        },
        "status": {
            "Luces Frontales": true,
            "Cristales": true
        },
        "items": [
            {
                "id":1,
                "tipo": "SERVICIO",
                "detalle": "Semi-ajuste de motor por fuga de aceite",
                "team": [
                    {
                        "id" : "1",
                        "name" : "Jhon Gonzalez"
                    },
                    {
                        "id" : "2",
                        "name" : "Juanito Perez"
                    }
                ],                
                "estado": "Iniciado",
                "history": [
                    {   
                        "id": "1000",
                        "dateEvent": "02-01-2023",
                        "detalle": "Se comienza saca tapa valvula"                        
                    },
                    {
                        "id": "1000",
                        "dateEvent": "02-01-2023",
                        "detalle": "Se envía valvulas a rectificadora"                        
                    },
                    {
                        "id": "1000",
                        "dateEvent": "05-01-2023",
                        "detalle": "Se realiza armado"                     
                    }
                ]
            },
            {
                "id":2,
                "tipo": "SERVICIO",
                "detalle": "Rectificado de valvulas",
                "team": [
                    {
                        "id" : "1",
                        "name" : "Jhon Gonzalez"
                    }
                ],
                "estado": "Finalizado",
                "history": [
                    {
                        "id": "1000",
                        "dateEvent": "2023-01-02",
                        "detalle": "Se envían valvulas"
                    },
                    {
                        "id": "1000",
                        "dateEvent": "2023-01-02",
                        "detalle": "Se espera entrega por rectificadora en 2 dias"
                    },
                    {
                        "id": "1000",
                        "dateEvent": "2023-01-04",
                        "detalle": "Se reciben valvulas"
                    }
                ]
            },
            {
                "id":3,
                "tipo": "PRODUCTO",
                "detalle": "Empaquetaduras",
                "team": [],
                "estado": "Finalizado",
                "history": [
                    {
                        "id": "1000",
                        "dateEvent": "2023-01-04",
                        "detalle": "Se realiza compra"
                    },
                    {
                        "id": "1000",
                        "dateEvent": "2023-01-04",
                        "detalle": "Repuesto disponible para armado"
                    }
                ]
            },
            {
                "id":4,
                "tipo": "PRODUCTO",
                "detalle": "Pernos",
                "team": [],
                "estado": "Ingresado",
                "history": [
                   
                ]
            }
        ],
        "history": [  
        {   
            "id": "1000",
            "dateEvent": "02-01-2023",
            "detalle": "Se comienza con una revision general y se detectan problemas de pintura y se sacan fotos"                        
        },
        {
            "id": "1000",
            "dateEvent": "05-01-2023",
            "detalle": "Se realiza armado"                     
        }]
    }
    const [order,setOrder] = useState(null)
    const [showDetailOrderDialog, setShowDetailOrderDialog] = useState(null);

    return (
        <div className="datatable-filter-demo">
            <div className="card">
                <h3>Ordenes de Trabajo</h3>
                <p>Agregue los filtros que estime conveniente.</p>
                <DataTable value={customers1} paginator className="p-datatable-customers" showGridlines rows={10}
                    dataKey="id" filters={filters1} filterDisplay="menu" loading={loading1} responsiveLayout="scroll"
                    globalFilterFields={['clientName', 'patent', 'balance', 'status']} header={header1} emptyMessage="No se han encontrado Ordenes" >
                    <Column field="orderNumber" header="# OT" filterPlaceholder="# OT" style={{ minWidth: '2rem' }} />
                    <Column field="clientName" header="Nombre Cliente"  filterPlaceholder="Busqueda por nombre" style={{ minWidth: '12rem' }} />
                    <Column header="Date"  dataType="date" style={{ minWidth: '10rem' }} body={dateBodyTemplate}  />
                    <Column field="patent" header="Patente" filterField="balance"  style={{ minWidth: '10rem' }} filter filterElement={balanceFilterTemplate} />
                    <Column header="Monto Trabajo" filterField="balance" dataType="numeric" style={{ minWidth: '10rem' }} body={balanceBodyTemplate} />
                    <Column field="status" header="Estado" filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterElement={statusFilterTemplate} />
                    <Column header="Opciones" body={actionBodyTemplate} exportable={false} style={{minWidth: '8rem'}}></Column>
                </DataTable>
            </div>
            <Sidebar className="surface-200" visible={showDetailOrderDialog} fullScreen onHide={() => setShowDetailOrderDialog(false)}>
                {order && <WorkOrderAssigned ot={order} setShowDetailOrderDialog={setShowDetailOrderDialog}/>}
            </Sidebar>
        </div>
    );
}