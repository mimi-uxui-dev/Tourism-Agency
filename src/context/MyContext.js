import React, { useState, createContext, useEffect } from "react";
import axios from 'axios'
import { COMPANY_INFORMATION } from '../sevices/globalServices'

export const MyContext = createContext();

export const MyContextProvider = props => {

     const [companiesInfo, setCompaniesInfo] = useState([])

     const fetchData = async () => {
          await axios.get(COMPANY_INFORMATION(1)).then(res => setCompaniesInfo(res.data.data))
     }

     useEffect(() => {
          fetchData()
     }, [])

     return (
          <MyContext.Provider value={[companiesInfo, setCompaniesInfo]}>
               {props.children}
          </MyContext.Provider>
     );

};
