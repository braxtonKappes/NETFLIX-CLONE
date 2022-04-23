import './Row.css';
import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import ErrorImg from '../../imgs/No-Image-Found.png'
import { useDispatch, useSelector } from 'react-redux';
import * as channelActions from '../../store/myChannels'

function Row({title, fetchUrl, isLargeRow}) {
    const dispatch = useDispatch();
    const [note, setNote] = useState('');
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
                        <button onClick={() => setNote(`${movie.name}, is a movie/show I need to watch!`).then(() => dispatch(channelActions.addChannel({profileId, note})))} className='add-movie-btn'>+</button>
                        <h3 className="add-to-movies-text">Add to notes?</h3>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default Row
