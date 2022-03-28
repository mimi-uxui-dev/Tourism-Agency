import React from 'react'
import { Link } from 'react-router-dom'

function Header(props) {

     var sectionStyle = {
          width: "100%",
          height: "300px",
          background: `url(${props.bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
     };

     return (
          <div className='header_container' style={sectionStyle}>
               <div>
                    <h1>{props.pageTitle}</h1>
                    <p> <Link to='/'>Home ＞</Link> {props.pageCrumb} </p>
               </div>
          </div>
     )

}

export default Header