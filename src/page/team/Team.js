import React, {useEffect, useRef, useState} from 'react';
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {Toast} from "primereact/toast";
import {Toolbar} from "primereact/toolbar";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dialog} from "primereact/dialog";
// import {classNames} from "primereact/utils";

import {getAll} from '../../services/team/TeamService'
import { DialogDataTeam } from './DialogDataTeam';


export const Team = () => {

    let emptyTeam = {
        id: null,
        run: '',
        names: '',
        fatherName: '',
        motherName: '',
        email: '',
        dateIngress: '',
        address: '',
        phone: '',
        whatsapp: '',
        availability: ''
    };

    const [teams, setTeams] = useState(null);
    const [teamDialog, setTeamDialog] = useState(false);
    const [deleteTeamDialog, setDeleteTeamDialog] = useState(false);
    const [deleteTeamsDialog, setDeleteTeamsDialog] = useState(false);
    const [team, setTeam] = useState(emptyTeam);
    const [selectedTeams, setSelectedTeams] = useState(null);
    // const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);


    useEffect(() => {
        setTeams(getAll())
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const openNew = () => {
        setTeam(emptyTeam);
        team.dateIngress = new Date();
        setTeam(team);
        // setSubmitted(false);
        setTeamDialog(true);
    }


    const hideDeleteTeamDialog = () => {
        setDeleteTeamDialog(false);
    }

    const hideDeleteTeamsDialog = () => {
        setDeleteTeamsDialog(false);
    }

    const editTeam = (team) => {
        setTeam({...team});
        setTeamDialog(true);
    }

    const confirmDeleteTeam = (team) => {
        setTeam(team);
        setDeleteTeamDialog(true);
    }

    const deleteTeam = () => {
        let _products = teams.filter(val => val.id !== team.id);
        setTeams(_products);
        setDeleteTeamDialog(false);
        setTeam(emptyTeam);
        toast.current.show({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
    }

    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const confirmDeleteSelected = () => {
        setDeleteTeamsDialog(true);
    }

    const deleteSelectedTeams = () => {
        let _products = teams.filter(val => !selectedTeams.includes(val));
        setTeams(_products);
        setDeleteTeamsDialog(false);
        setSelectedTeams(null);
        toast.current.show({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Nuevo" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew}/>
                <Button label="Eliminar" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected}
                        disabled={!selectedTeams || !selectedTeams.length}/>
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

    const phoneBodyTemplate = (rowData) => {
        return rowData.phone;
    }


    // const statusBodyTemplate = (rowData) => {
    //     return <span
    //         className={`team-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>;
    // }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2"
                        onClick={() => editTeam(rowData)}/>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning"
                        onClick={() => confirmDeleteTeam(rowData)}/>
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Miembros del equipo</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search"/>
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..."/>
            </span>
        </div>
    );

    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteTeamDialog}/>
            <Button label="Sí" icon="pi pi-check" className="p-button-text" onClick={deleteTeam}/>
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteTeamsDialog}/>
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedTeams}/>
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

                                        <DataTable ref={dt} value={teams} selection={selectedTeams}
                                                   onSelectionChange={(e) => setSelectedTeams(e.value)}
                                                   dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                                                   paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                                   currentPageReportTemplate="Viendo {last} de un total de {totalRecords} colaboradores."
                                                   globalFilter={globalFilter} header={header}
                                                   esponsiveLayout="stack" breakpoint="960px">
                                            <Column selectionMode="multiple" headerStyle={{width: '3rem'}}
                                                    exportable={false}></Column>
                                            <Column field="names" header="Nombre" sortable
                                                    style={{minWidth: '15rem'}}></Column>
                                            <Column field="run" header="Run" sortable
                                                    style={{minWidth: '8rem'}}></Column>
                                            <Column field="phone" header="Telefono" body={phoneBodyTemplate} sortable
                                                    style={{minWidth: '8rem'}}></Column>
                                            <Column field="whatsapp" header="Whatsapp" body={phoneBodyTemplate} sortable
                                                    style={{minWidth: '8rem'}}></Column>
                                            <Column field="email" header="Correo" sortable
                                                    style={{minWidth: '10rem'}}></Column>
                                            <Column field="availability" header="Status" sortable
                                                    style={{minWidth: '10rem'}}></Column>
                                            <Column body={actionBodyTemplate} exportable={false}
                                                    style={{minWidth: '8rem'}}></Column>
                                        </DataTable>
                                    </div>

                                    <DialogDataTeam teamDialog={teamDialog} setTeamDialog={setTeamDialog} team={team} setTeam={setTeam} teams={teams} setTeams={setTeams}/>

                                    <Dialog visible={deleteTeamDialog} style={{width: '450px'}} header="Confirm"
                                            modal footer={deleteProductDialogFooter} onHide={hideDeleteTeamDialog}>
                                        <div className="confirmation-content">
                                            <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
                                            {team &&
                                            <span>Está seguro de eliminar al colaborador <b>{team.names}</b>?</span>}
                                        </div>
                                    </Dialog>

                                    <Dialog visible={deleteTeamsDialog} style={{width: '450px'}} header="Confirm"
                                            modal footer={deleteProductsDialogFooter} onHide={hideDeleteTeamsDialog}>
                                        <div className="confirmation-content">
                                            <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
                                            {team &&
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
