import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPopularMovie } from "../../store/film/filmSlice";
import { getPopularTv } from "../../store/serie/serieSlice";
import './dashboard.css';


function Dashboard() {

    const dispatch = useDispatch();
    const { serie } = useSelector((state) => state)
    const { film } = useSelector((state) => state)
    const [popularMovie, setPopularMovie] = useState([]);
    const [popularTv, setPopularTv] = useState([]);
    const imgUrl = "https://image.tmdb.org/t/p/w500";

    // Dispatch Movie et Serie
    useEffect(() => {
        dispatch(getPopularMovie())
        dispatch(getPopularTv())
    }, []);

    // On vérifie que les données de l'API on été transmise
    useEffect(() => {
        if (film.isSuccess) {
            setPopularMovie(film.data.results)
        }
    }, [film])

    useEffect(() => {
        if (serie.isSuccess) {
            setPopularTv(serie.data.results)
        }
    }, [serie])

    return (
        <div className="dashContainer">
            <h1>Top film</h1>
            <a href="">
                <div className="TopRanking" >
                    {popularMovie.map((e, i) => {
                        return (
                            <div key={i} className="RankingCard">
                                <h2>{e.title}</h2>
                                <img src={imgUrl + e.poster_path} alt="Movie Poster" />
                                <p>{e.overview}</p>
                            </div>
                        )
                    })}
                </div >
            </a>
            <h2>Top série</h2>
            <a href="">
                <div className="TopRanking" >
                    {popularTv.map((e, i) => {
                        return (
                            <div key={i} className="RankingCard">
                                <h2>{e.name}</h2>
                                <img src={imgUrl + e.poster_path} alt="Movie Poster" />
                                <p>{e.overview}</p>
                            </div>
                        )
                    })}
                </div >
            </a>
        </div>
    )
}

export default Dashboard