## Equipment management project using ReactJS + Typescript with in-memory database (used Recoil.js library as database)
This document has a purpose to define the requirements, documentation and user stories for an
“Equipment” application that is going to be used internally in the Company d.o.o. company. Application
should be mobile friendly and its final purpose is to simplify equipment management in the company.
## Requirements:

## 1) Database model 
There are two roles in the system:
1. Employee
2. Admin
Employee
Able to see equipment items assigned to themselves.
Admin
Responsible for managing equipment which includes following:
- Adding new item(s) to the database once it arrives to the company
- Assign item(s) to the employees
- Review the current status of the equipment
o What is available
o What is already reserved
Admin can be one employee or several employees.

As an application admin I should have the possibility to save the company’s equipment to the
database. I want to save following:
1. Equipment
a. Equipment type
i. Laptop
ii. Docking station
iii. Monitor
iv. Keyboard
v. Mouse
vi. Headsets
vii. RAM
viii. HDD/SDD
ix. Other
b. Manufacturer
c. Serial number (S/N)
2. Users
a. Email
b. Full Name
3. Equipment assignments (what equipment item is assigned to which employee) 

## 2) Landing page
As an application user, I want to be able to open the app and log in to the system. If system recognizes
me as an application admin, I should see the administration landing page. If I’m recognized
as an employee, I should see the employee landing page

As an employee, in employee screen, my name should be preselected in “Employee” dropdown and
the control should be disabled.

## 3) New equipment form
As an application admin, I want to be able to add new equipment to the system. When I click on the
“Add new equipment” button on the admin landing page, new equipment form should be displayed.

As an application admin, I should be able to choose between the equipment types and
manufacturers from the corresponding dropdowns and to enter the equipment serial number. All
fields are required. By clicking on the “Add” button, new equipment should be added to the
database and the appropriate confirmation message should be displayed.
As an application admin, I shouldn’t be able to add two items of same type with the same serial
number, from same manufacturer. Appropriate warning message should be displayed if this situation
occurs.

## 4) Assign equipment
As an application admin, I want to be able to assign the equipment item to the employee. I want to
be able to go to the “Assign/remove Equipment” page by clicking on the “Assign/remove equipment”
button on the homepage. Table with the results should include only items that are not assigned 
to anyone (free items).

As an application admin I should be able to choose between the equipment types. Upon selection,
table with the available items should be automatically populated/updated based on my selection
and display only items of selected type.
By clicking on the “Add” button in the last column of the results table, “Assign equipment” modal
should be opened. In modal I should be able to see the selected
item (i.e. Lenovo laptop with a serial number) and choose the employee which I am assigning the
item to. By clicking on the button “Add” item is assigned to the selected employee, modal dialog is
closed. 

## 5) Remove equipment
As an application admin, I want to be able to remove the assigned equipment from the employee and
potentially assign it to someone else in the company. I want to be able to go to the “Assign/remove
Equipment” page by clicking on the “Assign/remove Equipment” button on the homepage.
By clicking on the “Unassign” button, “Unassign modal” modal should be opened. In modal, I should be able
to see the selected item (i.e. Lenovo laptop with a serial number)
and the name of the employee which I’m removing the item from. By clicking on the “Unassign” button,
item is removed from the employee, modal is closed.. Items table is updated and removed item should 
now be available for new assignment.

## 6) Assign/Remove equipment - Search by serial number
As an application admin, I want to be able to quickly search and find the equipment that needs to be
added/taken from the employee. So, I would like to improve the “Assign/remove Equipment” screen
with a search box at the top.
When I as an admin type in the search box and hit enter button on the keyboard, table with the results
should be automatically populated with the results (if there are any). If there is a search term in the
search box, “type” dropdown should be disabled and if item is found, should be preselected with the
type of the found item. Once the search box is cleared, “type” dropdown is enabled again

## 7) Filter equipment by type
As an application admin, I want to be able to review the equipment in the company. I want to know
how many items of specific type free and how many are used. By clicking on the button “Filter by type”
on application homepage, “Filtered by type” screen should be opened 

## 8) Filter equipment by type
I want to be able to choose the equipment type from the dropdown and upon selection, statistic
numbers and the table with the assignments should be updated.
Statistics area should contain the total number of items of selected type, how many are in use and
how many are free.
The table below should contain all items of selected type with following information:
- Manufacturer
- Serial number
- Assignee

## 9) Filter by employee
As an application admin, I want to be able to review the specific employee’s equipment. By clicking
on the button “Filter by employee” on the homepage, “Filtered by employee” screen
should be opened. 
As an admin I want to be able to choose between the different employees in the dropdown. Upon my
selection, employee’s equipment information should be displayed on the screen. Information should
contain all assigned items including following item information:
- Type
- Manufacturer
- S/N

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
