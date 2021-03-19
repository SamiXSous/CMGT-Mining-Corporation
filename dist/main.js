"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextData = void 0;
const express_1 = __importStar(require("express"));
const axios_1 = __importDefault(require("axios"));
const mod10Hash_1 = require("./mod10Hash");
const app = express_1.default();
const port = 3000;
const urlNext = "https://programmeren9.cmgt.hr.nl:8000/api/blockchain/next";
app.listen(port, () => {
    mine();
    return console.log(`server is listening on ${port}`);
});
function mine() {
    getNextData();
}
function getNextData() {
    let nextHash, nextFrom, nextTransactionFrom, nextTo, nextTransactionTo, nextNonce, step1, step2, step1Hash = "";
    let nextAmount, nextTransactionAmount, nextTransactionTimestamp, nextTimestamp, nextBlockChainDataTimestamp, nextBlockChainTimestamp = 0;
    axios_1.default.get(urlNext)
        .then(response => {
        nextHash = response.data["blockchain"]["hash"];
        nextFrom = response.data["blockchain"]["data"][0]["from"];
        nextTo = response.data["blockchain"]["data"][0]["to"];
        nextAmount = response.data["blockchain"]["data"][0]["amount"];
        nextBlockChainTimestamp = response.data["blockchain"]["timestamp"];
        nextBlockChainDataTimestamp = response.data["blockchain"]["data"][0]["timestamp"];
        nextNonce = response.data["blockchain"]["nonce"];
        step1 = nextHash + nextFrom + nextTo + nextAmount + nextBlockChainDataTimestamp + nextBlockChainTimestamp + nextNonce;
        // Stap 1 Hash laatste blok
        step1Hash = mod10Hash_1.mod10Hash(step1);
        nextTransactionFrom = response.data["transactions"][0]["from"];
        nextTransactionTo = response.data["transactions"][0]["to"];
        nextTransactionAmount = response.data["transactions"][0]["amount"];
        nextTransactionTimestamp = response.data["transactions"][0]["timestamp"];
        nextTimestamp = response.data["timestamp"];
        step2 = step1Hash + nextTransactionFrom + nextTransactionTo + nextTransactionAmount + nextTransactionTimestamp + nextTimestamp;
        searchNonce(step2);
        // Stap 2 Opzoek naar een nonce
    });
}
exports.getNextData = getNextData;
function searchNonce(step2) {
    for (let i = 0; i < 1000000000000; i++) {
        let step2point1 = step2 + i;
        let step2point2 = mod10Hash_1.mod10Hash(step2point1);
        // Check to see if nonce with mod10Hash starts with 0000
        if (step2point2.startsWith('0000')) {
            console.log("Nonce: ", i);
            // Stap 3 Stuur nonce op met post
            postNonce(i);
            return;
        }
    }
}
function postNonce(nonce) {
    let data = {
        "nonce": nonce,
        "user": "0890101"
    };
    axios_1.default.post("https://programmeren9.cmgt.hr.nl:8000/api/blockchain", data)
        .then((response) => {
        console.log(response.data.message);
    }, (error) => {
        console.log(express_1.response.data.message);
    });
}
