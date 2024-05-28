import { colors, getTextColor, convertHeight, convertWeight } from "./Utils";
import "./PokeStats.css";
import { POKEAPI_URL } from "../App";
import { useEffect, useState } from "react";

function PokeStats({ isOpen, onClose, pokemon }) {
  const [weaknesses, setWeaknesses] = useState([]);
  useEffect(() => {
    if (isOpen && pokemon) {
      const fetchWeaknesses = async () => {
        const typeURL = pokemon.types[0].type.url;
        const response = await fetch(typeURL);
        const data = await response.json();
        setWeaknesses(data.damage_relations.double_damage_from);
      };
      fetchWeaknesses();
    }
  });

  if (!isOpen || !pokemon) return null;

  const { name, id, height, weight, abilities, types, sprites, stats } =
    pokemon;

  const pokeId = String(id).padStart(4, "0");
  const pokeHeight = convertHeight(height);
  const pokeWeight = convertWeight(weight);
  const pokeAbilities = abilities.filter(
    (abilityInfo) => !abilityInfo.is_hidden
  );
  const pokeSprite = sprites.front_default;
  const animatedPokeSprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <div className="modal-header">
          <h2>
            {name}
            <span className="poke-id"> #{pokeId}</span>
          </h2>
        </div>
        <div className="modal-body">
          {/* Left side of the modal */}
          <div className="modal-left">
            {/* Pokemon Sprite */}
            <img
              src={animatedPokeSprite}
              alt={name}
              className="poke-sprite"
            ></img>
            {/* Pokemon Height/Weight/Abilities */}
            <p className="poke-height">
              <strong>Height:</strong> {pokeHeight}
            </p>
            <p className="poke-weight">
              <strong>Weight:</strong> {pokeWeight}
            </p>
            {/* Pokemon Abilities */}
            <div className="abilities-container">
              <strong>Abilities:</strong>
              <div className="pokemon-abilities">
                {pokeAbilities.map((abilityInfo, index) => (
                  <li key={index}>{abilityInfo.ability.name}</li>
                ))}
              </div>
            </div>
          </div>
          {/* Right side of the modal */}
          <div className="modal-right">
            {/* Pokemon Stats */}
            <h4>Stats: </h4>
            {stats.map((statInfo) => (
              <div key={statInfo.stat.name} className="stat">
                <span className="stat-name">{statInfo.stat.name}</span>
                <div className="stat-bar">
                  <div
                    className="stat-value"
                    style={{ width: `${statInfo.base_stat}px` }}
                  ></div>
                </div>
              </div>
            ))}
            {/* Pokemon Types */}
            <div>
              <h4>Types: </h4>
              <div className="types-container">
                {types.map((typeInfo) => (
                  <span
                    key={typeInfo.slot}
                    className="pokemon-type"
                    style={{
                      backgroundColor: colors[typeInfo.type.name],
                      color: getTextColor(colors[typeInfo.type.name]),
                    }}
                  >
                    {typeInfo.type.name}
                  </span>
                ))}
              </div>
            </div>
            {/* Pokemon Weaknesses */}
            <div>
              <h4>Weaknesses</h4>
              <div className="types-container">
                {weaknesses.map((weakness, index) => (
                  <span
                    key={index}
                    className="pokemon-type"
                    style={{
                      backgroundColor: colors[weakness.name],
                      color: getTextColor[weakness.name],
                    }}
                  >
                    {weakness.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokeStats;
