import React, {useState, useEffect} from "react";
import axios from "axios";

import "./SearchResultDetails.css";

const SearchResultDetails = (props) => {
    const [fullDetails, setFullDetails] = useState([]);

    useEffect(() => {
        const getFullBusinessDetails = async (businessId) => {
            let yelpURL = `/v3/businesses/${businessId}/reviews`;

            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`
                },
                params : {
                    limit: 5
                }
            };

            await axios.get(yelpURL, options)
                .then((response) => {
                    console.log('response', response);
                    setFullDetails(response.data.reviews)
                })
                .catch((err) => {
                    console.log('error', err)
                })
        }

        getFullBusinessDetails(props.showDetailsId);
    }, [props.showDetailsId])


    return (
            <div className="detailsContainer">
                {fullDetails.map((review) => (
                    <>
                        <div className="reviewRow">
                            {review.text}
                        </div>
                        <div className="authorRow">
                            {review.user.name}
                        </div>

                    </>
                ))}
            </div>
    )
}

export default SearchResultDetails
