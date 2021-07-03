import React from "react";
import ReactDOM from "react-dom";

import(/* webpackChunkName: "app" */ "./app/App")
.then(({ App }) => {
    ReactDOM.render(
        <App />, 
    document.getElementById("root"))
});





