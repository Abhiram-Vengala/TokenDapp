import axios from 'axios';
import { Contract } from 'ethers';
import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import Tokenimg from "./token.png";
import "./Toke.css";

interface TokenData{
  maxPrice : string;
  minPrice : string;
  tokenAddress : string;
  tokenSymbol : string;
  updatedAt : number;
}


function Token() {
  const [data , setData] = useState<TokenData[]|null>();
  useEffect(()=>{
    const getData = async()=>{
      const res = await axios.get("https://arbitrum-api.gmxinfra.io/prices/tickers");
      console.log(res.data);
      setData(res.data);
      console.log(data);
    }
    getData();
  },[]);
  return (
    <div className='box'>
      {data&&(
        <div>
          <Marquee>
          {data.map((tokenData)=>(
            <div key={tokenData.tokenSymbol} className='info'>
              <img src={Tokenimg} className='image'></img>
              <br></br>
              Token Symbol : {tokenData.tokenSymbol}
              <br></br>
              Max Price : {tokenData.maxPrice}
            </div>
          ))}
          </Marquee>
        </div>
      )}
    </div>
  )
}

export default Token;

