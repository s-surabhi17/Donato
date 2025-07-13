// import styles from "./homePage.module.css";
// import { BiSearch } from "react-icons/bi";
// import { RiArrowRightSLine } from "react-icons/ri";

// import NGOCard from "../../components/NGOCard";
// import BottomNavbar from "../../components/BottomNavbar";

// import { Link } from "react-router-dom";

// const campaignImages = [
//   "https://thumbs.dreamstime.com/z/meal-food-donation-app-smartphone-volunteering-charity-concept-covid-solidarity-response-181880570.jpg",
//   //"https://media.istockphoto.com/vectors/food-donation-and-charity-vector-id1224414210?k=20&m=1224414210&s=612x612&w=0&h=FhZYeea62Eh_7OM74djnSdkRBSq0kpeloV3SnyTiSpE=",
//   "https://i.pinimg.com/originals/5d/83/88/5d8388343a60c402a84a687e8ad44eae.jpg",
//   "https://www.wfp.org/sites/default/files/images/news/StopTheWaste%20Press%20Release%20Image.png",
//   "https://previews.123rf.com/images/arrow/arrow1712/arrow171200010/91915955-food-drive-donation-give-today-campaign.jpg",
//   "https://c8.alamy.com/comp/2BM08C6/meal-and-food-donation-app-on-a-smartphone-volunteering-and-charity-concept-2BM08C6.jpg",
// ];

// const HomePage = (props) => {
//   const { data } = props;

//   return (
//     <>
//       <BottomNavbar />
//       <div className={styles.main}>
//         <div className={styles.main_top}>
//           <div className={styles.search_input}>
//             <BiSearch className={styles.search_icon} />
//             <input
//               className={styles.input}
//               type="text"
//               placeholder="Search for NGO or campaign"
//             />
//           </div>
//         </div>

//         <div className={styles.volunteer_images}>
//           <div className={styles.top}>
//             <h3>Volunteer Required</h3>
//             <Link to="/all">
//               <div className={styles.see_all}>
//                 <p>See all</p>
//                 <RiArrowRightSLine className={styles.search_icon} />
//               </div>
//             </Link>
//           </div>
//           <div className={styles.round_images}>
//             {data.map((el) => {
//               return (
//                 <Link to={`/all/${el.id}`}>
//                   <img
//                     key={el.reviews}
//                     className={styles.round_image}
//                     src={el.image}
//                     alt=""
//                   />
//                 </Link>
//         import      );
//             })}
//           </div>
//         </div>
//         <div className={styles.food_required_section}>
//           <div className={styles.food_required_top}>
//             <h3>Food Required</h3>
//             <Link to="/all">
//               <div className={styles.see_all}>
//                 <p>See all</p>
//                 <RiArrowRightSLine className={styles.search_icon} />
//               </div>
//             </Link>
//           </div>
//           <Link to="all/0">
//             <NGOCard data={data[0]} />
//           </Link>
//           <Link to="all/2">
//             <NGOCard data={data[2]} />
//           </Link>
//           <Link to="all/7">
//             <NGOCard data={data[7]} />
//           </Link>
//         </div>
//         <div className={styles.upcoming_campaigns}>
//           <div className={styles.top}>
//             <h3>Upcoming Campaigns</h3>
//             <div className={styles.see_all}>
//               <p>See all</p>
//               <RiArrowRightSLine className={styles.search_icon} />
//             </div>
//           </div>
//           <div className={styles.round_images}>
//             {campaignImages.map((el) => {
//               return (
//                 <img
//                   key={el}
//                   className={styles.campaign_image}
//                   src={el}
//                   alt="campaign_img"
//                 />
//               );
//             })}
//           </div>
//         </div>

//         <div className={styles.food_required_section}>
//           <div className={styles.food_required_top}>
//             <h3>Nearby NGO</h3>
//             <div className={styles.see_all}>
//               <p>See all</p>
//               <RiArrowRightSLine className={styles.search_icon} />
//             </div>
//           </div>
//           <div className={styles.nearby_images}>
//             <Link to="all/0">
//               <img className={styles.nearby_image} src={data[0].image} alt="Nothing" />
//             </Link>
//             <Link to="all/1">
//               <img className={styles.nearby_image} src={data[1].image} alt="Nothing" />
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default HomePage;

