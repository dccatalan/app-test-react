import React, {useRef, useState} from 'react';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {useFormik} from 'formik';
import {login} from "../../services/user/UserService"
import {Toast} from "primereact/toast";
import {useNavigate} from "react-router-dom";

export const LoginPage = () => {

    const toast = useRef(null);
    const [showMessage, setShowMessage] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validate: (data) => {
            let errors = {};
            if (!data.username) {
                errors.username = 'Name is required.';
            }
            if (!data.password) {
                errors.password = 'Password is required.';
            }
            return errors;
        },
        onSubmit: async (data) => {
            //const valid = await login(data.username, data.password);
            if (true) {
                toast.current.show({
                    severity: 'success',
                    summary: 'Inicio de sesión',
                    detail: 'Inicio de sesión exitoso',
                    life: 3000
                });
                return navigate("/app");
            } else {
                toast.current.show({
                    severity: 'error',
                    summary: 'Inicio de sesión',
                    detail: 'Ocurrio un erro al iniciar sesión, por favor intentelo más tarde',
                    life: 3000
                });
            }
            setShowMessage(true);
            formik.resetForm();
        }
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };


    return (
        <div>
            <Toast ref={toast}/>
            <div className="flex card-container blue-container overflow-hidden">
                <div
                    className="flex-none flex align-items-center justify-content-center font-bold text-white m-2 px-5 py-3 border-round">
                </div>
                <div
                    className="flex-grow-1 flex align-items-center justify-content-center font-bold text-white m-2 px-5 py-3 border-round">
                    <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                        <div className="text-center mb-5">
                            <img src="assets/images/blocks/logos/hyper.svg" alt="hyper" height={50} className="mb-3"/>
                            <div className="text-900 text-3xl font-medium mb-3">Bienvenido</div>
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                            <div>
                                <div className="field">
                                    <label htmlFor="email"
                                           className="block text-900 font-medium mb-2">Usuario</label>
                                    <InputText id="username" type="text" className="w-full mb-3"
                                               value={formik.values.username}
                                               onChange={formik.handleChange} autoFocus/>
                                    {getFormErrorMessage('username')}
                                </div>
                                <div className="field">
                                    <label htmlFor="password"
                                           className="block text-900 font-medium mb-2">Contraseña</label>
                                    <InputText id="password" type="password" className="w-full mb-3"
                                               value={formik.values.password}
                                               onChange={formik.handleChange}/>

                                    {getFormErrorMessage('password')}
                                </div>
                                <Button label="Iniciar sesión" icon="pi pi-user" className="w-full" type="submit"/>
                            </div>
                        </form>
                    </div>
                </div>
                <div
                    className="flex-none flex align-items-center justify-content-center font-bold text-white m-2 px-5 py-3 border-round">
                </div>
            </div>

        </div>


    );

}
