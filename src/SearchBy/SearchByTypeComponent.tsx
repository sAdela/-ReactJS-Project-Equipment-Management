import { Dropdown, IDropdownOption, IDropdownStyles } from "@fluentui/react";
import DashboardHelper from "../Helper/DashboardHelper";
import { usersList } from '../Database/Database';
import { equipmentList } from '../Database/Database';
import { assignmentList } from '../Database/Database';
import { equipmentTypeList } from '../Database/Database';
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { IEquipment } from "../Management/AssignEquipmentComponent";

export interface IAssignModel {
	key: number;
	manifacturer: string;
	serialNumber: string;
	name: string;
}

const SearchByTypeComponent : React.FC = () =>  {
    const [selectedItem, setSelectedItem] = useState<IDropdownOption>();
    const [equipmentsType, setEquipmentType] = useRecoilState(equipmentTypeList);
	const [users, setUsers] = useRecoilState(usersList);
	const [equipments, setEquipment] = useRecoilState(equipmentList);
    const [assignedEquipment, setAssignedEquipment] = useRecoilState(assignmentList);
	const [helperEquipment, setHelperEquipment] = useState<IEquipment[]>();
    const [assignedEquipmentList, setAssignedEquipmentList] =
		useState<IAssignModel[]>();
    const [counterOfAllItems, setCounterOfAllItems] = useState(0);
    const [counterOfAssignedItems, setCounterOfAssignedItems] = useState(0);
	const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 300 } };

    const filterData = (key?: number | string) => {
        const listOfKeysAssignedEquipment = assignedEquipment.filter(equipment => equipment.userId == key)
                                                            .map(e => e.equipmentId);
        const listOfAssignedEquipment = equipments.filter(equipment => listOfKeysAssignedEquipment.includes(equipment.equipmentId));
        setHelperEquipment(listOfAssignedEquipment);
    }
    const onChange = (event: React.FormEvent<HTMLDivElement>, item?: IDropdownOption): void => {
        setSelectedItem(item);
        
        filterData(item?.key)
    };

	useEffect(() => {
		let helper = equipments.filter(
			(e) => e.equipmentTypeId == selectedItem?.key
		);

		let unassignedItems = helper.filter(
			(o1) => !assignedEquipment.some((o2) => o1.equipmentId == o2.equipmentId)
		);
		let temp = [];
        let counterOfAssigned = 0;
		for (let equipmentItem of helper) {
			if (unassignedItems.includes(equipmentItem)){
				temp?.push({
					manifacturer: equipmentItem.manifacturer,
					name: "/",
					serialNumber: equipmentItem.serialNumber,
					key: equipmentItem.equipmentId
				});
			}
			else {
				let assignedItem = assignedEquipment.find(eq => eq.equipmentId == equipmentItem.equipmentId);
				let user = users.find(u => u.key == assignedItem?.userId);
				temp?.push({
					manifacturer: equipmentItem.manifacturer,
					name: (user?.name) ? user.name : "",
					serialNumber: equipmentItem.serialNumber,
					key: equipmentItem.equipmentId
				});
                counterOfAssigned += 1;
			}
		}
        setCounterOfAllItems(helper.length);
        setCounterOfAssignedItems(counterOfAssigned);
		setAssignedEquipmentList(temp);
		setHelperEquipment(helper);
	}, [selectedItem, assignedEquipment]);

    return (<>
        <div className="container">
            <DashboardHelper text="Filter equipment / by type"/>
            <Dropdown
					label='Type'
					selectedKey={selectedItem ? selectedItem.key : undefined}
					onChange={(event, item) => onChange(event, item)}
					placeholder='Choose equipment type'
					options={equipmentsType}
					key={Math.random()}
					styles={dropdownStyles}
				/>
            <br/>
            <div className="statisticData">
                <p>All: {counterOfAllItems}</p>
                <p style={{color: "red"}}>Assigned items: {counterOfAssignedItems}</p>
                <p style={{color: "green"}}>Unassigned items: {counterOfAllItems - counterOfAssignedItems}</p>
            </div>
            <br/>
            <div className='table-responsive'>
					<table className='table'>
						<thead>
							<tr>
								<th scope='col'>Manufacturer</th>
								<th scope='col'>S/N</th>
								<th scope='col'>Employee</th>
							</tr>
						</thead>
						<tbody>
							{assignedEquipmentList?.map((equipment) => {
								return (
									<tr key={equipment.serialNumber}>
										<th scope='row'>{equipment.manifacturer}</th>
										<td>{equipment.serialNumber}</td>
										<td>{equipment.name}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
        </div>
    </>);
}
export default SearchByTypeComponent 