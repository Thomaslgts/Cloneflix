import React, { useEffect, useState } from "react";
import './listFilm.css';
import { useDispatch, useSelector } from "react-redux";
import { getDiscoverMovie } from "../../store/film/discoverSlice";
import { motion } from "framer-motion";
import { getFilter } from "../../API/getFilterMovie";
import axios from "axios";
import { addFavori } from "../../store/favoris/favorisSlice";

function ListFilm() {
    const dispatch = useDispatch();
    const { discoverFilm } = useSelector((state) => state)
    const { genreMovie } = useSelector((state) => state);
    const [stateDiscoverFilm, setDiscoverFilm] = useState([]);
    const imgUrl = "https://image.tmdb.org/t/p/w500";

    //Variables pour les filtres
    const [activeGenre, setActiveGenre] = useState(0);
    const [stateActiveFilter, setActiveFilter] = useState([]);
    const [filter, setFilter] = useState([]);

    // Dispatch Movie et Serie
    useEffect(() => {
        dispatch(getDiscoverMovie())
        dispatch(getFilter())
    }, []);

    // On vérifie que les données de l'API on été transmise
    useEffect(() => {
        if (discoverFilm.isSuccess) {
            setDiscoverFilm(discoverFilm.data.results)
            setFilter(discoverFilm.data.results)
        }
    }, [discoverFilm])

    useEffect(() => {
        if (genreMovie.isSuccess) {
            setActiveFilter(genreMovie.data.genres);
        }
    }, [genreMovie])

    useEffect(() => {
        if (activeGenre === 0) {
            setFilter(stateDiscoverFilm)
            return;
        } else {
            setFilter(stateDiscoverFilm.filter((movie) => (movie.genre_ids.includes(activeGenre))))
        }
    }, [activeGenre])

    //Configuration des checkbox Filtre
    function handleClick(e) {
        setActiveGenre(Number(e.target.id));
    }

    async function handleSave(e) {
        e.preventDefault()
        const results = await axios.get(`https://api.themoviedb.org/3/movie/${e.target.id}`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
            }
        })
        console.log(results.data)
        console.log(dispatch(addFavori(results.data)))
    }

    return (
        <div className="discoverContainer">
            <div className="FilterBox">
                <button id="0" onClick={handleClick}>All</button>
                {stateActiveFilter.map((e, i) => {
                    return (
                        <button key={i} id={e.id} onClick={handleClick}>{e.name}</button>
                    )
                })}
            </div>
            <h1>film</h1>
            <a href="">
                <div className="DiscoverFilm" >
                    {filter.map((e, i) => {
                        return (
                            <div key={i} className="DiscoverCard">
                                <h2>{e.title}</h2>
                                <img src={imgUrl + e.poster_path} alt="Movie Poster" />
                                <button id={e.id} onClick={handleSave}>⭐️</button>
                            </div>
                        )
                    })}
                </div >
            </a>
        </div>
    )
}

export default ListFilm




