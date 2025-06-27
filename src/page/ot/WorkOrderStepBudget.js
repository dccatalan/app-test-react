import React, {useState} from 'react';
import {Divider} from "primereact/divider";
import {InputTextarea} from "primereact/inputtextarea";
import {Button} from "primereact/button";
import {InputNumber} from "primereact/inputnumber";

export const WorkOrderStepBudget = () => {

    const [value1,setValue1] = useState(1000);
    const [value2,setValue2] = useState(10000);

    return (
        <div className="surface-card p-5 shadow-2 border-round flex-auto">
            <div className="text-900 font-semibold text-lg mt-3">Presupuesto</div>
            <Divider></Divider>
            <div className="flex gap-5 flex-column-reverse md:flex-row">
                <div className="flex-auto p-fluid">
                    <div className="col-12 lg:col-12">
                        <div className="p-4 p-fluid">
                            <div className="grid formgrid p-fluid">
                                <div className="field col-12 md:col-6">
                                    <label htmlFor="stacked">Anticipo</label>
                                    <InputNumber inputId="stacked" value={value1} onValueChange={(e) => setValue1(e.value)} showButtons mode="currency" currency="CLP" />
                                </div>
                                <div className="field col-12 md:col-6">
                                    <label htmlFor="stacked">Total</label>
                                    <InputNumber inputId="stacked" value={value2} onValueChange={(e) => setValue2(e.value)} showButtons mode="currency" currency="CLP" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <Button label="Continuar" className="p-ripple w-auto back"></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );

}
