import { createContext, useState } from "react"


export const DataContext = createContext()


export default function DataProvider({children}) {

    const [userData, setUserData] = useState(null)
    const [employeeData, setEmployeeData] = useState()
    

    return <DataContext.Provider value={{userData, setUserData, employeeData, setEmployeeData}}> 
        {children}
    </DataContext.Provider>
}