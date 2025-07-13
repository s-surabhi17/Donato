// import React, { useEffect, useState } from "react";
// import { useParams, useHistory } from "react-router-dom";
// import styles from "./ngoPage.module.css";
// import { HiBadgeCheck } from "react-icons/hi";
// import BottomNavbar from "../../components/BottomNavbar";
// import DonateFoodNavbar from "../../components/DonateFoodNavbar";
// import Button from "../../components/Button";

// const NGOPage = ({ data, isLoadingNgos, ngoError, retryFetch }) => {
//   const { id } = useParams();
//   const history = useHistory();
//   const [activeTab, setActiveTab] = useState('about');
//   const [ngoData, setNgoData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     console.log('NGOPage - ID:', id, 'Data length:', data?.length);
    
//     if (!id || id === 'undefined') {
//       console.error('Invalid NGO ID:', id);
//       setLoading(false);
//       return;
//     }

//     if (!data || data.length === 0) {
//       console.log('NGO data not yet loaded or empty');
//       setLoading(false);
//       return;
//     }

//     // Find NGO by ID (support both string and ObjectId comparison)
//     const foundNgo = data.find(ngo => 
//       ngo._id === id || 
//       ngo.id === id || 
//       String(ngo._id) === String(id)
//     );
    
//     if (foundNgo) {
//       console.log('Found NGO:', foundNgo);
//       setNgoData(foundNgo);
//     } else {
//       console.error('NGO not found with ID:', id);
//       console.log('Available NGO IDs:', data.map(ngo => ngo._id || ngo.id));
//     }
    
//     setLoading(false);
//   }, [id, data]);

//   // Handle navigation back
//   const goBack = () => {
//     history.push('/all');
//   };

//   // Show loading state while NGO data is being fetched
//   if (isLoadingNgos) {
//     return (
//       <div className={styles.loading}>
//         <DonateFoodNavbar link="/all" />
//         <div className={styles.loadingContent}>
//           <p>Loading NGO data...</p>
//         </div>
//         <BottomNavbar />
//       </div>
//     );
//   }

//   // Show error state if NGO data failed to load
//   if (ngoError) {
//     return (
//       <div className={styles.error}>
//         <DonateFoodNavbar link="/all" />
//         <div className={styles.errorContent}>
//           <h2>Error Loading Data</h2>
//           <p>{ngoError}</p>
//           <div className={styles.errorButtons}>
//             <button onClick={retryFetch}>Retry</button>
//             <button onClick={goBack}>Back to All NGOs</button>
//           </div>
//         </div>
//         <BottomNavbar />
//       </div>
//     );
//   }

//   // Invalid ID state
//   if (!id || id === 'undefined') {
//     return (
//       <div className={styles.error}>
//         <DonateFoodNavbar link="/all" />
//         <div className={styles.errorContent}>
//           <h2>Invalid NGO ID</h2>
//           <p>The NGO ID is missing or invalid.</p>
//           <button onClick={goBack}>Back to All NGOs</button>
//         </div>
//         <BottomNavbar />
//       </div>
//     );
//   }

//   // NGO not found state
//   if (!loading && !ngoData) {
//     return (
//       <div className={styles.error}>
//         <DonateFoodNavbar link="/all" />
//         <div className={styles.errorContent}>
//           <h2>NGO Not Found</h2>
//           <p>The requested NGO could not be found.</p>
//           <p><strong>Requested ID:</strong> {id}</p>
//           <p><strong>Available NGOs:</strong> {data?.length || 0}</p>
//           <div className={styles.errorButtons}>
//             <button onClick={goBack}>Back to All NGOs</button>
//             <button onClick={retryFetch}>Refresh Data</button>
//           </div>
//         </div>
//         <BottomNavbar />
//       </div>
//     );
//   }

//   // Still loading individual NGO data
//   if (loading) {
//     return (
//       <div className={styles.loading}>
//         <DonateFoodNavbar link="/all" />
//         <div className={styles.loadingContent}>
//           <p>Loading NGO details...</p>
//         </div>
//         <BottomNavbar />
//       </div>
//     );
//   }

