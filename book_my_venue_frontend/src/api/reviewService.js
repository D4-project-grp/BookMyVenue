import api from "./api"; // adjust to your actual shared axios instance

 

export const getAllReviewByVenueId=(venueId)=>{
 
  return  api.get( `/reviews/${venueId}`);
}