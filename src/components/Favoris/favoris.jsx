import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavori } from "../../store/favoris/favorisSlice";
import './favoris.css'


function Favoris() {
    const dispatch = useDispatch();
    const { favori } = useSelector((state) => state)
    const [displayFav, setDisplayFav] = useState([])

    useEffect(() => {
        dispatch(getFavori());
        console.log(displayFav)
    }, [])

    return (
        <div>

        </div>
    )
}

export default Favoris