import { createContext, useState } from "react"


export const DataContext = createContext()


export default function DataProvider({children}) {

    const [userData, setUserData] = useState(null)
    const [employeeData, setEmployeeData] = useState()

    const updateEmployee = (id, updatedEmployee) => {
        setEmployeeData(employeeData?.map((employee) => (employee._id === id ? updatedEmployee : employee)))
    } 
    

    return <DataContext.Provider value={{userData, setUserData, employeeData, setEmployeeData, updateEmployee}}> 
        {children}
    </DataContext.Provider>
}