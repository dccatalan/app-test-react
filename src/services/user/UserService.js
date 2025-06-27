import {loginEndpoint} from "../api/EndpointFactory";
import fetchDefinedEndpoint from "../api/GenericCall";

const login = async (user,password) =>{
    const resp = await fetchDefinedEndpoint(loginEndpoint,{username:user,password:password})
    if(resp.valid){
        localStorage.setItem("token",resp.security.token)
        localStorage.setItem("refreshToken",resp.security.refreshToken)
    }
    return resp.valid;
}

const findByRun = (run) =>{

}

const getOne = () =>{

}

const getAll = () =>{
 return [
    {
        "id": "1000",
        "dateIngress": "",
        "run": "15456343-1",
        "username": "CasildaGiron",
        "password": "*********",
        "rol": "Administrador de OT",
        "status": "Activo"
    },
    {
        "id": "1001",
        "dateIngress": "",
        "run": "29134067-9",
        "username": "SalvadorBarrera",
        "password": "*********",
        "rol": "Trabajador",
        "status": "Activo"
    },
    {
        "id": "1002",
        "dateIngress": "",
        "run": "28130313-9",
        "username": "RubenLerma",
        "password": "*********",
        "rol": "Administrador",
        "status": "Deshabilitado"
    },
    {
        "id": "1003",
        "dateIngress": "",
        "run": "18553009-4",
        "username": "MartaVera",
        "password": "*********",
        "rol": "Administrador de OT",
        "status": "Activo"
    },
    {
        "id": "1004",
        "dateIngress": "",
        "run": "h456wer53",
        "username": "ManuelValadez",
        "password": "*********",
        "rol": "Trabajador",
        "status": "Deshabilitado"
    },
    {
        "id": "1005",
        "dateIngress": "",
        "run": "10261459-3",
        "username": "JosepMendez",
        "password": "*********",
        "rol": "Trabajador",
        "status": "Activo"
    },
    {
        "id": "1006",
        "dateIngress": "",
        "run": "8997968-4",
        "username": "MatildeOlivares",
        "password": "*********",
        "rol": "Trabajador",
        "status": "Deshabilitado"
    },
    {
        "id": "1007",
        "dateIngress": "",
        "run": "5258710-7",
        "username": "MaicaVigil",
        "password": "*********",
        "rol": "Trabajador",
        "status": "Deshabilitado"
    },

 ];
}

const save = () =>{

}

const update = () =>{

}

export {getOne,getAll,findByRun,save,update,login};