//new

// //neewww
// import { useEffect, useState } from "react";
// import styles from "./homePage.module.css";
// import { BiSearch } from "react-icons/bi";
// import { RiArrowRightSLine } from "react-icons/ri";
// import { Link } from "react-router-dom";

// import NGOCard from "../../components/NGOCard";
// import BottomNavbar from "../../components/BottomNavbar";

// const campaignImages = [
//   "https://thumbs.dreamstime.com/z/meal-food-donation-app-smartphone-volunteering-charity-concept-covid-solidarity-response-181880570.jpg",
//   "https://media.istockphoto.com/vectors/food-donation-and-charity-vector-id1224414210",
//   "https://i.pinimg.com/originals/5d/83/88/5d8388343a60c402a84a687e8ad44eae.jpg",
//   "https://www.wfp.org/sites/default/files/images/news/StopTheWaste%20Press%20Release%20Image.png",
//   "https://previews.123rf.com/images/arrow/arrow1712/arrow171200010/91915955-food-drive-donation-give-today-campaign.jpg",
//   "https://c8.alamy.com/comp/2BM08C6/meal-and-food-donation-app-on-a-smartphone-volunteering-and-charity-concept-2BM08C6.jpg",
// ];

// const HomePage = () => {
//   const [ngos, setNgos] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let isMounted = true;

//     const API = process.env.REACT_APP_BACKEND_URL || "http://localhost:9900";
//     console.log("📡 Fetching from:", API);

//     fetch(`${API}/home-data`, {
//       credentials: "include",
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Unauthorized or fetch failed");
//         return res.json();
//       })
//       .then((data) => {
//         if (isMounted && data.success) {
//           setNgos(data.ngos);
//         }
//         if (isMounted) setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Fetch error:", err);
//         if (isMounted) setLoading(false);
//       });

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   const volunteerRequired = ngos.filter((ngo) => ngo.volunteerRequired);
//   const foodRequired = ngos.filter((ngo) => ngo.foodRequired);
//   const nearby = ngos.slice(0, 2); // Placeholder logic

//   const renderSection = (title, items, renderFn, path = "/all") => (
//     <div className={styles.food_required_section}>
//       <div className={styles.food_required_top}>
//         <h3>{title}</h3>
//         <Link to={path}>
//           <div className={styles.see_all}>
//             <p>See all</p>
//             <RiArrowRightSLine className={styles.search_icon} />
//           </div>
//         </Link>
//       </div>
//       {items.length > 0 ? items.map(renderFn) : <p>No data available</p>}
//     </div>
//   );

//   if (loading) {
//     return (
//       <>
//         <BottomNavbar />
//         <div className={styles.main}>
//           <div className={styles.main_top}>
//             <div className={styles.search_input}>
//               <BiSearch className={styles.search_icon} />
//               <input
//                 className={styles.input}
//                 type="text"
//                 placeholder="Search for NGO or campaign"
//               />
//             </div>
//           </div>
//           <div style={{ textAlign: "center", padding: "50px" }}>
//             <h3>Loading...</h3>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <BottomNavbar />
//       <div className={styles.main}>
//         {/* Search bar */}
//         <div className={styles.main_top}>
//           <div className={styles.search_input}>
//             <BiSearch className={styles.search_icon} />
//             <input
//               className={styles.input}
//               type="text"
//               placeholder="Search for NGO or campaign"
//             />
//           </div>
//         </div>

//         {/* Volunteer Required */}
//         <div className={styles.volunteer_images}>
//           <div className={styles.top}>
//             <h3>Volunteer Required</h3>
//             <Link to="/all">
//               <div className={styles.see_all}>
//                 <p>See all</p>
//                 <RiArrowRightSLine className={styles.search_icon} />
//               </div>
//             </Link>
//           </div>
//           <div className={styles.round_images}>
//             {volunteerRequired.map((ngo) => (
//               <Link key={ngo._id} to={`/all/${ngo._id}`}>
//                 <img
//                   className={styles.round_image}
//                   src={ngo.image || "/default-placeholder.png"}
//                   alt={ngo.NGOName}
//                 />
//               </Link>
//             ))}
//           </div>
//         </div>

