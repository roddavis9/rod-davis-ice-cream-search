import React, {useEffect, useContext} from "react";
import axios from "axios";
import {AppContext} from '../../App';

import "./SearchResultsContainer.css";

const SearchResultsContainer = () => {
    const {
        currentLocation,
    } = useContext(AppContext);

    console.log('currentLocation', currentLocation);

    useEffect(() => {
        const getIceCreamShops = async (location) => {
            let yelpURL = `/v3/businesses/search`;

            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`
                },
                params : {
                    term: 'ice cream',
                    location: currentLocation
                }
            };

            await axios.get(yelpURL, options)
                .then((response) => {
                    console.log('response', response);
                })
                .catch((err) => {
                    console.log('error', err)
                })
        }

        getIceCreamShops(currentLocation);
    }, [currentLocation])

    return (
        <div className="results-container">
            <div className="searchSummaryBar">
                Reviews Recommend the Following Ice Cream Shops in&nbsp;&nbsp;--&nbsp;&nbsp;{currentLocation}
            </div>
            <div className="resultsAndDetailsContainer">
                <div className="resultsDetailsColumns">
                    <div className="resultsColumn">
                        results
                    </div>
                    <div className="detailsColumn">
                        <div className="detailsHeader">Full Business Details</div>
                        <div>details component here</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchResultsContainer
