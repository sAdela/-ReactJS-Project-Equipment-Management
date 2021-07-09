import { atom } from "recoil";

export const usersList = atom({
    key: 'users', // unique ID (with respect to other atoms/selectors)
    default:  [
        {key: 1, username: 'admin', password: 'admin', isAdmin: true, name: 'Super Admin', text: 'Super Admin', equipment: [1, 3], email: 'admin@gmail.com'},
        {key: 2, username: 'aselimovic', password: 'aselimovic', isAdmin: false, name: 'Adela Selimovic', text: 'Adela Selimovic', equipment: [1, 2], email: 'adelaselimovic@gmail.com'},
        {key: 3, username: 'testuser1', password: 'testuser1', isAdmin: false, name: 'Test User 1', text: 'Test User 1', equipment: [], email:'testuser1@gmail.com'},
        {key: 4, username: 'testuser2', password: 'testuser2', isAdmin: false, name: 'Test User 2', text: 'Test User 2', equipment: [1], email: 'testuser1@gmail.com'},
    ]// default value (aka initial value)
  });

  export const equipmentList = atom({
    key: 'equipment',
    default:  [
        {equipmentId: 1, equipmentTypeId: 1, manifacturer: 'ASUS', serialNumber: 'NBTN2017-5'},
        {equipmentId: 2, equipmentTypeId: 1, manifacturer: 'Lenovo', serialNumber: ''},
        {equipmentId: 3, equipmentTypeId: 4, manifacturer: 'ThermalTake', serialNumber: 'SVX-8'},
        {equipmentId: 4, equipmentTypeId: 6, manifacturer: 'Razer', serialNumber: 'HS781024'},
        {equipmentId: 5, equipmentTypeId: 3, manifacturer: 'Acer', serialNumber: 'AC-8074'},
        {equipmentId: 6, equipmentTypeId: 1, manifacturer: 'HP', serialNumber: 'X25-Y7'},
        {equipmentId: 7, equipmentTypeId: 1, manifacturer: 'Toshiba', serialNumber: 'Y50'},

    ]
  });
  export const equipmentTypeList = atom({
    key: 'equipmentType',
    default:  [
        {key: 1, text:'Laptop'}, 
        {key: 2, text:'Docking station'},
        {key: 3, text: 'Monitor'},
        {key: 4, text: 'Keyboard'},
        {key: 5, text: 'Mouse'},
        {key: 6, text: 'Headsets'},
        {key: 7, text: 'RAM'},
        {key: 8, text: 'HDD/SSD'},
        {key: 9, text: 'Other'}
    ]
  });
  export const assignmentList = atom({
    key: 'assignment',
    default:  [
        {userId: 2, equipmentId: 4},
        {userId: 2, equipmentId: 5},
        {userId: 2, equipmentId: 6},
        {userId: 2, equipmentId: 8},
        {userId: 2, equipmentId: 7},
        {userId: 4, equipmentId: 3},
    ]
  });

  export const currentLoggedIn = atom({
    key: 'currentLoggedIn',
    default: {
      key: 0,
      username: '',
      isAdmin: false
    }
  });




  