import React, { useEffect, useState } from "react";
import { POKEAPI_URL } from "../App";
import "./Generations.css";
import PokeCard from "./PokeCard";

// const POKEAPI_URL = "https://pokeapi.co/api/v2/";

function Species({ gen }) {
  const [pokemonGen, setPokemonGen] = useState(null);
  const [detailedPokemons, setDetailedPokemons] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

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

          const pokemonDetails = await Promise.all(
            generation.pokemon_species.map((species) =>
              fetch(species.url.replace("pokemon-species", "pokemon")).then(
                (res) => res.json()
              )
            )
          );

          pokemonDetails.sort((a, b) => {
            const numA = parseInt(a.id);
            const numB = parseInt(b.id);
            return numA - numB;
          });

          setDetailedPokemons(pokemonDetails);
          setIsAnimating(false);
        } catch (e) {
          console.error("Fetching Pokémon generation failed:", e);
          setIsAnimating(false);
        }
      };
      setIsAnimating(true);
      fetchPokemonGen();
    }
  }, [gen]);

  return (
    <>
      <div>
        {pokemonGen && (
          <>
            <h2 className="species-quantity">
              Number of Pokémon Species: {pokemonGen.pokemon_species.length}
            </h2>
            <div
              className={`species-container ${
                isAnimating ? "hidden" : "appearing"
              }`}
            >
              {detailedPokemons.map((species, index) => {
                return (
                  <PokeCard
                    key={index}
                    name={species.name}
                    sprites={species.sprites.front_default}
                    types={species.types}
                    className="species-item"
                    style={{ "--delay": index }}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Species;
