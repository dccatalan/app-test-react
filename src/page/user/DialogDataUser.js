import React, {useEffect, useRef, useState} from 'react';
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {Dialog} from "primereact/dialog";
import {classNames} from "primereact/utils";
import { Calendar } from 'primereact/calendar';
import {Toast} from "primereact/toast";
import {Dropdown} from "primereact/dropdown";

export const DialogDataUser = ({userDialog, setUserDialog, user, setUser, users, setUsers}) => {
  
    let emptyUser = {
        id: null,
        dateIngress: '',
        run: '',
        username: '',
        password: '',
        rol: '',
        status: ''     
    };

    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);

    const statusUsers = [
        { name: 'Activo', id: 'AC' },
        { name: 'Deshabilitado', id: 'DES' }       
    ];
    const rolesUsers = [
        { name: 'Trabajador', id: 'T' },
        { name: 'Administrador', id: 'A' },
        { name: 'Administrador OT', id: 'A-OT' }       
    ];

    

    useEffect(() => {
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const hideDialog = () => {
        setSubmitted(false);
        setUser(emptyUser);
        setUserDialog(false);

    }

    const saveUser = () => {
        setSubmitted(true);
        let _users = [...users];
        let _user = {...user};
        if (user.id) {
            const index = findIndexById(user.id);
            _users[index] = user; 
            toast.current.show({severity: 'success', summary: 'Acción exitosa', detail: 'Usuario Actualizado', life: 3000});
            setSubmitted(false);
            setUsers(_users);
            setUserDialog(false);
            setUser(emptyUser);
        } else {
            if (user.run !== "" && user.username !== "" && user.password !== "" && user.rol !== "" && user.status !== "" ) {
                _user.id = createId();
                _users.push(_user);              
                toast.current.show({severity: 'success', summary: 'Acción exitosa', detail: 'Usuario Creado', life: 3000});                   
                setSubmitted(false);
                setUsers(_users);
                setUserDialog(false);
                setUser(emptyUser);
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
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _user = {...user};
        _user[`${name}`] = val;

        setUser(_user);
    }
    
    const onInputChangeYear = (e, name) => {
        if ( e != null && e.length > 3) {
            const val = (e) || '';
            let _user = {...user};
            _user[`${name}`] = val+"";
            setUser(_user);
        }
    }
    
    const onSelectChange = (e, name) => {
        const val = (e.target && e.target.value.name) || '';
        let _user = {...user};
        _user[`${name}`] = val;
        setUser(_user);
    }

    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog}/>
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveUser}/>
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
                                    <Dialog visible={userDialog} style={{width: '450px'}} header="Detalles del colaborador"
                                            modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                                        <div className="field">
                                            <label htmlFor="dateIngress">Fecha Ingreso</label>
                                            <Calendar id="dateIngress" value={new Date(user.dateIngress)} onChange={(e) => onInputChangeYear(e.value, 'dateIngress')} dateFormat="dd/mm/yy" disabled/>                                            
                                        </div>
                                        <div className="field">
                                            <label htmlFor="username">Username</label>
                                            <InputText id="username" value={user.username}
                                                       onChange={(e) => onInputChange(e, 'username')} required autoFocus
                                                       className={classNames({'p-invalid': submitted && !user.username})}/>
                                            {submitted && !user.username &&
                                            <small className="p-error">Nombre de Usuario requerido.</small>}
                                        </div>
                                        <div className="field">
                                            <label htmlFor="password">Password</label>
                                            <InputText id="password" value={user.password}
                                                       onChange={(e) => onInputChange(e, 'password')} required autoFocus
                                                       className={classNames({'p-invalid': submitted && !user.password})}/>
                                            {submitted && !user.password &&
                                            <small className="p-error">Contraseña requerida.</small>}
                                        </div>
                                        <div className="field">
                                            <label htmlFor="run">RUN</label>
                                            <InputText id="run" value={user.run}
                                                       onChange={(e) => onInputChange(e, 'run')} required autoFocus
                                                       className={classNames({'p-invalid': submitted && !user.run})}/>
                                            {submitted && !user.run &&
                                            <small className="p-error">RUN es requerido.</small>}
                                        </div>
                                        <div className="field">
                                            <label htmlFor="status" className="font-medium text-900">Estado de usuario</label>
                                            <Dropdown valueTemplate={user.status} value={user.status} options={statusUsers} onChange={(e) => onSelectChange(e , "status")} optionLabel="name" placeholder="Seleccione STATUS" className={classNames({'p-invalid': submitted && !user.transmission})}/>
                                            {submitted && !user.status &&
                                            <small className="p-error">Estado requerido.</small>}
                                        </div>
                                        <div className="field">
                                            <label htmlFor="rol" className="font-medium text-900">Rol de Usuario</label>
                                            <Dropdown valueTemplate={user.rol} value={user.rol} options={rolesUsers} onChange={(e) => onSelectChange(e , "rol")} optionLabel="name" placeholder="Seleccione ROL" className={classNames({'p-invalid': submitted && !user.transmission})}/>
                                            {submitted && !user.rol &&
                                            <small className="p-error">Rol requerido.</small>}
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
