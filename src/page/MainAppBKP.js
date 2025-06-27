import {useState} from "react";
import {Routes,Route} from "react-router-dom";

import Topbar from "../menu/TopBar";
import SideBar from "../menu/SideBar";
import {Dashboard} from "../page/Dashboard";
import {Dashboard2} from "../page/Dashboard2";


function MainApp() {

    const [menuLeft, setMenuLeft] = useState(false)
    const routers = [     {path: '/', component: ()=><Dashboard />, exact: true, meta: {breadcrumb: [{parent: 'Dashboard', label: 'Dashboard'}]}},
    ];
    return (
        <div className="App">

            <div style={{height: "100vh", overflow: "hidden"}}>
                <div className="min-h-screen flex relative lg:static surface-ground" onClick={() => {
                    if (menuLeft) {
                        setMenuLeft(false)
                    }
                }}>

                    <SideBar menuLeft={menuLeft} setMenuLeft={setMenuLeft}/>

                    <div className="min-h-screen flex flex-column relative flex-auto">


                        <Topbar menuLeft={menuLeft} setMenuLeft={setMenuLeft}/>

                        <div className="p-5 flex flex-column flex-auto">
                            <div className="surface-0 p-4 shadow-2 border-round">
                                <Routes>
                                    <Route index element={<Dashboard />} />
                                    <Route path={'ap2'}  element={<Dashboard2 />} />
                                </Routes>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainApp;
