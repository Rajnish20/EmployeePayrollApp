let isUpdate = false;
let employeePayrollObj = {};
window.addEventListener('DOMContentLoaded',(event) => {

    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input',function(){
        try{
            new EmployeePayrollData().name = name.value;
            textError.textContent = "";
        }catch(e){
            textError.textContent = e;
        }
    });

    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function(){
        output.textContent = salary.value;
    });

    const date = document.querySelector('#date');
    const dateError = document.querySelector('.date-error');
    date.addEventListener('input',function(){
    let startDate = getInputValueById('#day')+ " "+getInputValueById('#month')+ " "+getInputValueById('#year');
    try{
        new EmployeePayrollData().startDate=new Date(Date.parse(startDate));
        dateError.textContent = "";
    }catch(e){
        dateError.textContent = e;
    }
});

checkForUpdate();
});

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try{
        setEmployeePayrollObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
    }catch(e){
        return;
    }
}

const setEmployeePayrollObject = () => {
    employeePayrollObj._name = getInputValueById('#name');
    employeePayrollObj._profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollObj._gender = getSelectedValues('[name=gender]').pop();
    employeePayrollObj._department = getSelectedValues('[name=department]');
    employeePayrollObj._salary = getInputValueById('#salary');
    let date = getInputValueById('#day')+ " "+getInputValueById('#month')+ " "+getInputValueById('#year');
    employeePayrollObj._startDate = date;
    employeePayrollObj._notes = getInputValueById('#notes');
}

const createAndUpdateStorage = () => {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList){
        let empPayrollData = employeePayrollList.find(empData => empData._id == employeePayrollObj._id);
        if(!empPayrollData){
            employeePayrollList.push(createEmployeePayrollData());
        }
        else{
            const index = employeePayrollList.map(empData => empData.id)
                          .indexOf(empPayrollData._id);
            employeePayrollList.splice(index,1,createEmployeePayrollData(empPayrollData._id));
        }
    }
    else{
        employeePayrollList = [createEmployeePayrollData()];
    }
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

const createEmployeePayrollData = (id) => {
    let employeePayrollData = new EmployeePayrollData();
    if(!id) employeePayrollData.id = createNewEmployeeId();
    else employeePayrollData.id = id;
    setEmployeePayrollData(employeePayrollData);
    return employeePayrollData;
}

const createNewEmployeeId = () => {
    let empID = localStorage.getItem("EmployeeID");
    empID = !empID ? 1 : (parseInt(empID) + 1).toString();
    localStorage.setItem("EmployeeID",empID);
    return empID;
}


const setEmployeePayrollData = (employeePayrollData) => {
    employeePayrollData.name = employeePayrollObj._name;
    employeePayrollData.profilePic = employeePayrollObj._profilePic;
    employeePayrollData.gender = employeePayrollObj._gender;
    employeePayrollData.department = employeePayrollObj._department;
    employeePayrollData.salary = employeePayrollObj._salary;
    employeePayrollData.startDate = new Date(Date.parse(employeePayrollObj._startDate));
    employeePayrollData.notes = employeePayrollObj._notes;
    alert(employeePayrollData.toString());
}


const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItem = [];
    allItems.forEach(item => {
        if(item.checked){
            selItem.push(item.value);
        }
    });
    return selItem;
}


const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const resetForm = () => {
    setValue('#name','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary','');
    setValue('#day','1');
    setValue('#month','January');
    setValue('#year','2021');
    setValue('#notes','');


} 

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });

}


const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    if(!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
}

const setForm = () => {
    setValue('#name',employeePayrollObj._name);
    setSelectedValues('[name=profile]',employeePayrollObj._profilePic);
    setSelectedValues('[name=gender]',employeePayrollObj._gender);
    setSelectedValues('[name=department]',employeePayrollObj._department);
    setValue('#salary',employeePayrollObj._salary);
    setTextValue('.salary-output',employeePayrollObj._salary);
    setValue('#notes',employeePayrollObj._notes);
    let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    setValue('#day',date[0]);
    setValue('#month',date[1]);
    setValue('#year',date[2]);
}

const setSelectedValues = (propertyValue,value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if(Array.isArray(value)) {
            if(value.includes(item.value)){
                item.checked = true;
            }
        }
        else if(item.value === value){
            item.checked = true;

        }
    });
}

const setValue = (id,value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const setTextValue =(id,value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}