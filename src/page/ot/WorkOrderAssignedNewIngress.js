import React, {useEffect, useRef, useState} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Toast} from 'primereact/toast';
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {getAll as getAllServicesAndproduct} from "../../services/service-product/ServicesAndProductoService";
import {AutoComplete} from "primereact/autocomplete";
import {Dropdown} from "primereact/dropdown";

export const WorkOrderAssignedNewIngress = ({showBudgetDialog, setShowBudgetDialog, listServicesOrProductsOT, setListServicesOrProductsOT, listBudget, setListBudget}) => {


    const typeService = [
        { name: 'Toda Categoria', id: 'ALL' },
        { name: 'Motor', id: 'MOT' },
        { name: 'Transmision', id: 'CAJ' },
        { name: 'Pintura', id: 'PINT' },
        { name: 'Electricidad', id: 'ELEC' },        
        { name: 'Carroseria', id: 'CARR' }
    ];

    const typesTransmissions = [
        { name: 'Automática', id: 'AUT' },
        { name: 'Mecánica', id: 'MEC' }       
    ];
    const typeFuel = [
        { name: 'Diésel', id: 'D' },
        { name: 'Gasolina', id: 'G' },
        { name: 'Híbrido', id: 'H' }       
    ];
    const typeObjects = [
        { name: 'Servicio', id: 'S' },
        { name: 'Producto', id: 'P' }
    ];
    
    
    const objectCleanProductAndServices = {
        id: "",
        tipo: "",
        detalle: "",  
        amountService: "",
        amountApproved:""
    };

    const objectCleanBudget = {
        id:1,
        estado: "",
        amountTotalService: 0, //  Monto total original  de servicios 
        amountTotalApproved: 0, //  Monto total aprovado de servicios 
        amountTotalApprovedBudget: 0, //  Monto total de presupuesto para servicios (Incluye IVA)
        amountDiscountBudget: 0, //  Monto total de presupuesto para servicios (Incluye IVA)
        amountTotalIVA: 0, //  Monto IVA
        checkIVA : false, 
        productsAndServices: [objectCleanProductAndServices ]
    };

    const [valuefilterTypeServiceBudget, setValuefilterTypeServiceBudget ] = useState('');
    const [valuefilterTypeTransmissionBudget, setValuefilterTypeTransmissionBudget ] = useState('');
    const [valuefilterTypeFuelBudget, setValuefilterTypeFuelBudget ] = useState('');
    const [valuefilterTypeObjectBudget, setValuefilterTypeObjectBudget ] = useState(''); 
    
    
    const [products, setProducts] = useState([]);
    const [productsFilterNewBudget, setProductsFilterNewBudget] = useState([]);
    const [productsToBudget, setProductsToBudget] = useState([]);
    const [selectedService, setSelectedService] = useState(null)
    const [filteredService, setFilteredService] = useState([])
    const toast = useRef(null);
    const isMounted = useRef(false);

    const [selectedRowDeleteBudgetDialog, setSelectedRowDeleteBudgetDialog] = useState(null);


    const [deleteRowNewBudgetList, setDeleteRowNewBudgetList] = useState(false);    
   

    useEffect(() => {
        setProducts(getAllServicesAndproduct())
        setProductsFilterNewBudget(getAllServicesAndproduct())
        setProductsToBudget([])

  
    }, []);

    useEffect(() => {
        isMounted.current = true;
        cleanFilterNewBudget();
        setProductsToBudget([])
        // setListBudget(dataPresupuesto);    
        // setListServicesOrProductsOT(ot.history);    
        // modifyCostOrder(dataPresupuesto[0].amountTotalService);
        // calculateDiscount();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const searchService = (event) => {
        setTimeout(() => {
            let _filteredService = [];
            let _productsFilterNewBudget = setFilterAutocompletenewBudget();
            if (!event.query.trim().length && _productsFilterNewBudget.length < 1) {
                console.log("No existen elementos")
            } else {
                _filteredService = _productsFilterNewBudget.filter((service) => {
                    return service.description.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }
            setFilteredService(_filteredService);
        }, 250);
    }

    const cancelNewBudget = () => {
        setShowBudgetDialog(false)
    }

    const ingressDirectNewServices = () => {
        let _listServicesOrProductsOT = [...listServicesOrProductsOT]

        productsToBudget.forEach(element => {

            let _productOrService={};
            _productOrService.id = (_listServicesOrProductsOT.length)+1;
            _productOrService.tipo = element.typeObject;
            _productOrService.detalle = element.description;
            _productOrService.team = [];
            _productOrService.estado = 'Ingresado';
            _productOrService.history = [];
            _listServicesOrProductsOT.push(_productOrService);

        });
        setListServicesOrProductsOT(_listServicesOrProductsOT);

        toast.current.show({
            severity: 'success',
            summary: 'Servicios Ingresados Directamente' ,
            detail: "Actualizacion de OT",
            life: 3000
        });
        setShowBudgetDialog(false)
    }

    const ingressNewBudget = () => {
        let _listServicesOrProductsOT = [...listServicesOrProductsOT]

        let _newBudget = objectCleanBudget;
        _newBudget.id = (_listServicesOrProductsOT.length)+1;
        _newBudget.estado = "Pendiente";
        _newBudget.amountTotalService = calculateCostOriginalMountService(productsToBudget); 
        _newBudget.amountTotalApproved = calculateCostOriginalMountService(productsToBudget);
        _newBudget.amountTotalApprovedBudget = (calculateCostOriginalMountService(productsToBudget))*1.19;
        _newBudget.amountDiscountBudget = 0;
        _newBudget.amountTotalIVA = (calculateCostOriginalMountService(productsToBudget))*0.19;
        _newBudget.checkIVA  = false;
        _newBudget.productsAndServices = [];

        productsToBudget.forEach(element => {
            let _productOrService={};
            _productOrService.id = (_listServicesOrProductsOT.length)+1;
            _productOrService.tipo = element.typeObject;
            _productOrService.detalle = element.description;
            _productOrService.team = [];
            _productOrService.estado = 'Pendiente Presupuesto';
            _productOrService.history = [];
            _listServicesOrProductsOT.push(_productOrService);

            let _productOrServiceBudget = {};
            _productOrServiceBudget.id= (_listServicesOrProductsOT.length)+1;
            _productOrServiceBudget.tipo= element.typeObject;
            _productOrServiceBudget.detalle= element.description;
            _productOrServiceBudget.amountService= element.amountService;
            _productOrServiceBudget.amountApproved= element.amountApproved;
        
            _newBudget.productsAndServices.push(_productOrServiceBudget);
        });
        setListServicesOrProductsOT(_listServicesOrProductsOT)
        listBudget.push(_newBudget)
        toast.current.show({
            severity: 'success',
            summary: 'Presupuesto Ingresados Directamente' ,
            detail: "Actualizacion de OT",
            life: 3000
        });
        setShowBudgetDialog(false)
    }

    const budgetFooter = () => {
        return (
            <div>
                <Button label="Cancelar" icon="pi pi-times" className="p-button-text"
                        onClick={() => cancelNewBudget()}/>
                <Button label="Ingresar" icon="pi pi-check" autoFocus
                        onClick={() => ingressDirectNewServices()}/>
                <Button label="Generar presupuesto" icon="pi pi-check" autoFocus
                 onClick={() => ingressNewBudget()}/>
            </div>
        );
    }


    
    const deleteServiceOrProductTableBudget = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-minus-circle" className="p-button-rounded p-button-danger mr-2"
                    onClick={() => deleteServiceOrProductoBudget(rowData)}/>
            </React.Fragment>
        );
    }

    const calculateCostOriginalMountService= (services) => {
        let amount = 0;
        for (let index = 0; index < services.length; index++) {
            amount +=  services[index].amountService;            
        }
        return amount;
    }

    const addElementToNewBudget = () => {
        let _selectedServiceToNewBudget = {
            id: selectedService.id,
            typeObject: selectedService.typeObject,
            categoryCar: selectedService.categoryCar,
            typeService: selectedService.typeService,
            description: selectedService.description,
            amountService: selectedService.cost*1,
            amountApproved: selectedService.cost*1
        };
        
        let _productsToBudget = [...productsToBudget];
        _productsToBudget.push(_selectedServiceToNewBudget)
        setProductsToBudget(_productsToBudget);
    }

    const deleteServiceOrProductoBudget = (rowData) => {
        setDeleteRowNewBudgetList(true);
        setSelectedRowDeleteBudgetDialog(rowData);
    }

    const hideDeleteRowNewBudgetDialog = () => {
        setDeleteRowNewBudgetList(false);
    }

    const deleteServiceOrProductoNewBudget = () => {
        let _selectedRowNewBudget = productsToBudget.filter(val => val.id !== selectedRowDeleteBudgetDialog.id);
        setProductsToBudget(_selectedRowNewBudget);

        toast.current.show({
            severity: 'success',
            summary: 'Elemento eliminado de listado',
            detail: "Actualizacion Exitosa",
            life: 3000
        });
        hideDeleteRowNewBudgetDialog()
    }

    const deleteRowNewBudgetDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteRowNewBudgetDialog}/>
            <Button label="Sí" icon="pi pi-check" className="p-button-text" onClick={deleteServiceOrProductoNewBudget}/>
        </React.Fragment>
    );
 
    const onSelectChangeTypeObject = (e, name) => {
        setValuefilterTypeObjectBudget(e.target.value.name);
        // setBooleanForCreateOrAgregateElement(true);
    }

    const onSelectChangeTypeService = (e, name) => {
        setValuefilterTypeServiceBudget(e.target.value.name);         
        // setBooleanForCreateOrAgregateElement(true);        
    }

    const onSelectChangeTypeFuel = (e, name) => {
        setValuefilterTypeFuelBudget(e.target.value.name);         
        // setBooleanForCreateOrAgregateElement(true);        
    }

    const onSelectChangeTypeTransmission = (e, name) => {
        setValuefilterTypeTransmissionBudget(e.target.value.name);         
        // setBooleanForCreateOrAgregateElement(true);
    }

    const setFilterAutocompletenewBudget = () => {
            let _filteredProduct = products;
            if (valuefilterTypeObjectBudget.trim() !== '') {
                _filteredProduct = productsFilterNewBudget.filter((service) => {
                    return service.typeObject.toLowerCase().startsWith(valuefilterTypeObjectBudget.toLowerCase());
                });
            } 
            if (valuefilterTypeServiceBudget) {
                _filteredProduct = _filteredProduct.filter((service) => {
                    return service.typeService.toLowerCase().startsWith(valuefilterTypeServiceBudget.toLowerCase());
                }); 
            }
            if (valuefilterTypeFuelBudget) {
                _filteredProduct = _filteredProduct.filter((service) => {
                    if (service.typeEngine !=='') {
                        return service.typeEngine.toLowerCase().startsWith(valuefilterTypeFuelBudget.toLowerCase());
                    } else {
                        return true;
                    }
                });
            }
            if (valuefilterTypeTransmissionBudget) {
                _filteredProduct = _filteredProduct.filter((service) => {
                    if (service.typeTransmission !=='') {
                        return service.typeTransmission.toLowerCase().startsWith(valuefilterTypeTransmissionBudget.toLowerCase());
                    } else {
                        return true;
                    }
                });
            }
            return _filteredProduct;
    }

    const cleanFilterNewBudget = () => {
        setFilteredService(products);
        setProductsFilterNewBudget(products);
        setValuefilterTypeServiceBudget('');         
        setValuefilterTypeObjectBudget('');
        setValuefilterTypeFuelBudget('');         
        setValuefilterTypeTransmissionBudget('');
        setSelectedService(null);
    }

    const setSelectedServiceOptions= (e) =>{
        setSelectedService(e);
    }

    return (

        <div className="surface-card p-4 shadow-2 border-round">
            <Dialog header="Agregar Servicios/Productos" visible={showBudgetDialog} onHide={() => setShowBudgetDialog(false)}
                    breakpoints={{'960px': '75vw'}} style={{width: '75vw',minWidth:'570px'}} footer={budgetFooter}>
                <div>
                    {/* <h5>Servicios y Productos</h5> */}
                    <Toast ref={toast}/>

                    <div className="text-900 font-medium text-900 text-xl mb-3">Servicios y Productos</div>
                    <div className="surface-card p-4 shadow-2 border-round p-fluid">
                        <div className="grid formgrid p-fluid">
                            <div className="field mb-4 col-12 md:col-3">
                                <label htmlFor="typeObject" className="font-medium text-900">Tipo</label>
                                <Dropdown valueTemplate={valuefilterTypeObjectBudget} options={typeObjects} onChange={(e) => onSelectChangeTypeObject(e , "typeObject")} optionLabel="name" placeholder="Seleccione Clasificacion" />
                            </div>
                            <div className="field mb-4 col-12 md:col-3">
                                <label htmlFor="typeService" className="font-medium text-900">Area</label>
                                <Dropdown valueTemplate={valuefilterTypeServiceBudget} options={typeService} onChange={(e) => onSelectChangeTypeService(e , "typeService")} optionLabel="name" placeholder="Seleccione area de servicio" />
                            </div>
                            <div className="field mb-4 col-12 md:col-3">
                                <label htmlFor="fuel" className="font-medium text-900">Combustible</label>
                                <Dropdown valueTemplate={valuefilterTypeFuelBudget} options={typeFuel} onChange={(e) => onSelectChangeTypeFuel(e , "fuel")} optionLabel="name" placeholder="Seleccione motor" />
                            </div>
                            <div className="field mb-4 col-12 md:col-3">
                                <label htmlFor="typeTransmission" className="font-medium text-900">Transmision</label>
                                <Dropdown valueTemplate={valuefilterTypeTransmissionBudget} options={typesTransmissions} onChange={(e) => onSelectChangeTypeTransmission(e , "typeTransmission")} optionLabel="name" placeholder="Seleccione Transmision" />
                            </div>

                            <div className="field mb-4 col-12">
                                <label htmlFor="typeTransmission" className="font-medium text-900">Seleccione Servicio o Producto</label>
                                <div className="flex m-1">
                                    <div className="ml-2">
                                        <Button label="Limpiar Filtros" onClick={() => cleanFilterNewBudget()}/>
                                    </div>
                                    <div className="col-6 ml-2">
                                        <AutoComplete value={selectedService} suggestions={filteredService}
                                            completeMethod={searchService} field="description" dropdown forceSelection
                                            onChange={(e) => setSelectedServiceOptions(e.value)} aria-label="Servicios/Productos"
                                            dropdownAriaLabel="Seleccione un servicio/producto" />
                                    </div>                                   
                                    <div className="ml-2">
                                        <Button label="Agregar" onClick={() => addElementToNewBudget()} disabled={(selectedService == null || filteredService.length < 1)? true: false}/> : 
                                    </div>
                                </div>
                            </div>
                        </div>
                        <DataTable value={productsToBudget} header="Presupuesto" responsiveLayout="stack"
                                breakpoint="960px">
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
                            <Column field="amountService" header="Costo Servicio" sortable
                                    style={{minWidth: '16rem'}}></Column>
                            <Column body={deleteServiceOrProductTableBudget} exportable={false}
                                    style={{minWidth: '6rem'}}></Column>
                        </DataTable>
                    </div>

                </div>
            </Dialog>           
            <Dialog visible={deleteRowNewBudgetList} style={{width: '450px'}} header="Confirm"
                    modal footer={deleteRowNewBudgetDialogFooter} onHide={hideDeleteRowNewBudgetDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
                    <span>Está seguro de eliminar la Fila <b></b>?</span>
                </div>
            </Dialog>
        </div>
    )
}
