import admins from "../utils/admin.json";
import employees from "../utils/employees.json";


export const setLocalStorage = () => {
    if (!localStorage.getItem("employees")) {
        localStorage.setItem(
            "employees",
            JSON.stringify(employees)
        );
    }

    if (!localStorage.getItem("admins")) {
        localStorage.setItem(
            "admins",
            JSON.stringify(admins)
        );
    }
}

export const getLocalStorage = () => {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const admins = JSON.parse(localStorage.getItem('admins')) || [];

    return {
        employees,
        admins
    };
    
}