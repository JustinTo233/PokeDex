import React, { useEffect, useState } from "react";
// import { POKEAPI_URL } from "../App";
import "./Generations.css";

const POKEAPI_URL = "https://pokeapi.co/api/v2/";

function Species({ gen }) {
  const [pokemonGen, setPokemonGen] = useState("");

  useEffect(() => {
    if (gen) {
      const fetchPokemonGen = async (generationNum) => {
        try {
          const res = await fetch(`${POKEAPI_URL}generation/${generationNum}`);
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          const generation = await res.json();
          setPokemonGen(generation);
        } catch (e) {
          console.error("Fetching Pokémon generation failed:", e);
        }
      };
      fetchPokemonGen(gen);
    }
  }, [gen]);

  return (
    // <div>
    //   {pokemonGen && (
    //     <div>
    //       <h2>
    //         Number of Pokémon Species: {pokemonGen.pokemon_species.length}
    //       </h2>
    //       <div>
    //         {pokemonGen.pokemon_species
    //           .map((typeInfo) => typeInfo.name)
    //           .join(" ")}
    //       </div>
    //     </div>
    //   )}
    // </div>
    <div>
      {pokemonGen && (
        <div>
          <h2>Number of Pokémon Species: {pokemonGen.pokemon_species.length}</h2>
          <div className="species-container">
            {pokemonGen.pokemon_species.map((species, index) => (
              <span key={index} className="pokemon-species">
                {species.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Species;
