import React, {useEffect, useRef, useState} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import {Toast} from 'primereact/toast';
import {Dialog} from "primereact/dialog";
import {InputTextarea} from "primereact/inputtextarea";
import {InputNumber} from "primereact/inputnumber";
import { PaymentOT } from '../payment/PaymentOT';

export const DetailOTsClient = ({client}) => {

    // const [pendingPayment, setPendingPayment] = useState(null)

    useEffect(() => {

    }, [])


    const [products, setProducts] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);
    const toast = useRef(null);
    const isMounted = useRef(false);
    const [showPaymentDialog, setShowPaymentDialog] = useState(false)
    // const [amount, setAmount] = useState(0);
    const [otPayment, setOtPayment] = useState(null);
    const [itemsHistory, setItemsHistory] = useState(null);

    const [showHistoryItem, setShowHistoryItem] = useState(false);
    const data = [
        {
            "id": "1000",
            "vehiculo": "Mazda 3, 2016, Sedán, Blanco",
            "fechaIngreso": "02-12-2022", 
            "fechaTermino": "01-01-2023",
            "costoTrabajo": "$750.000",
            "detail": "Semi-ajuste de motor por fuga de aceite",
            "estado": "Pago Pendiente",
            "items": [
                {
                    "id": "1001",
                    "tipo": "SERVICIO",
                    "detail": "Semi-ajuste, cambio empaquetadura",
                    "costo": "$300.000",
                    "status": "FINALIZADO",
                    "history": [
                        {   
                            "id": "1011",
                            "dateEvent": "02-01-2023",
                            "detail": "Se comienza saca tapa valvula"                        
                        },
                        {
                            "id": "1012",
                            "dateEvent": "02-01-2023",
                            "detail": "Se envía valvulas a rectificadora"                        
                        },
                        {
                            "id": "1013",
                            "dateEvent": "05-01-2023",
                            "detail": "Se realiza armado"                     
                        }
                    ]
                },
                {
                    "id": "1002",
                    "tipo": "SERVICIO",
                    "detail": "Cepillado de culata",
                    "costo": "$50.000",
                    "status": "FINALIZADO",
                    "history": [
                        {   
                            "id": "1021",
                            "dateEvent": "02-01-2023",
                            "detail": "Se comienza saca tapa valvula"                        
                        },
                        {
                            "id": "1022",
                            "dateEvent": "02-01-2023",
                            "detail": "Se envía valvulas a rectificadora"                        
                        },
                        {
                            "id": "1023",
                            "dateEvent": "05-01-2023",
                            "detail": "Se realiza armado"                     
                        }
                    ]
                },
                {
                    "id": "1003",
                    "tipo": "PRODUCTO",
                    "detail": "Kit de empaquetaduras de Culata",
                    "costo": "$80.000",
                    "status": "FINALIZADO",
                    "history": [
                        {   
                            "id": "1031",
                            "dateEvent": "02-01-2023",
                            "detail": "Se comienza saca tapa valvula"                        
                        },
                        {
                            "id": "10032",
                            "dateEvent": "02-01-2023",
                            "detail": "Se envía valvulas a rectificadora"                        
                        },
                        {
                            "id": "10033",
                            "dateEvent": "05-01-2023",
                            "detail": "Se realiza armado"                     
                        }
                    ]
                }
            ],
            "payment":  {
                "id": "2000",
                "ot": "234234",
                "dateLastPayment": "02-12-2022",
                "statusGeneral": "Saldo Pendiente",
                "totalAmount": "$750.000",
                "payments": [
                    {
                        "id": "2010",
                        "type": "PARCIAL",
                        "datePayment": "02-12-2022",
                        "datail": "Comprimiso de pago a 15 dias",
                        "amount": "$300.000",
                        "typePayment": "Efectivo"
                    },
                    {
                        "id": "2012",
                        "type": "PARCIAL",
                        "datePayment": "02-12-2022",
                        "datail": "Comprimiso de pago a 15 dias",
                        "amount": "$300.000",
                        "typePayment": "Efectivo"
                    }
                ]
            }
        }
    ]


    useEffect(() => {

    }, [expandedRows]);

    useEffect(() => {
        isMounted.current = true;
        setProducts(data)
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onRowExpand = (event) => {
        toast.current.show({
            severity: 'info',
            summary: 'Orden de trabajo expandida',
            detail: event.data.name,
            life: 3000
        });
    }

    const onRowCollapse = (event) => {
        toast.current.show({
            severity: 'success',
            summary: 'Orden de trabajo colapsada',
            detail: event.data.name,
            life: 3000
        });
    }

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    }

    const amountBodyTemplate = (rowData) => {
        return formatCurrency(rowData.costo);
    }

    const statusOrderBodyTemplate = (rowData) => {
        return <span className={`status-badge order-${rowData.status.toLowerCase()}`}>{rowData.status}</span>;
    }

    const costBodyTemplate = (rowData) => {
        return <span className={`cost-badge order-cost`}>{rowData.costoTrabajo}</span>;
    }

    const statusBodyTemplate = (rowData) => {
        return <span
            className={`status-badge  ${statusColorCard(rowData.estado)}`}>{rowData.estado}</span>;
    }

    const statusColorCard = (status) => {
        let statusCSS = "";
        switch (status) {
            case ('Pago Pendiente'):
                statusCSS = "status-pending";
                break;
            case ('Retiro Pendiente'):
                statusCSS = "status-pending-delivery";
                break;
            case ('Ingresado'):
                statusCSS = "status-received";
                break;
            case ('Finalizado'):
                statusCSS = "status-ready";
                break;
            default:
                break;
        }
        return statusCSS;
    }

    const allowExpansion = (rowData) => {
        return rowData.items.length > 0;
    };

    // const setShowHistoryServiceORProduct = (rowData) => {
    //     setShowHistoryItem(true);
    //     setItemsHistory(rowData);
    // }

    const actionBodyTemplateRow = (rowData) => { 
        return (
            <React.Fragment>
                <Button icon="pi pi-comments" className="p-button-rounded p-button-info mr-2"
                         onClick={() => {  
                            setShowHistoryItem(true);
                            setItemsHistory(rowData);
                         } }/>
                         
            </React.Fragment>
        );
    }

    const rowExpansionTemplate = (data) => {
        return (
            <div className="orders-subtable">
                <h5>Detalle servicios y productos</h5>
                <DataTable value={data.items} responsiveLayout="scroll">
                    <Column field="id" header="Id" sortable></Column>
                    <Column field="tipo" header="Tipo" sortable></Column>
                    <Column field="detail" header="Detalle" sortable></Column>
                    <Column field="costo" header="Costo" body={amountBodyTemplate} sortable></Column>
                    <Column field="estado" header="Estado" body={statusOrderBodyTemplate} sortable></Column>
                    <Column body={actionBodyTemplateRow}  style={{minWidth: '2rem'}}></Column>
                </DataTable>
            </div>
        );
    }
    const paymentDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text"
                    onClick={() => setShowPaymentDialog(false)}/>
        </React.Fragment>
    );
    
    const itemDialogFooterHistory = (
        <React.Fragment>
            <Button label="Volver" icon="pi pi-times" className="p-button-text"
                    onClick={() => setShowHistoryItem(false)}/>
            {/* <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={() => setTextHistory()}/> */}
        </React.Fragment>
    );
    const actionBodyTemplate = (rowData) => { 
        return (
            <React.Fragment>
                <Button icon="pi pi-money-bill" className="p-button-rounded p-button-warning"
                        onClick={() => { 
                            setOtPayment(rowData.payment);
                            setShowPaymentDialog(true);
                            }}/>
            </React.Fragment> 
        );
    }
    return (

        <div className="surface-card p-4 shadow-2 border-round">
            <div className="flex p-1 grid">
                <div className="col-12 lg:col-11 font-medium text-3xl text-900 mb-3">{client.names} {client.fatherName} {client.motherName}</div>
            </div>
            <div className="grid grid-nogutter border-top-1 surface-border pt-2">
                <div className="col-12 md:col-6 p-3">
                    <div className="text-500 font-medium mb-2">Telefono</div>
                    <div className="text-900">{client.phone}</div>
                </div>
                <div className="col-12 md:col-6 p-3">
                    <div className="text-500 font-medium mb-2">Whatsapp</div>
                    <div className="text-900">{client.whatsapp}</div>
                </div>
                <div className="col-12 p-3">
                    <div className="datatable-rowexpansion-demo">
                        <Toast ref={toast}/>
                        <div className="card">
                            <DataTable value={products} expandedRows={expandedRows}
                                       onRowToggle={(e) => setExpandedRows(e.data)}
                                       onRowExpand={onRowExpand} onRowCollapse={onRowCollapse} responsiveLayout="scroll"
                                       rowExpansionTemplate={rowExpansionTemplate} dataKey="id">
                                <Column expander={allowExpansion} style={{width: '3em'}}/>
                                <Column field="id" header="# OT" sortable/>
                                <Column field="vehiculo" header="Vehículo" sortable/>
                                <Column field="fechaIngreso" header="Fecha Ingreso" sortable/>
                                <Column field="fechaTermino" header="Fecha Termino" sortable/>
                                <Column field="detail" header="Detalle Ingreso" sortable/>
                                <Column field="estado" header="Estado Pago" body={statusBodyTemplate} sortable/>
                                <Column body={actionBodyTemplate} sortable/>
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>

            {/* View Payment Options        */}
            <Dialog header="Pago OT: # numero" visible={showPaymentDialog} modal
                footer={paymentDialogFooter} onHide={() => setShowPaymentDialog(false)}
                breakpoints={{'960px': '75vw'}} style={{width: '75vw', minWidth:'370px'}}>
                <PaymentOT otPayment={otPayment}/>
            </Dialog>

            {/* View History Items */}
           {showHistoryItem && <Dialog header="Historial de Servicio" visible={showHistoryItem} modal
                    footer={itemDialogFooterHistory} onHide={() => setShowHistoryItem(false)}
                    breakpoints={{'960px': '75vw'}} style={{width: '60vw', minWidth:'370px'}}>
                <div className="surface-section px-2 py-3 md:px-2 lg:px-6">
                    <div className="grid">
                        <div className="col-12 lg:col-10">
                            <div className="grid formgrid p-fluid border-top-1 surface-border ">
                                <div className="field mb-4 col-12  p-3">                                    
                                    <div className="text-500 font-medium mb-2">Detalle de ejecucion:</div>
                                    <div className="text-900">{(showHistoryItem)? itemsHistory.detail: ''}</div>
                                </div>                                         
                            </div>
                        </div>
                      
                        <div className="orders-subtable col-12 md:col-12 p-2 ">
                            <h5>Historial de actividades </h5>
                            <div className="col-12 md:col-12 p-2 " >
                                <DataTable value={itemsHistory.history} responsiveLayout="scroll" style={{width: '50vw', minWidth:'370px'}}>
                                    <Column field="dateEvent" header="Fecha" sortable></Column>
                                    <Column field="detail" header="Detalle" sortable></Column>
                                </DataTable>
                            </div> 
                        </div>
                    </div>
                </div>            
            </Dialog>}
        </div>

    )
}
