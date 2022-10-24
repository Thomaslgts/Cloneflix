import React from "react";
import './nav.css';
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <nav>
            <ul className='nav-links'>
                <Link to='/'>
                    <li>Home</li>
                </Link>
                <Link to='/listfilm'>
                    <li>List Film</li>
                </Link>
                <Link to='/listserie'>
                    <li>Liste Série</li>
                </Link>
                <Link to='/favoris'>
                    <li>Favoris</li>
                </Link>
            </ul>
        </nav>
    )
}

export default Nav