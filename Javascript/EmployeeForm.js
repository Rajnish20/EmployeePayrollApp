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
        let startDate = getInputValueById('#day')+ " "+getInputValueById('#month')+ " "
                                                                +getInputValueById('#year');
        try{
            new EmployeePayrollData().startDate=(new Date(Date.parse(startDate)));
            dateError.textContent = "";
        }catch(e){
            dateError.textContent = e;
        }
    })
});

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}
