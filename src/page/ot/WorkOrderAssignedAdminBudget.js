import React, {useEffect, useRef, useState} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Toast} from 'primereact/toast';
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {InputNumber} from "primereact/inputnumber";
import { Checkbox } from 'primereact/checkbox';

export const WorkOrderAssignedAdminBudget = ({selectedPresupuesto, setSelectedPresupuesto, showViewPresupuesto, setViewPresupuesto, listBudget, setListBudget}) => {



    const toast = useRef(null);
    const isMounted = useRef(false);
    const [valueCheckIVA, setValueCheckIVA] = useState(false);
    const [costIVAOrder, setCostIVAOrder] = useState("");
    
    const [deleteRowBudgetList, setDeleteRowBudgetList] = useState(false);    
    const [selectedRowDeleteBudgetDialog, setSelectedRowDeleteBudgetDialog] = useState(null);

    const [closeSelectedBudget, setCloseSelectedBudgetDialog] = useState(null);
    //Revisar config data setValueCheckIVA y setCostIVAOrder
    useEffect(() => {
        isMounted.current = true;
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const closeNewBudget = () => {
        setCloseSelectedBudgetDialog(true)
    }

    const approveBudget = () => {
        changeStatusBudget('Presupuesto Aprobado');
        setViewPresupuesto(false);
    }

    const approveAndSendBudget = () =>  {
        changeStatusBudget('Presupuesto Enviado');
        setViewPresupuesto(false);
    }

    const saveBudget = () => {
        let _listBudget = [...listBudget];
        let _budget = {...selectedPresupuesto};  
        
        const index = findIndexById(_budget.id);
        _listBudget[index] = _budget; 
        setListBudget(_listBudget);
        // editStatusBudgetInList()
        toast.current.show({
            severity: 'success',
            summary: 'Presupuesto Cancelado' ,
            detail: "Actualizacion de Presupuesto",
            life: 3000
        });
        setViewPresupuesto(false);
    }

    const sendNewBudget = () => {
        changeStatusBudget('Presupuesto Enviado');      
        setViewPresupuesto(false);
    }

    const setBudgetAcceptedClient = () => {
        changeStatusBudget('Aceptado');      
        setViewPresupuesto(false);
    }

    const valueBooleanStatusDisplay = () => {
        return (selectedPresupuesto.estado === 'Pendiente')? true : false ;
    }   

    const presupuestoFooter = () => {
        return (
            <div>
                <Button label="Volver" icon="pi pi-times" className="p-button-text"
                        onClick={() => {
                            setViewPresupuesto(false)
                            // setValueCheckIVA(null)
                        }
                        }/>
                {valueBooleanStatusDisplay() &&
                    <Button label="Guardar Presupuesto" icon="pi pi-save" className="p-button-text" onClick={() => saveBudget()}/>
                }
                {verifyStatusCancelAndAcepted() &&
                    <Button label="Cerrar Presupuesto" icon="pi pi-times" onClick={() => closeNewBudget()}/>
                }
                {selectedPresupuesto.estado === 'Presupuesto Enviado' &&
                    <Button label="Aceptado Cliente" icon="pi pi-times" onClick={() => setBudgetAcceptedClient ()}/>
                }
                {selectedPresupuesto.estado === 'Presupuesto Aprobado' &&
                    <Button label="Presupuesto Enviado" icon="pi pi-times" onClick={() => sendNewBudget()}/>
                }
                {valueBooleanStatusDisplay() &&
                    <Button label="Aprobar" icon="pi pi-send" autoFocus onClick={() => approveBudget()}/>
                }
                {valueBooleanStatusDisplay() &&
                    <Button label="Aprobar y Enviar" icon="pi pi-send" autoFocus onClick={() => approveAndSendBudget()}/>
                }
            </div>
        );
    }
 
    const actionBodyPresupuestoTemplateBudget = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-minus-circle" className="p-button-rounded p-button-danger mr-2"
                    onClick={() => viewDeleteRowBudgetDialog(rowData)}/>
            </React.Fragment>
        );
    }
  
    const viewDeleteRowBudgetDialog = (rowData) => {
        setDeleteRowBudgetList(true);
        setSelectedRowDeleteBudgetDialog(rowData);
    }

    const deleteServiceOrProductoBudgetAdmin = () => {
        let _selectedPresupuesto = selectedPresupuesto.productsAndServices.filter(val => val.id !== selectedRowDeleteBudgetDialog.id);
        selectedPresupuesto.productsAndServices = _selectedPresupuesto;
        setSelectedPresupuesto(selectedPresupuesto);
        setDeleteRowBudgetList(false);


        selectedPresupuesto.amountTotalService = calculateCostOriginalMountService(selectedPresupuesto.productsAndServices);


        refreshCosts()
        toast.current.show({
            severity: 'success',
            summary: 'Elemento eliminado de presupuesto',
            detail: "Actualizacion de Presupuesto",
            life: 3000
        });
        setCostIVAOrder(selectedPresupuesto.amountTotalIVA);

    }

    const hideDeleteRowBudgetDialog = () => {
        setDeleteRowBudgetList(false);
        setSelectedPresupuesto(null)
        // setValueCheckIVA(false)
    }
    
    const deleteRowBudgetDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteRowBudgetDialog}/>
            <Button label="Sí" icon="pi pi-check" className="p-button-text" onClick={deleteServiceOrProductoBudgetAdmin}/>
        </React.Fragment>
    );

    const hideCloseBudgetDialog = () => {
        setCloseSelectedBudgetDialog(false);
        setSelectedPresupuesto(null)
    }
    
    const closeBudgetAndCancelStatus = () => {
        changeStatusBudget('Cancelado');      
    }

    const changeStatusBudget = (status) => {
        let _listBudget = [...listBudget];
        let _budget = {...selectedPresupuesto};  
        
        const index = findIndexById(_budget.id);
        _budget.estado = status;
        _listBudget[index] = _budget; 
        setListBudget(_listBudget);
        // editStatusBudgetInList()
        toast.current.show({
            severity: 'success',
            summary: 'Presupuesto Cancelado' ,
            detail: "Actualizacion de Presupuesto",
            life: 3000
        });

        setCloseSelectedBudgetDialog(false);
        setViewPresupuesto(false)   
    }

    const closeBudgetDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideCloseBudgetDialog}/>
            <Button label="Sí" icon="pi pi-check" className="p-button-text" onClick={closeBudgetAndCancelStatus}/>
        </React.Fragment>
    );

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < listBudget.length; i++) {
            if (listBudget[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }   

    const onCellEditComplete = (e) => {
        e.rowData.amountApproved = e.newRowData.amountApproved;
        refreshCosts()
        toast.current.show({
            severity: 'success',
            summary: 'Valor de servicio actualizado',
            detail: "Actualizacion de costos",
            life: 3000
        });
        setCostIVAOrder(selectedPresupuesto.amountTotalIVA);
    }

    const cellEditor = (options) => {
           return  <InputNumber value={options.value} onValueChange={(e) => options.editorCallback(e.value)} mode="currency" currency="USD" minFractionDigits={0} locale="en-ES" />
    }

    const actionBodyPresupuestoTemplateBudgetView = (data) =>{
        if (data.estado !== 'Aprobado') {
            return false;
        } 
        return true;
    }

    const modifyCostFromCheck = (e) =>{        
        setValueCheckIVA(e);
        selectedPresupuesto.checkIVA = e;
        if (e) {
            selectedPresupuesto.amountTotalApprovedBudget = selectedPresupuesto.amountTotalApprovedBudget - selectedPresupuesto.amountTotalIVA;   
            selectedPresupuesto.amountDiscountBudget = selectedPresupuesto.amountDiscountBudget  + selectedPresupuesto.amountTotalIVA;
            toast.current.show({
                severity: 'success',
                summary: 'Se descuenta costo de IVA',
                detail: "Actualizacion de costos",
                life: 3000
            });
        } else {          
            selectedPresupuesto.amountTotalApprovedBudget = selectedPresupuesto.amountTotalApprovedBudget + selectedPresupuesto.amountTotalIVA;    
            selectedPresupuesto.amountDiscountBudget = selectedPresupuesto.amountDiscountBudget - selectedPresupuesto.amountTotalIVA;
            toast.current.show({
                severity: 'success',
                summary: 'Se agrega costo de IVA',
                detail: "Actualizacion de costos",
                life: 3000
            });
        }
        setSelectedPresupuesto(selectedPresupuesto);
        setCostIVAOrder(selectedPresupuesto.amountTotalIVA);

    }

    const refreshCosts= () => {
        // Calculo de monto total servicios monto approvado
        selectedPresupuesto.amountTotalApproved = calculateCostServices(selectedPresupuesto.productsAndServices);
        // Calculo de IVA total servicios monto approvado
        selectedPresupuesto.amountTotalIVA =  calculateIVA(selectedPresupuesto.productsAndServices);
        setSelectedPresupuesto(selectedPresupuesto);
        calculateDiscount();
    }
    const calculateIVA = (services) =>{    
        return selectedPresupuesto.amountTotalApproved* 0.19;
    }

    const calculateCostServices= (services) => {
        let amount = 0;
        for (let index = 0; index < services.length; index++) {
            amount +=  services[index].amountApproved;            
        }
        return amount;
    }

    const calculateCostOriginalMountService= (services) => {
        let amount = 0;
        for (let index = 0; index < services.length; index++) {
            amount +=  services[index].amountService;            
        }
        return amount;
    }

    const calculateDiscount = () => {
        if (selectedPresupuesto.checkIVA){
            selectedPresupuesto.amountDiscountBudget = (selectedPresupuesto.amountTotalService - (selectedPresupuesto.amountTotalApproved - selectedPresupuesto.amountTotalIVA));
            selectedPresupuesto.amountTotalApprovedBudget = selectedPresupuesto.amountTotalApproved ;
        } 
        else{
            selectedPresupuesto.amountDiscountBudget = (selectedPresupuesto.amountTotalService - selectedPresupuesto.amountTotalApproved);
            selectedPresupuesto.amountTotalApprovedBudget = selectedPresupuesto.amountTotalApproved + selectedPresupuesto.amountTotalIVA;
        }
        setSelectedPresupuesto(selectedPresupuesto)
    }

    const verifyStatusCancelAndAcepted = () => {
        return (selectedPresupuesto.estado !== 'Aceptado' && selectedPresupuesto.estado !== 'Cancelado' ) ? true : false;
    }

    return (

        <div className="surface-card p-4 shadow-2 border-round">
            <Dialog header="Presupuesto" footer={presupuestoFooter} visible={showViewPresupuesto} modal
                    onHide={() => setViewPresupuesto(false)}
                    breakpoints={{'960px': '75vw'}} style={{width: '70vw', minWidth:'370px'}}>
                <div>
                    <div className="col-12  p-3">
                        <div className="surface-card border-round shadow-2">
                            <DataTable editMode="cell" value={selectedPresupuesto.productsAndServices} header="Servicios y/o Productos" responsiveLayout="stack"
                                    breakpoint="960px">
                                <Column field="id" header="ID" sortable
                                        style={{minWidth: '5rem'}}></Column>
                                <Column field="tipo" header="Tipo" sortable
                                        style={{minWidth: '8rem'}}></Column>
                                <Column field="detalle" header="Detalle" sortable
                                        style={{minWidth: '12rem'}}></Column>
                                <Column field="amountService" header="Monto servicio" sortable
                                        style={{minWidth: '10rem'}}></Column>
                                {(selectedPresupuesto.estado === 'Aceptado' || selectedPresupuesto.estado === 'Cancelado') && <Column field="amountApproved" header="Monto aprobado" sortable
                                        style={{minWidth: '16rem'}}></Column> 
                                }
                                {verifyStatusCancelAndAcepted() && <Column field="amountApproved" header="Monto aprobado" sortable editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}
                                        style={{minWidth: '16rem'}}></Column> }

                                {verifyStatusCancelAndAcepted() && <Column body={actionBodyPresupuestoTemplateBudget} hidden={actionBodyPresupuestoTemplateBudgetView(selectedPresupuesto)} exportable={false}
                                        style={{minWidth: '6rem'}}></Column>
                                }
                            </DataTable>
                        </div>
                    </div>
                    <Toast ref={toast}/>
                    <div className="col-12 p-3 " align="right">
                        <div className="col-6 surface-card p-4 border-round shadow-2 ">
                            <div className="border-bottom-1 surface-border pb-4" align="left">
                                <span className="text-900 text-xl block">Resumen de Presupuesto</span>
                            </div>
                            <div className="border-bottom-1 surface-border my-3 py-2">
                                <div className="flex justify-content-between mb-3">
                                    <span className="text-900">Costo total Servicios y Productos</span>
                                    <span className="text-900">{ selectedPresupuesto.amountTotalApproved}</span> 
                                </div>
                                <div className="flex justify-content-between mb-3">
                                    <span className="text-900">IVA</span>
                                    <span className="text-900 text-red-600">{ selectedPresupuesto.amountTotalIVA }</span>
                                </div>
                                <div className="flex align-items-center mb-3">
                                   <Checkbox onChange={e => modifyCostFromCheck(e.checked)} checked={ selectedPresupuesto.checkIVA } disabled={!verifyStatusCancelAndAcepted()}></Checkbox>
                                    <label htmlFor="descuentoIVA" className="ml-2">Descontar IVA</label>
                                </div>
                                <div className="flex justify-content-between mb-3">
                                    <span className="text-900">Descuento</span>
                                    <span className="text-900">${(selectedPresupuesto.amountDiscountBudget > 0 )? selectedPresupuesto.amountDiscountBudget :  0}</span>
                                </div>
                            </div>
                            <div className=" my-3 ">
                                <div className="flex justify-content-between mb-3">
                                    <span className="text-900 font-medium">Total</span>
                                    <span className="text-900 font-bold" >$ {selectedPresupuesto.amountTotalApprovedBudget}</span>
                                </div>
                            </div>                           
                        </div>
                    </div>

                </div>
            </Dialog>

            <Dialog visible={deleteRowBudgetList} style={{width: '450px'}} header="Confirm"
                    modal footer={deleteRowBudgetDialogFooter} onHide={hideDeleteRowBudgetDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
                    <span>Está seguro de eliminar la Fila <b></b>?</span>
                </div>
            </Dialog>
            <Dialog visible={closeSelectedBudget} style={{width: '450px'}} header="Confirm"
                    modal footer={closeBudgetDialogFooter} onHide={hideCloseBudgetDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
                    <span>Está seguro de cerrar definitivamente este Presupuesto<b></b>?</span>
                </div>
            </Dialog>
        </div>
    )
}
