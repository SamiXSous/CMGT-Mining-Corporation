import express, { response } from 'express';
import axios from 'axios';
import {mod10Hash} from './mod10Hash'

const app = express();
const port = 3000;
const urlNext = "https://programmeren9.cmgt.hr.nl:8000/api/blockchain/next";

app.listen(port, () => {
  mine()
  return console.log(`server is listening on ${port}`);
});

function mine () {
  getNextData()
}

export function getNextData() {
  let nextHash, nextFrom, nextTransactionFrom, nextTo, nextTransactionTo, nextNonce, step1, step2, step1Hash = "";
  let nextAmount, nextTransactionAmount, nextTransactionTimestamp, nextTimestamp, nextBlockChainDataTimestamp, nextBlockChainTimestamp = 0;
  axios.get(urlNext)
    .then(response => {
      nextHash = response.data["blockchain"]["hash"];
      nextFrom = response.data["blockchain"]["data"][0]["from"];
      nextTo = response.data["blockchain"]["data"][0]["to"];
      nextAmount = response.data["blockchain"]["data"][0]["amount"];
      nextBlockChainTimestamp = response.data["blockchain"]["timestamp"]
      nextBlockChainDataTimestamp = response.data["blockchain"]["data"][0]["timestamp"]
      nextNonce = response.data["blockchain"]["nonce"]

      step1 = nextHash + nextFrom + nextTo + nextAmount + nextBlockChainDataTimestamp + nextBlockChainTimestamp + nextNonce
      // Stap 1 Hash laatste blok
      step1Hash = mod10Hash(step1)

      
      nextTransactionFrom = response.data["transactions"][0]["from"]
      nextTransactionTo = response.data["transactions"][0]["to"]
      nextTransactionAmount = response.data["transactions"][0]["amount"]
      nextTransactionTimestamp = response.data["transactions"][0]["timestamp"]
      nextTimestamp = response.data["timestamp"]
      
      step2 = step1Hash + nextTransactionFrom + nextTransactionTo + nextTransactionAmount + nextTransactionTimestamp + nextTimestamp;
      
      // Stap 2 Opzoek naar een nonce
      for (let i=0; i < 10000000; i++) {
        let step2point1 = step2 + i
        let step2point2 = mod10Hash(step2point1)
        // Check to see if nonce with mod10Hash starts with 0000
        if (step2point2.startsWith('0000')){
          console.log("Nonce: ",i)
          // Stap 3 Stuur nonce op met post
          postNonce(i)
          return
        }
      }
    })
}


function postNonce(nonce){
  let data = {
    "nonce": nonce,
    "user": "0890101"
  }
  axios.post("https://programmeren9.cmgt.hr.nl:8000/api/blockchain",data)
  .then((response) => {
    console.log(response.data.message);
  }, (error) => {
    console.log(response.data.message);
  });
}

