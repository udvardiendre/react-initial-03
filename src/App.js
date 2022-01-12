import React from "react";
import LoadingMask from "./components/LoadingMask";
import Character from "./components/Character";
import Subscription from "./components/Subscription";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [visible, setVisible] = useState("none");

  const url = "https://seriescharacters.com/api/howimetyourmother";

  const fetchData = async () => {
    const response = await axios.get(url);
    setCharacters(response.data);

    setLoading(false);
  };

  const setVisibilityOfSubs = () => {
    if (visible === "initial") {
      setVisible("none");
    }
  };

  useEffect(() => {
    setLoading(false);
    fetchData();
    setTimeout(() => setVisible("initial"), 10000);
  }, []);

  if (loading) {
    return <LoadingMask />;
  } else {
    return (
      <div>
        <h1>Series Api</h1>
        {characters.map((character) => (
          <Character name={character.name} details={character.details} />
        ))}
        <div style={{ display: visible }}>
          <Subscription subscriptionIsVisible={setVisibilityOfSubs} />
        </div>
      </div>
    );
  }
}

export default App;