//         {/* Food Required Section */}
//         {renderSection("Food Required", foodRequired.slice(0, 3), (ngo) => (
//           <Link key={ngo._id} to={`/all/${ngo._id}`}>
//             <NGOCard data={ngo} />
//           </Link>
//         ))}

//         {/* Campaigns */}
//         <div className={styles.upcoming_campaigns}>
//           <div className={styles.top}>
//             <h3>Upcoming Campaigns</h3>
//             <div className={styles.see_all}>
//               <p>See all</p>
//               <RiArrowRightSLine className={styles.search_icon} />
//             </div>
//           </div>
//           <div className={styles.round_images}>
//             {campaignImages.map((img, index) => (
//               <img
//                 key={index}
//                 className={styles.campaign_image}
//                 src={img}
//                 alt={`Campaign ${index + 1}`}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Nearby NGOs */}
//         {renderSection("Nearby NGO", nearby, (ngo) => (
//           <Link key={ngo._id} to={`/all/${ngo._id}`}>
//             <img
//               className={styles.nearby_image}
//               src={ngo.image || "/default-placeholder.png"}
//               alt={ngo.NGOName}
//             />
//           </Link>
//         ))}
//       </div>
//     </>
//   );
// };

// export default HomePage;

//neww22
// import { useEffect, useState } from "react";
// import styles from "./homePage.module.css";
// import { BiSearch } from "react-icons/bi";
// import { RiArrowRightSLine } from "react-icons/ri";
// import { Link } from "react-router-dom";

// import NGOCard from "../../components/NGOCard";
// import BottomNavbar from "../../components/BottomNavbar";

// const campaignImages = [
//   "https://thumbs.dreamstime.com/z/meal-food-donation-app-smartphone-volunteering-charity-concept-covid-solidarity-response-181880570.jpg",
//   "https://media.istockphoto.com/vectors/food-donation-and-charity-vector-id1224414210",
//   "https://i.pinimg.com/originals/5d/83/88/5d8388343a60c402a84a687e8ad44eae.jpg",
//   "https://www.wfp.org/sites/default/files/images/news/StopTheWaste%20Press%20Release%20Image.png",
//   "https://previews.123rf.com/images/arrow/arrow1712/arrow171200010/91915955-food-drive-donation-give-today-campaign.jpg",
//   "https://c8.alamy.com/comp/2BM08C6/meal-and-food-donation-app-on-a-smartphone-volunteering-and-charity-concept-2BM08C6.jpg",
// ];

// const HomePage = () => {
//   const [ngos, setNgos] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let isMounted = true;

//     const API = process.env.REACT_APP_BACKEND_URL || "http://localhost:9900";
//     console.log("📡 Fetching from:", API);

//     fetch(`${API}/home-data`, {
//       credentials: "include",
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Unauthorized or fetch failed");
//         return res.json();
//       })
//       .then((data) => {
//         if (isMounted && data.success) {
//           setNgos(data.ngos);
//         }
//         if (isMounted) setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Fetch error:", err);
//         if (isMounted) setLoading(false);
//       });

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   const volunteerRequired = ngos.filter((ngo) => ngo.volunteerRequired);
//   const foodRequired = ngos.filter((ngo) => ngo.foodRequired);
//   const nearby = ngos.slice(0, 2); // Placeholder logic

//   const renderSection = (title, items, renderFn, path = "/all") => (
//     <div className={styles.food_required_section}>
//       <div className={styles.food_required_top}>
//         <h3>{title}</h3>
//         <Link to={path}>
//           <div className={styles.see_all}>
//             <p>See all</p>
//             <RiArrowRightSLine className={styles.search_icon} />
//           </div>
//         </Link>
//       </div>
//       {items.length > 0 ? items.map(renderFn) : <p>No data available</p>}
//     </div>
//   );

