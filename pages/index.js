import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import TextareaAutosize from 'react-textarea-autosize';

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

  const min = 1;
  const max = 1000;
  const minTemp = 0;
  const maxTemp = 1;

  const [value, setValue] = useState(200);
  const [valueTemp, setValueTemp] = useState(0.8);

  const handleRetLenChange = event => {
    const value = Math.max(min, Math.min(max, Number(event.target.value)));
    setValue(value);
  };
  const handleTempChange = event => {
    const valueTemp = Math.max(minTemp, Math.min(maxTemp, Number(event.target.value)));
    setValueTemp(valueTemp);
  };

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        animal: animalInput,
        length: value,
        temperature: valueTemp
      }),
    });
    const data = await response.json();
    setResult(data.result);
    // setAnimalInput("");
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Steve's cool page</h3>
        <form onSubmit={onSubmit}>
          {/* <input
            type="text"
            name="animal"
            placeholder="Prompt"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          /> */}
          <TextareaAutosize
            name="animal"
            rows={4}
            placeholder="Prompt"
            // placeholder={animalInput}
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          {/* {animalInput} */}
          <br></br>
          Temperature
          <input
            type="number"
            placeholder="Temperature"
            value={valueTemp}
            onChange={handleTempChange}
          />
          <br></br>
          Return length (between 1 and 1000)
          <input
            type="number"
            placeholder="Return length"
            value={value}
            onChange={handleRetLenChange}
          />
          <br></br>
          <input type="submit" value="Complete" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
