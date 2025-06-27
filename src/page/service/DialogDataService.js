import React, {useEffect, useRef, useState} from 'react';
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {Toast} from "primereact/toast";
import {Dialog} from "primereact/dialog";
import {classNames} from "primereact/utils";
import {Dropdown} from "primereact/dropdown";

import {getAll as getAllTypeCarService} from '../../services/util/TypeVehicleService'



export const DialogDataService = ({objectDialog, setObjectDialog, object, setObject, servicesAndProducts, setServicesAndProducts}) => {
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

    const typeService = [
        { name: 'Motor', id: 'MOT' },
        { name: 'Transmision', id: 'CAJ' },
        { name: 'Pintura', id: 'PINT' },
        { name: 'Carroseria', id: 'CARR' }
    ];

    const typesTraction = [
        { name: 'FWD', id: '1' },
        { name: 'RWD', id: '2' },
        { name: 'AWD', id: '3' },
        { name: '4WD', id: '4' },
        { name: '4x4', id: '5' }
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
    const typesPaints = [
        { name: 'Perlada', id: 'P' },
        { name: 'Tri Capa', id: 'T' },
        { name: 'Normal', id: 'N' }

    ];

    
    const [typeCars, setTypeCars] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);

    useEffect(() => {
        setTypeCars(getAllTypeCarService());
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const hideDialog = () => {
        setSubmitted(false);
        setObjectDialog(false);
    }

    const saveObject = () => {
        setSubmitted(true);
        if (object.description.trim()) {
            let _servicesAndProducts = [...servicesAndProducts];
            let _serviceOrProduct = {...object};
            if (object.id) {
                const index = findIndexById(object.id);
                _servicesAndProducts[index] = object; 
                toast.current.show({severity: 'success', summary: 'Acción exitosa', detail: 'Elemento Actualizado', life: 3000});
              
                setSubmitted(false);
                setServicesAndProducts(_servicesAndProducts);
                setObjectDialog(false);
                setObject(emptyObject);
            } else {
                if (object.description.trim().length > 0 && object.categoryCar !== "" && object.typeObject !== "" && object.typeService !== ""  && object.cost !== "") {
                    _serviceOrProduct.id = createId();
                    _servicesAndProducts.push(_serviceOrProduct);                
                    toast.current.show({severity: 'success', summary: 'Acción exitosa', detail: 'Elemento Creado', life: 3000});
                   
                    setSubmitted(false);
                    setServicesAndProducts(_servicesAndProducts);
                    setObjectDialog(false);
                    setObject(emptyObject);
                }              
            }
        
        }

    }

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < servicesAndProducts.length; i++) {
            if (servicesAndProducts[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _serviceOrProduct = {...object};
        _serviceOrProduct[`${name}`] = val;
        setObject(_serviceOrProduct);
    }

    const onSelectChange = (e, name) => {
        const val = (e.target && e.target.value.name) || '';
        let _serviceOrProduct = {...object};
        _serviceOrProduct[`${name}`] = val;
        setObject(_serviceOrProduct);
    }

    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog}/>
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveObject}/>
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
                                    <Dialog visible={objectDialog} style={{width: '450px'}} header="Producto y Servicio"
                                            modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                                        <div className="field">
                                            <label htmlFor="category" className="font-medium text-900">Categoria de Vehiculo</label>
                                            <Dropdown valueTemplate={object.categoryCar}  options={typeCars} onChange={(e) => onSelectChange(e , "categoryCar")} optionLabel="name" placeholder="Seleccione Categoria Vehiculo" />
                                            {submitted && !object.categoryCar &&
                                            <small className="p-error">La Categoria es requerida.</small>}
                                        </div>
                                        <div className="field">
                                            <label htmlFor="typeObject" className="font-medium text-900">Ingresa la clasificacion del recurso</label>
                                            <Dropdown valueTemplate={object.typeObject} options={typeObjects} onChange={(e) => onSelectChange(e , "typeObject")} optionLabel="name" placeholder="Seleccione Clasificacion" />
                                            {submitted && !object.typeObject &&
                                            <small className="p-error">La clasificacion  es requerida</small>}
                                        </div>
                                        <div className="field">
                                            <label htmlFor="typeService" className="font-medium text-900">Area de Servicio</label>
                                            <Dropdown valueTemplate={object.typeService} options={typeService} onChange={(e) => onSelectChange(e , "typeService")} optionLabel="name" placeholder="Seleccione area de servicio" />
                                            {submitted && !object.typeService &&
                                            <small className="p-error">El area es requerida.</small>}
                                        </div>
                                        <div className="field">
                                            <label htmlFor="fuel" className="font-medium text-900">Tipo de motor</label>
                                            <Dropdown valueTemplate={object.fuel} options={typeFuel} onChange={(e) => onSelectChange(e , "fuel")} optionLabel="name" placeholder="Seleccione motor" />
                                            {/* {submitted && !object.fuel &&
                                            <small className="p-error">El tipo de motor es requerido.</small>} */}
                                        </div>
                                        <div className="field">
                                            <label htmlFor="typeTraction" className="font-medium text-900">Tipo Traccion</label>
                                            <Dropdown valueTemplate={object.typeTraction} options={typesTraction} onChange={(e) => onSelectChange(e , "typeTraction")} optionLabel="name" placeholder="Seleccione Traccion" />
                                            {/* {submitted && !object.typeTraction &&
                                            <small className="p-error">El tipo de motor es requerido.</small>} */}
                                        </div>
                                        <div className="field">
                                            <label htmlFor="typeTransmission" className="font-medium text-900">Tipo de Transmision</label>
                                            <Dropdown valueTemplate={object.typeTransmission} options={typesTransmissions} onChange={(e) => onSelectChange(e , "typeTransmission")} optionLabel="name" placeholder="Seleccione Transmision" />
                                            {/* {submitted && !object.typeTransmission &&
                                            <small className="p-error">El tipo de transmision es requerida.</small>} */}
                                        </div>
                                        <div className="field">
                                            <label htmlFor="typePaint" className="font-medium text-900">Tipo de Pintura</label>
                                            <Dropdown valueTemplate={object.typePaint} options={typesPaints} onChange={(e) => onSelectChange(e , "typePaint")} optionLabel="name" placeholder="Seleccione Tipo de Pintura" />
                                            {/* {submitted && !object.typePaint &&
                                            <small className="p-error">El tipo de pintura es requerida.</small>} */}
                                        </div>
                                        <div className="field">
                                            <label htmlFor="description">Descripción</label>
                                            <InputText id="description" value={object.description}
                                                       onChange={(e) => onInputChange(e, 'description')} required autoFocus
                                                       className={classNames({'p-invalid': submitted && !object.description})}/>
                                            {submitted && !object.description &&
                                            <small className="p-error">La Descripcion es requerida.</small>}
                                        </div>
                                        <div className="field">
                                            <label htmlFor="cost">Costo</label>
                                            <InputText id="cost" value={object.cost}
                                                       onChange={(e) => onInputChange(e, 'cost')} required autoFocus
                                                       className={classNames({'p-invalid': submitted && !object.cost})}/>
                                            {submitted && !object.cost &&
                                            <small className="p-error">El Costo es requerido.</small>}
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