//   if (loading) {
//     return (
//       <>
//         <BottomNavbar />
//         <div className={styles.main}>
//           <div className={styles.main_top}>
//             <div className={styles.search_input}>
//               <BiSearch className={styles.search_icon} />
//               <input
//                 className={styles.input}
//                 type="text"
//                 placeholder="Search for NGO or campaign"
//               />
//             </div>
//           </div>
//           <div style={{ textAlign: "center", padding: "50px" }}>
//             <h3>Loading...</h3>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <BottomNavbar />
//       <div className={styles.main}>
//         {/* Search bar */}
//         <div className={styles.main_top}>
//           <div className={styles.search_input}>
//             <BiSearch className={styles.search_icon} />
//             <input
//               className={styles.input}
//               type="text"
//               placeholder="Search for NGO or campaign"
//             />
//           </div>
//         </div>

//         {/* Volunteer Required */}
//         <div className={styles.volunteer_images}>
//           <div className={styles.top}>
//             <h3>Volunteer Required</h3>
//             <Link to="/all">
//               <div className={styles.see_all}>
//                 <p>See all</p>
//                 <RiArrowRightSLine className={styles.search_icon} />
//               </div>
//             </Link>
//           </div>
//           <div className={styles.round_images}>
//             {volunteerRequired.map((ngo) =>
//               ngo?._id ? (
//                 <Link key={ngo._id} to={`/all/${ngo._id}`}>
//                   <img
//                     className={styles.round_image}
//                     src={ngo.image || "/default-placeholder.png"}
//                     alt={ngo.NGOName || "NGO"}
//                   />
//                 </Link>
//               ) : null
//             )}
//           </div>
//         </div>

//         {/* Food Required Section */}
//         {renderSection("Food Required", foodRequired.slice(0, 3), (ngo) =>
//           ngo?._id ? (
//             <Link key={ngo._id} to={`/all/${ngo._id}`}>
//               <NGOCard data={ngo} />
//             </Link>
//           ) : null
//         )}

//         {/* Campaigns */}
//         <div className={styles.upcoming_campaigns}>
//           <div className={styles.top}>
//             <h3>Upcoming Campaigns</h3>
//             <div className={styles.see_all}>
//               <p>See all</p>
//               <RiArrowRightSLine className={styles.search_icon} />
//             </div>
//           </div>
//           <div className={styles.round_images}>
//             {campaignImages.map((img, index) => (
//               <img
//                 key={index}
//                 className={styles.campaign_image}
//                 src={img}
//                 alt={`Campaign ${index + 1}`}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Nearby NGOs */}
//         {renderSection("Nearby NGO", nearby, (ngo) =>
//           ngo?._id ? (
//             <Link key={ngo._id} to={`/all/${ngo._id}`}>
//               <img
//                 className={styles.nearby_image}
//                 src={ngo.image || "/default-placeholder.png"}
//                 alt={ngo.NGOName || "NGO"}
//               />
//             </Link>
//           ) : null
//         )}
//       </div>
//     </>
//   );
// };

// export default HomePage;

//new 66
import { useEffect, useState } from "react";
import styles from "./homePage.module.css";
import { BiSearch } from "react-icons/bi";
import { RiArrowRightSLine } from "react-icons/ri";
import { Link } from "react-router-dom";

import NGOCard from "../../components/NGOCard";
import BottomNavbar from "../../components/BottomNavbar";

const campaignImages = [
  "https://thumbs.dreamstime.com/z/meal-food-donation-app-smartphone-volunteering-charity-concept-covid-solidarity-response-181880570.jpg",
  "https://media.istockphoto.com/vectors/food-donation-and-charity-vector-id1224414210",
  "https://i.pinimg.com/originals/5d/83/88/5d8388343a60c402a84a687e8ad44eae.jpg",
  "https://www.wfp.org/sites/default/files/images/news/StopTheWaste%20Press%20Release%20Image.png",
  "https://previews.123rf.com/images/arrow/arrow1712/arrow171200010/91915955-food-drive-donation-give-today-campaign.jpg",
  "https://c8.alamy.com/comp/2BM08C6/meal-and-food-donation-app-on-a-smartphone-volunteering-and-charity-concept-2BM08C6.jpg",
];

