import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import Routes from "./components/routes";

function App() {
  const splashContainerRef = useRef(null);
  const [isMobileSafari, setIsMobileSafari] = useState(false);

  useEffect(() => {
    const nAgt = navigator.userAgent;
    const isIphoneOrIpod =
      navigator.platform === "iPhone" || navigator.platform === "iPod";
    const isSafari = nAgt.includes("Safari") && !nAgt.includes("Chrome"); // Safari doesn't include Chrome in its user agent string

    if (isIphoneOrIpod && isSafari) {
      setIsMobileSafari(true);
    }

    const setHeight = () => {
      if (splashContainerRef.current) {
        const windowHeight = window.innerHeight;
        if (isMobileSafari) {
          splashContainerRef.current.style.height = `${windowHeight + 85}vh`;
        } else {
          splashContainerRef.current.style.height = `${windowHeight + 90}vh`;
        }
      }
    };

    // Set the height on load
    setHeight();

    // Update the height on window resize
    window.addEventListener("resize", setHeight);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", setHeight);
    };
  }, [isMobileSafari]);

  return (
    <div ref={splashContainerRef} className="splash-container">
      <Routes />
    </div>
  );
}

export default App;
