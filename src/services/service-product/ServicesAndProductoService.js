//typeObject
// 1. Producto
// 2. SERVICIO

// typeService
// 1. Motor
// 2. Carroseria
// 3. Transmision
// 4. Electricidad
// 5. Pintura

// typeTraction
// 1. FWD
// 2. RWD
// 3. AWD
// 4. 4WD
// 5. 4x4

// typeEngine
// 1. Gasolina
// 2. Diésel
// 3. Hibrido

// typeTransmission
// 1. Automática
// 2. Mecánica

// typePaint
// 1. Perlada
// 2. Tri-Capa

// statusService
// 1. Activo
// 2. Pendiente revision
// 3. Baja

// const object =  {
//     id: "1",
//     dateCreation: '',
//     categoryCar: 'Pick Up',
//     typeObject: 'SERVICIO',
//     typeService: 'Motor', // NO EXCLUYENTE
//     typeTraction: 'FWD',
//     typeEngine: 'Diésel',// NO EXCLUYENTE
//     typeTransmission: 'Automática',// NO EXCLUYENTE
//     typePaint: 'Perlada',// NO EXCLUYENTE
//     description: 'Cambio de kit de distribución Mazda BT50 año 2018 ',
//     cost: "175.000"      
//     statusService: "Pending"
// }

const getOne = () =>{

}

const getAll = () =>{
    return [
        {
            "id": "1",
            "dateCreation": '',
            "categoryCar": 'Pick Up',
            "typeObject": 'SERVICIO',
            "typeService": 'Motor', // NO EXCLUYENTE
            "typeTraction": 'FWD',
            "typeEngine": 'Diésel',// NO EXCLUYENTE
            "typeTransmission": 'Automática',// NO EXCLUYENTE
            "typePaint": '',// NO EXCLUYENTE
            "description": 'Cambio de kit de distribución Mazda BT50 año 2018 ',
            "cost": "175000"            
        },
        {
            "id": "2",
            "categoryCar": 'Pick Up',
            "typeObject": 'Producto',
            "typeService": 'Motor', 
            "typeTraction": '',
            "typeEngine": '',
            "typeTransmission": '',
            "typePaint": '',
            "description": 'Kit de distribucion',
            "cost": "100000"            
        },
        {
            "id": "3",
            "categoryCar": 'Sedan',
            "typeObject": 'SERVICIO',
            "typeService": 'Motor', 
            "typeTraction": 'FWD',
            "typeEngine": '',
            "typeTransmission": 'Mecánica',
            "typePaint": '',
            "description": 'Cambio de aceite',
            "cost": "70000"
        },
        {
            "id": "4",
            "categoryCar": 'Sedan',
            "typeObject": 'Producto',
            "typeService": 'Transmision', 
            "typeTraction": 'FWD',
            "typeEngine": '',
            "typeTransmission": 'Automática',
            "typePaint": '',
            "description": 'Aceite Caja Mobil HD Plus 80W-90',
            "cost": "12000"            
        },
        {
            "id": "5",
            "categoryCar": 'Pick Up',
            "typeObject": 'Producto',
            "typeService": 'Transmision', 
            "typeTraction": '4x4',
            "typeEngine": '',
            "typeTransmission": 'Mecánica',
            "typePaint": '',
            "description": 'Aceite Caja Mobil 80W-90',
            "cost": "8000"            
        },
        {
            "id": "6",
            "categoryCar": 'Pick Up',
            "typeObject": 'SERVICIO',
            "typeService": 'Transmision', 
            "typeTraction": '4x4',
            "typeEngine": '',
            "typeTransmission": 'Mecánica',
            "typePaint": '',
            "description": 'Cambio de Aceite caja',
            "cost": "80000"            
        },
        {
            "id": "7",
            "categoryCar": 'SUV',
            "typeObject": 'SERVICIO',
            "typeService": 'Transmision', 
            "typeTraction": '4WD',
            "typeEngine": '',
            "typeTransmission": 'Automática',
            "typePaint": '',
            "description": 'Cambio de Aceite caja',
            "cost": "150000"            
        }
   
    ];
}

const save = () =>{

}

const update = () =>{

}

export {getOne,getAll,save,update};
