import "./PokeCard.css";
import { colors } from "./Colors";
import { cardColors } from "./CardColors";
function PokeCard({ sprites, name, types }) {
  const primaryType = types[0].type.name;

  function getTextColor(backgroundColor) {
    const color = backgroundColor.substring(1); // Remove the '#'
    const rgb = parseInt(color, 16); // Convert hex to integer
    const r = (rgb >> 16) & 0xff; // Extract red
    const g = (rgb >> 8) & 0xff; // Extract green
    const b = (rgb >> 0) & 0xff; // Extract blue

    // Calculate luminance
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    // Use black for bright backgrounds and white for dark backgrounds
    return luminance > 128 ? "black" : "white";
  }

  return (
    <div
      className="pokemon-card"
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
