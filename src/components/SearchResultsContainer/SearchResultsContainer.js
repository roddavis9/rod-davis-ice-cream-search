import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import SearchResultDetails from '../SearchResultDetails/SearchResultDetails';
import {AppContext} from '../../App';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import "./SearchResultsContainer.css";

const SearchResultsContainer = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [showDetailsId, setShowDetailsId] = useState('');

    const {
        currentLocation,
    } = useContext(AppContext);

    console.log('currentLocation', currentLocation);

    const handleShowDetailsClick = (businessId) => {
        console.log('businessId', businessId);
        setShowDetails(true);
        setShowDetailsId(businessId);
    }

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
                    location: currentLocation,
                    limit: 5
                }
            };

            await axios.get(yelpURL, options)
                .then((response) => {
                    console.log('response', response.data.businesses);
                    setSearchResults(response.data.businesses);
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
                Customer Reviews Recommend the Following Ice Cream Shops in&nbsp;&nbsp;--&nbsp;&nbsp;{currentLocation}
            </div>
            <div className="resultsAndDetailsContainer">
                <div className="resultsDetailsColumns">
                    <div className="resultsColumn">
                        {searchResults.map((business) => (
                            <div key={business.id} >
                                <Card sx={{ maxWidth: 700 }} variant="outlined">
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {business.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {business.location.address1}<br />
                                            {business.location.city}, {business.location.state}. {business.location.zip_code}<br />
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={() => handleShowDetailsClick(business.id)}>View Reviews</Button>
                                    </CardActions>
                                </Card>
                                <div>&nbsp;</div>
                            </div>
                        ))}
                    </div>
                    <div className="detailsColumn">
                        <div className="detailsHeader">Recent Customer Reviews</div>
                        {showDetails && (
                            <SearchResultDetails showDetailsId={showDetailsId} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchResultsContainer
