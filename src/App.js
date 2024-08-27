import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "./images/Pokédex_logo.png";
import pokeball from "./images/pokeball.png";
import Button from "./components/Button";
import Species from "./components/GenerationSpecies";
import PokeCard from "./components/PokeCard";
import "./components/Pokeball.css";
import PokeStats from "./components/PokeStats";
import { Autocomplete, TextField } from "@mui/material";

export const POKEAPI_URL = "https://pokeapi.co/api/v2/";
// import TextField from "@material-ui/TextField";

function App() {
  const [selectedGen, setSelectedGen] = useState(null);
  const [allPokemon, setAllPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleGenerationSelect = (gen) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedGen(gen);
      setIsAnimating(false);
    }, 500);
    setIsSidebarOpen(false);
  };
  const handlePokemonSelect = async (event, value) => {
    if (value) {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${value.name}`
      );
      const data = await response.json();
      setSelectedPokemon(data);
      setIsModalOpen(true);
    }
  };
  const handleLogoClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedGen(null);
      setIsAnimating(false);
    }, 500);
  };
  const handlePokemonStatsClick = (pokemon) => {
    setSelectedPokemon(pokemon);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPokemon(null);
  };

  const fetchPokemonDetails = async (url) => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    } catch (error) {
      console.error("Fetching Pokémon details failed:", error);
    }
  };

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${POKEAPI_URL}pokemon?limit=1500`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      const detailedPokemons = await Promise.all(
        data.results.map((pokemon) => fetchPokemonDetails(pokemon.url))
      );
      setAllPokemon(detailedPokemons);
      setLoading(false);
    } catch (error) {
      console.error("Fetching all Pokémon failed:", error);
    }
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    document.title = "PokeDex";

    fetchPokemons();
  }, []);

  useEffect(() => {
    if (loading) {
      document.body.classList.add("loading");
    } else {
      document.body.classList.remove("loading");
    }
  }, [loading]);

  return (
    <>
      <div className="container">
        {loading && (
          <div className="overlay">
            <div className="pokeball-container">
              <img src={pokeball} alt="pokeball" className="pokeball" />
            </div>
          </div>
        )}
        {!loading && (
          <>
            <img
              src={logo}
              alt="logo"
              className="logo"
              onClick={handleLogoClick}
            ></img>
            <Autocomplete
              options={allPokemon}
              getOptionLabel={(option) => option.name}
              onChange={handlePokemonSelect}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Pokémon"
                  variant="outlined"
                />
              )}
              className="searchbar"
            />
            <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
              <button className="close-sidebar" onClick={handleToggleSidebar}>
                &times;
              </button>
              <Button onGenerationSelect={handleGenerationSelect} />
            </div>
            <button
              className={`sidebar-toggle ${isSidebarOpen ? "hidden" : ""}`}
              onClick={handleToggleSidebar}
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>

            <div className="gen-buttons">
              <Button onGenerationSelect={handleGenerationSelect} />
            </div>
            {selectedGen ? (
              <Species gen={selectedGen} />
            ) : (
              <div className={`pokemon-list ${isAnimating ? "hidden" : ""}`}>
                {allPokemon.map((pokemon, index) => (
                  <PokeCard
                    key={index}
                    sprites={
                      pokemon.sprites.other["official-artwork"].front_default
                    }
                    name={pokemon.name}
                    types={pokemon.types || []}
                    className="pokemon-block"
                    onClick={() => handlePokemonStatsClick(pokemon)}
                  />
                ))}
              </div>
            )}
          </>
        )}
        <PokeStats
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          pokemon={selectedPokemon}
        />
      </div>
    </>
  );
}

export default App;
