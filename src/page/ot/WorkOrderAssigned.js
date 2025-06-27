import React, {useEffect, useRef, useState} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Toast} from 'primereact/toast';
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";

import {InputTextarea} from 'primereact/inputtextarea';
import {SelectTeamMember} from "./SelectTeamMember";
import {TabView,TabPanel} from "primereact/tabview";
import {Dropdown} from "primereact/dropdown";


import './DataTableOTs.css';

import { SectionGalleryOT } from './SectionGalleryOT';
import { WorkOrderAssignedNewIngress } from './WorkOrderAssignedNewIngress';
import { WorkOrderAssignedAdminBudget } from './WorkOrderAssignedAdminBudget';
import { WorkOrderAssignedHistoryOT } from './WorkOrderAssignedHistoryOT';

export const WorkOrderAssigned = ({ot, setShowDetailOrderDialog}) => {

    const statusServicesOrProduct = [
        { name: 'Ingresado', id: '1' },
        { name: 'Iniciado', id: '2' },
        { name: 'Detenido', id: '3' },
        { name: 'Finalizado', id: '4' },
        { name: 'Cancelado', id: '5' },
        { name: 'Pendiente', id: '6' }
    ];

    const dataPresupuesto =[
        {
            id: 1,
            estado: "Aceptado",
            amountTotalService: 440000, //  Monto total original  de servicios 
            amountTotalApproved: 320000, //  Monto total aprovado de servicios 
            amountTotalApprovedBudget: 320000, //  Monto total de presupuesto para servicios (Incluye IVA)
            amountDiscountBudget: 180800, //  Monto total de presupuesto para servicios (Incluye IVA)
            amountTotalIVA: 60800, //  Monto IVA
            checkIVA : true, 
            productsAndServices:[
                {
                    "id":1,
                    "tipo": "SERVICIO",
                    "detalle": "Semi-ajuste de motor por fuga de aceite",
                    "amountService": 100000,
                    "amountApproved": 100000
                },
                {
                    "id":2,
                    "tipo": "SERVICIO",
                    "detalle": "Rectificado de valvulas",
                    "amountService": 140000,
                    "amountApproved": 120000
                },
                {
                    "id":3,
                    "tipo": "PRODUCTO",
                    "detalle": "Empaquetaduras",
                    "amountService": 200000,
                    "amountApproved": 100000
                }
            ]
        },
        {
            id: 2,
            estado: "Pendiente",
            amountTotalService: 300000, //  Monto total original  de servicios 
            amountTotalApproved: 300000, //  Monto total aprovado de servicios 
            amountTotalApprovedBudget: 357000, //  Monto total de presupuesto para servicios (Incluye IVA)
            amountDiscountBudget: 0, //  Monto total de presupuesto para servicios (Incluye IVA)
            amountTotalIVA: 57000, //  Monto IVA
            checkIVA : false, 
            productsAndServices:[
                {
                    "id":1,
                    "tipo": "SERVICIO",
                    "detalle": "Semi-ajuste de motor por fuga de aceite",
                    "amountService": 100000,
                    "amountApproved": 100000
                },
                {
                    "id":2,
                    "tipo": "SERVICIO",
                    "detalle": "Rectificado de valvulas",
                    "amountService": 100000,
                    "amountApproved": 100000
                },
                {
                    "id":3,
                    "tipo": "PRODUCTO",
                    "detalle": "Empaquetaduras",
                    "amountService": 100000,
                    "amountApproved": 100000
                }
            ]
        }
    ]

    const [expandedRows, setExpandedRows] = useState(null);
    const toast = useRef(null);
    const isMounted = useRef(false);
    const [showBudgetDialog, setShowBudgetDialog] = useState(false);
    const [showIngressHistoryServiceORProduct, setShowIngressHistoryServiceORProduct] = useState(false);
    const [showChangeStatusService, setShowChangeStatusService] = useState(false);
    const [valueTextArea, setValueTextArea] = useState("");
    const [valueTextAreaStatusDialog, setValueTextAreaStatusDialog] = useState("");
    const [valueStatusDialogService , setValueStatusDialogService] = useState("");

    const [showChangeTeamUser, setShowChangeTeamUser] = useState(false);

    const [showViewPresupuesto, setViewPresupuesto] = useState(false);

    const [selectedPresupuesto, setSelectedPresupuesto] = useState(null);

    const [selectedPresupuestoEdit, setSelectedPresupuestoEdit] = useState(null);

    const [listBudget, setListBudget] = useState("");
    const [listServicesOrProductsOT, setListServicesOrProductsOT] = useState([]);

    const [serviceToSetHistory, setServiceToSetHistory] = useState(null);
    

    useEffect(() => {
        // setProducts(getAllServicesAndproduct())
        // setProductsFilterNewBudget(getAllServicesAndproduct()) 
    }, [expandedRows]);

    useEffect(() => {
        isMounted.current = true;
        setListBudget(dataPresupuesto);    
        setListServicesOrProductsOT(ot.items);  
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const setShowBudgetDialogOptions = () =>{
        setShowBudgetDialog(true);
    }

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
            case ('Pendiente'):
                statusCSS = "status-badge-pending";
                break;
            case ('Pendiente Presupuesto'):
                    statusCSS = "status-badge-pending";
                    break;
            case ('Retiro Pendiente'):
                statusCSS = "status-pending-delivery";
                break;
            case ('Detenido'):
                    statusCSS = "status-pending-delivery";
                    break;
            case ('Ingresado'):
                statusCSS = "status-ot-admitted";
                break;
            case ('Aprobado'):
                statusCSS = "status-ready";
                break;
            case ('Iniciado'):
                    statusCSS = "status-ot-started";
                    break;
            case ('Aceptado'):
                statusCSS = "status-ready";
                break;
            case ('Finalizado'):
                statusCSS = "status-ready";
                break;
            case ('Cancelado'):
                statusCSS = "status-badge-cancel";
                break;  
            case ('Presupuesto Aprobado'):
                statusCSS = "status-badge-pending";
                break;
            case ('Presupuesto Enviado'):
                statusCSS = "status-badge-sent";
                break;                
            
            default:
                break;
        }
        return statusCSS;
    }
 
    const allowExpansion = (rowData) => {
        return rowData.history.length > 0;
    };

    const rowExpansionTemplate = (data) => {
        return (
            <div className="orders-subtable col-12 md:col-12 p-2 ">
                <h5>Historial de actividades {data.name}</h5>
                <div className="col-12 md:col-12 p-2 " >
                    <DataTable value={data.history} responsiveLayout="scroll" style={{width: '70vw', minWidth:'370px'}}>
                        <Column field="dateEvent" header="Fecha" sortable></Column>
                        <Column field="detalle" header="Detalle" sortable></Column>
                    </DataTable>
                </div>
            </div>

        );
    }

    const closeOT = (option) => {
        if (option) {
            console.log("Cancelar OT");
            setShowDetailOrderDialog(false)
        } else {
            console.log("Finalizar OT");
            setShowDetailOrderDialog(false)
        }
    }

    const verifyStatusFinalizadoAndCancel = (rowData) => {
        return (rowData.estado!== 'Pendiente Presupuesto' && rowData.estado !== 'Finalizado' && rowData.estado !== 'Cancelado' ) ? true : false;
    }

    const setShowIngressHistoryServiceORProductOptions = (rowData) => {
        setShowIngressHistoryServiceORProduct(true);
        setServiceToSetHistory(rowData);
    }
    const setShowIngressHistoryStatusService = (rowData) => {
        setShowChangeStatusService(true);
        setServiceToSetHistory(rowData);
    }

    const setShowViewChangeTeamUser = (rowData) => {
        setShowChangeTeamUser(true)
        setServiceToSetHistory(rowData);
    }
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                {verifyStatusFinalizadoAndCancel(rowData) &&
                    <Button icon="pi pi-comments" className="p-button-rounded p-button-info mr-2"
                         onClick={() => setShowIngressHistoryServiceORProductOptions(rowData) }/>
                }
                {verifyStatusFinalizadoAndCancel(rowData) &&
                    <Button icon="pi pi-sync" className="p-button-rounded p-button-warning mr-2"
                            onClick={() => setShowIngressHistoryStatusService(rowData)}/>
                }
                {verifyStatusFinalizadoAndCancel(rowData) &&
                    <Button icon="pi pi-user-edit" className="p-button-rounded p-button-secondary mr-2"
                        onClick={() => setShowViewChangeTeamUser(rowData)}/>
                }
                {rowData.estado === 'Ingresado' &&
                  <Button icon="pi pi-minus-circle" className="p-button-rounded p-button-danger mr-2"
                        onClick={() => deleteServiceOrProductoDirectIngress(rowData.id)}/>
                }
            </React.Fragment>
        );
    }

    const deleteServiceOrProductoDirectIngress = (id) => {
        let _setviceToNewBudget = listServicesOrProductsOT.filter(val => val.id !== id);
        setListServicesOrProductsOT(_setviceToNewBudget);
        toast.current.show({severity: 'success', summary: 'Ingreso de servicios/productos', detail: 'Elemento Eliminado', life: 3000});   
    }
    
    const actionBodyPresupuestoTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-search" className="p-button-rounded p-button-info mr-2"
                        onClick={() => {
                            setViewPresupuesto(true)
                            setSelectedPresupuesto(rowData)
                            // let _valueNew = [...selectedPresupuesto]
                            let _valueNew2 = JSON.parse(JSON.stringify(rowData))
                            console.log(_valueNew2)
                            setSelectedPresupuestoEdit(_valueNew2)
                        }}/>
            </React.Fragment>
        );
    }

    const productDialogFooterHistoryService = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text"
                    onClick={() => setShowIngressHistoryServiceORProduct(false)}/>
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={() => setTextHistory()}/>
        </React.Fragment>
    );
    
    const statusDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text"
                    onClick={() => setShowChangeStatusService(false)}/>
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" 
                    onClick={() => setStatusHistory()}/>
        </React.Fragment>
    );

    const setNumberMonthAndYear= (value) => {
        if (value < 10) {
            return '0' + value;
        } 
        return value;
    }

    const setStatusHistory = () => {
        // Set evento to history
        let _objectHistory = {
            id: "",
            dateEvent: "",
            detalle: "" 
        }

        addSetChangeStatusHistory(valueStatusDialogService);

        let value = serviceToSetHistory.history.length+1;
        let _newHIstory = _objectHistory;
        _newHIstory.id  = value;
        _newHIstory.dateEvent= (setNumberMonthAndYear(new Date().getUTCDate()) + "-" + setNumberMonthAndYear(new Date().getMonth()+1) + "-" +(new Date().getFullYear()));
        _newHIstory.detalle = valueTextAreaStatusDialog;
        
        serviceToSetHistory.history.push(_newHIstory);

        toast.current.show({
            severity: 'success',
            summary: 'Evento agregado a Historial',
            detail: "Historial",
            life: 3000
        });
        setShowChangeStatusService(false);

        //Set Status in Service
        setValueTextAreaStatusDialog('');
        setValueStatusDialogService('');

    }

    const addSetChangeStatusHistory = (valueStatusDialogService) => {
        let _objectHistory = {
            id: "",
            dateEvent: "",
            detalle: "" 
        }

        let _newHIstory2 = _objectHistory;
        _newHIstory2.id  = serviceToSetHistory.history.length+1;
        _newHIstory2.dateEvent= (setNumberMonthAndYear(new Date().getUTCDate()) + "-" + setNumberMonthAndYear(new Date().getMonth()+1) + "-" +(new Date().getFullYear()));
        _newHIstory2.detalle = "Cambio estado de estado : " +  serviceToSetHistory.estado + ", a estado : " + valueStatusDialogService;
        serviceToSetHistory.estado = valueStatusDialogService;
        
        serviceToSetHistory.history.push(_newHIstory2);
    }

    const setTextHistory = () => {
        let _objectHistory = {
            id: "",
            dateEvent: "",
            detalle: "" 
        }
        _objectHistory.id  = serviceToSetHistory.history.length+1;
        _objectHistory.dateEvent= (setNumberMonthAndYear(new Date().getUTCDate()) + "-"+setNumberMonthAndYear(new Date().getMonth()+1) + "-" +(new Date().getFullYear()));
        _objectHistory.detalle = valueTextArea;

        serviceToSetHistory.history.push(_objectHistory);
        toast.current.show({
            severity: 'success',
            summary: 'Evento agregado a Historial',
            detail: "Historial",
            life: 3000
        });
        setShowIngressHistoryServiceORProduct(false);
        setValueTextArea('');
    }
    
    const onSelectChange = (e, name) => {
        setValueStatusDialogService(e.target.value.name);           
    }

    const dataBodyTeam = (rowData) => {
        let _names = [];
        rowData.team.forEach(element => {            
            _names.push( <li> { element.name } </li> );
        });
         return <ul>{_names}</ul>;
    }

    const asignTeamFooter = () => {
        return (
            <div>
                <Button label="Volver" icon="pi pi-times" className="p-button-text"
                        onClick={() =>  setShowChangeTeamUser(false)}/>
            </div>
        );
    }

    return (

        <div className="surface-card p-4 shadow-2 border-round">
            <div className="grid">
                <div className="col-12  font-medium text-3xl text-900 mb-3">
                    <div className="grid align-items-center">
                        <div className="col-12 lg:col-2">Nro Orden: #{ot.id} </div>
                        <div className="col-12 lg:col-2"><Button className="w-full" label="Agregar" onClick={() => setShowBudgetDialogOptions(true)}/></div>
                        <div className="col-12 lg:col-2"><Button className="w-full" label="Cancelar OT" onClick={() => closeOT(true)}/></div>
                        <div className="col-12 lg:col-2"><Button className="w-full" label="Finalizar OT" onClick={() => closeOT(false)}/></div>
                    </div>
                </div>

            </div>

            <div className="grid grid-nogutter border-top-1 surface-border pt-2">
                <div className="col-12 md:col-6 p-3">
                    <div className="text-500 font-medium mb-2">Nombres</div>
                    <div className="text-900">{ot.client.names}</div>
                </div>
                <div className="col-12 md:col-6 p-3">
                    <div className="text-500 font-medium mb-2">Apellidos</div>
                    <div className="text-900">{ot.client.fatherName} {ot.client.motherName}</div>
                </div>
                <div className="col-12 md:col-6 p-3">
                    <div className="text-500 font-medium mb-2">Fecha de ingreso</div>
                    <div className="text-900">{ot.fechaIngreso}</div>
                </div>
                <div className="col-12 md:col-6 p-3">
                    <div className="text-500 font-medium mb-2">Telefono</div>
                    <div className="text-900">{ot.client.phone}</div>
                </div>
                <div className="col-12 md:col-6 p-3">
                    <div className="text-500 font-medium mb-2">Patente</div>
                    <div className="text-900">{ot.car.licensePlate}</div>
                </div>
                <div className="col-12 md:col-6 p-3">
                    <div className="text-500 font-medium mb-2">Modelo</div>
                    <div className="text-900">{ot.car.vehiculo}</div>
                </div>
                <div className="col-2 md:col-2 p-2">
                    <div className="text-500 font-medium mb-2">Estado de OT</div>
                    <div className={`text-900 status-badge order-${ot.statusOT.toLowerCase()}`}>{ot.statusOT}</div>
                </div>
                <div className="col-12 md:col-12 p-3">
                    <div className="text-500 font-medium mb-2">Motivo de ingreso</div>
                    <div className="text-900">{ot.mainProblem}</div>
                </div>
                <div className="col-12 p-3">
                    <TabView className="tabview-header-icon">
                        <TabPanel header=" Servicios en ejecución" leftIcon="pi pi-cog" >
                            <div className="datatable-rowexpansion-demo">
                                <Toast ref={toast}/>

                                <div className="card">
                                    <DataTable value={listServicesOrProductsOT} expandedRows={expandedRows}
                                               onRowToggle={(e) => setExpandedRows(e.data)}
                                               onRowExpand={onRowExpand} onRowCollapse={onRowCollapse} responsiveLayout="scroll"
                                               rowExpansionTemplate={rowExpansionTemplate} dataKey="id">
                                        <Column expander={allowExpansion} style={{width: '3em'}}/>
                                        <Column field="id" header="Nro Servicio/Producto" sortable/>
                                        <Column field="tipo" header="Tipo" sortable/>
                                        <Column field="detalle" header="Detalle" sortable/>
                                        <Column field="team" body={dataBodyTeam} header="Asignado A" sortable/>
                                        <Column field="estado" header="Estado" body={statusBodyTemplate} sortable/>
                                        <Column body={actionBodyTemplate} exportable={false}
                                                style={{minWidth: '6rem'}}></Column>
                                    </DataTable>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel header=" Presupuestos" leftIcon="pi pi-money-bill">
                            <div className="datatable-rowexpansion-demo">
                                <Toast ref={toast}/>

                                <div className="card">
                                    <DataTable value={listBudget}
                                               responsiveLayout="scroll" dataKey="id" style={{width: '70vw', minWidth:'370px'}}>
                                        <Column field="id" header="Nro Presupuesto" sortable style={{ minWidth: '10rem' }}/>
                                        <Column field="amountTotalService" header="Costo Base" sortable
                                                style={{minWidth: '10rem'}}></Column>
                                        <Column field="amountTotalApprovedBudget" header="Costo a Aprobar" sortable
                                                style={{minWidth: '16rem'}}></Column>
                                        <Column field="estado" header="Estado" body={statusBodyTemplate} sortable style={{ minWidth: '10rem' }}/>
                                        <Column body={actionBodyPresupuestoTemplate} exportable={false}
                                                style={{minWidth: '6rem'}}></Column>
                                    </DataTable>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel header=" Imagenes" leftIcon="pi pi-images">
                            <div className="datatable-rowexpansion-demo">
                                <Toast ref={toast}/>
                                { /* Galería */}
                                    <SectionGalleryOT/>
                            </div>
                        </TabPanel>
                        <TabPanel header=" Comentarios" leftIcon="pi pi-book">
                            <div className="datatable-rowexpansion-demo">
                                <Toast ref={toast}/>
                                { /* Historial de OT */}
                                    <WorkOrderAssignedHistoryOT order={ot}/>
                         
                            </div>
                        </TabPanel>
                    </TabView>

                </div>
            </div>
            {/* Ingress Producto Or Services to OT */}
            <WorkOrderAssignedNewIngress 
                showBudgetDialog={showBudgetDialog} setShowBudgetDialog={setShowBudgetDialog} 
                listServicesOrProductsOT={listServicesOrProductsOT} setListServicesOrProductsOT= {setListServicesOrProductsOT} 
                listBudget={listBudget} setListBudget={setListBudget}/>

            <Dialog header="Historial de Servicio" visible={showIngressHistoryServiceORProduct} modal
                    footer={productDialogFooterHistoryService} onHide={() => setShowIngressHistoryServiceORProduct(false)}
                    breakpoints={{'960px': '75vw'}} style={{width: '30vw', minWidth:'370px'}}>
                <div className="surface-section px-2 py-3 md:px-2 lg:px-6">
                    <div className="grid">
                        <div className="col-12 lg:col-10">
                            <div className="grid formgrid p-fluid border-top-1 surface-border ">
                                <div className="field mb-4 col-12  p-3">                                    
                                    <div className="text-500 font-medium mb-2">Detalle de ejecucion:</div>
                                    <div className="text-900">{(showIngressHistoryServiceORProduct)? serviceToSetHistory.detalle: ''}</div>
                                </div>                                         
                            </div>
                        </div>
                        <div className="col-12 lg:col-10">
                            <div className="grid formgrid p-fluid border-top-1 surface-border ">
                                <div className="col-12 p-3">
                                    <div className="text-500 font-medium mb-2">Fecha:</div>
                                    <div className="text-900">{setNumberMonthAndYear(new Date().getUTCDate())}/{setNumberMonthAndYear(new Date().getMonth()+1)}/{(new Date().getFullYear())}</div>
                                </div>                               
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

            <Dialog header="Estado de Servicio"  visible={showChangeStatusService} modal
                    footer={statusDialogFooter} onHide={() => setShowChangeStatusService(false)}
                    breakpoints={{'960px': '75vw'}} style={{width: '30vw', minWidth:'370px'}}>
                <div className="p-5 flex flex-column flex-auto">
                    <div className="col-12 lg:col-12">
                        <div className="p4 border-round p-fluid">
                            <div className="field">
                                <label htmlFor="typeTraction" className="font-medium text-900">Estados</label>
                                <Dropdown valueTemplate={valueStatusDialogService} options={statusServicesOrProduct} onChange={(e) => onSelectChange(e , "valueStatusDialogService")} optionLabel="name" placeholder="Estado" />
                            </div>
                            <div className="field">
                                <label htmlFor="valueTextStatusDialog" className="font-medium text-900">Comentarios</label>
                                <InputTextarea value={valueTextAreaStatusDialog} onChange={(e) => setValueTextAreaStatusDialog(e.target.value)} rows={5} cols={50}/>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>

            {showChangeTeamUser && <Dialog header="Asignacion de personal" visible={showChangeTeamUser} footer={asignTeamFooter} modal
                    onHide={() => setShowChangeTeamUser(false) }
                    breakpoints={{'960px': '75vw'}} style={{width: '50vw', minWidth:'370px'}}>
                <div>
                    <div className="text-900 font-semibold text-lg p-3">Servicio</div>
                    <div className="col-12 lg:col-10 p-4">
                        <div className="grid formgrid p-fluid surface-border ">
                            <div className="field mb-4 col-12  px-3">                                    
                                <div className="text-500 font-medium mb-2">Detalle de ejecucion:</div>
                                <div className="text-900">{(serviceToSetHistory)? serviceToSetHistory.detalle: ''}</div>
                            </div>                                         
                        </div>
                
                    </div>
                    <div className="col-12 p-3 lg:col-12">                          
                            <SelectTeamMember serviceToSetHistory={serviceToSetHistory} setServiceToSetHistory={setServiceToSetHistory}/>
                    </div>
                </div>
            
            </Dialog>}
            
            {/* Admin Budget */}
            {selectedPresupuestoEdit && <WorkOrderAssignedAdminBudget 
                selectedPresupuesto={selectedPresupuestoEdit} setSelectedPresupuesto={setSelectedPresupuesto} 
                showViewPresupuesto={showViewPresupuesto} setViewPresupuesto={setViewPresupuesto}  
                listBudget={listBudget} setListBudget={setListBudget}/>}
        </div>
    )
}
