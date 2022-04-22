import './Banner.css';
import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import requests from '../../requests';
import { Link } from 'react-router-dom';

function Banner({currentProfileId}) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]);
            setIsLoaded(true)
        }
        fetchData();
    }, [])

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return isLoaded && (
        <header className='banner'
        style={{
            backgroundSize: "cover",
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        }}
        >
            <div className="banner-wrapper">
                <h1 className="banner-title">{movie?.title || movie?.name || movie?.original_name}</h1>
                <div className="banner-buttons">
                    {/* <button className="banner-button">Play</button> */}
                    <Link to={`/mychannels/${currentProfileId}`} className="banner-button">My Notes</Link>
                </div>
                <h1 className="banner-description">
                    {truncate(movie?.overview, 150)}
                </h1>
            </div>
            <div className="banner-fadeBottom" />
        </header>
    )
}

export default Banner
