import React, {useEffect, useRef, useState} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import {Toast} from 'primereact/toast';
import {Dialog} from "primereact/dialog";
import {InputTextarea} from "primereact/inputtextarea";
import {InputNumber} from "primereact/inputnumber";
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';
import { RadioButton } from 'primereact/radiobutton';
export const PaymentOT = ({otPayment}) => {

    
    useEffect(() => {

    }, [])


    // const [payments, setPayments] = useState({});
    const toast = useRef(null);
    const isMounted = useRef(false);
    const [showPaymentDialog, setShowPaymentDialog] = useState(false)
    const [amount, setAmount] = useState(0);
    const [checkFormatPayment, setCheckFormatPayment] = useState(null);

    // const data = 
    //     {
    //         "id": "1000",
    //         "ot": "234234",
    //         "dateLastPayment": "02-12-2022",
    //         "statusGeneral": "Saldo Pendiente",
    //         "totalAmount": "$750.000",
    //         "payments": [
    //             {
    //                 "id": "1000",
    //                 "type": "PARCIAL",
    //                 "datePayment": "02-12-2022",
    //                 "datail": "Comprimiso de pago a 15 dias",
    //                 "amount": "$300.000",
    //                 "typePayment": "Efectivo"
    //             },
    //             {
    //                 "id": "1001",
    //                 "type": "PARCIAL",
    //                 "datePayment": "02-12-2022",
    //                 "datail": "Comprimiso de pago a 15 dias",
    //                 "amount": "$300.000",
    //                 "typePayment": "Efectivo"
    //             }
    //         ]
    //     }
    

    useEffect(() => {

    }, []);

    useEffect(() => {
        isMounted.current = true;
        // setPayments(otPayment)
    }, []); // eslint-disable-line react-hooks/exhaustive-deps



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


    const paymentDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text"
                    onClick={() => setShowPaymentDialog(false)}/>
            <Button label="Pagar" icon="pi pi-check" className="p-button-text"/>
        </React.Fragment>
    );

    return (
        <div>
        <div className="surface-card surface-border border-top-1 shadow-2 border-round p-3">
            {/* <div className="col-2 md:col-2 p-2"> */}
                {/* <div className="text-500 font-medium mb-2">Estado de Pago:</div> */}
                {/* <div className={`text-900 status-badge order-pending}`}>Pendiente</div> */}
                {/* <div className={`text-900 status-badge order-${ot.statusOT.toLowerCase()}`}>{ot.statusOT}</div> */}
            {/* </div> */}
            <div className="grid grid-nogutter  surface-border pt-2">
                <div className="col-12 md:col-6 p-3">
                    <div className="text-500 font-medium mb-2">Total OT</div>
                    <div className="text-900">$ 800.000</div>
                </div>
                <div className="col-12 md:col-6 p-3">
                    <div className="text-500 font-medium mb-2">Estado de Pago</div>
                    <div className="text-900">Saldo Pendiente</div>
                </div>
  
                <div className="col-12 md:col-6 p-3">
                    <div className="text-500 font-medium mb-2">Monto Pagado</div>
                    <div className="text-900">$ 300.000</div>
                </div>
                <div className="col-12 md:col-6 p-3">
                    <div className="text-500 font-medium mb-2">Deuda Pendiente</div>
                    <div className="text-900">$ 500.000</div>
                </div>
                   
            </div>
            <div className="grid formgrid p-fluid  surface-border border-top-1 p-3">
                <div className="field mb-4 col-12 md:col-10 ">
                    <label htmlFor="item" className="font-medium text-900">Monto a Pagar</label>
                    <div className="flex align-content-center">
                        <InputNumber mode="currency" currency="CLP" id="item3" type="text" className="flex-1" />
                        <div className="flex align-items-center mb-3 ml-4">
                            <RadioButton value="cash" name="city" onChange={(e) => setCheckFormatPayment(e.value)} checked={checkFormatPayment === 'cash'} />
                            <label htmlFor="descuentoIVA" className="ml-3">Efectivo</label>
                        </div>
                        <div className="flex align-items-center mb-3 ml-4">
                            <RadioButton value="tranf" name="city" onChange={(e) => setCheckFormatPayment(e.value)} checked={checkFormatPayment === 'tranf'} />                      
                            <label htmlFor="descuentoIVA" className="ml-3">Transferencia</label>
                        </div>
                        <div className="field mb-3 ml-4">
                            <Button icon="pi pi-plus" label="Agregar Pago" className=" p-button-outlined w-auto" />
                        </div>
                    </div>
                    {/* <div className="field col-12 md:col-6 pt-4">
                        <Button icon="pi pi-plus" label="Agregar Pago" className=" p-button-outlined w-auto" />
                    </div> */}
                </div>
            </div>
            <div className="grid formgrid  surface-border border-top-1 p-fluid  p-3">
                <div className="text-500 font-medium mb-2">Tabla de Pagos:</div>
                <div className="field col-12 md:col-12 pt-3">
                    <DataTable value={otPayment.payments} header="Pagos" responsiveLayout="stack">
                        <Column field="id" header="Id Trans" sortable/>
                        <Column field="type" header="Tipo" sortable/>
                        <Column field="datePayment" header="Fecha Pago" sortable/>
                        <Column field="datail" header="Detalle" sortable/>
                        <Column field="amount" header="Monto" sortable/>
                        <Column field="typePayment" header="Forma de Pago" sortable/>
                    </DataTable>
                </div>
            </div>      
           
        </div>
    </div>
    )
}
