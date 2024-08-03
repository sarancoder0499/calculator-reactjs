import { useState } from "react";
import Add from "./Add";

function App() {
  const [input, setInput] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsVisible(() => true);
    console.log(isVisible);
  };

  return (
    <main>
      <form>
        <input
          type="text"
          value={input}
          onChange={handleInput}
          data-test-id="input-item"
        />
        <button onClick={handleSubmit}>Submit</button>
        <br />
        {isVisible && <Add numbers={input} />}
      </form>
    </main>
  );
}

export default App;
