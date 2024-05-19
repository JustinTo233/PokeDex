import React, { useEffect, useState } from "react";
import { POKEAPI_URL } from "../App";
import "./Generations.css";
import PokeCard from "./PokeCard";

// const POKEAPI_URL = "https://pokeapi.co/api/v2/";

function Species({ gen }) {
  const [pokemonGen, setPokemonGen] = useState(null);

  useEffect(() => {
    if (gen) {
      const fetchPokemonGen = async () => {
        try {
          const res = await fetch(`${POKEAPI_URL}generation/${gen}`);
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          const generation = await res.json();
          setPokemonGen(generation);
        } catch (e) {
          console.error("Fetching Pokémon generation failed:", e);
        }
      };
      fetchPokemonGen();
    }
  }, [gen]);

  return (
    <div>
      {pokemonGen && (
        <div>
          <h2>
            Number of Pokémon Species: {pokemonGen.pokemon_species.length}
          </h2>
          <div className="species-container">
            {pokemonGen.pokemon_species.map((species, index) => (
              <PokeCard key={index} name={species.name} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Species;
