import { useState } from "react";
import Add from "./Add";

function StringCalculator() {
  const [input, setInput] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsVisible(() => false);
    setInput(e.currentTarget.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsVisible(() => true);
  };

  return (
    <main>
      <form>
        <input
          type="text"
          value={input}
          onChange={handleInput}
          data-testid="input-item"
        />
        <button onClick={handleSubmit}>Submit</button>
        <br />
        {isVisible && <Add numbers={input} />}
      </form>
    </main>
  );
}

export default StringCalculator;