//   // Handle image error
//   const handleImageError = (e) => {
//     console.log('Image failed to load:', e.target.src);
//     e.target.src = '/images/default-ngo.jpg';
//   };

//   // Handle tab switching
//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   // Handle button clicks
//   const handleChatClick = () => {
//     console.log('Chat functionality - NGO:', ngoData.NGOName);
//     // Implement chat functionality here
//     alert('Chat functionality coming soon!');
//   };

//   const handleVolunteerClick = () => {
//     console.log('Volunteer functionality - NGO:', ngoData.NGOName);
//     // Implement volunteer functionality here
//     alert('Volunteer registration coming soon!');
//   };

//   return (
//     <>
//       <DonateFoodNavbar link="/all" />
//       <div className={styles.main}>
//         <div className={styles.ngo_details}>
//           <div className={styles.image_section}>
//             <img 
//               src={ngoData.image || ngoData.logo || '/images/default-ngo.jpg'} 
//               alt={`${ngoData.NGOName || ngoData.name} logo`}
//               onError={handleImageError}
//               loading="lazy"
//             />
//             <div className={styles.title}>
//               <p>{ngoData.NGOName || ngoData.name || 'Unknown NGO'}</p>
//               <HiBadgeCheck className={styles.icon} />
//             </div>
//           </div>
          
//           <div className={styles.grid}>
//             <div className={styles.item}>
//               <p className={styles.detail}>{ngoData.reviews || 0}</p>
//               <p className={styles.para}>Reviews</p>
//             </div>
//             <div className={styles.item}>
//               <p className={styles.detail}>{ngoData.totalFeeds || 0}+</p>
//               <p className={styles.para}>Total Feeds</p>
//             </div>
//             <div className={styles.item}>
//               <p className={styles.detail}>{ngoData.totalCampaigns || 0}+</p>
//               <p className={styles.para}>Total Campaigns</p>
//             </div>
//             <div className={styles.item}>
//               <p className={styles.detail}>{ngoData.totalVolunteers || 0}+</p>
//               <p className={styles.para}>Total Volunteers</p>
//             </div>
//           </div>
          
//           <div className={styles.button}>
//             <Button text="Donate Now" link="/category" />
//           </div>
//         </div>

//         <div className={styles.about}>
//           <div className={styles.about_top}>
//             <p 
//               className={activeTab === 'about' ? styles.active : ''}
//               onClick={() => handleTabClick('about')}
//             >
//               About
//             </p>
//             <p 
//               className={activeTab === 'events' ? styles.active : ''}
//               onClick={() => handleTabClick('events')}
//             >
//               Events
//             </p>
//             <p 
//               className={activeTab === 'reviews' ? styles.active : ''}
//               onClick={() => handleTabClick('reviews')}
//             >
//               Reviews
//             </p>
//           </div>
          
//           <div className={styles.about_bottom}>
//             {activeTab === 'about' && (
//               <div className={styles.aboutContent}>
//                 <p>{ngoData.about || ngoData.description || 'No description available for this NGO.'}</p>
                
//                 {ngoData.location && (
//                   <div className={styles.infoItem}>
//                     <strong>Location:</strong> {ngoData.location}
//                   </div>
//                 )}
                
//                 {ngoData.contact && (
//                   <div className={styles.infoItem}>
//                     <strong>Contact:</strong> {ngoData.contact}
//                   </div>
//                 )}
                
//                 {ngoData.email && (
//                   <div className={styles.infoItem}>
//                     <strong>Email:</strong> 
//                     <a href={`mailto:${ngoData.email}`}> {ngoData.email}</a>
//                   </div>
//                 )}
                
//                 {ngoData.phone && (
//                   <div className={styles.infoItem}>
//                     <strong>Phone:</strong> 
//                     <a href={`tel:${ngoData.phone}`}> {ngoData.phone}</a>
//                   </div>
//                 )}
                
