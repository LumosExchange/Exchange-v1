import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, browserRouter } from "react-router-dom";
import Axios from "axios";

function Feedback() {
  const [userFeedback, setUserFeedback] = useState([]);
  const { state } = useLocation();
  const { id, sellerID } = state;
  const navigate = useNavigate();

 

  //Create lookup for seller Feedback
  useEffect(() => {
    Axios.get("http://localhost:3001/getUserFeedback", {
      params: {
        sellerID: state.sellerID,
      },
    }).then((response) => {
      setUserFeedback(response.data);
      document.getElementById("sellerName").innerHTML = state.sellerFirst + " " + state.sellerLast;
 
    });
  }, []);


 


  return (
    <div className="feedback">
      <div className="sellerFeedback">
        <h1>Seller: </h1>
        <h2 id="sellerName"></h2>
        <h1> Average Rating</h1>
        <h2 id="sellerRating"></h2>
        <h1>Average Speed:</h1>
        <h2 is="sellerSpeed"></h2>
      </div>

      <div className="feedbackTable">
        <div>
          <table id="myTable" border="1">
            <thead>
              <tr>
                <th>FeedbackID</th>
                <th>Feedback</th>
                <th>Rating</th>
                <th>Speed</th>
              </tr>
            </thead>

            {userFeedback.map((val) => {
              return (
                <tbody key={val.feedbackID}>
                  <tr>
                    <td>{val.feedbackID}</td>
                    <td>{val.Feedback}</td>
                    <td>{val.Rating}</td>
                    <td>{val.speed}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
      <button>
          Go back
      </button>
    </div>
  );
}

export default Feedback;
