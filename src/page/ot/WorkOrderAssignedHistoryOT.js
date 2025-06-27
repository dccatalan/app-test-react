import React, {useEffect, useRef, useState} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Toast} from 'primereact/toast';
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {getAll as getAllServicesAndproduct} from "../../services/service-product/ServicesAndProductoService";
import { InputTextarea } from 'primereact/inputtextarea';

export const WorkOrderAssignedHistoryOT= ({order}) => {
  
    const toast = useRef(null);
    const isMounted = useRef(false);
    const [viewAssHistoryOT, setViewAddHistoryOT] = useState(false);
    const [valueTextArea, setValueTextArea] = useState("");

    useEffect(() => {
        isMounted.current = true;

    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
 

    const productDialogFooterHistoryOT = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text"
                    onClick={() => setViewAddHistoryOT(false)}/>
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={() => setTextHistory()}/>
        </React.Fragment>
    );
    
    const setTextHistory = () => {
        let _objectHistory = {
            id: "",
            dateEvent: "",
            detalle: "" 
        }
        _objectHistory.id  = order.history.length+1;
        _objectHistory.dateEvent= (setNumberMonthAndYear(new Date().getUTCDate()) + "-"+setNumberMonthAndYear(new Date().getMonth()+1) + "-" +(new Date().getFullYear()));
        _objectHistory.detalle = valueTextArea;

        order.history.push(_objectHistory);
        toast.current.show({
            severity: 'success',
            summary: 'Evento agregado a Historial',
            detail: "Historial",
            life: 3000
        });
        setViewAddHistoryOT(false);
        setValueTextArea('');
    }

    const setNumberMonthAndYear= (value) => {
        if (value < 10) {
            return '0' + value;
        } 
        return value;
    }


    return (

        <div className="surface-card p-4 shadow-2 border-round">
              <div className="grid">
                <div className="col-12  font-medium text-3xl text-900 mb-3">
                    <div className="grid align-items-center">
                        <div className="col-12 lg:col-4">Historial de actividades en OT </div>
                        <div className="col-12 lg:col-1"><Button className="w-full" label="Agregar" onClick={() => setViewAddHistoryOT(true)} /></div>
                    </div>
                </div>

            </div>
            <Toast ref={toast}/>

              <div className="orders-subtable col-12 md:col-12 p-2 ">
                <div className="col-12 md:col-12 p-2 " >
                    <DataTable value={order.history} responsiveLayout="scroll" style={{width: '70vw', minWidth:'370px'}}>
                        <Column field="dateEvent" header="Fecha" sortable></Column>
                        <Column field="detalle" header="Detalle" sortable></Column>
                    </DataTable>
                </div>
            </div>
            <Dialog header="Historial de Servicio" visible={viewAssHistoryOT} modal
                    footer={productDialogFooterHistoryOT} onHide={() => setViewAddHistoryOT(false)}
                    breakpoints={{'960px': '75vw'}} style={{width: '30vw', minWidth:'370px'}}>
                <div className="surface-section px-2 py-3 md:px-2 lg:px-6">
                    <div className="grid">
                        <div className="col-12 lg:col-10">
                            <div className="grid formgrid p-fluid border-top-1 surface-border ">
                                <div className="field mb-4 col-12  p-3">                                    
                                    <div className="text-500 font-medium mb-2">Detalle de OT:</div>
                                    <div className="text-900">{order.mainProblem}</div>
                                    {/* <div className="text-900">{(viewAssHistoryOT)? serviceToSetHistory.detalle: ''}</div> */}

                                </div>                                         
                            </div>
                        </div>
                        <div className="col-12 lg:col-10">
                            <div className="grid formgrid p-fluid border-top-1 surface-border ">
                                {/* <div className="col-12 p-3">
                                    <div className="text-500 font-medium mb-2">Fecha:</div>
                                    <div className="text-900">{setNumberMonthAndYear(new Date().getUTCDate())}/{setNumberMonthAndYear(new Date().getMonth()+1)}/{(new Date().getFullYear())}</div>
                                </div>                                */}
                                <div className="field mb-4 col-12  p-3">
                                    <label htmlFor="bio1" className="font-medium text-900">Ingresar Detalle al Historial:</label>
                                    <InputTextarea value={valueTextArea} onChange={(e) => setValueTextArea(e.target.value)} rows={5}
                                        cols={50}/>
                                </div>                               
                            </div>
                        </div>
                    </div>
                </div>            
            </Dialog>


        </div>


    )
}