//                 {ngoData.website && (
//                   <div className={styles.infoItem}>
//                     <strong>Website:</strong> 
//                     <a href={ngoData.website} target="_blank" rel="noopener noreferrer">
//                       {ngoData.website}
//                     </a>
//                   </div>
//                 )}
                
//                 {ngoData.established && (
//                   <div className={styles.infoItem}>
//                     <strong>Established:</strong> {ngoData.established}
//                   </div>
//                 )}
//               </div>
//             )}
            
//             {activeTab === 'events' && (
//               <div className={styles.eventsContent}>
//                 {ngoData.events && ngoData.events.length > 0 ? (
//                   ngoData.events.map((event, index) => (
//                     <div key={index} className={styles.event}>
//                       <h4>{event.title || event.name}</h4>
//                       <p>{event.description}</p>
//                       {event.date && (
//                         <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
//                       )}
//                       {event.location && (
//                         <p><strong>Location:</strong> {event.location}</p>
//                       )}
//                     </div>
//                   ))
//                 ) : (
//                   <p>No upcoming events at this time.</p>
//                 )}
//               </div>
//             )}
            
//             {activeTab === 'reviews' && (
//               <div className={styles.reviewsContent}>
//                 {ngoData.reviewsList && ngoData.reviewsList.length > 0 ? (
//                   ngoData.reviewsList.map((review, index) => (
//                     <div key={index} className={styles.review}>
//                       <div className={styles.reviewHeader}>
//                         <strong>{review.reviewer || review.name || 'Anonymous'}</strong>
//                         <span className={styles.rating}>
//                           {'★'.repeat(Math.min(review.rating || 5, 5))}
//                           {'☆'.repeat(Math.max(5 - (review.rating || 5), 0))}
//                         </span>
//                       </div>
//                       <p>{review.comment || review.text}</p>
//                       {review.date && (
//                         <small className={styles.reviewDate}>
//                           {new Date(review.date).toLocaleDateString()}
//                         </small>
//                       )}
//                     </div>
//                   ))
//                 ) : (
//                   <div className={styles.noReviews}>
//                     <p>No reviews available yet.</p>
//                     <p>Be the first to review this NGO!</p>
//                   </div>
//                 )}
//               </div>
//             )}
            
//             <div className={styles.buttons}>
//               <button onClick={handleChatClick} className={styles.chatButton}>
//                 Chat
//               </button>
//               <button onClick={handleVolunteerClick} className={styles.volunteerButton}>
//                 Volunteer
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <BottomNavbar />
//     </>
//   );
// };

// export default NGOPage;

//old

// import styles from "./ngoPage.module.css";
// import { HiBadgeCheck } from "react-icons/hi";
// import BottomNavbar from "../../components/BottomNavbar";
// import DonateFoodNavbar from "../../components/DonateFoodNavbar";
// import Button from "../../components/Button";
// import { useParams } from "react-router";

// const NGOPage = ({ data }) => {
//   const { id } = useParams();
//   const index = parseInt(id);
//   const ngoData = data?.[index];

//   if (!ngoData) {
//     return (
//       <>
//         <DonateFoodNavbar link="/all" />
//         <BottomNavbar />
//         <div className={styles.error}>
//           <h2>NGO Not Found</h2>
//           <p>No NGO found at index: {id}</p>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <DonateFoodNavbar link="/all" />
//       <BottomNavbar />
//       <div className={styles.main}>
//         <div className={styles.ngo_details}>
//           <div className={styles.image_section}>
//             <img src={ngoData.image} alt={`${ngoData.NGOName} banner`} />
//             <div className={styles.title}>
//               <p>{ngoData.NGOName}</p>
//               <HiBadgeCheck className={styles.icon} />
//             </div>
//           </div>

