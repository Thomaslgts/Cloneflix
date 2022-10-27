import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getFilter } from "../../API/getFilterMovie";
import { getFilterTV } from "../../API/getFilterTv";
import { getDiscoverMovie } from "../../store/film/discoverSlice";
import { getDiscoverTV } from "../../store/serie/discoverSlice";
import './discover.css';

function Discover() {
    const dispatch = useDispatch();
    const { discoverFilm } = useSelector((state) => state);
    const { discoverTV } = useSelector((state) => state);
    const { genreMovie } = useSelector((state) => state)
    const { genreTv } = useSelector((state) => state)
    const imgUrl = "https://image.tmdb.org/t/p/w500";
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState([]);

    useEffect(() => {
        dispatch(getDiscoverMovie());
        dispatch(getDiscoverTV());
        dispatch(getFilter());
        dispatch(getFilterTV());
    }, [])

    useEffect(() => {
        if (discoverFilm.isSuccess && discoverTV.isSuccess && data.length <= 0) {
            let array = [].concat(discoverFilm.data.results, discoverTV.data.results)
            setData(array)
        }
        if (genreMovie.isSuccess && genreTv.isSuccess && filter.length <= 0) {
            let filter = [].concat(genreTv.data.genres, genreMovie.data.genres)
            setFilter(filter)
        }
    }, [discoverFilm, discoverTV])

    useEffect(() => {
        console.log(data)
    }, [data])

    //Configuration des checkbox Filtre
    async function handleClick(e) {
        if (e.target.value === "film") {
            const results = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
                params: {
                    api_key: process.env.REACT_APP_API_KEY,
                    page: 40
                }
            })
            setData(results.data.results)
            setFilter(genreMovie.data.genres)
        } else if (e.target.value === "tv") {
            const results = await axios.get(`https://api.themoviedb.org/3/discover/tv`, {
                params: {
                    api_key: process.env.REACT_APP_API_KEY,
                    page: 40
                }
            })
            setData(results.data.results)
            setFilter(genreTv.data.genres)
        } else {
            setData(data)
        }
    }
    function handleGenre(e) {

    }

    return (
        <div className="discoverContainer">
            <div className="mainFilterBox">
                <button value="film" onClick={handleClick}>Film</button>
                <button value="tv" onClick={handleClick}>Série</button>
                <div className="FilterBox">
                    {filter.map((e, i) => {
                        return (
                            <button key={i} onClick={handleGenre} id={e.id}>{e.name}</button>
                        )
                    })}
                </div>
            </div>
            <div className="DiscoverFilm">
                {data.map((e, i) => {
                    return (
                        <div key={i} className="DiscoverCard">
                            <h2>{e.title} {e.name}</h2>
                            <img src={imgUrl + e.poster_path} alt="Movie Poster" />
                        </div>
                    )
                })}
            </div>
        </div >
    )
}

export default Discover