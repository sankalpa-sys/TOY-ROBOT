import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function Robot() {
  const [placed, setPlaced] = useState(false);
  const [X, setX] = useState(0);
  const [Y, setY] = useState(0);
  const [direction, setdirection] = useState("");
  const [inputValue, setinputValue] = useState("");

  const handleResetClicked = () => {
    setPlaced(false);
    setdirection("");
    setX(0);
    setY(0);
    toast.success("Reset Done!");
  };

  const handleClick = () => {
    inputValue.toLowerCase()
    if (placed && inputValue.startsWith("place")) {
      toast.error("Robot has already been placed");
    }

    if (!placed && inputValue.startsWith("place")) {
      try {
        const b = inputValue.split(" ");

        const c = b[1].split(",");

        const d = [b[0], ...c];
        // console.log(d);

        if (d.length === 4) {
          setPlaced(true);
          setX(parseInt(d[1]));
          setY(parseInt(d[2]));
          setdirection(d[3]);
          setinputValue("");
          toast.success("Robot placed")
        }
      } catch (error) {
        console.log(error);
        toast.error("Please type in the correct format!")
      }
    } else if (!placed) {
      toast.error("The robot hasn't been placed yet!");
    } else {
      if (inputValue === "report") {
        toast.success(`Output: ${X}, ${Y}, ${direction}`);
        setinputValue("");
      } else if (inputValue === "left") {
        toast.success("Turned left");
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
        toast.success("Turned right");
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
        toast.success(`Moved ${direction}`);
        if (direction === "north" && Y === 4) {
          toast.error(
            "The robot cant move forward in that direction. It might fall off the table."
          );
        } else if (direction === "north" && Y < 4) {
          setY(Y + 1);
        //   console.log("Moved North");
        }
        if (direction === "south" && Y === 0) {
          toast.error(
            "The robot cant move forward in that direction. It might fall off the table."
          );
        } else if (direction === "south" && Y > 0) {
          setY(Y - 1);
        //   console.log("Moved South");
        }
        if (direction === "east" && X === 4) {
          toast.error(
            "The robot cant move forward in that direction. It might fall off the table."
          );
        } else if (direction === "east" && X < 4) {
          setX(X + 1);
        //   console.log("Moved east");
        }
        if (direction === "west" && X === 0) {
          toast.error(
            "The robot cant move forward in that direction. It might fall off the table."
          );
        } else if (direction === "west" && X > 0) {
          setX(X - 1);
        //   console.log("Moved west");
        }
        setinputValue("");
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleClick();
      setinputValue("")
    }
  };
  return (
    <div className="flex flex-col space-y-8 items-center justify-center h-full">
      <Toaster position="top-center" reverseOrder={false} />
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