//           <div className={styles.grid}>
//             <div className={styles.item}>
//               <p className={styles.detail}>{ngoData.reviews}</p>
//               <p className={styles.para}>Reviews</p>
//             </div>
//             <div className={styles.item}>
//               <p className={styles.detail}>{ngoData.totalFeeds}+</p>
//               <p className={styles.para}>Total Feeds</p>
//             </div>
//             <div className={styles.item}>
//               <p className={styles.detail}>{ngoData.totalCampaigns}+</p>
//               <p className={styles.para}>Total Campaigns</p>
//             </div>
//             <div className={styles.item}>
//               <p className={styles.detail}>{ngoData.totalVolunteers}+</p>
//               <p className={styles.para}>Total Volunteers</p>
//             </div>
//           </div>

//           <div className={styles.button}>
//             <Button text="Donate Now" link="/category" />
//           </div>
//         </div>

//         <div className={styles.about}>
//           <div className={styles.about_top}>
//             <p>About</p>
//             <p>Events</p>
//             <p>Reviews</p>
//           </div>

//           <div className={styles.about_bottom}>
//             <p>{ngoData.about}</p>
//             <div className={styles.buttons}>
//               <button>Chat</button>
//               <button>Volunteer</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default NGOPage;

//new neww


// const NGOPage = ({ data }) => {
//   const { id } = useParams();

//   // Check if data is still loading
//   if (!data || data.length === 0) {
//     return (
//       <>
//         <DonateFoodNavbar link="/all" />
//         <BottomNavbar />
//         <div className={styles.error}>
//           <h2>Loading NGO data...</h2>
//         </div>
//       </>
//     );
//   }

//   const ngoData = data.find((ngo) => ngo._id === id); // ✅ Match by _id

//   if (!ngoData) {
//     return (
//       <>
//         <DonateFoodNavbar link="/all" />
//         <BottomNavbar />
//         <div className={styles.error}>
//           <h2>NGO Not Found</h2>
//           <p>No NGO found with ID: {id}</p>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <DonateFoodNavbar link="/all" />
//       <BottomNavbar />
//       <div className={styles.main}>
//         <div className={styles.ngo_details}>
//           <div className={styles.image_section}>
//             <img src={ngoData.image} alt={`${ngoData.NGOName} banner`} />
//             <div className={styles.title}>
//               <p>{ngoData.NGOName}</p>
//               <HiBadgeCheck className={styles.icon} />
//             </div>
//           </div>

//           <div className={styles.grid}>
//             <div className={styles.item}>
//               <p className={styles.detail}>{ngoData.reviews}</p>
//               <p className={styles.para}>Reviews</p>
//             </div>
//             <div className={styles.item}>
//               <p className={styles.detail}>{ngoData.totalFeeds}+</p>
//               <p className={styles.para}>Total Feeds</p>
//             </div>
//             <div className={styles.item}>
//               <p className={styles.detail}>{ngoData.totalCampaigns}+</p>
//               <p className={styles.para}>Total Campaigns</p>
//             </div>
//             <div className={styles.item}>
//               <p className={styles.detail}>{ngoData.totalVolunteers}+</p>
//               <p className={styles.para}>Total Volunteers</p>
//             </div>
//           </div>

//           <div className={styles.button}>
//             <Button text="Donate Now" link="/category" />
//           </div>
//         </div>

//         <div className={styles.about}>
//           <div className={styles.about_top}>
//             <p>About</p>
//             <p>Events</p>
//             <p>Reviews</p>
//           </div>

//           <div className={styles.about_bottom}>
//             <p>{ngoData.about}</p>
//             <div className={styles.buttons}>
//               <button>Chat</button>
//               <button>Volunteer</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default NGOPage;

//nreww
// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import styles from './ngoPage.module.css'; // Adjust path as needed
// import DonateFoodNavbar from '../../components/DonateFoodNavbar';
// import BottomNavbar from '../../components/BottomNavbar';
// import Button from '../../components/Button';
// import { HiBadgeCheck } from 'react-icons/hi';

// const NGOPage = () => {
//   const { id } = useParams();
//   const [ngoData, setNGOData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchNGODetails = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         // Try to fetch specific NGO first
//         let response = await fetch(`http://localhost:9900/ngo/${id}`);
        
