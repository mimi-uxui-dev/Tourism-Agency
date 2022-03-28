import React from 'react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

function ServicesPage() {

     const loc = useLocation()
     const data = loc.state.data

     return (
          <div>
               <h1> Services PAges </h1>
               {
                    data.map(d => <div key={d.id}>
                         <h4> {d.id}  <Link to={`/services/category/${d.id}`}> {d.name__fr} </Link>  </h4>
                         <h3> {d.description__fr} </h3>
                    </div>)
               }
          </div>
     )
}

export default ServicesPage
