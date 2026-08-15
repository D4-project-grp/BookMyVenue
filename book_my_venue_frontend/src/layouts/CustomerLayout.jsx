import React from 'react'
import  {Outlet} from 'react-router'
import Navbar from '../components/customer/Navbar'
import Footer from '../components/customer/Footer'
 
const CustomerLayout = ( ) => {
  return (
    <div>
     <Navbar />
       <Outlet/> 
       
     <Footer />
    </div>
  )
}

export default CustomerLayout