//         if (response.ok) {
//           const data = await response.json();
//           setNGOData(data);
//         } else {
//           // If specific NGO endpoint doesn't exist, fetch all NGOs and filter
//           response = await fetch('http://localhost:9900/ngos');
//           if (response.ok) {
//             const allNGOs = await response.json();
//             const foundNGO = allNGOs.find(ngo => ngo._id === id);
//             if (foundNGO) {
//               setNGOData(foundNGO);
//             } else {
//               setError('NGO not found');
//             }
//           } else {
//             throw new Error('Failed to fetch NGO data');
//           }
//         }
//       } catch (err) {
//         console.error('Error fetching NGO details:', err);
//         setError('Failed to load NGO details');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchNGODetails();
//     }
//   }, [id]);

//   // Loading state
//   if (loading) {
//     return (
//       <>
//         <DonateFoodNavbar link="/all" />
//         <BottomNavbar />
//         <div className={styles.error}>
//           <h2>Loading NGO details...</h2>
//         </div>
//       </>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <>
//         <DonateFoodNavbar link="/all" />
//         <BottomNavbar />
//         <div className={styles.error}>
//           <h2>Error</h2>
//           <p>{error}</p>
//           <button onClick={() => window.history.back()}>Go Back</button>
//         </div>
//       </>
//     );
//   }

//   // No NGO found
//   if (!ngoData) {
//     return (
//       <>
//         <DonateFoodNavbar link="/all" />
//         <BottomNavbar />
//         <div className={styles.error}>
//           <h2>NGO Not Found</h2>
//           <p>No NGO found with ID: {id}</p>
//           <button onClick={() => window.history.back()}>Go Back</button>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <DonateFoodNavbar link="/all" />
//       <BottomNavbar />
//       <div className={styles.main}>
//         <div className={styles.ngo_details}>
//           <div className={styles.image_section}>
//             <img src={ngoData.image || '/default-ngo-image.jpg'} alt={`${ngoData.NGOName} banner`} />
//             <div className={styles.title}>
//               <p>{ngoData.NGOName}</p>
//               <HiBadgeCheck className={styles.icon} />
//             </div>
//           </div>

//           <div className={styles.grid}>
//             <div className={styles.item}>
//               <p className={styles.detail}>{ngoData.reviews || 0}</p>
//               <p className={styles.para}>Reviews</p>
//             </div>
//             <div className={styles.item}>
//               <p className={styles.detail}>{ngoData.totalFeeds || 0}+</p>
//               <p className={styles.para}>Total Feeds</p>
//             </div>
//             <div className={styles.item}>
//               <p className={styles.detail}>{ngoData.totalCampaigns || 0}+</p>
//               <p className={styles.para}>Total Campaigns</p>
//             </div>
//             <div className={styles.item}>
//               <p className={styles.detail}>{ngoData.totalVolunteers || 0}+</p>
//               <p className={styles.para}>Total Volunteers</p>
//             </div>
//           </div>

//           <div className={styles.button}>
//             <Button text="Donate Now" link="/category" />
//           </div>
//         </div>

//         <div className={styles.about}>
//           <div className={styles.about_top}>
//             <p>About</p>
//             <p>Events</p>
//             <p>Reviews</p>
//           </div>

//           <div className={styles.about_bottom}>
//             <p>{ngoData.about || 'No description available.'}</p>
//             <div className={styles.buttons}>
//               <button>Chat</button>
//               <button>Volunteer</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default NGOPage;

//new22
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ngoPage.module.css'; // Adjust path as needed
import DonateFoodNavbar from '../../components/DonateFoodNavbar';
import BottomNavbar from '../../components/BottomNavbar';
import Button from '../../components/Button';
import { HiBadgeCheck } from 'react-icons/hi';

