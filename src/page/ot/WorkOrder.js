import React, {useEffect} from 'react';
import { WorkOrderDataTable } from './WorkOrderDataTable';


export const WorkOrder = () => {
   
    useEffect(() => {
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <div>
            <WorkOrderDataTable/>
        </div>
    );

}
