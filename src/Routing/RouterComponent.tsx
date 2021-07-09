
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { RecoilRoot } from 'recoil';
import App from '../App';
import AdminDashboardComponent from '../Dashboard/AdminDashboardComponent';
import EmployeeDashboardComponent from '../Dashboard/EmployeeDashboardComponent';
import LoginComponent from '../Login/LoginComponent';
import AddNewEquipmentComponent from '../Management/AddNewEquipmentComponent';
import AssignEquipmentComponent from '../Management/AssignEquipmentComponent';
import SearchByTypeComponent from '../SearchBy/SearchByTypeComponent';


// interface IUser {
//     username: string;
//     password: string;
//     isAdmin: boolean;
//     name: string;
// }
// interface IState {
//     username: string;
//     password: string;
// }
// var users: IUser[] = [
//     {username: 'admin', password: 'admin', isAdmin: true, name: 'Super Admin'},
//     {username: 'apjanic', password: 'apjanic', isAdmin: false, name: 'Ademir Pjanic'},
//     {username: 'acolic', password: 'acolic', isAdmin: false, name: 'Aldin Colic'},
//     {username: 'adelic', password: 'adelic', isAdmin: false, name: 'Alija Delic'},
// ]

const RouterComponent: React.FC = () => {
    return (<Router>
        <RecoilRoot>
        <Route path="/" exact>
            <LoginComponent/>
        </Route>
        <Route path="/login">
            <LoginComponent/>
        </Route>
        <Route path="/admin" exact>
            <AdminDashboardComponent/>
        </Route>
        <Route path="/common" exact>
            <EmployeeDashboardComponent/>
        </Route>
        <Route path="/admin/addEquipment">
            <AddNewEquipmentComponent/>
        </Route>
        <Route path="/admin/assignEquipment">
            <AssignEquipmentComponent/>
        </Route>
        <Route path="/admin/searchByType">
            <SearchByTypeComponent/>
        </Route>
     </RecoilRoot>
    </Router>);
};
export default RouterComponent;