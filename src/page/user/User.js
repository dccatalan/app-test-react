import React, {useEffect, useRef, useState} from 'react';
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {Toast} from "primereact/toast";
import {Toolbar} from "primereact/toolbar";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dialog} from "primereact/dialog";
// import {classNames} from "primereact/utils";
import {getAll} from '../../services/user/UserService'
import { DialogDataUser } from './DialogDataUser';

export const User = () => {

    let emptyUser = {
        id: null,
        dateIngress: '',
        run: '',
        username: '',
        password: '',
        rol: '',
        status: ''     
    };

    const [users, setUsers] = useState(null);
    const [userDialog, setUserDialog] = useState(false);
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [deleteUsersDialog, setDeleteUsersDialog] = useState(false);
    const [user, setUser] = useState(emptyUser);
    const [selectedUsers, setSelectedUsers] = useState(null);
    // const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        setUsers(getAll())
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const openNew = () => {
        setUser(emptyUser);
        user.dateIngress = new Date();
        setUser(user);
        // setSubmitted(false);
        setUserDialog(true);
    }

    const hideDeleteProductDialog = () => {
        setDeleteUserDialog(false);
    }

    const hideDeleteProductsDialog = () => {
        setDeleteUsersDialog(false);
    }

    const editClient = (user) => {
        setUser({...user});
        setUserDialog(true);
    }

    const confirmDeleteClient = (user) => {
        setUser(user);
        setDeleteUserDialog(true);
    }

    const deleteClient = () => {
        let _products = users.filter(val => val.id !== user.id);
        setUsers(_products);
        setDeleteUserDialog(false);
        setUser(emptyUser);
        toast.current.show({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
    }

    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const confirmDeleteSelected = () => {
        setDeleteUsersDialog(true);
    }

    const deleteSelectedClients = () => {
        let _products = users.filter(val => !selectedUsers.includes(val));
        setUsers(_products);
        setDeleteUsersDialog(false);
        setSelectedUsers(null);
        toast.current.show({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
    }


    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Nuevo" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew}/>
                <Button label="Eliminar" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected}
                        disabled={!selectedUsers || !selectedUsers.length}/>
            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Exportar" icon="pi pi-upload" className="p-button-help" onClick={exportCSV}/>
            </React.Fragment>
        )
    }


    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2"
                        onClick={() => editClient(rowData)}/>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning"
                        onClick={() => confirmDeleteClient(rowData)}/>
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Usuarios con acceso al sistema</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search"/>
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..."/>
            </span>
        </div>
    );

    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog}/>
            <Button label="Sí" icon="pi pi-check" className="p-button-text" onClick={deleteClient}/>
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog}/>
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedClients}/>
        </React.Fragment>
    );


    return (
        <div>
            <div className="min-h-screen flex flex-column relative flex-auto">
                <div className="p-5 flex flex-column flex-auto">
                    <div className="grid">
                        <div className="col-12 lg:col-12">
                            <div className="p4 border-round p-fluid">
                                <div className="datatable-crud-demo">
                                    <Toast ref={toast}/>
                                    <div className="card">
                                        <Toolbar className="mb-4" left={leftToolbarTemplate}
                                                 right={rightToolbarTemplate}></Toolbar>

                                        <DataTable ref={dt} value={users} selection={selectedUsers}
                                                   onSelectionChange={(e) => setSelectedUsers(e.value)}
                                                   dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                                                   paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                                   currentPageReportTemplate="Viendo {last} de un total de {totalRecords} Usuarios"
                                                   globalFilter={globalFilter} header={header}
                                                   responsiveLayout="stack" breakpoint="960px">
                                            <Column selectionMode="multiple" headerStyle={{width: '3rem'}}
                                                    exportable={false}></Column>
                                            <Column field="username" header="Username" sortable
                                                    style={{minWidth: '8rem'}}></Column>
                                            <Column field="password" header="Password" sortable
                                                    style={{minWidth: '8rem'}}></Column>
                                            <Column field="run" header="RUN" sortable
                                                    style={{minWidth: '8rem'}}></Column>
                                            <Column field="rol" header="Rol" sortable
                                                    style={{minWidth: '8rem'}}></Column>
                                            <Column field="status" header="Estado" sortable
                                                    style={{minWidth: '8rem'}}></Column>
                                            <Column body={actionBodyTemplate} exportable={false}
                                                    style={{minWidth: '8rem'}}></Column>
                                        </DataTable>
                                    </div>
                                    <DialogDataUser userDialog={userDialog} setUserDialog={setUserDialog} user={user} setUser={setUser} users={users} setUsers={setUsers}/>

                                    <Dialog visible={deleteUserDialog} style={{width: '450px'}} header="Confirm"
                                            modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                                        <div className="confirmation-content">
                                            <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
                                            {user &&
                                            <span>Está seguro de eliminar al colaborador <b>{user.name}</b>?</span>}
                                        </div>
                                    </Dialog>

                                    <Dialog visible={deleteUsersDialog} style={{width: '450px'}} header="Confirm"
                                            modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                                        <div className="confirmation-content">
                                            <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
                                            {user &&
                                            <span>Está seguro de eliminar a los colaboradores seleccionados?</span>}
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
