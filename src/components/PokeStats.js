import { colors, getTextColor } from "./Colors";
import "./PokeStats.css";

function PokeStats({ isOpen, onClose, pokemon }) {
  if (!isOpen || !pokemon) return null;

  const { name, height, weight, abilities, types, sprites } = pokemon;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <div className="modal-header">
          <h2>{name}</h2>
          <img src={sprites.front_default} alt={name}></img>
        </div>
        <div className="modal-body">
          <p>height: {height}</p>
          <p>weight: {weight}</p>
          <h4>Abilities: </h4>
          <ul>
            {abilities.map((abilityInfo, index) => (
              <li key={index}>{abilityInfo.ability.name}</li>
            ))}
          </ul>
        </div>
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
    </div>
  );
}

export default PokeStats;
