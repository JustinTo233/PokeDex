import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "./images/Pokédex_logo.png";
import pokeball from "./images/pokeball.png";
import Button from "./components/Button";
import Species from "./components/GenerationSpecies";
import PokeCard from "./components/PokeCard";
import "./components/Pokeball.css";
export const POKEAPI_URL = "https://pokeapi.co/api/v2/";

function App() {
  const [pokemonData, setPokemonData] = useState("");
  const [selectedGen, setSelectedGen] = useState(null);
  const [allPokemon, setAllPokemon] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerationSelect = (gen) => {
    setSelectedGen(gen);
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
            <img src={logo} alt="logo" className="logo"></img>
            <Button onGenerationSelect={handleGenerationSelect} />
            {selectedGen ? (
              <Species gen={selectedGen} />
            ) : (
              <div className="pokemon-list">
                {allPokemon.map((pokemon, index) => (
                  <PokeCard
                    key={index}
                    sprites={pokemon.sprites.front_default}
                    name={pokemon.name}
                    types={pokemon.types || []}
                  />
                ))}
              </div>
            )}
            {pokemonData && <div></div>}
            {/* {selectedGen && <Species gen={selectedGen} />}
      <div>
        {pokemonData && (
          <div>
            <h1>{pokemonData.name}</h1>
            <div className="pokemon-container">
              {pokemonData.types.map((typeInfo) => (
                <span
                  key={typeInfo.slot}
                  className="pokemon-type"
                  style={{
                    backgroundColor: colors[typeInfo.type.name],
                  }}
                >
                  {typeInfo.type.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div> */}
          </>
        )}
      </div>
    </>
  );
}

export default App;
