import React, { useEffect, useState } from 'react'
import { STATISTICS } from "../sevices/globalServices"
import axios from "axios"
import cookies from 'js-cookie'
function Statistics() {
     const [stat, setStat] = useState([])
     const [loading, setLoading] = useState(false)

     useEffect(() => {
          const fetchData = async () => {
               try {
                    const res = await axios.get(STATISTICS())
                    setStat(res.data.data)
                    setLoading(false)
                    //   console.log("aa", stat)
               } catch (e) {
                    // console.log(e)
                    setStat([])
                    setLoading(false)
               }
          }
          fetchData()
     }, [])


     // console.log("stat", stat)

     return (
          <div className='circles__outerContainer'>
               <div className='line' ></div>
               <div className='circles__counter'>
                    {
                         stat.length === 0 ? "" : stat.map(s => <div>
                              <p> {s.description_info}   </p>
                              <span> {s.count_info} </span>
                         </div>)
                    }
               </div>
               <div className='line' ></div>
          </div>
     )
}

export default Statistics
