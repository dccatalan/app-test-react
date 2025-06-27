import React, {useEffect, useRef, useState} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import {Toast} from 'primereact/toast';
import {Dialog} from "primereact/dialog";
import {InputTextarea} from "primereact/inputtextarea";
import {InputNumber} from "primereact/inputnumber";

export const PendingPayment = ({client}) => {

    const [pendingPayment, setPendingPayment] = useState(null)

    useEffect(() => {

    }, [])


    const [products, setProducts] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);
    const toast = useRef(null);
    const isMounted = useRef(false);
    const [showPaymentDialog, setShowPaymentDialog] = useState(false)
    const [amount, setAmount] = useState(0);

    const data = [
        {
            "id": "1000",
            "vehiculo": "Mazda 3, 2016, Sedán, Blanco",
            "fechaIngreso": "02-12-2022",
            "fechaTermino": "01-01-2023",
            "costoTrabajo": "$750.000",
            "detalle": "Semi-ajuste de motor por fuga de aceite",
            "estado": "Pago Pendiente",
            "items": [
                {
                    "id": "1000",
                    "tipo": "SERVICIO",
                    "detalle": "Semi-ajuste, cambio empaquetadura",
                    "costo": "$300.000",
                    "status": "FINALIZADO"
                },
                {
                    "id": "1000",
                    "tipo": "SERVICIO",
                    "detalle": "Cepillado de culata",
                    "costo": "$50.000",
                    "status": "FINALIZADO"
                },
                {
                    "id": "1000",
                    "tipo": "PRODUCTO",
                    "detalle": "Kit de empaquetaduras de Culata",
                    "costo": "$80.000",
                    "status": "FINALIZADO"
                }
            ]
        }
    ]

    useEffect(() => {
        // if (isMounted.current) {
        //     const summary = expandedRows !== null ? 'Expandir todas las columnas' : 'Colapsar todas las columnas';
        //     toast.current.show({severity: 'success', summary: `${summary}`, life: 3000});
        // }
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

    // const expandAll = () => {
    //     let _expandedRows = {};
    //     products.forEach(p => _expandedRows[`${p.id}`] = true);

    //     setExpandedRows(_expandedRows);
    // }

    // const collapseAll = () => {
    //     setExpandedRows(null);
    // }

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

    const rowExpansionTemplate = (data) => {
        return (
            <div className="orders-subtable">
                <h5>Detalle servicios y productos</h5>
                <DataTable value={data.items} responsiveLayout="scroll">
                    <Column field="id" header="Id" sortable></Column>
                    <Column field="tipo" header="Tipo" sortable></Column>
                    <Column field="detalle" header="Detalle" sortable></Column>
                    <Column field="costo" header="Costo" body={amountBodyTemplate} sortable></Column>
                    <Column field="estado" header="Estado" body={statusOrderBodyTemplate} sortable></Column>
                </DataTable>
            </div>
        );
    }

    // const header = (
    //     <div className="table-header-container">
    //         <Button icon="pi pi-plus" label="Expandir todo" onClick={expandAll} className="mr-2" />
    //         <Button icon="pi pi-minus" label="Colapsar todo" onClick={collapseAll} />
    //     </div>
    // );


    const paymentDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text"
                    onClick={() => setShowPaymentDialog(false)}/>
            <Button label="Pagar" icon="pi pi-check" className="p-button-text"/>
        </React.Fragment>
    );

    return (

        <div className="surface-card p-4 shadow-2 border-round">
            <div className="flex p-1 grid">
                <div
                    className="col-12 lg:col-11 font-medium text-3xl text-900 mb-3">{client.names} {client.fatherName} {client.motherName}</div>
                <Button className="col-12 lg:col-1" label="Pagar" onClick={() => setShowPaymentDialog(true)}/>
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
                                <Column field="id" header="Nro Orden" sortable/>
                                <Column field="vehiculo" header="Vehículo" sortable/>
                                <Column field="fechaIngreso" header="Fecha Ingreso" sortable/>
                                <Column field="fechaTermino" header="Fecha Termino" sortable/>
                                <Column field="detalle" header="Detalle" sortable/>
                                <Column field="estado" header="Estado" body={statusBodyTemplate} sortable/>
                                <Column field="costoTrabajo" header="Costo" body={costBodyTemplate} sortable/>
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog header="Pago" visible={showPaymentDialog} modal
                    footer={paymentDialogFooter} onHide={() => setShowPaymentDialog(false)}
                    breakpoints={{'960px': '75vw'}} style={{width: '50vw', minWidth:'370px'}}>
                <div>
                    <div className="grid formgrid p-fluid">
                        <div className="field col-12 md:col-12">

                                <label htmlFor="amount">Monto: </label>
                                <InputNumber inputId="amount" value={amount} onValueChange={(e) => setAmount(e.value)}
                                             showButtons mode="currency" currency="CLP"/>

                        </div>
                    </div>
                </div>
            </Dialog>

        </div>

    )
}
