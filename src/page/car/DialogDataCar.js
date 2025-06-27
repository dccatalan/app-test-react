import React, {useEffect, useRef, useState} from 'react';
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {Dialog} from "primereact/dialog";
import {Toast} from "primereact/toast";
import {classNames} from "primereact/utils";
import {Dropdown} from "primereact/dropdown";
import { Calendar } from 'primereact/calendar';



import {getAll as getAllCar} from '../../services/car/CarService'
import {getAll as getAllTypeCarService} from '../../services/util/TypeVehicleService'
import {getAll as getAllMarkCarService} from '../../services/util/BrandVehicleService'


export const DialogDataCar = ({carDialog, setCarDialog, car, setCar, cars, setCars}) => {
    let emptyCar = {
        id: null,
        mark: '',
        model: '',
        year: '',
        version: '',
        cc: '',
        fuel: '',
        transmission: '',
        traction: '',
        color: '',
        category: '',
        chasis: '',
        engine: '',
        patent: '',
        description: '',
        kilometres: '', //Definir almacenamiento por OT
        status: '',
        dateIngress:''
    };
    const typesTransmissions = [
        { name: 'Automática', id: 'AUT' },
        { name: 'Mecánica', id: 'MEC' }       
    ];
    const typesFuels = [
        { name: 'Diésel', id: 'D' },
        { name: 'Gasolina', id: 'G' },
        { name: 'Híbrido', id: 'H' }       
    ];

    const typesTraction = [
        { name: 'FWD', id: '1' },
        { name: 'RWD', id: '2' },
        { name: 'AWD', id: '3' },
        { name: '4WD', id: '4' },
        { name: '4x4', id: '5' }
    ];
    const [typeCars, setTypeCars] = useState(null);
    const [marksCars, setMarksCars] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);

    useEffect(() => {
        setCars(getAllCar());
        setTypeCars(getAllTypeCarService());
        setMarksCars(getAllMarkCarService());
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const hideDialog = () => {
        setSubmitted(false);
        setCar(emptyCar);
        setCarDialog(false);
    }

    const saveClient = () => {
        setSubmitted(true);
        // if (car.name.trim()) {
            let _cars = [...cars];
            let _car = {...car};
            if (car.id) {
                const index = findIndexById(car.id);
                _cars[index] = car; 
                toast.current.show({severity: 'success', summary: 'Acción exitosa', detail: 'Elemento Actualizado', life: 3000});
                setSubmitted(false);
                setCars(_cars);
                setCarDialog(false);
                setCar(emptyCar);
            } else {
                if (car.mark !== "" && car.category !== "" && car.model !== "" && car.fuel !== "" && car.transmission !== "" && car.year !== "" && car.patent !== "" && car.cc !== "") {
                    _car.id = createId();
                    _cars.push(_car);              
                    toast.current.show({severity: 'success', summary: 'Acción exitosa', detail: 'Elemento Creado', life: 3000});                   
                    setSubmitted(false);
                    setCars(_cars);
                    setCarDialog(false);
                    setCar(emptyCar);
                }              
            }
        // }
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
        for (let i = 0; i < cars.length; i++) {
            if (cars[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _car = {...car};
        _car[`${name}`] = val;

        setCar(_car);
    }
    const onInputChangeYear = (e, name) => {
        if ( e != null && e.length > 3) {
            const val = (e) || '';
            let _car = {...car};
            _car[`${name}`] = val+"";
            setCar(_car);
        }
    }

    const onSelectChange = (e, name) => {
        const val = (e.target && e.target.value.name) || '';
        let _car = {...car};
        _car[`${name}`] = val;
        setCar(_car);
    }

    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog}/>
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveClient}/>
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
                                    <Dialog visible={carDialog} style={{width: '450px'}} header="Detalle de Vehículo"
                                            modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>   
                                        <div className="field">
                                            <label htmlFor="dateIngress" className="font-medium text-900">Fecha Ingreso</label>
                                            <Calendar id="dateIngress" value={new Date(car.dateIngress)} onChange={(e) => onInputChangeYear(e.value, 'dateIngress')} dateFormat="dd/mm/yy" disabled/>
                                        </div>
                                        <div className="field">
                                            <label htmlFor="patent">Patente</label>
                                            <InputText id="patent" value={car.patent}
                                                       onChange={(e) => onInputChange(e, 'patent')} required autoFocus
                                                       className={classNames({'p-invalid': submitted && !car.patent})}/>
                                            {submitted && !car.patent &&
                                            <small className="p-error">La Patente es requerida.</small>}
                                        </div>                                                                      
                                        <div className="field">
                                            <label htmlFor="category" className="font-medium text-900">Categoria</label>
                                            <Dropdown valueTemplate={car.category} value={car.category} options={typeCars} onChange={(e) => onSelectChange(e , "category")} optionLabel="name" placeholder="Seleccione Categoria" className={classNames({'p-invalid': submitted && !car.category})}/>
                                            {submitted && !car.category &&
                                            <small className="p-error">La Categoria es requerida.</small>}
                                        </div>
                                        <div className="field">
                                            <label htmlFor="mark" className="font-medium text-900">Marca</label>
                                            <Dropdown valueTemplate={car.mark} value={car.mark} options={marksCars} onChange={(e) => onSelectChange(e , "mark")} optionLabel="name" placeholder="Seleccione Marca" className={classNames({'p-invalid': submitted && !car.mark})}/>
                                            {submitted && !car.mark &&
                                            <small className="p-error">La Marca es requerida</small>}
                                        </div>
                                        <div className="field">
                                            <label htmlFor="transmission" className="font-medium text-900">Transmisión</label>
                                            <Dropdown valueTemplate={car.transmission} value={car.transmission} options={typesTransmissions} onChange={(e) => onSelectChange(e , "transmission")} optionLabel="name" placeholder="Seleccione Transmisión" className={classNames({'p-invalid': submitted && !car.transmission})}/>
                                            {submitted && !car.transmission &&
                                            <small className="p-error">La Transmisión es requerido.</small>}
                                        </div>
                                        <div className="field">
                                            <label htmlFor="traction" className="font-medium text-900">Tipo Traccion</label>
                                            <Dropdown valueTemplate={car.traction} options={typesTraction} onChange={(e) => onSelectChange(e , "traction")} optionLabel="name" placeholder="Seleccione Traccion" />
                                            {submitted && !car.traction &&
                                            <small className="p-error">El tipo de traccion es requerida.</small>}
                                        </div>
                                        <div className="field">
                                            <label htmlFor="fuel" className="font-medium text-900">Combustible</label>
                                            <Dropdown valueTemplate={car.fuel} value={car.fuel} options={typesFuels} onChange={(e) => onSelectChange(e , "fuel")} optionLabel="name" placeholder="Seleccione Combustible" className={classNames({'p-invalid': submitted && !car.fuel})}/>
                                            {submitted && !car.fuel &&
                                            <small className="p-error">El Combustible es requerido.</small>}
                                        </div>
                                        <div className="field">
                                            <label htmlFor="yearpicker">Año</label>
                                            <Calendar id="year" value={(car.year !== '') ? new Date(car.year) : null} onChange={(e) => onInputChangeYear(e.value, 'year')} view="year" dateFormat="yy" className={classNames({'p-invalid': submitted && !car.year})} />
                                            {submitted && !car.year &&
                                            <small className="p-error">El Año es requerido  </small>}
                                        </div>
                                        <div className="field">
                                            <label htmlFor="model">Modelo</label>
                                            <InputText id="model" value={car.model}
                                                       onChange={(e) => onInputChange(e, 'model')} required autoFocus
                                                       className={classNames({'p-invalid': submitted && !car.model})}/>
                                            {submitted && !car.model &&
                                            <small className="p-error">El Modelo es requerido</small>}
                                        </div>
                                        <div className="field">
                                            <label htmlFor="version">Versión</label>
                                            <InputText id="version" value={car.version}
                                                       onChange={(e) => onInputChange(e, 'version')} required autoFocus/>
                                            {/* {submitted && !car.version &&
                                            <small className="p-error">La Versión es requerida.</small>} */}
                                        </div>
                                        <div className="field">
                                            <label htmlFor="cc">Cilindrada</label>
                                            <InputText id="cc" value={car.cc}
                                                       onChange={(e) => onInputChange(e, 'cc')} required autoFocus
                                                       className={classNames({'p-invalid': submitted && !car.cc})}/>
                                            {submitted && !car.cc &&
                                            <small className="p-error">La Cilindrada es requerida.</small>}
                                        </div>
                                        <div className="field">
                                            <label htmlFor="color">Color</label>
                                            <InputText id="color" value={car.color}
                                                       onChange={(e) => onInputChange(e, 'color')} required autoFocus/>
                                            {/* {submitted && !car.color &&
                                            <small className="p-error">El Color es requerido.</small>} */}
                                        </div>
                                        <div className="field">
                                            <label htmlFor="chasis">Numero de Chasis</label>
                                            <InputText id="chasis" value={car.chasis}
                                                       onChange={(e) => onInputChange(e, 'chasis')} required autoFocus/>
                                            {/* {submitted && !car.chasis &&
                                            <small className="p-error">El Numero de Chasis es requerido.</small>} */}
                                        </div>
                                        <div className="field">
                                            <label htmlFor="engine">Numero de Motor</label>
                                            <InputText id="engine" value={car.engine}
                                                       onChange={(e) => onInputChange(e, 'engine')} required autoFocus/>
                                            {/* {submitted && !car.engine &&
                                            <small className="p-error">El Numero de Motor es requerido.</small>} */}
                                        </div>
                                        <div className="field">
                                            <label htmlFor="description">Descripción</label>
                                            <InputText id="description" value={car.description}
                                                       onChange={(e) => onInputChange(e, 'description')} required autoFocus/>
                                            {/* {submitted && !car.description &&
                                            <small className="p-error">La Descripcion es requerida.</small>} */}
                                        </div>
                                        <div className="field">
                                            <label htmlFor="kilometres">Kilometraje</label>
                                            <InputText id="kilometres" value={car.kilometres}
                                                       onChange={(e) => onInputChange(e, 'kilometres')} required autoFocus/>
                                            {/* {submitted && !car.kilometres &&
                                            <small className="p-error">El Kilometraje es requerido.</small>} */}
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
