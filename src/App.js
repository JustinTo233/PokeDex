import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "./images/Pokédex_logo.png";
import Button from "./components/Button";
import Species from "./components/GenerationSpecies";
import { colors } from "./components/Colors";
export const POKEAPI_URL = "https://pokeapi.co/api/v2/";

function App() {
  const [pokemonData, setPokemonData] = useState("");
  const [selectedGen, setSelectedGen] = useState(null);

  const handleGenerationSelect = (gen) => {
    setSelectedGen(gen);
  };
  useEffect(() => {
    document.title = "PokeDex";

    const fetchPokemons = async (pokename) => {
      try {
        const res = await fetch(`${POKEAPI_URL}pokemon/${pokename}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const pokemon = await res.json();
        setPokemonData(pokemon);
      } catch (error) {
        console.error("Fetching Pokémon failed:", error);
      }
    };

    fetchPokemons(1);
  }, []);

  return (
    <div className="container">
      <img src={logo} alt="logo" className="logo"></img>
      <Button onGenerationSelect={handleGenerationSelect} />
      {selectedGen && <Species gen={selectedGen} />}
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
      </div>
    </div>
  );
}

export default App;
