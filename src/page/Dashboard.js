import React from 'react';


export const Dashboard = () => {

    return (
        <div className="p-5 flex flex-column flex-auto">

            <div className="px-4 py-5 md:px-6 lg:px-8">
                <div className="grid">
                    <div className="col-12 md:col-6 lg:col-3 p-3">
                        <div className="p-3 text-center bg-blue-500" style={{ borderRadius: '12px' }}>
                <span className="inline-flex justify-content-center align-items-center bg-blue-600 border-circle mb-3" style={{ width: '49px', height: '49px' }}>
                    <i className="pi pi-inbox text-xl text-white"></i>
                </span>
                            <div className="text-2xl font-medium text-white mb-2">10</div>
                            <span className="text-blue-100 font-medium">Autos en el taller</span>
                        </div>
                    </div>
                    <div className="col-12 md:col-6 lg:col-3 p-3">
                        <div className="p-3 text-center bg-purple-500" style={{ borderRadius: '12px' }}>
                <span className="inline-flex justify-content-center align-items-center bg-purple-600 border-circle mb-3" style={{ width: '49px', height: '49px' }}>
                    <i className="pi pi-map-marker text-xl text-white"></i>
                </span>
                            <div className="text-2xl font-medium text-white mb-2">5</div>
                            <span className="text-purple-100 font-medium">Autos Listos para entrega</span>
                        </div>
                    </div>
                    <div className="col-12 md:col-6 lg:col-3 p-3">
                        <div className="p-3 text-center bg-indigo-500" style={{ borderRadius: '12px' }}>
                <span className="inline-flex justify-content-center align-items-center bg-indigo-600 border-circle mb-3" style={{ width: '49px', height: '49px' }}>
                    <i className="pi pi-file text-xl text-white"></i>
                </span>
                            <div className="text-2xl font-medium text-white mb-2">3</div>
                            <span className="text-indigo-100 font-medium">Clientes con deuda</span>
                        </div>
                    </div>
                    <div className="col-12 md:col-6 lg:col-3 p-3">
                        <div className="p-3 text-center bg-orange-500" style={{ borderRadius: '12px' }}>
                <span className="inline-flex justify-content-center align-items-center bg-orange-600 border-circle mb-3" style={{ width: '49px', height: '49px' }}>
                    <i className="pi pi-users text-xl text-white"></i>
                </span>
                            <div className="text-2xl font-medium text-white mb-2">10</div>
                            <span className="text-orange-100 font-medium">Total Colaboradores</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-4 py-5 md:px-6 lg:px-8">
                <div className="grid">
                    <div className="col-12 md:col-6 lg:col-6">
                        <div className="surface-card shadow-2 p-3 border-round">
                            <div className="flex justify-content-between mb-3">
                                <div>
                                    <span className="block text-500 font-medium mb-3">Total Trabajos realizados</span>
                                    <div className="text-900 font-medium text-xl">152</div>
                                </div>
                                <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                    <i className="pi pi-shopping-cart text-blue-500 text-xl"></i>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-12 md:col-6 lg:col-6">
                        <div className="surface-card shadow-2 p-3 border-round">
                            <div className="flex justify-content-between mb-3">
                                <div>
                                    <span className="block text-500 font-medium mb-3">Total trabajos realizados mes actual</span>
                                    <div className="text-900 font-medium text-xl">$2.100</div>
                                </div>
                                <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                    <i className="pi pi-map-marker text-orange-500 text-xl"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 md:col-6 lg:col-6">
                        <div className="surface-card shadow-2 p-3 border-round">
                            <div className="flex justify-content-between mb-3">
                                <div>
                                    <span className="block text-500 font-medium mb-3">Nuevo clientes</span>
                                    <div className="text-900 font-medium text-xl">28441</div>
                                </div>
                                <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                    <i className="pi pi-inbox text-cyan-500 text-xl"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 md:col-6 lg:col-6">
                        <div className="surface-card shadow-2 p-3 border-round">
                            <div className="flex justify-content-between mb-3">
                                <div>
                                    <span className="block text-500 font-medium mb-3">Total venta productos</span>
                                    <div className="text-900 font-medium text-xl">152 Unread</div>
                                </div>
                                <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                    <i className="pi pi-comment text-purple-500 text-xl"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




        </div>
    );

}
