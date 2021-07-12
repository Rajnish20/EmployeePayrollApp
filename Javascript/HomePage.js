let empPayrollList;
window.addEventListener('DOMContentLoaded',(event) => {
    empPayrollList = getEmployeePayrollDataFromStorage();
    document.querySelector('.emp-count').textContent = empPayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
});

const getEmployeePayrollDataFromStorage = () => {
    return localStorage.getItem('EmployeePayrollList') ?
                        JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}

const createInnerHtml = () => {
    if (empPayrollList.length == 0) return;
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>";
    let innerHtml = `${headerHtml}`;
    for (const empPayrollData of empPayrollList){
        innerHtml = `${innerHtml}
         <tr>
          <td><img src="${empPayrollData._profilePic}" class="profile"></td>
          <td>${empPayrollData._name}</td>
          <td>${empPayrollData._gender}</td>
          <td>${getDeptHtml(empPayrollData._department)}</td>
          <td>${empPayrollData._salary}</td>
          <td>${stringifyDate(empPayrollData._startDate)}</td>
          <td>
           <img id="${empPayrollData.id}" src="../assets/delete-black-18dp.svg" onclick="remove(this)" alt="delete">
           <img id="${empPayrollData.id}" src="../assets/create-black-18dp.svg" onclick="update(this)" alt="edit">
          </td>
        </tr>
       `;
    }    
    document.querySelector('#display').innerHTML = innerHtml;
}

const remove = (node) => {
    let empPayrollData = empPayrollList.find(empData => empData.id == node.id);
    if(!empPayrollData) return;
    const index = empPayrollList.map(empData => empData.id)
                                .indexOf(empPayrollData.id);
    empPayrollList.splice(index,1);
    localStorage.setItem("EmployeePayrollList",JSON.stringify(empPayrollList));
    document.querySelector(".emp-count").textContent = empPayrollList.length();
    createInnerHtml();

}


const getDeptHtml = (deptList) => {
    let deptHtml ='';
    for(const dept of deptList){
        deptHtml = `${deptHtml}<div class="dept-label">${dept}</div>`;
    }
    return deptHtml;
}