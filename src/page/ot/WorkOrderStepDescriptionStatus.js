import React from 'react';
import {Divider} from "primereact/divider";
import {InputTextarea} from "primereact/inputtextarea";
import {Button} from "primereact/button";

export const WorkOrderStepDescriptionStatus = () => {

    return (
        <div className="surface-card p-5 shadow-2 border-round flex-auto">
            <div className="text-900 font-semibold text-lg mt-3">Problema principal del vehículo</div>
            <Divider></Divider>
            <div className="flex gap-5 flex-column-reverse md:flex-row">
                <div className="flex-auto p-fluid">
                    <div className="col-12 lg:col-12">
                        <div className="p-4 p-fluid">
                            <div className="grid formgrid p-fluid">
                                <div className="field mb-4 col-12 md:col-12">
                                    <div className="mb-4">
                                        <label htmlFor="bio" className="block font-medium text-900 mb-2">
                                            Descripción
                                        </label>
                                        <InputTextarea id="bio" type="text" pInputTextarea rows="5"
                                                       autoResize></InputTextarea>
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
        </div>
    );
}
