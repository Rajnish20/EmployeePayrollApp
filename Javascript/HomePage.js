window.addEventListener('DOMContentLoaded',(event) => {
    createInnerHtml();
});

const createInnerHtml = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>";
    let innerHtml = `${headerHtml}`;
    let empPayrollList = createEmployeePayrollJSON();
    for (const empPayrollData of empPayrollList){
        innerHtml = `${innerHtml}
         <tr>
          <td><img src="${empPayrollData._profilePic}" class="profile"></td>
          <td>${empPayrollData._name}</td>
          <td>${empPayrollData._gender}</td>
          <td>${getDeptHtml(empPayrollData._department)}</td>
          <td>${empPayrollData._salary}</td>
          <td>${empPayrollData._startDate}</td>
          <td>
           <img src="../assets/delete-black-18dp.svg" id="1" onclick="remove(this)">
           <img src="../assets/create-black-18dp.svg" id="1" onclick="update(this">
          </td>
        </tr>
       `;
    }    
    document.querySelector('#display').innerHTML = innerHtml;
}

const createEmployeePayrollJSON = () => {
    let empPayrollListLocal = [
        {
            _name: 'Shubham Jangid',
            _gender:'Male',
            _department: [
                'Engineer'
            ],
            _salary:'400000',
            _startDate:'7 Jul 2021',
            _note:'',
            _profilePic:'../assets/Ellipse -3.png'
        },
        {
            _name: 'Shatakshi',
            _gender:'Female',
            _department: [
                'HR',
                'Sales'
            ],
            _salary:'300000',
            _startDate:'9 Jul 1996',
            _note:'',
            _profilePic:'../assets/Ellipse -7.png'
        }

    ];
    return empPayrollListLocal;
}

const getDeptHtml = (deptList) => {
    let deptHtml ='';
    for(const dept of deptList){
        deptHtml = `${deptHtml}<div class="dept-label">${dept}</div>`;
    }
    return deptHtml;
}