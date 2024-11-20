import { useState, useEffect } from 'react';
import './css/index.css';
import axios from 'axios';
import { motion } from 'framer-motion';

export const App = () => {
  const [ aud, setAUD ] = useState(null)
  const [ usd, setUSD ] = useState(null)

  const fetchBtcPrice = async () => {
    const audUrl = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=aud";
    const usdUrl = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd";

    try {
      const audResponse = await axios.get(audUrl);
      const usdResponse = await axios.get(usdUrl);

      setAUD(audResponse.data.bitcoin.aud);
      setUSD(usdResponse.data.bitcoin.usd);
    } catch (e) {
      console.error('Error fetching Bitcoin price:', e);
    }
  }

  useEffect(() => {
    fetchBtcPrice();

    const interval = setInterval(fetchBtcPrice, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="btc">
      <div className="btc-container">
        <div className="btc-title">Bitcoin Price:</div>
        {aud ? 
          <>
            <h1 className="btc-price">AUD: ${aud}</h1> 
            <h1 className="btc-price">USD: ${usd}</h1> 
          </>
        : 
          <h1 className="btc-error">Error fetching BTC prices...</h1>}
      </div>
    </section>
  )
}
