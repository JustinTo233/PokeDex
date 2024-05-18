import "./Generations.css";

const buttonColors = [
  "#ACD36C",
  "#DCD677",
  "#9CD7C8",
  "#B7A3C3",
  "#9FCADF",
  "#DD608C",
  "#E89483",
  "#C97DC0",
  "#EBC081",
];
const generations = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function Button({ onGenerationSelect }) {
  const handleButtonClick = (gen) => {
    onGenerationSelect(gen);
  };

  return (
    <div className="button-container">
      {generations.map((gen, index) => (
        <button
          key={gen}
          onClick={() => handleButtonClick(gen)}
          style={{ backgroundColor: buttonColors[index] }}
        >
          Gen {gen}
        </button>
      ))}
    </div>
  );
}

export default Button;
