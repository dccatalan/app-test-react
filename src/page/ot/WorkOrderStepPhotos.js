import React, {useRef, useState} from 'react';
import {Toast} from 'primereact/toast';
import {FileUpload} from 'primereact/fileupload';
import {ProgressBar} from 'primereact/progressbar';
import {Button} from 'primereact/button';
import {Tooltip} from 'primereact/tooltip';
import {Tag} from 'primereact/tag';
import {Divider} from "primereact/divider";
import {InputTextarea} from "primereact/inputtextarea";

export const WorkOrderStepPhotos = () => {

    const [totalSize, setTotalSize] = useState(0);
    const toast = useRef(null);
    const fileUploadRef = useRef(null);


    const onTemplateSelect = (e) => {
        let _totalSize = totalSize;
        e.files.forEach(file => {
            _totalSize += file.size;
        });

        setTotalSize(_totalSize);
    }

    const onTemplateUpload = (e) => {
        let _totalSize = 0;
        e.files.forEach(file => {
            _totalSize += (file.size || 0);
        });

        setTotalSize(_totalSize);
        toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
    }

    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        callback();
    }

    const onTemplateClear = () => {
        setTotalSize(0);
    }


    const headerTemplate = (options) => {
        const {className, chooseButton, uploadButton, cancelButton} = options;
        const value = totalSize / 10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{backgroundColor: 'transparent', display: 'flex', alignItems: 'center'}}>
                {chooseButton}
                <ProgressBar value={value} displayValueTemplate={() => `${formatedValue} / 1 MB`}
                             style={{width: 'fit-content', height: '20px', marginLeft: 'auto'}}></ProgressBar>
            </div>
        );
    }

    const itemTemplate = (file, props) => {
        return (

                <div className="grid">
                    <div className="col-12 md:col-6 lg:col-3"><img alt={file.name} role="presentation" src={file.objectURL} className="w-full"/></div>
                    <div className="col-12 text-center md:col-6 lg:col-3"><span className="flex flex-column ml-3">
                        {(file.name && file.name.length >15)?file.name.substr(0,15)+"...":file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span></div>
                    <div className="col-12 text-center md:col-6 lg:col-3"><Tag value={props.formatSize} severity="warning" className="px-3 py-2"/></div>
                    <div className="col-12 text-center md:col-6 lg:col-3">
                        <Button type="button" icon="pi pi-times"
                                className="p-button-outlined p-button-rounded p-button-danger ml-auto w-3rem"
                                onClick={() => onTemplateRemove(file, props.onRemove)}/></div>
                </div>


        )
    }

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-image mt-3 p-5" style={{
                    'fontSize': '5em',
                    borderRadius: '50%',
                    backgroundColor: 'var(--surface-b)',
                    color: 'var(--surface-d)'
                }}></i>
                <span style={{'fontSize': '1.2em', color: 'var(--text-color-secondary)'}} className="my-5">Drag and Drop Image Here</span>
            </div>
        )
    }

    const customBase64Uploader = async (event) => {
        // convert file to base64 encoded
        const file = event.files[0];
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then(r => r.blob()); //blob:url
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            const base64data = reader.result;
            console.log(base64data);
        }
    }

    const chooseOptions = {
        icon: 'pi pi-fw pi-images',
        iconOnly: true,
        className: 'p-button-rounded p-button-outlined w-3rem'
    };
    const uploadOptions = {
        icon: 'pi pi-fw pi-cloud-upload',
        iconOnly: true,
        className: 'p-button-success p-button-rounded p-button-outlined w-3rem'
    };
    const cancelOptions = {
        icon: 'pi pi-fw pi-times',
        iconOnly: true,
        className: 'p-button-danger p-button-rounded p-button-outlined w-3rem'
    };


    return (
        <div className="surface-card p-5 shadow-2 border-round flex-auto">
            <div className="text-900 font-semibold text-lg mt-3">Fotos del vehículo</div>
            <Divider></Divider>
            <div className="flex gap-5 flex-column-reverse md:flex-row">
                <div className="flex-auto p-fluid">
                    <div className="col-12 lg:col-12">
                        <FileUpload ref={fileUploadRef} name="demo[]"
                                    url="https://primefaces.org/primereact/showcase/upload.php" multiple
                                    accept="image/*" maxFileSize={10000000}
                                    onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear}
                                    onClear={onTemplateClear}
                                    headerTemplate={headerTemplate} itemTemplate={itemTemplate}
                                    emptyTemplate={emptyTemplate}
                                    chooseOptions={chooseOptions} uploadOptions={uploadOptions}
                                    cancelOptions={cancelOptions}/>

                        <div className="mt-2">
                            <Button label="Continuar" className="p-ripple w-auto back"></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );

}
