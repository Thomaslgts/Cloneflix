import React, { useEffect, useState } from "react";
import './listSerie.css'
import { useDispatch, useSelector } from "react-redux";
import { getDiscoverTV } from "../../store/serie/discoverSlice";
import { getFilterTV } from "../../API/getFilterTv";
import axios from "axios";

function ListSerie() {
    const dispatch = useDispatch();
    const { discoverTV } = useSelector((state) => state)
    const { genreTv } = useSelector((state) => state);
    const [stateDiscoverTV, setDiscoverTV] = useState([]);
    const imgUrl = "https://image.tmdb.org/t/p/w500";

    //Variables pour les filtres
    const [activeGenre, setActiveGenre] = useState(0);
    const [stateActiveFilter, setActiveFilter] = useState([]);
    const [filter, setFilter] = useState([]);

    // Dispatch Movie et Serie
    useEffect(() => {
        dispatch(getDiscoverTV())
        dispatch(getFilterTV())
    }, []);

    // On vérifie que les données de l'API on été transmise
    useEffect(() => {
        if (discoverTV.isSuccess) {
            setDiscoverTV(discoverTV.data.results)
            setFilter(discoverTV.data.results)
        }
    }, [discoverTV])

    useEffect(() => {
        if (genreTv.isSuccess) {
            setActiveFilter(genreTv.data.genres);
        }
    }, [genreTv])

    useEffect(() => {
        if (activeGenre === 0) {
            setFilter(stateDiscoverTV)
            return;
        } else {
            setFilter(stateDiscoverTV.filter((movie) => (movie.genre_ids.includes(activeGenre))))
        }
    }, [activeGenre])

    //Configuration des checkbox Filtre
    function handleClick(e) {
        setActiveGenre(Number(e.target.id));
    }

    async function handleDetails(e) {
        const results = await axios.get(`https://api.themoviedb.org/3/movie/${e.target.id}`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
            }
        })
    }

    return (
        <div className="discoverContainer">
            <div animate={{ y: 100 }} className="FilterBox">
                <button id="0" onClick={handleClick}>All</button>
                {stateActiveFilter.map((e, i) => {
                    return (
                        <button key={i} id={e.id} onClick={handleClick}>{e.name}</button>
                    )
                })}
            </div>
            <h1>film</h1>

            <div className="DiscoverFilm" >
                {filter.map((e, i) => {
                    return (
                        <div className="DiscoverCard" key={i} id={e.id}>
                            <a href="" onClick={handleDetails}>
                                <h2>{e.name}</h2>
                                <img src={imgUrl + e.poster_path} alt="Movie Poster" />
                            </a>
                        </div>

                    )
                })}
            </div >
        </div >
    )
}

export default ListSerie




