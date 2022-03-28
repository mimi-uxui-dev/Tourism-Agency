import React, { useState, useEffect, useContext, createContext } from 'react'
import axios from 'axios'
import { PRODUCTS, PRODUCT } from '../sevices/globalServices'

export const ProductsContext = createContext()

export const ProductsProvider = props => {
     const [products, setproducts] = useState([])

     const fetchData = async () => await axios.get(PRODUCTS()).then(res => setproducts(res.data.data))


     useEffect(() => {
          fetchData()
     }, [])

     return (
          <ProductsContext.Provider value={[products, setproducts]} >
               {props.children}
          </ProductsContext.Provider>
     )

}
