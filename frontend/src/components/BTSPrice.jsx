import React, { useState, useEffect } from "react";
import axios from "axios";

const BTCPrice = () => {
  const [price, setPrice] = useState(null);

  const fetchPrice = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/btc-price");
      setPrice(res.data.lastPrice);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPrice();
    const interval = setInterval(fetchPrice, 5000); // update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>BTC/USD Live Price</h1>
      <h2>{price ? `$${price}` : "Loading..."}</h2>
    </div>
  );
};

export default BTCPrice;
