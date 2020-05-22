import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/Root";

// if (process.env.NODE_ENV !== "production") {
//   const config = {
//     rules: [
//       {
//         id: "color-contrast",
//         enabled: false,
//       },
//     ],
//   };
// }

if (document.getElementById("root")) {
  ReactDOM.render(<Root />, document.getElementById("root"));
}