const HomePage = () => {
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const API = process.env.REACT_APP_BACKEND_URL || "http://localhost:9900";

    fetch(`${API}/home-data`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized or fetch failed");
        return res.json();
      })
      .then((data) => {
        if (isMounted && data.success) {
          setNgos(data.ngos);
        }
        if (isMounted) setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const volunteerRequired = ngos.filter((ngo) => ngo.volunteerRequired);
  const foodRequired = ngos.filter((ngo) => ngo.foodRequired);
  const nearby = ngos.slice(0, 2);

  const safeLink = (id, element) =>
    id ? (
      <Link key={id} to={`/all/${id}`}>
        {element}
      </Link>
    ) : (
      element
    );

  const renderSection = (title, items, renderFn, path = "/all") => (
    <div className={styles.food_required_section}>
      <div className={styles.food_required_top}>
        <h3>{title}</h3>
        <Link to={path}>
          <div className={styles.see_all}>
            <p>See all</p>
            <RiArrowRightSLine className={styles.search_icon} />
          </div>
        </Link>
      </div>
      {items.length > 0 ? items.map(renderFn) : <p>No data available</p>}
    </div>
  );

  if (loading) {
    return (
      <>
        <BottomNavbar />
        <div className={styles.main}>
          <div className={styles.main_top}>
            <div className={styles.search_input}>
              <BiSearch className={styles.search_icon} />
              <input
                className={styles.input}
                type="text"
                placeholder="Search for NGO or campaign"
              />
            </div>
          </div>
          <div style={{ textAlign: "center", padding: "50px" }}>
            <h3>Loading...</h3>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <BottomNavbar />
      <div className={styles.main}>
        {/* Search bar */}
        <div className={styles.main_top}>
          <div className={styles.search_input}>
            <BiSearch className={styles.search_icon} />
            <input
              className={styles.input}
              type="text"
              placeholder="Search for NGO or campaign"
            />
          </div>
        </div>

        {/* Volunteer Required */}
        <div className={styles.volunteer_images}>
          <div className={styles.top}>
            <h3>Volunteer Required</h3>
            <Link to="/all">
              <div className={styles.see_all}>
                <p>See all</p>
                <RiArrowRightSLine className={styles.search_icon} />
              </div>
            </Link>
          </div>
          <div className={styles.round_images}>
            {volunteerRequired.map((ngo) =>
              safeLink(
                ngo?._id,
                <img
                  className={styles.round_image}
                  src={ngo.image || "/default-placeholder.png"}
                  alt={ngo.NGOName || "NGO"}
                />
              )
            )}
          </div>
        </div>

        {/* Food Required */}
        {renderSection(
          "Food Required",
          foodRequired.slice(0, 3),
          (ngo) =>
            safeLink(ngo?._id, <NGOCard key={ngo._id || ngo.NGOName} data={ngo} />)
        )}

        {/* Campaigns */}
        <div className={styles.upcoming_campaigns}>
          <div className={styles.top}>
            <h3>Upcoming Campaigns</h3>
            <div className={styles.see_all}>
              <p>See all</p>
              <RiArrowRightSLine className={styles.search_icon} />
            </div>
          </div>
          <div className={styles.round_images}>
            {campaignImages.map((img, index) => (
              <img
                key={index}
                className={styles.campaign_image}
                src={img}
                alt={`Campaign ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Nearby NGOs */}
        {renderSection(
          "Nearby NGO",
          nearby,
          (ngo) =>
            safeLink(ngo?._id, (
              <img
                key={ngo._id || ngo.NGOName}
                className={styles.nearby_image}
                src={ngo.image || "/default-placeholder.png"}
                alt={ngo.NGOName || "NGO"}
              />
            ))
        )}
      </div>
    </>
  );
};

export default HomePage;
