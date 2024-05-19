import "./PokeCard.css";
import { colors } from "./Colors";
import { cardColors } from "./CardColors";
function PokeCard({ sprites, name, types }) {
  const primaryType = types[0].type.name; // Get the primary type for the background color

  return (
    <div
      className="pokemon-card"
      style={{ backgroundColor: cardColors[primaryType] }}
    >
      <img src={sprites} alt={`${name} sprite`} className="pokemon-sprites" />
      <h3 className="pokemon-name">{name}</h3>
      <div className="pokemon-types">
        {types.map((typeInfo) => (
          <span
            key={typeInfo.slot}
            className="pokemon-type"
            style={{ backgroundColor: colors[typeInfo.type.name] }}
          >
            {typeInfo.type.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default PokeCard;
