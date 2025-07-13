// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import BottomNavbar from "../../components/BottomNavbar";
// import DonateFoodNavbar from "../../components/DonateFoodNavbar";
// import NGOCard from "../../components/NGOCard";

// const AllNGOS = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const controller = new AbortController();
//     const signal = controller.signal;
//     let isMounted = true;

//     const fetchNGOs = async () => {
//       try {
//         const response = await fetch("http://localhost:9900/all", {
//           method: "GET",
//           credentials: "include",
//           signal,
//         });

//         if (!response.ok) throw new Error("Failed to fetch NGOs");

//         const ngos = await response.json();

//         if (!Array.isArray(ngos)) throw new Error("Invalid NGO data format");

//         if (isMounted) {
//           setData(ngos);
//           setLoading(false);
//         }
//       } catch (error) {
//         if (isMounted) {
//           console.error("Error fetching NGOs:", error.message);
//           setLoading(false);
//         }
//       }
//     };

//     fetchNGOs();

//     return () => {
//       isMounted = false;
//       controller.abort();
//     };
//   }, []);

//   if (loading) {
//     return <div>Loading NGOs...</div>;
//   }

//   return (
//     <>
//       <BottomNavbar />
//       <DonateFoodNavbar backLink="/" />
//       <div className="main">
//         <h2 className="headline">Choose where you want to donate</h2>

//         {data.length > 0 ? (
//           data.map((el) =>
//             el?._id ? (
//               <Link
//                 key={el._id}
//                 to={`/all/${el._id}`}
//                 style={{ textDecoration: "none", color: "inherit" }}
//               >
//                 <NGOCard data={el} />
//               </Link>
//             ) : (
//               <NGOCard key={el.NGOName || Math.random()} data={el} />
//             )
//           )
//         ) : (
//           <p>No NGOs found.</p>
//         )}
//       </div>

//       <style>
//         {`
//           .main {
//             background-color: white;
//             height: 100%;
//             padding: 22px;
//             margin: 54px 0;
//           }

//           .headline {
//             font-weight: 600;
//             font-size: 18px;
//             line-height: 27px;
//             text-align: center;
//             margin-bottom: 22px;
//           }
//         `}
//       </style>
//     </>
//   );
// };

// export default AllNGOS;

//new 
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BottomNavbar from "../../components/BottomNavbar";
import DonateFoodNavbar from "../../components/DonateFoodNavbar";
import NGOCard from "../../components/NGOCard";

const AllNGOS = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    let isMounted = true;

    const fetchNGOs = async () => {
      try {
        const response = await fetch("http://localhost:9900/all", {
          method: "GET",
          credentials: "include",
          signal,
        });

        if (!response.ok) throw new Error("Failed to fetch NGOs");

        const ngos = await response.json();

        if (!Array.isArray(ngos)) throw new Error("Invalid NGO data format");

        if (isMounted) {
          setData(ngos);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching NGOs:", error.message);
          setLoading(false);
        }
      }
    };

    fetchNGOs();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  if (loading) return <div>Loading NGOs...</div>;

  return (
    <>
      <BottomNavbar />
      <DonateFoodNavbar backLink="/" />
      <div className="main">
        <h2 className="headline">Choose where you want to donate</h2>

        {data.length > 0 ? (
          data.map((el) =>
            el?._id ? (
              <Link
                key={el._id}
                to={`/all/${el._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <NGOCard data={el} />
              </Link>
            ) : (
              <NGOCard key={el.NGOName || Math.random()} data={el} />
            )
          )
        ) : (
          <p>No NGOs found.</p>
        )}
      </div>

      <style>
        {`
          .main {
            background-color: white;
            min-height: 100vh;
            padding: 22px;
            margin: 54px 0;
          }

          .headline {
            font-weight: 600;
            font-size: 18px;
            line-height: 27px;
            text-align: center;
            margin-bottom: 22px;
          }
        `}
      </style>
    </>
  );
};

export default AllNGOS;
