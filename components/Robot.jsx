import React, { useState } from "react";

function Robot() {
  const [placed, setPlaced] = useState(false);
  const [X, setX] = useState(0);
  const [Y, setY] = useState(0);
  const [direction, setdirection] = useState("");
  const [inputValue, setinputValue] = useState("");

  const handleResetClicked = () => {
    console.log(direction);
    setPlaced(false);
    setdirection("");
    setX(0);
    setY(0);
    console.log("Reset Done!");
  };

  const handleClick = () => {
    if (placed && inputValue.startsWith("place")) {
      console.log("Robot has already been placed");
    }

    if (!placed && inputValue.startsWith("place")) {
      try {
        const b = inputValue.split(" ");

        const c = b[1].split(",");

        const d = [b[0], ...c];
        console.log(d);

        if (d.length === 4) {
          setPlaced(true);
          setX(parseInt(d[1]));
          setY(parseInt(d[2]));
          setdirection(d[3]);
          setinputValue("");
        }
      } catch (error) {
        console.log(error, "Please type in the correct format!");
      }
    } else if (!placed) {
      console.log("The robot hasn't been placed yet!");
    } else {
      if (inputValue === "report") {
        console.log(`Output: ${X}, ${Y}, ${direction}`);
        setinputValue("");
      } else if (inputValue === "left") {
        console.log("turened left");
        if (direction === "north") {
          setdirection("west");
        } else if (direction === "west") {
          setdirection("south");
        } else if (direction === "south") {
          setdirection("east");
        } else {
          setdirection("north");
        }
        setinputValue("");
      } else if (inputValue === "right") {
        console.log("Turned right");
        if (direction === "north") {
          setdirection("east");
        } else if (direction === "west") {
          setdirection("north");
        } else if (direction === "south") {
          setdirection("west");
        } else {
          setdirection("south");
        }
        setinputValue("");
      } else if (inputValue === "move") {
        console.log("Move");
        if (direction === "north" && Y === 4) {
          console.log(
            "The robot cant move forward in that direction. It might fall off the table."
          );
        } else if (direction === "north" && Y < 4) {
          setY(Y + 1);
          console.log("Moved North");
        }
        if (direction === "south" && Y === 0) {
          console.log(
            "The robot cant move forward in that direction. It might fall off the table."
          );
        } else if (direction === "south" && Y > 0) {
          setY(Y - 1);
          console.log("Moved South");
        }
        if (direction === "east" && X === 4) {
          console.log(
            "The robot cant move forward in that direction. It might fall off the table."
          );
        } else if (direction === "east" && X < 4) {
          setX(X + 1);
          console.log("Moved east");
        }
        if (direction === "west" && X === 0) {
          console.log(
            "The robot cant move forward in that direction. It might fall off the table."
          );
        } else if (direction === "west" && X > 0) {
          setX(X - 1);
          console.log("Moved west");
        }
        setinputValue("");
      }
    }
  };


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        handleClick()
      }
  }
  return (
    <div className="flex flex-col space-y-8 items-center justify-center h-full">
      <h1 className="font-bold text-orange-600 mr-48">
        Lets play with the robot
      </h1>
      <input
      onKeyDown={handleKeyDown}
        value={inputValue}
        onChange={(e) => setinputValue(e.target.value)}
        placeholder="tell the robot what to do..."
        type="text"
        className="h-10 w-96 placeholder:lowercase uppercase outline-none bg-gray-700 px-2 py-4 shadow-lg shadow-red-400/50"
      />

      <div className="border p-10 absolute top-0 left-20">
        <h1 className="font-bold text-red-500 uppercase mb-5 ">Inputs</h1>
        <ul className="text-sm">
          <li>PLACE X,Y,F</li>
          <li>MOVE</li>
          <li>LEFT | RIGHT</li>
          <li>REPORT</li>
        </ul>
      </div>

      <div className="space-x-4 mr-[140px]">
        <button
          disabled={inputValue === ""}
          onClick={handleClick}
          className="bg-yellow-600 text-sm uppercase px-10 py-3 disabled:cursor-not-allowed"
        >
          Run
        </button>
        <button
          onClick={handleResetClicked}
          className="bg-red-600 text-sm uppercase px-10 py-3  disabled:cursor-not-allowed"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Robot;