const NGOPage = () => {
  const { id } = useParams();
  const [ngoData, setNGOData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNGODetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to fetch specific NGO first
        let response = await fetch(`http://localhost:9900/ngo/${id}`);
        
        if (response.ok) {
          const data = await response.json();
          setNGOData(data);
        } else {
          // If specific NGO endpoint doesn't exist, fetch all NGOs and filter
          console.log('Individual NGO fetch failed, trying to fetch all NGOs...');
          response = await fetch('http://localhost:9900/ngos');
          
          if (response.ok) {
            const responseData = await response.json();
            
            // Debug: Log what we received
            console.log('Response from /ngos:', responseData);
            console.log('Type of response:', typeof responseData);
            console.log('Is array?', Array.isArray(responseData));
            
            // Handle different response formats
            let allNGOs;
            if (Array.isArray(responseData)) {
              allNGOs = responseData;
            } else if (responseData && Array.isArray(responseData.data)) {
              // If response is wrapped in an object like { data: [...] }
              allNGOs = responseData.data;
            } else if (responseData && Array.isArray(responseData.ngos)) {
              // If response is wrapped like { ngos: [...] }
              allNGOs = responseData.ngos;
            } else {
              console.error('Unexpected API response format:', responseData);
              throw new Error('Invalid data format received from API');
            }
            
            // Now safely use .find()
            const foundNGO = allNGOs.find(ngo => ngo._id === id);
            if (foundNGO) {
              setNGOData(foundNGO);
            } else {
              setError('NGO not found');
            }
          } else {
            throw new Error(`Failed to fetch NGO data: ${response.status} ${response.statusText}`);
          }
        }
      } catch (err) {
        console.error('Error fetching NGO details:', err);
        setError(`Failed to load NGO details: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNGODetails();
    }
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <>
        <DonateFoodNavbar link="/all" />
        <BottomNavbar />
        <div className={styles.error}>
          <h2>Loading NGO details...</h2>
        </div>
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <DonateFoodNavbar link="/all" />
        <BottomNavbar />
        <div className={styles.error}>
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => window.history.back()}>Go Back</button>
        </div>
      </>
    );
  }

  // No NGO found
  if (!ngoData) {
    return (
      <>
        <DonateFoodNavbar link="/all" />
        <BottomNavbar />
        <div className={styles.error}>
          <h2>NGO Not Found</h2>
          <p>No NGO found with ID: {id}</p>
          <button onClick={() => window.history.back()}>Go Back</button>
        </div>
      </>
    );
  }

  return (
    <>
      <DonateFoodNavbar link="/all" />
      <BottomNavbar />
      <div className={styles.main}>
        <div className={styles.ngo_details}>
          <div className={styles.image_section}>
            <img src={ngoData.image || '/default-ngo-image.jpg'} alt={`${ngoData.NGOName} banner`} />
            <div className={styles.title}>
              <p>{ngoData.NGOName}</p>
              <HiBadgeCheck className={styles.icon} />
            </div>
          </div>

          <div className={styles.grid}>
            <div className={styles.item}>
              <p className={styles.detail}>{ngoData.reviews || 0}</p>
              <p className={styles.para}>Reviews</p>
            </div>
            <div className={styles.item}>
              <p className={styles.detail}>{ngoData.totalFeeds || 0}+</p>
              <p className={styles.para}>Total Feeds</p>
            </div>
            <div className={styles.item}>
              <p className={styles.detail}>{ngoData.totalCampaigns || 0}+</p>
              <p className={styles.para}>Total Campaigns</p>
            </div>
            <div className={styles.item}>
              <p className={styles.detail}>{ngoData.totalVolunteers || 0}+</p>
              <p className={styles.para}>Total Volunteers</p>
            </div>
          </div>

          <div className={styles.button}>
            <Button text="Donate Now" link="/category" />
          </div>
        </div>

        <div className={styles.about}>
          <div className={styles.about_top}>
            <p>About</p>
            <p>Events</p>
            <p>Reviews</p>
          </div>

          <div className={styles.about_bottom}>
            <p>{ngoData.about || 'No description available.'}</p>
            <div className={styles.buttons}>
              <button>Chat</button>
              <button>Volunteer</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NGOPage;