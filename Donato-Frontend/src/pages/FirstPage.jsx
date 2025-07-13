// const FirstPage = () => {
//   return (
//     <>
//       <div className="wrapper">
//         <img className="logo" src="/images/logo.jpg" alt="" />
//       </div>

//       <style jsx>
//         {`
//           .wrapper {
//             background-color:rgb(16, 14, 13);
//             height: 100vh;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//           }

//           .logo {
//             width: 230px;
//             height: 75px;
//           }
//         `}
//       </style>
//     </>
//   );
// };

// export default FirstPage;

const FirstPage = () => {
  return (
    <>
      <div className="wrapper">
        <img className="logo" src="/images/logo.jpg" alt="Donato Logo" />
      </div>

      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body, html {
            margin: 0 !important;
            padding: 0 !important;
            height: 100%;
            width: 100%;
            overflow: hidden;
          }

          .wrapper {
            background-color: rgb(16, 14, 13);
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            position: fixed;
            top: 0;
            left: 0;
            margin: 0;
            padding: 0;
          }

          .logo {
            width: 100vw;
            height: 100vh;
            object-fit: cover;
            object-position: center;
          }

          /* Alternative: If you want to maintain aspect ratio and fit completely */
          /* 
          .logo {
            max-width: 100vw;
            max-height: 100vh;
            width: auto;
            height: auto;
            object-fit: contain;
          }
          */
        `}
      </style>
    </>
  );
};

export default FirstPage;