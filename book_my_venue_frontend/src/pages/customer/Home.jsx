import { useNavigate } from "react-router";
import { db } from "../../data/mockData";
import VenueCard from "../../components/customer/VenueCard";
import "./Home.css";
import { useAuth } from "../../context/AuthContext";
import { getApprovedVenues } from "../../api/venueService";
import { useState,useEffect } from "react";

export default function Home() {
  
  const navigate = useNavigate();
  // const venues = db.getVenues();
  const [venues,setVenues]=useState([]);
  useEffect(()=>{
      
      async function fetchData() {
        const response=await getApprovedVenues();
        
       
        setVenues(  response.data)
        console.log(response.data)
  
      }
      fetchData()
      
  },[])
  const popular = [...venues].sort((a, b) => b.popularity - a.popularity).slice(0, 4);
  const { user, logout } = useAuth();

   
 
  return (
    <div>
      <section className="hero">
        <div className="container hero-inner">
          <h1>Find &amp; book the perfect venue for your celebration</h1>
          <p>Weddings, birthdays, engagements, corporate events and more — all in one place.</p>
          <button className="btn-primary hero-cta" onClick={() => navigate("/venues")}>
            Explore Venues
          </button>
        </div>
      </section>

      

      {popular.length > 0 && (
        <section className="container venue-section">
          <div className="section-heading">
            <h2>Popular Venues</h2>
            <span className="see-all" onClick={() => navigate("/venues")}>See All ›</span>
          </div>
          <div className="venue-grid">
            {popular.map((v) => (
              <VenueCard key={v.venueId} venue={v} />
            ))}
          </div>
        </section>
      )}

      <section className="container venue-section">
        <div className="section-heading">
          <h2>All Venues</h2>
          <span className="see-all" onClick={() => navigate("/venues")}>See All ›</span>
        </div>
        <div className="venue-grid">
          {venues.map((v) => (
            <VenueCard key={v.venueId} venue={v} />
          ))}
        </div>
      </section>
    </div>
  );
}