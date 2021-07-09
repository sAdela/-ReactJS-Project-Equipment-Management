import {
	Dropdown,
	IDropdownOption,
	IDropdownStyles,
	PrimaryButton,
	TextField,
} from "@fluentui/react";
import { KeyboardEventHandler, useState } from "react";
import { useRecoilState } from "recoil";
import DashboardHelper from "../Helper/DashboardHelper";
import { usersList } from "../Database/Database";
import { equipmentList } from "../Database/Database";
import { assignmentList } from "../Database/Database";
import { equipmentTypeList } from "../Database/Database";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import DialogHelper from "../Helper/DialogHelper";

export interface IAssignModel {
	key: number;
	manifacturer: string;
	serialNumber: string;
	name: string;
	buttonText: string;
}
export interface IEquipment {
	equipmentId: number;
	equipmentTypeId: number;
	manifacturer: string;
	serialNumber: string;
}
export interface IAssign {
	userId: number;
	equipmentId: number;
}

const AssignEquipmentComponent: React.FC = () => {
	const [selectedItem, setSelectedItem] = useState<IDropdownOption>();
	const [selectedEmployeeItem, setSelectedEmployeeItem] =
		useState<IDropdownOption>();
	const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 300 } };
	const [equipmentsType, setEquipmentType] = useRecoilState(equipmentTypeList);
	const [users, setUsers] = useRecoilState(usersList);
	const [equipment, setEquipment] = useRecoilState(equipmentList);
	const [helperEquipment, setHelperEquipment] = useState<IEquipment[]>();
	const [assignedEquipment, setAssignedEquipment] =
		useRecoilState(assignmentList);
	const [dialogState, setDialogState] = useState(false);
	const [dialogText, setDialogText] = useState("");
	const [currentEquipmentKey, setCurrentEquipmentKey] = useState(0);
	const [assignedEquipmentList, setAssignedEquipmentList] =
		useState<IAssignModel[]>();
	const [dialogTitle, setDialogTitle]= useState('');
	const [secondButtonTextDialog, setSecondButtonTextDialog]= useState('');
    const [isDisabledDropdown, setIsDisabledDropdown] = useState(false);
	const [inputSerialNumber, setInputSerialNumber] = useState('');

	useEffect(() => {
		let helper = equipment.filter(
			(e) => e.equipmentTypeId == selectedItem?.key
		);

		let unassignedItems = helper.filter(
			(o1) => !assignedEquipment.some((o2) => o1.equipmentId == o2.equipmentId)
		);
		if (inputSerialNumber){
			helper = equipment?.filter(e => e.serialNumber == inputSerialNumber);
		}
		let temp = [];
		for (let equipmentItem of helper) {
			if (unassignedItems.includes(equipmentItem)){
				temp?.push({
					manifacturer: equipmentItem.manifacturer,
					name: "/",
					serialNumber: equipmentItem.serialNumber,
					key: equipmentItem.equipmentId,
					buttonText: "Assign"
				});
			}
			else {
				let assignedItem = assignedEquipment.find(eq => eq.equipmentId == equipmentItem.equipmentId);
				let user = users.find(u => u.key == assignedItem?.userId);
				temp?.push({
					manifacturer: equipmentItem.manifacturer,
					name: (user?.name) ? user.name : "",
					serialNumber: equipmentItem.serialNumber,
					key: equipmentItem.equipmentId,
					buttonText: "Unassign"
				});
			}
		}
		
		setAssignedEquipmentList(temp);
		setHelperEquipment(helper);
	}, [selectedItem, assignedEquipment]);

	const onChange = (
		event: React.FormEvent<HTMLDivElement>,
		item?: IDropdownOption
	): void => {
		setSelectedItem(item);
	};
	const cancelDialog = () => {
		let element = document.getElementsByClassName("modal");
		element[0].setAttribute("style", "display:none");
	};
	const openDialog = (key: number) => {
		setCurrentEquipmentKey(key);
		let equipmentItem = equipment.find((e) => e.equipmentId == key);
		let equipmentTypeItem = equipmentsType.find(
			(e) => e.key == equipmentItem?.equipmentTypeId
		);
        var stringHelper = '';
        if (equipmentItem?.serialNumber){
            stringHelper = ", ";
        }
		var dialogText: string =
			equipmentTypeItem?.text +
			", " +
			equipmentItem?.manifacturer + 
            stringHelper +
			equipmentItem?.serialNumber;
		setDialogText(dialogText);

		let isAssigned = assignedEquipment.find(eq => eq.equipmentId == equipmentItem?.equipmentId);
		if (isAssigned) {
			let user = users.find(u => u.key == isAssigned?.userId);
			setSelectedEmployeeItem(user);
			setDialogTitle("Oduzmi opremu");
			setSecondButtonTextDialog("Oduzmi")
			setIsDisabledDropdown(true);
		}
		else {
			setSelectedEmployeeItem(undefined);
			setIsDisabledDropdown(false);
			setDialogTitle("Dodaj opremu");
			setSecondButtonTextDialog("Dodaj");
		}
		let element = document.getElementsByClassName("modal");
		element[0].setAttribute("style", "display:block");
	};
	const assignEquipmentToEmployee = () => {
		let equipmentItem = equipment.find(
			(e) => e.equipmentId == currentEquipmentKey
		);
		let employeeKey: number = Number(selectedEmployeeItem?.key);
		let equipmentKey: number = Number(equipmentItem?.equipmentId);

		let assignItem: IAssign = {
			userId: employeeKey,
			equipmentId: equipmentKey,
		};
		
		let isAssigned = assignedEquipment.find(eq => eq.equipmentId == equipmentItem?.equipmentId);
		if (isAssigned) {
			let temp = assignedEquipment.filter(obj => !(obj.userId == isAssigned?.userId && obj.equipmentId == assignItem.equipmentId));
			setAssignedEquipment(temp);
		}
		else {
        	setAssignedEquipment([...assignedEquipment, assignItem]);
		}
        let element = document.getElementsByClassName("modal");
		element[0].setAttribute("style", "display:none");
	};


	const searchBySerialNumber = (text: string) =>{
		setInputSerialNumber(text);
		let equipmentItem = equipment.find((e) => e.serialNumber == text);

		let temp =  equipmentsType.find(type => equipmentItem?.equipmentTypeId == type.key);
		
		setSelectedItem(temp);
		
		let assignedItems = assignedEquipmentList?.filter(e => e.serialNumber == text);
		setAssignedEquipmentList(assignedItems);

	}
	return (
		<>

			<DashboardHelper text='Assign / remove equipment' />
			<div className='container'>
			
				<TextField label="Serial number" className="serialNumberField" 
				 	onKeyDown={(e) => {
						if (e.key === "Enter") {
						   searchBySerialNumber(e.currentTarget.value);
						}
						else {
							setInputSerialNumber('');
						}
					 }}/>

				<div className='dropdown'>
					<Dropdown
						label='Type'
						selectedKey={selectedItem ? selectedItem.key : undefined}
						onChange={(event, item) => onChange(event, item)}
						placeholder='Choose equipment type'
						options={equipmentsType}
						key={Math.random()}
						styles={dropdownStyles}
						disabled={inputSerialNumber.length > 0}
					/>
				</div>
				<br />
				<div className='table-responsive'>
					<table className='table'>
						<thead>
							<tr>
								<th scope='col'>Manufacturer</th>
								<th scope='col'>S/N</th>
								<th scope='col'>Employee</th>
								<th scope='col'>/</th>
							</tr>
						</thead>
						<tbody>
							{assignedEquipmentList?.map((equipment) => {
								return (
									<tr key={equipment.serialNumber}>
										<th scope='row'>{equipment.manifacturer}</th>
										<td>{equipment.serialNumber}</td>
										<td>{equipment.name}</td>
										<td>
											<PrimaryButton
												text={equipment.buttonText}
												onClick={() => openDialog(equipment.key)}
											/>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				<DialogHelper btnAction={assignEquipmentToEmployee}  dialogTitle={dialogTitle}
					dialogText={dialogText} secondButtonText={secondButtonTextDialog}>
				<Dropdown
						label='Employee'
						selectedKey={
							selectedEmployeeItem ? selectedEmployeeItem.key : null
						}
						onChange={(event, option) =>
							setSelectedEmployeeItem(option)
						}
						disabled={isDisabledDropdown}
						placeholder='Select employee'
						options={users}
						styles={dropdownStyles}
					/>
				</DialogHelper>
			</div>
		</>
	);
};
export default AssignEquipmentComponent;
