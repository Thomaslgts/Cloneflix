import './App.css';
import React from "react";
import Nav from "./components/Navigation/nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListFilm from './components/ListFilm/listFilm';
import Dashboard from './components/Dashboard/dashboard';
import ListSerie from './components/ListSerie/listSerie';
import Favoris from './components/Favoris/favoris';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Nav />
          <Routes>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/listfilm" element={<ListFilm />} />
            <Route path="/listserie" element={<ListSerie />} />
            <Route path="/favoris" element={<Favoris />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
