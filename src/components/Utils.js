export const colors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

export const cardColors = {
  normal: "#d0b8ac",
  fire: "#fec89a",
  water: "#bde0fe",
  electric: "#fcf6bd",
  grass: "#caffbf",
  ice: "#a9f8fb",
  fighting: "#ff7477",
  poison: "#e4c1f9",
  ground: "#dba159",
  flying: "#9d71e8",
  psychic: "#f686bd",
  bug: "#ccd5ae",
  rock: "#C4B35E",
  ghost: "#c287e8",
  dragon: "#8093f1",
  dark: "#aa8f79",
  steel: "#e2e2e2",
  fairy: "#ffc2d1",
};

export function getTextColor(backgroundColor) {
  const color = backgroundColor.substring(1); // Remove the '#'
  const rgb = parseInt(color, 16); // Convert hex to integer
  const r = (rgb >> 16) & 0xff; // Extract red
  const g = (rgb >> 8) & 0xff; // Extract green
  const b = (rgb >> 0) & 0xff; // Extract blue

  // Calculate luminance
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  const isBlue = b > r && b > g;

  if (isBlue) {
    return "white"; // Use white for shades of blue
  }
  // Use black for bright backgrounds and white for dark backgrounds
  return luminance > 128 ? "black" : "white";
}

export const convertHeight = (height) => {
  const totalInches = height * 3.937;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return `${feet}'${inches}"`;
};

export const convertWeight = (weight) => {
  const pounds = weight * 0.2205;
  return `${pounds.toFixed(1)} lbs`;
};
