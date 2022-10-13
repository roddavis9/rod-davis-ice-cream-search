import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import {AppContext} from '../../App';

import "./SearchResultsContainer.css";

const SearchResultsContainer = () => {
    const {
        currentLocation
    } = useContext(AppContext);

    console.log('currentLocation', currentLocation);

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

    useEffect(() => {
        getIceCreamShops(currentLocation);
    }, [])

    return (
        <div className="results-container">
            search results container
        </div>
    )
}

export default SearchResultsContainer
