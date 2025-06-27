import React, {useState} from 'react';
import {WorkOrderStepClient} from "./WorkOrderStepClient";
import {WorkOrderStepMenu} from "./WorkOrderStepMenu";
import {WorkOrderStepCar} from "./WorkOrderStepCar";
import {WorkOrderStepStatus} from "./WorkOrderStepStatus";
import {WorkOrderStepDescriptionStatus} from "./WorkOrderStepDescriptionStatus";
import {WorkOrderStepPhotos} from "./WorkOrderStepPhotos";
import {WorkOrderStepBudget} from "./WorkOrderStepBudget";
import {WorkOrderStepSelectTeamMember} from "./WorkOrderStepSelectTeamMember";

export const WorkOrderStepOne = () => {

    const [menu,setMenu] = useState('client')
    const [workOrder,setWorkOrder] = useState({})

    return (
        <div>
            <div className="surface-ground px-4 py-8 md:px-6 lg:px-8">
                <div className="p-fluid flex flex-column lg:flex-row">
                    <WorkOrderStepMenu menu={menu} setMenu={setMenu} />
                    {menu === 'client' && <WorkOrderStepClient menu={menu} setMenu={setMenu} />}
                    {menu === 'car' && <WorkOrderStepCar menu={menu} setMenu={setMenu} />}
                    {menu === 'generalStatus' && <WorkOrderStepStatus menu={menu} setMenu={setMenu} />}
                    {menu === 'mainProblem' && <WorkOrderStepDescriptionStatus menu={menu} setMenu={setMenu} />}
                    {menu === 'photos' && <WorkOrderStepPhotos menu={menu} setMenu={setMenu} />}
                    {menu === 'budget' && <WorkOrderStepBudget menu={menu} setMenu={setMenu} />}
                    {menu === 'teamMember' && <WorkOrderStepSelectTeamMember menu={menu} setMenu={setMenu} />}
                </div>
            </div>
        </div>
    );

}
