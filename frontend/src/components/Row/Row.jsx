import './Row.css';
import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import ErrorImg from '../../imgs/No-Image-Found.png'
import { useDispatch, useSelector } from 'react-redux';
import * as channelActions from '../../store/myChannels'
import { Link } from 'react-router-dom';

function Row({title, fetchUrl, isLargeRow}) {
    const dispatch = useDispatch();
    // const [showCheckMark, setShowCheckMark] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false)
    const [movies, setMovies] = useState([]);
    const profiles = useSelector(state => state.profiles)
    const profileId = profiles.currentProfile.id


    const baseURL = "https://image.tmdb.org/t/p/original/"

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results)
            setIsLoaded(true)
        }
        fetchData();
    }, [fetchUrl])

    return isLoaded && (
        <div className='row'>
            <h2 className="row-title">{ title }</h2>
            <div className="row-posters">
                {movies.map(movie => (
                <div className={`row-poster-container ${isLargeRow && "row-posterLarge"}`} key={movie.id}>
                    <img
                        className={`row-poster ${isLargeRow && "row-posterLarge"}`}
                        src={`${baseURL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                        // eslint-disable-next-line
                        onError={(e) => (e.target.onerror = null, e.target.src=ErrorImg)}
                    />
                    <div className="hidden-div">
                        {/* {(
                            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                                <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                            </svg>
                        )} */}
                        {/* {(
                            <button onClick={() => dispatch(channelActions.addChannel({profileId: profileId, name: `${movie.name}, is a movie/show I need to watch!`}))} className='add-movie-btn'>+</button>
                        )} */}
                        <Link className="add-to-movies-text" to={`/mynotes/${profileId}`} onClick={() => dispatch(channelActions.addChannel({profileId: profileId, name: `I need to watch ${movie.name}!`}))} >Add to notes?</Link>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default Row
