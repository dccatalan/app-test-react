import React from 'react';


const SideBar = (props) => {

    const menu = [
        {label: "Dashboard", icon: "pi pi-fw pi-home", to: "/app"},
        {label: "Administrador Usuarios ", icon: "pi pi-users", to: "/app/ap2"},
        {label: "Administrador Clientes ", icon: "pi pi-user", to: "/"},
        {label: "Administrador Automoviles ", icon: " pi pi-car", to: "/"},
        {label: "Administrador Servicios ", icon: " pi pi-services", to: "/"},
        {label: "Administrador Productos ", icon: " pi pi-products", to: "/"}
    ];

    return (
        <>
            <div id="app-sidebar-1"
                 className={`bg-bluegray-800 h-screen ${(props.menuLeft) ? 'fadeinleft' : 'fadeoutleft hidden '} lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-1 select-none`}
                 style={{width: "280px"}}>
                <div className="flex flex-column h-full">
                    <div className="flex align-items-center px-5 bg-bluegray-900 flex-shrink-0"
                         style={{height: "70px"}}><h3 className="text-white "> Mecanica Fortaleza</h3></div>
                    <div className="overflow-y-auto mt-3">
                        <ul className="list-none p-3 m-0">
                            {
                                menu.map((elemnt,i)=>{return(
                                    <li key={i}>
                                        <div  className="p-ripple  flex align-items-center cursor-pointer p-3 hover:bg-bluegray-900 border-round text-bluegray-100 hover:text-bluegray-50 transition-duration-150 transition-colors w-full" >
                                                <a href={elemnt.to}><i className={elemnt.icon+" mr-2"}></i><span className="font-medium">{elemnt.label}</span></a>
                                        </div>

                                    </li>
                                    )
                                })
                            }

                        </ul>
                    </div>
                    <div className="mt-auto mx-3">
                        <hr className="mb-3 border-top-1 border-bluegray-600"/>
                        <ul className="list-none p-2 m-0 hidden">
                            <li key={1}><a href={' https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-valid.md '}
                                className="p-ripple flex align-items-center cursor-pointer p-3 hover:bg-bluegray-900 border-round text-bluegray-100 hover:text-bluegray-50 transition-duration-150 transition-colors w-full"><i
                                className="pi pi-user mr-2"></i><span
                                className="font-medium">Profile</span><span className="p-ink"></span></a></li>
                            <li key={2}><a href={'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-valid.md '}
                                className="p-ripple flex align-items-center cursor-pointer p-3 hover:bg-bluegray-900 border-round text-bluegray-100 hover:text-bluegray-50 transition-duration-150 transition-colors w-full"><i
                                className="pi pi-cog mr-2"></i><span
                                className="font-medium">Settings</span><span className="p-ink"></span></a></li>
                            <li key={3}><a href={' https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-valid.md '}
                                className="p-ripple flex align-items-center cursor-pointer p-3 hover:bg-bluegray-900 border-round text-bluegray-100 hover:text-bluegray-50 transition-duration-150 transition-colors w-full"><i
                                className="pi pi-sign-out mr-2"></i><span
                                className="font-medium">Sign Out</span><span className="p-ink"></span></a></li>
                        </ul>

                    </div>
                </div>
            </div>
        </>
    );
}

export default SideBar;
