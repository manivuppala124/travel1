import React from "react";
import { Routes, Route } from "react-router-dom";
import { HotelsList, MapView, RestaurantsList, AttractionsList, SearchResult } from "./pages";
import { PlaceDetails } from "./pages/templates";
import Grid from './pages/Grid';
import HomePage from './pages/HomePage';
import { NotFound } from "./pages";
import Login from './pages/Login';
import Register from './pages/Register';
import ChatButton from "./pages/ChatButton";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/home/*" element={<Grid />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/restaurants" element={<RestaurantsList />} />
        <Route path="/hotels" element={<HotelsList />} />
        <Route path="/attractions" element={<AttractionsList />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/:type/:id" element={<PlaceDetails />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/logged" element={<Grid/>} />
      </Routes>
      <ChatButton />
    </>
  );
}

export default App;
