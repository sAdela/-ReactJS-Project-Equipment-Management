
import { Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownStyles, PrimaryButton, TextField } from "@fluentui/react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import DashboardHelper from "../Helper/DashboardHelper";
import { equipmentTypeList } from '../Database/Database';
import { equipmentList } from '../Database/Database';

import './management.css';

const manufacturerOptions = [
    { key: 1, text: 'ASUS'},
    { key: 2, text: 'Acer' },
    { key: 3, text: 'Lenovo' },
    { key: 4, text: 'Razer'},
    { key: 5, text: 'Thermaltake' }
  ];

interface IEquipment 
{
    equipmentId: number;
    equipmentTypeId: number;
    manifacturer: string;
    serialNumber: string;
}
  

const AddNewEquipmentComponent : React.FC = () =>  {
    const [selectedItem, setSelectedItem] = useState<IDropdownOption>();
    const [equipmentsType, setEquipmentType] = useRecoilState(equipmentTypeList);
    const [equipments, setEquipments] = useRecoilState(equipmentList);
    const [hasError, setHasError] = useState(false);
    const [isEquipmentAdded, setIsEquipmentAdded] = useState(false);
    const [selectedManufacturerItem, setSelectedManufacturerItem] = useState<IDropdownOption>();
    const [serialNumber, setSerialNumber] = useState<string>('');
    
    const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 300 } };

    const onChange = (event: React.FormEvent<HTMLDivElement>, item?: IDropdownOption): void => {
        setSelectedItem(item);
    };

    const onChangeManufacturer = (event: React.FormEvent<HTMLDivElement>, item?: IDropdownOption): void => {
        setSelectedManufacturerItem(item);
    }

    const isEquipmentUnique = () : boolean => {
        var equipmentTypeKey: number = Number(selectedItem?.key);

        for (let equipment of equipments){
            if (equipment.equipmentTypeId == equipmentTypeKey 
                && equipment.serialNumber == serialNumber && equipment.manifacturer == selectedManufacturerItem?.text){
                    setHasError(true);
                    setIsEquipmentAdded(false);
                    return false;
            }
        }
        setHasError(false);
        return true;
    }

    const addNewEquipment = () => {
        var equipmentTypeKey: number = Number(selectedItem?.key);
        
        var isElementUnique: boolean = isEquipmentUnique();

        if (isElementUnique){
            let newEquipment: IEquipment = {
                equipmentId: equipments.length + 10,
                equipmentTypeId: equipmentTypeKey,
                manifacturer: (selectedManufacturerItem?.text) ? selectedManufacturerItem.text: '',
                serialNumber: serialNumber
            };
            equipments.push(newEquipment);
            setIsEquipmentAdded(true);
        }
          
    }  

    return (<>
    <form>
        <DashboardHelper text="New equipment"/>
        <div className="container">
            <div className="dropdown">
                <Dropdown
                    label="Type"
                    selectedKey={selectedItem ? selectedItem.key : undefined}
                    onChange={(event, option) => onChange(event, option)}
                    placeholder="Choose equipment type"
                    options={equipmentsType}
                    styles={dropdownStyles}/>
            </div>
            <div className="dropdown">
                <Dropdown
                    label="Manufacturer"
                    selectedKey={selectedManufacturerItem ? selectedManufacturerItem.key : undefined}
                    onChange={(event, option) => onChangeManufacturer(event, option)}
                    placeholder="Choose manufacturer"
                    options={manufacturerOptions}
                    styles={dropdownStyles}/>
            </div>
                <TextField label="Serial number" className="serialNumberField" onChange={(e, text) => text ? setSerialNumber(text): setSerialNumber('')}/>

                <br/>
                <PrimaryButton iconProps={{iconName:'add'}} text="Add new equipment" onClick={() => addNewEquipment()} className="addEquipmentButton"/>
                <br/><br/>
                {hasError && <h4>This item already exists in the database!</h4>}
                {isEquipmentAdded && <h4>New equipment is added</h4>}
        </div>
    </form>
    </>);
}
export default AddNewEquipmentComponent;