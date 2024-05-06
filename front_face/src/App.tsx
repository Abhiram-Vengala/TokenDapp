import React, { useEffect, useState } from 'react';
import MyToken from "./artifacts/contracts/MyToken.sol/MyToken.json";
import logo from './logo.svg';
import './App.css';
import { Contract, ethers } from 'ethers';
import Marquee from 'react-fast-marquee';
import Token from "./components/Token";


interface Transaction{
  from:string;
  to:string;
  value:number
}
const transaction :Transaction[]=[];
function App() {
  
  const [contract , setContract] = useState<any>();
  const [address , setAddress] = useState<string>();
  const [receiver , setReceiver] = useState<string>();
  const [_value , setValue] = useState<number>(0);
  const [history , setHistory] = useState<Transaction[]>();
  const [balance , setBalance] = useState<string>();
  const [name , setName] = useState<string>();
  const [istransact , setIstransact] = useState<boolean>(false);
  useEffect(()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const loadProvider = async()=>{
      if(provider){
        window.ethereum.on("accountsChanged",()=>{
          window.location.reload();
        });

        const signer = provider.getSigner();
        const Addr = await signer.getAddress();
        console.log(Addr);
        setAddress(Addr);

        let contractAddres = "0x2608d1Cd9dC94C3Aa8cA2776e3996fd6Cf9C0605";

        const contract = new ethers.Contract(contractAddres,MyToken.abi,signer);

        console.log(contract);
        setContract(contract);
        address&&getBalance();
      }
    };
    provider&&loadProvider();
  },[]);

  const connectWallet = async()=>{
    if(typeof window !=="undefined" && typeof window.ethereum != "undefined"){
      try{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts",[]);
        console.log(accounts[0]);
      }catch(err){
        console.log(err);
      }
    }else{
      console.log("please install metamask");
    }
  }
  const sendToken=async()=>{
    const send = await contract.transfer(receiver , ethers.utils.parseUnits(_value.toString(),18));
    console.log(send);
    let newTransaction = {
      from : address as string,
      to: receiver as string, 
      value:_value
    };
    transaction.push(newTransaction)
    console.log(transaction);
    setIstransact(true);
    setHistory(transaction);
  }
  const getBalance = async()=>{
    const bal = await contract.balanceOf(`${address}`);
    setBalance(ethers.utils.formatEther(bal) as string);
    console.log(ethers.utils.formatEther(bal));
  }

  return (
    <div className="App">
      <div className='name'>
      <p id='bal'>MyToken (MTK) : {balance}</p>
      </div>
      <div className='wallet'>
      <button onClick={connectWallet} className='wallet_button'>Connect Wallet</button>
      </div>
      <br></br>
      <p id='para'>Your Address : {address}</p>
      <input type='text' className='addr' placeholder='Receiver Address' onChange={e=>setReceiver(e.target.value)}></input>
      <br/>
      <input type="number" id='value' placeholder='Amount' onChange={e=>setValue(Number(e.target.value))}></input>
      <button className='send' onClick={sendToken}>send</button>
      {istransact && (
        <table className='table'>
        <thead className='head'>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody >
          {history?.map((tx)=>(
            <tr key={tx.from } className='body'>
              <td id='row'>{tx.from}</td>
              <td id='row'>{tx.to}</td>
              <td id='row'>{tx.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
      <Token/>
    </div>
  );
}

export default App;
