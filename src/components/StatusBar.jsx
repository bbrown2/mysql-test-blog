import React, { useEffect, useState } from "react";

const StatusBar = ({ messageStatus }) => {
  const [isMessage, setIsMessage] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let timer;
    // check to see if message exist, if so then set isMessage to true
    if (messageStatus) {
      setIsMessage(true);
      // create interval that runs ever second
      timer = setInterval(() => {
        // update count + 1 every second
        setCount((prev) => prev + 1);
      }, 1000);
    }

    // clearing the interval
    // returns a cleanup function
    // prevents memory leaks and other issues
    if (count >= 5) {
      console.log("STOP COUNTER");
      setIsMessage(false);
      // stops the timer
      clearInterval(timer);
    }

    // console.log(count);

    return () => clearInterval(timer);
  }, [isMessage, count, messageStatus]);

  return (
    <>
      {isMessage && (
        <div style={{ backgroundColor: "yellow" }}>
          <h6>{messageStatus.toUpperCase()}</h6>
        </div>
      )}
    </>
  );
};

export default StatusBar;
