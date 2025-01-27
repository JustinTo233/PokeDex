import "./PokeCard.css";
import { colors, getTextColor, cardColors } from "./Utils";

function PokeCard({ sprites, name, types, onClick }) {
  const primaryType = types.find((typeInfo) => typeInfo.slot === 1)?.type.name;

  return (
    <div
      className="pokemon-card"
      onClick={onClick}
      style={{ backgroundColor: cardColors[primaryType] }}
    >
      <img src={sprites} alt={`${name} sprite`} className="pokemon-img" />
      <h3 className="pokemon-name">{name}</h3>
      <div className="pokemon-types">
        {types.map((typeInfo) => {
          const backgroundColor = colors[typeInfo.type.name];
          const textColor = getTextColor(backgroundColor);

          return (
            <span
              key={typeInfo.slot}
              className="pokemon-type"
              style={{
                backgroundColor: backgroundColor,
                color: textColor,
              }}
            >
              {typeInfo.type.name}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default PokeCard;
