import React, {useEffect, useState} from 'react';
import {Divider} from "primereact/divider";
import {Button} from "primereact/button";
import {getAll} from "../../services/car/CarService";
import {AutoComplete} from "primereact/autocomplete";
import {DialogDataCar} from "../car/DialogDataCar";

export const WorkOrderStepCar = ({setMenu}) => {
    let emptyCar = {
        id: null,
        marca: '',
        modelo: '',
        ano: '',
        color: '',
        tipoCarroseria: '',
        numChasis: '',
        numeroMotor: '',
        patente: '',
        descripcion: '',
        kilometraje: '', //Definir almacenamiento por OT
        pagoPendiente: ''
    };

    const [cars, setCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState(emptyCar);
    const [filteredCars, setFilteredCars] = useState(null);
    const [dialogCar, setDialogCar] = useState(false);

    useEffect(() => {
        setCars(getAll())
    }, [])

    const searchCar = (event) => {
        setTimeout(() => {
            let _filteredCars;
            if (!event.query.trim().length) {
                _filteredCars = [...cars];
            } else {
                _filteredCars = cars.filter((car) => {
                    return car.patent.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }
            setFilteredCars(_filteredCars);
        }, 250);
    }


    const itemTemplate = (item) => {
        return (
            <>
                {item.patent+" "+item.mark+" "+item.model}
            </>
        );
    }
    
    return (
        <div className="surface-card p-5 shadow-2 border-round flex-auto">
            <div className="text-900 font-semibold text-lg mt-3">Datos del Vehículo</div>
            <Divider></Divider>
            <div className="flex gap-5 flex-column-reverse md:flex-row">
                <div className="flex-auto p-fluid">
                    <div className="col-12 lg:col-12">
                        <div className="p-4 p-fluid">
                            <div className="grid formgrid p-fluid">
                                <div className="field mb-4 col-12 md:col-12">
                                    <label htmlFor="vehicle" className="font-medium text-900">Vehículo</label>
                                    <AutoComplete id="vehicle" value={selectedCar.patent} suggestions={filteredCars}
                                                  completeMethod={searchCar} field="patent" itemTemplate={itemTemplate}
                                                  onChange={(e) => setSelectedCar(e.value)} aria-label="Autos registrados"
                                                  dropdownAriaLabel="Ingrese la patente"/>
                                </div>
                                {filteredCars && filteredCars.length == 0 && !selectedCar.id && <Button icon="pi pi-pencil" label={"Registrar vehículo"} className="p-button-rounded p-button-success mr-2"
                                                                                                                 onClick={() => setDialogCar(true)}/>}
                                {filteredCars && filteredCars.length > 0 && selectedCar.id && <Button icon="pi pi-pencil" label={"Ver"} className="p-button-rounded p-button-success mr-2"
                                                                                                               onClick={() => setDialogCar(true)}/>}
                                {selectedCar && <DialogDataCar carDialog={dialogCar} setCarDialog={setDialogCar}  car={selectedCar} setCar={setSelectedCar} cars={cars} setCars={setCars}/>}

                            </div>
                        </div>
                    </div>
                    <div>
                        <Button label="Continuar" className="p-ripple w-auto back" onClick={()=>setMenu("generalStatus")}/>
                    </div>
                </div>
            </div>
        </div>
    );

}
