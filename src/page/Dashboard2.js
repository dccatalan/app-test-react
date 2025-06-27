import React, {useEffect, useRef, useState} from 'react';

import {Ripple} from 'primereact/ripple';
import {StyleClass} from 'primereact/styleclass';
import {Badge} from 'primereact/badge';
import {InputText} from 'primereact/inputtext';
import {InputTextarea} from 'primereact/inputtextarea';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';



export const Dashboard2 = () => {
    const btnRef10 = useRef(null);
    const btnRef11 = useRef(null);
    const btnRef12 = useRef(null);
    const btnRef13 = useRef(null);
    const [value1, setValue1] = useState(null);

    let emptyProduct = {
        id: null,
        name: '',
        image: null,
        description: '',
        category: null,
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK'
    };

    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const data = [
        {"id": "1000","code": "f230fh0g3","name": "Bamboo Watch","description": "Product Description","image": "bamboo-watch.jpg","price": 65,"category": "Accessories","quantity": 24,"inventoryStatus": "INSTOCK","rating": 5},
        {"id": "1001","code": "nvklal433","name": "Black Watch","description": "Product Description","image": "black-watch.jpg","price": 72,"category": "Accessories","quantity": 61,"inventoryStatus": "INSTOCK","rating": 4},
        {"id": "1002","code": "zz21cz3c1","name": "Blue Band","description": "Product Description","image": "blue-band.jpg","price": 79,"category": "Fitness","quantity": 2,"inventoryStatus": "LOWSTOCK","rating": 3},
        {"id": "1003","code": "244wgerg2","name": "Blue T-Shirt","description": "Product Description","image": "blue-t-shirt.jpg","price": 29,"category": "Clothing","quantity": 25,"inventoryStatus": "INSTOCK","rating": 5},
        {"id": "1004","code": "h456wer53","name": "Bracelet","description": "Product Description","image": "bracelet.jpg","price": 15,"category": "Accessories","quantity": 73,"inventoryStatus": "INSTOCK","rating": 4},
        {"id": "1005","code": "av2231fwg","name": "Brown Purse","description": "Product Description","image": "brown-purse.jpg","price": 120,"category": "Accessories","quantity": 0,"inventoryStatus": "OUTOFSTOCK","rating": 4},
        {"id": "1006","code": "bib36pfvm","name": "Chakra Bracelet","description": "Product Description","image": "chakra-bracelet.jpg","price": 32,"category": "Accessories","quantity": 5,"inventoryStatus": "LOWSTOCK","rating": 3},
        {"id": "1007","code": "mbvjkgip5","name": "Galaxy Earrings","description": "Product Description","image": "galaxy-earrings.jpg","price": 34,"category": "Accessories","quantity": 23,"inventoryStatus": "INSTOCK","rating": 5},

    ];

    useEffect(() => {
        setProducts(data)
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    }

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    }

    const saveProduct = () => {
        setSubmitted(true);

        if (product.name.trim()) {
            let _products = [...products];
            let _product = {...product};
            if (product.id) {
                const index = findIndexById(product.id);

                _products[index] = _product;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            }
            else {
                _product.id = createId();
                _product.image = 'product-placeholder.svg';
                _products.push(_product);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);
        }
    }

    const editProduct = (product) => {
        setProduct({...product});
        setProductDialog(true);
    }

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    }

    const deleteProduct = () => {
        let _products = products.filter(val => val.id !== product.id);
        setProducts(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    const importCSV = (e) => {
        const file = e.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const csv = e.target.result;
            const data = csv.split('\n');

            // Prepare DataTable
            const cols = data[0].replace(/['"]+/g, '').split(',');
            data.shift();

            const importedData = data.map(d => {
                d = d.split(',');
                const processedData = cols.reduce((obj, c, i) => {
                    c = c === 'Status' ? 'inventoryStatus' : (c === 'Reviews' ? 'rating' : c.toLowerCase());
                    obj[c] = d[i].replace(/['"]+/g, '');
                    (c === 'price' || c === 'rating') && (obj[c] = parseFloat(obj[c]));
                    return obj;
                }, {});

                processedData['id'] = createId();
                return processedData;
            });

            const _products = [...products, ...importedData];

            setProducts(_products);
        };

        reader.readAsText(file, 'UTF-8');
    }

    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    }

    const deleteSelectedProducts = () => {
        let _products = products.filter(val => !selectedProducts.includes(val));
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    }

    const onCategoryChange = (e) => {
        let _product = {...product};
        _product['category'] = e.value;
        setProduct(_product);
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = {...product};
        _product[`${name}`] = val;

        setProduct(_product);
    }

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = {...product};
        _product[`${name}`] = val;

        setProduct(_product);
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Nuevo" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                <Button label="Eliminar" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" name="demo[]" auto url="https://primefaces.org/primereact/showcase/upload.php" accept=".csv" chooseLabel="Import" className="mr-2 inline-block" onUpload={importCSV} />
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
        )
    }

    const imageBodyTemplate = (rowData) => {
        return <img src={`images/product/${rowData.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="product-image" />
    }

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    }

    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    }

    const statusBodyTemplate = (rowData) => {
        return <span className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>;
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Manage Products</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );



    return (
    <div>
        <div>

            <div className="min-h-screen flex relative lg:static surface-ground">
                <div id="app-sidebar-9"
                     className="h-full lg:h-auto surface-section hidden lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border w-18rem lg:w-7rem select-none">
                    <div className="flex flex-column h-full" style={{background: "black"}}>
                        <div className="flex align-items-center justify-content-center flex-shrink-0"
                             style={{height: '60px'}}>
                            <img src="assets/images/blocks/logos/hyper-cyan.svg" alt="Image" height="30"/>
                        </div>
                        <div className="mt-3">
                            <ul className="list-none p-0 m-0">
                                <li>
                                    <a className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center text-cyan-600 border-left-2 border-cyan-600 hover:border-300 transition-duration-150 transition-colors">
                                        <i className="pi pi-home mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-2xl"></i>
                                        <span className="font-medium inline text-base lg:text-xs lg:block">Inicio</span>
                                        <Ripple/>
                                    </a>
                                </li>
                                <li>
                                    <a className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center text-600 border-left-2 border-transparent hover:border-300 transition-duration-150 transition-colors">
                                        <i className="pi pi-car mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-2xl"></i>
                                        <span className="font-medium inline text-base lg:text-xs lg:block">Generar OT</span>
                                        <Ripple/>
                                    </a>
                                </li>
                                <li>
                                    <a className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center text-600 border-left-2 border-transparent hover:border-300 transition-duration-150 transition-colors">
                                        <i className="pi pi-users mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-2xl"></i>
                                        <span className="font-medium inline text-base lg:text-xs lg:block">Clientes</span>
                                        <Ripple/>
                                    </a>
                                </li>
                                <li>
                                    <a className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center text-600 border-left-2 border-transparent hover:border-300 transition-duration-150 transition-colors">
                                        <i className="pi pi-users mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-2xl"></i>
                                        <span className="font-medium inline text-base lg:text-xs lg:block">Administrador de usuario</span>
                                        <Ripple/>
                                    </a>
                                </li>
                                <li className="relative">
                                    <StyleClass nodeRef={btnRef10} selector="@next" enterClassName="hidden"
                                                leaveToClassName="hidden" hideOnOutsideClick>
                                        <a ref={btnRef10}
                                           className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center text-600 border-left-2 border-transparent hover:border-300 transition-duration-150 transition-colors">
                                            <i className="pi pi-chart-line mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-2xl p-overlay-badge"><Badge
                                                severity="danger">3</Badge></i>
                                            <span
                                                className="font-medium inline text-base lg:text-xs lg:block">Informes</span>
                                            <i className="pi pi-chevron-down ml-auto lg:hidden"></i>
                                            <Ripple/>
                                        </a>
                                    </StyleClass>
                                    <ul className="list-none pl-3 pr-0 py-0 lg:p-3 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out static border-round-right lg:absolute left-100 top-0 z-1 surface-overlay shadow-none lg:shadow-2 w-full lg:w-15rem">
                                        <li>
                                            <StyleClass nodeRef={btnRef11} selector="@next" toggleClassName="hidden">
                                                <a ref={btnRef11}
                                                   className="p-ripple flex align-items-center cursor-pointer p-3 hover:surface-100 hover:text-900 border-round text-600 hover:text-700 transition-duration-150 transition-colors">
                                                    <i className="pi pi-chart-line mr-2"></i>
                                                    <span className="font-medium">Autos en el taller</span>
                                                    <i className="pi pi-chevron-down ml-auto"></i>
                                                    <Ripple/>
                                                </a>
                                            </StyleClass>
                                            <ul className="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 hover:surface-100 hover:text-900 border-round text-600 hover:text-700 transition-duration-150 transition-colors">
                                                        <i className="pi pi-table mr-2"></i>
                                                        <span className="font-medium">Informe de ganancias</span>
                                                        <Ripple/>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 hover:surface-100 hover:text-900 border-round text-600 hover:text-700 transition-duration-150 transition-colors">
                                                        <i className="pi pi-search mr-2"></i>
                                                        <span className="font-medium">Informe</span>
                                                        <Ripple/>
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a className="p-ripple flex align-items-center cursor-pointer p-3 hover:surface-100 hover:text-900 border-round text-600 hover:text-700 transition-duration-150 transition-colors">
                                                <i className="pi pi-chart-line mr-2"></i>
                                                <span className="font-medium">Expenses</span>
                                                <Ripple/>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center text-600 border-left-2 border-transparent hover:border-300 transition-duration-150 transition-colors">
                                        <i className="pi pi-server mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-2xl"></i>
                                        <span className="font-medium inline text-base lg:text-xs lg:block">Administrador de productos</span>
                                        <Ripple/>
                                    </a>
                                </li>
                                <li>
                                    <a className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center text-600 border-left-2 border-transparent hover:border-300 transition-duration-150 transition-colors">
                                        <i className="pi pi-server mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-2xl"></i>
                                        <span className="font-medium inline text-base lg:text-xs lg:block">Administrador de servicios</span>
                                        <Ripple/>
                                    </a>
                                </li>
                                <li>
                                    <a className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center text-600 border-left-2 border-transparent hover:border-300 transition-duration-150 transition-colors">
                                        <i className="pi pi-cog mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-2xl"></i>
                                        <span
                                            className="font-medium inline text-base lg:text-xs lg:block">Configuraciones</span>
                                        <Ripple/>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-auto">
                            <hr className="mb-3 mx-3 border-top-1 border-none surface-border"/>
                            <a className="p-ripple m-3 flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center hover:surface-200 border-round text-600 transition-duration-150 transition-colors">
                                <img src="assets/images/blocks/avatars/circle/avatar-f-1.png" className="mr-2 lg:mr-0"
                                     style={{width: '32px', height: '32px'}}/>
                                <span className="font-medium inline lg:hidden">Amy Elsner</span>
                                <Ripple/>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="min-h-screen flex flex-column relative flex-auto">
                    <div
                        className="flex justify-content-between align-items-center px-5 surface-section relative lg:static border-bottom-1 surface-border"
                        style={{height: '60px'}}>
                        <div className="flex">
                            <StyleClass nodeRef={btnRef12} selector="#app-sidebar-9" enterClassName="hidden"
                                        enterActiveClassName="fadeinleft" leaveToClassName="hidden"
                                        leaveActiveClassName="fadeoutleft" hideOnOutsideClick>
                                <a ref={btnRef12} className="p-ripple cursor-pointer block lg:hidden text-700 mr-3">
                                    <i className="pi pi-bars text-4xl"></i>
                                    <Ripple/>
                                </a>
                            </StyleClass>
                            <span className="p-input-icon-left">
                    <i className="pi pi-search"></i>
                    <InputText className="border-none w-10rem sm:w-20rem" placeholder="Search"/>
                </span>
                        </div>
                        <StyleClass nodeRef={btnRef13} selector="@next" enterClassName="hidden"
                                    enterActiveClassName="fadein" leaveToClassName="hidden"
                                    leaveActiveClassName="fadeout" hideOnOutsideClick>
                            <a ref={btnRef13} className="p-ripple cursor-pointer block lg:hidden text-700">
                                <i className="pi pi-ellipsis-v text-2xl"></i>
                                <Ripple/>
                            </a>
                        </StyleClass>
                        <ul className="list-none p-0 m-0 hidden lg:flex lg:align-items-center select-none lg:flex-row
    surface-section border-1 lg:border-none surface-border right-0 top-100 z-1 shadow-2 lg:shadow-none absolute lg:static">
                            <li>
                                <a className="p-ripple flex p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer
            transition-duration-150 transition-colors">
                                    <i className="pi pi-inbox text-base lg:text-2xl mr-2 lg:mr-0"></i>
                                    <span className="block lg:hidden font-medium">Inbox</span>
                                    <Ripple/>
                                </a>
                            </li>
                            <li>
                                <a className="p-ripple flex p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer
            transition-duration-150 transition-colors">
                                    <i className="pi pi-bell text-base lg:text-2xl mr-2 lg:mr-0 p-overlay-badge"><Badge
                                        severity="danger"/></i>
                                    <span className="block lg:hidden font-medium">Notifications</span>
                                    <Ripple/>
                                </a>
                            </li>
                            <li className="border-top-1 surface-border lg:border-top-none">
                                <a className="p-ripple flex p-3 lg:px-3 lg:py-2 align-items-center hover:surface-100 font-medium border-round cursor-pointer
            transition-duration-150 transition-colors">
                                    <img src="assets/images/blocks/avatars/circle/avatar-f-1.png"
                                         className="mr-3 lg:mr-0" style={{width: '32px', height: '32px'}}/>
                                    <div className="block lg:hidden">
                                        <div className="text-900 font-medium">Amy Elsner</div>
                                        <span className="text-600 font-medium text-sm">Marketing Specialist</span>
                                    </div>
                                    <Ripple/>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="p-5 flex flex-column flex-auto">
                        <div className="grid">

                            <div className="col-12 lg:col-12">

                                <div className="surface-card p-4 shadow-2 border-round p-fluid">
                                    <div className="datatable-crud-demo">
                                        <Toast ref={toast} />

                                        <div className="card">
                                            <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                                            <DataTable ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                                                       dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                                                       paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                                       currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                                                       globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                                                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                                                <Column field="code" header="Patente" sortable style={{ minWidth: '12rem' }}></Column>
                                                <Column field="name" header="Marca" sortable style={{ minWidth: '16rem' }}></Column>
                                                <Column field="price" header="Año" body={priceBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column>
                                                <Column field="category" header="Categoria" sortable style={{ minWidth: '10rem' }}></Column>
                                                <Column field="rating" header="Experiencia" body={ratingBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                                                <Column field="inventoryStatus" header="Estado" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                                                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                                            </DataTable>
                                        </div>

                                        <Dialog visible={productDialog} style={{ width: '450px' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                                            {product.image && <img src={`images/product/${product.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={product.image} className="product-image block m-auto pb-3" />}
                                            <div className="field">
                                                <label htmlFor="name">Name</label>
                                                <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                                                {submitted && !product.name && <small className="p-error">Name is required.</small>}
                                            </div>
                                            <div className="field">
                                                <label htmlFor="description">Description</label>
                                                <InputTextarea id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                                            </div>

                                            <div className="field">
                                                <label className="mb-3">Category</label>
                                                <div className="formgrid grid">
                                                    <div className="field-radiobutton col-6">
                                                        <RadioButton inputId="category1" name="category" value="Accessories" onChange={onCategoryChange} checked={product.category === 'Accessories'} />
                                                        <label htmlFor="category1">Accessories</label>
                                                    </div>
                                                    <div className="field-radiobutton col-6">
                                                        <RadioButton inputId="category2" name="category" value="Clothing" onChange={onCategoryChange} checked={product.category === 'Clothing'} />
                                                        <label htmlFor="category2">Clothing</label>
                                                    </div>
                                                    <div className="field-radiobutton col-6">
                                                        <RadioButton inputId="category3" name="category" value="Electronics" onChange={onCategoryChange} checked={product.category === 'Electronics'} />
                                                        <label htmlFor="category3">Electronics</label>
                                                    </div>
                                                    <div className="field-radiobutton col-6">
                                                        <RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange} checked={product.category === 'Fitness'} />
                                                        <label htmlFor="category4">Fitness</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="formgrid grid">
                                                <div className="field col">
                                                    <label htmlFor="price">Price</label>
                                                    <InputNumber id="price" value={product.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                                                </div>
                                                <div className="field col">
                                                    <label htmlFor="quantity">Quantity</label>
                                                    <InputNumber id="quantity" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} integeronly />
                                                </div>
                                            </div>
                                        </Dialog>

                                        <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                                            <div className="confirmation-content">
                                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                                                {product && <span>Are you sure you want to delete <b>{product.name}</b>?</span>}
                                            </div>
                                        </Dialog>

                                        <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                                            <div className="confirmation-content">
                                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                                                {product && <span>Are you sure you want to delete the selected products?</span>}
                                            </div>
                                        </Dialog>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>



    </div>
);

}
