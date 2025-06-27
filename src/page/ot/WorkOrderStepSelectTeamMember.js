import React, {useEffect, useState} from 'react';
import {Divider} from "primereact/divider";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {AutoComplete} from 'primereact/autocomplete';
import {getAll} from '../../services/team/TeamService'
import {DialogDataClient} from "../client/DialogDataClient";

export const WorkOrderStepSelectTeamMember = () => {


    const [members, setMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [filteredMembers, setFilteredMembers] = useState(null);

    useEffect(() => {
        setMembers(getAll())
    }, [])

    const searchClient = (event) => {
        setTimeout(() => {
            let filteredMembers;
            if (!event.query.trim().length) {
                filteredMembers = [...members];
            } else {
                filteredMembers = members.filter((member) => {
                    return member.names.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }

            setFilteredMembers(filteredMembers);
        }, 250);
    }


    const itemTemplate = (item) => {
        return (
            <>
               {item.run+" "+item.names}
            </>
        );
    }

    return (
        <div className="surface-card p-5 shadow-2 border-round flex-auto">
            <div className="text-900 font-semibold text-lg mt-3">Selección técnico</div>
            <Divider></Divider>
            <div className="flex gap-5 flex-column-reverse md:flex-row">
                <div className="flex-auto p-fluid">
                    <div className="col-12 lg:col-12">
                        <div className="p-4 p-fluid">
                            <div className="grid formgrid p-fluid">
                                <div className="field mb-4 col-12 md:col-12">
                                    <label htmlFor="run" className="font-medium text-900">RUN</label>
                                    <AutoComplete id="run" value={selectedMember} suggestions={filteredMembers}
                                                  completeMethod={searchClient} field="names" itemTemplate={itemTemplate}
                                                  onChange={(e) => setSelectedMember(e.value)} aria-label="Clientes"
                                                  dropdownAriaLabel="Ingrese un RUN"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <Button label="Continuar" className="p-ripple w-auto back"></Button>
                    </div>
                </div>
            </div>
        </div>
    );

}
