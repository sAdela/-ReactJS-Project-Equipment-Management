import { Dropdown, IDropdownOption, IDropdownStyles } from '@fluentui/react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import mainLogo from '../assets/company_logo.png';
import DashboardHelper from '../Helper/DashboardHelper';
import { usersList } from '../Database/Database';
import { equipmentList } from '../Database/Database';
import { assignmentList } from '../Database/Database';
import { equipmentTypeList } from '../Database/Database';
import { currentLoggedIn } from '../Database/Database';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';


interface IEquipment {
    equipmentId: number, 
    equipmentTypeId: number, 
    manifacturer:string , 
    serialNumber: string
}
const EmployeeDashboardComponent : React.FC = () =>  {
    const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 300 } };
    const [selectedItem, setSelectedItem] = useState<IDropdownOption>();
    const [users, setUsers] = useRecoilState(usersList);
    const [usersHelper, setUsersHelper] = useRecoilState(usersList);
    const [equipment, setEquipment] = useRecoilState(equipmentList);
    const [assignedEquipment, setAssignedEquipment] = useRecoilState(assignmentList);
    const [equipmentType, setEquipmentType] = useRecoilState(equipmentTypeList);
    const [currentLoggedInUser, setCurrentLoggedInUser] = useRecoilState(currentLoggedIn);
    const [helperEquipment, setHelperEquipment] = useState<IEquipment[]>();

    const filterData = (key?: number | string) => {
        const listOfKeysAssignedEquipment = assignedEquipment.filter(equipment => equipment.userId == key)
                                                            .map(e => e.equipmentId);
        const listOfAssignedEquipment = equipment.filter(equipment => listOfKeysAssignedEquipment.includes(equipment.equipmentId));
        setHelperEquipment(listOfAssignedEquipment);
    }
    
    const onChange = (event: React.FormEvent<HTMLDivElement>, item?: IDropdownOption): void => {
        setSelectedItem(item);
        
        filterData(item?.key)
    };

  
    useEffect (() => {
        if (currentLoggedInUser.key != 0){
            setSelectedItem(usersHelper[usersHelper.findIndex(u => u.key == currentLoggedInUser.key)]);
        }
        const listOfUsers = usersHelper.filter((user) => user.isAdmin == false);
        setUsers(listOfUsers);
        filterData(currentLoggedInUser.key);
    }, [currentLoggedInUser]);

    
    return (<>
        <DashboardHelper text="Filter equipment / by employee"/>
            <div className="container">
                <Dropdown
                    label="Employee"
                    selectedKey={selectedItem ? selectedItem.key : undefined}
                    onChange={(event, option) => onChange(event, option)}
                    placeholder="Select employee"
                    options={users}
                    //defaultSelectedKey={currentLoggedInUser.key}
                    disabled={!currentLoggedInUser.isAdmin}
                    styles={dropdownStyles}/>
                {selectedItem &&
                <div className="assignedEquipment">
                    {helperEquipment && helperEquipment.map((e => {
                        return (
                        <div>
                            <div className="equipmentTypeList">{equipmentType[e.equipmentTypeId - 1].text}</div>
                            {e.manifacturer} {e.serialNumber && <span>/ {e.serialNumber}</span> }
                        </div>
                        )
                    }))}
                </div>
                }
            </div>
    </>);
}

export default EmployeeDashboardComponent;