import { useRef } from "react";
import { useState } from "react";
const text = [
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque minima libero accusamus veniam quae, explicabo non itaque quasi natus blanditiis?",
  "Quae veritatis ea obcaecati accusantium velit eligendi dolorum. Aliquid magnam eaque dolores, tenetur quisquam, error aspernatur rem eveniet omnis delectus quo id commodi recusandae natus?",
  "amet consectetur adipisicing elit. Nam quaerat animi aperiam quam fugit ex cumque non? Iusto ex officia eveniet accusamus molestiae, velit tempora quae blanditiis! Nobis, voluptate rem?",
];
const index = Math.floor(Math.random() * text.length);
const stringBox = text[index];
const textValue = stringBox.split("");
let a = 60;
// let pointWpm = 0;

function App() {
  const [inputValue, setinputValue] = useState("");
  const [isGame, setIsGame] = useState(false);
  const [timer, setTimer] = useState(60);
  const [wpm, setWpm] = useState(0);
  const inputRef = useRef(null);
  const inputNow = Array(textValue.length).fill(null);
  const current = inputValue.split("")

 

  if(isGame){
    current.map((curr,i) =>{
      inputNow[i] = curr
      // console.log('inputNow')
    })
  }

  function handleWpm(e) {
    if (isGame) {
      
      let str = "";
      let pointWpm = 0;
      const correctString = stringBox.split(" ");
      const inputString = e.split(" ");
      for (let i = 0; i < inputString.length; i++) {
        str = inputString[i];
        if (str === correctString[i]) {
          pointWpm++;
        }
      }
      setWpm(pointWpm);
      // console.log(wpm);
    }
  }

  function handleClick() {
    setIsGame(true);

    setinputValue("");
    inputRef.current.focus();

    const myInterval = setInterval(() => {
      if (a === -1) {
        clearInterval(myInterval);
        // alert("asd");
        a = 60;
        setIsGame(false);
        setinputValue("");
        setWpm(0);
      }

      setTimer(a);
      a = a - 1;
    }, 1000);
  }

  function handleChange(e) {
    setinputValue(e);
    handleWpm(e);
  }

  return (
    <div className="container">
      <div className="wrapper">
        <div className="timer">{timer}</div>
        <div className="box">
          <Letter inputNow={inputNow} />
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => handleChange(e.target.value)}
          ></textarea>

          <Action isGame={isGame} wpm={wpm} handleClick={handleClick} />
        </div>
      </div>
    </div>
  );
}

function Letter({ inputNow }) {
  return (
    <div className="text">
      {textValue.map((textValue, i) => (
        <span
          
          key={Math.random(10)}
          className={
            inputNow[i] === textValue
              ? "correct"
              : inputNow[i] === null
              ? ""
              : "incorrect"
          }
        >
          {textValue}
        </span>
      ))}
    </div>
  );
}

function Action({ isGame, wpm, handleClick }) {
  return (
    <div className="btn">
      <div className="information">
      <div className={isGame ? "wpm" : ""}>WPM: {wpm}</div>
      </div>
      <button onClick={handleClick} disabled={isGame}>
        Start
      </button>
    </div>
  );
}

export default App;
