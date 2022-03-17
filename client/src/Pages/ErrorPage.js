import React from "react";
import axios from "axios";

const test = () => {
    axios.post("http://localhost:3001/FindUserPaymentMethods", {
    }).then((response) => {
        console.log(response);
    })
};

function ErrorPage() {
    return <div>

    </div>;



}

export default ErrorPage;