window.addEventListener('DOMContentLoaded',(event) => {
    createInnerHtml();
});

const createInnerHtml = () => {
    const innerHtml = `
    <tr>
        <th></th>
        <th>Name</th>
        <th>Gender</th>
        <th>Department</th>
        <th>Salary</th>
        <th>Start Date</th>
        <th>Actions</th>
    </tr>
    <tr>
    <td><img src="../assets/Ellipse -2.png" class="profile"></td>
    <td>Dhruv</td>
    <td>Male</td>
    <td><div class="dept-label">Engineer</div>
    <div class="dept-label">Finance</div></td>
    <td>400000</td>
    <td>26 Jun 2021</td>
    <td>
        <img src="../assets/delete-black-18dp.svg" id="1" onclick="remove(this)">
        <img src="../assets/create-black-18dp.svg" id="1" onclick="update(this">
    </td>
    </tr>
    `;
    document.querySelector('#display').innerHTML = innerHtml;
}