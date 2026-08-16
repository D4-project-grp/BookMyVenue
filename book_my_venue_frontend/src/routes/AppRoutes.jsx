import { Routes, Route } from "react-router";

import Login from "../pages/Login";
import Signup from "../pages/Signup";

import ProtectedRoute from "./ProtectedRoute";



 
import CustomerLayout from "../layouts/CustomerLayout";

 

// Owner Pages
// import Dashboard from "../pages/venue_owner/Dashboard";
import AddVenue from "../pages/venue_owner/AddVenue";
import VenueOwnerLayout from "../layouts/VenueOwnerLayout"

// Customer Pages
import Home from "../pages/customer/Home";
import VenueDetails from "../pages/customer/VenueDetails";
import Navbar from "../components/customer/Navbar";
import SearchResults from "../components/customer/SearchResults"
import Footer from "../components/customer/Footer"
 
 
 
const AppRoutes = () => {
    return (
        
        <Routes>
            
            {/* Public Routes */}
           
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            <Route element={<CustomerLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/venues" element={<SearchResults />} />

                <Route path="/venue/:venueId" element={<VenueDetails />} />
               
                 
            </Route>
            {/* Admin */}
             

            {/* Venue Owner */}
            <Route
                path="/owner"
                element={
                    <ProtectedRoute allowedRoles={["VENUE_OWNER"]}>
                        <VenueOwnerLayout />
                    </ProtectedRoute>
                }
            >
                
                <Route path="add-venue" element={<AddVenue />} />
                 
            </Route>

            
            <Route
                path="/customer"
                element={

                    <ProtectedRoute allowedRoles={["CUSTOMER"]}>
                        
                        <CustomerLayout />
                    </ProtectedRoute>
                }
            >
               
                
            </Route>

        </Routes>
    );
};

export default AppRoutes;