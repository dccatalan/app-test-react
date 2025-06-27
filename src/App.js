import './App.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import {Routes, Route} from "react-router-dom";
import {LandingPage} from "./page/landing/LandingPage";
import MainApp from "./page/MainApp";
import {Dashboard} from "./page/Dashboard";
import {Team} from "./page/team/Team";
import {User} from "./page/user/User";
import {WorkOrder} from "./page/ot/WorkOrder";
import {ClientPage} from "./page/client/ClientPage";
import {CarPage} from "./page/car/CarPage";
import TeamMenu from "./menu/TeamMenu";
import {LoginPage} from "./page/login/LoginPage";
import {WorkOrderStepOne} from "./page/ot/WorkOrderStepOne";
import {WorkOrderStepTwo} from "./page/ot/WorkOrderStepTwo";
import { ServicePage } from './page/service/ServicePage';
import SecureRoute from "./security/SecureRoute";


function App() {

    return (
        <div className="App">

            <Routes>
                <Route index element={<LandingPage />} />
                <Route path={'/login'} element={<LoginPage/>} />
                <Route element={<SecureRoute/>}>
                    <Route path={'/app'} element={MainApp(<Dashboard />)} />
                    <Route path={'/app/team'} element={MainApp(<Team />)} />
                    <Route path={'/app/users'} element={MainApp(<User />)} />
                    <Route path={'/app/service'} element={MainApp(<ServicePage />)} />
                    <Route path={'/app/work-order'} element={MainApp(<WorkOrder />)} />
                    <Route path={'/app/client'} element={MainApp(<ClientPage />)} />
                    <Route path={'/app/car'} element={MainApp(<CarPage />)} />
                    <Route path={'/team'} element={TeamMenu(<WorkOrder />)} />
                    <Route path={'/team/order'} element={TeamMenu(<WorkOrderStepOne />)} />
                    <Route path={'/team/work-order-step-two'} element={TeamMenu(<WorkOrderStepTwo />)} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
