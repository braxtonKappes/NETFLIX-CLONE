import './Row.css';
import React, { useEffect, useState } from 'react';
import axios from '../../axios';

function Row({title, fetchUrl, isLargeRow}) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [movies, setMovies] = useState([]);

    const baseURL = "https://image.tmdb.org/t/p/original/"

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results)
            setIsLoaded(true)
        }
        fetchData();
    }, [fetchUrl])


    console.log(movies[1])

    return isLoaded && (
        <div className='row'>
            <h2 className="row-title">{ title }</h2>
            <div className="row-posters">
                {movies.map(movie => (
                <>
                    <img
                        key={movie.id} className={`row-poster ${isLargeRow && "row-posterLarge"}`}
                        src={`${baseURL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                    />
                    <div className="add-to-channel" />
                </>
                ))}
            </div>
            {/* container -> posters */}
        </div>
    )
}

export default Row
