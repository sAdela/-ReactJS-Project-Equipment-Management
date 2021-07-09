import { Icon, IconButton, initializeIcons, PrimaryButton } from "@fluentui/react";
import './dashboard.css';
import mainLogo from '../assets/company_logo.png';
import DashboardHelper from "../Helper/DashboardHelper";
import { useRecoilState } from "recoil";
import { usersList } from '../Database/Database';
import { Add28Filled } from '@fluentui/react-icons';
import { useHistory } from "react-router-dom";

const AdminDashboardComponent : React.FC = () =>  {
    const [users, setUsers] = useRecoilState(usersList);
    initializeIcons();
    const history = useHistory();
    const addNewEquipment = () => {
        history.push("/admin/addEquipment");
    }
    const assignEquipment = () => {
        history.push("/admin/assignEquipment");
    }
    const equipmentByType = () => {
        history.push("/admin/searchByType");
    }
    const equipmentByEmployee = () => {
        history.push("/common");
        
    }

    return (<>
        <div className="row">
            <div className="container col-12 text-center">
                <DashboardHelper text="Company equipment"/>
                <PrimaryButton iconProps={{iconName:'add'}} text="Add new equipment" onClick={() => addNewEquipment()} className="dashboardButton"/>
                <br/><br/>
                <PrimaryButton iconProps={{iconName:'addFriend'}} text="Assign/remove equipment" onClick={() => assignEquipment()} className="dashboardButton"/>
                <br/><br/>
                <PrimaryButton iconProps={{iconName:'filter'}} text="Filter by type" onClick={() => equipmentByType()} className="dashboardButton"/>
                <br/><br/>
                <PrimaryButton iconProps={{iconName:'filter'}} text="Filter by employee" onClick={() => equipmentByEmployee()} className="dashboardButton"/>
            </div>
            <footer className="text-center footer">Company d.o.o.</footer>

        </div>

    </>);
}

export default AdminDashboardComponent;