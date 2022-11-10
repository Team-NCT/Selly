const express = require('express');
const app = express();
const cors = require('cors');
const Web3 = require('web3');
const feignjs = require("feignjs");
const request = require("request");
const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://goerli.infura.io/ws/v3/459eac8168754754974e54e9d436e036'));
const CounterContract = require('./contracts/EventTest.json');
const eurekaClient = require('./config/eureka-client');
app.use(
    cors({
        origin: true,
        credentials: true,
    }),
);
app.use(express.json());


app.listen(4000, () => {
    console.log('back server onload');
});

app.post('/minting', async (req, res) => {
    const from = req.body.wallet;
    const nonce = await web3.eth.getTransactionCount(from);
    const networkId = await web3.eth.net.getId();
    const CA = CounterContract.networks[networkId].address;
    const abi = CounterContract.abi;
    
    const deployed = await new web3.eth.Contract(abi, CA);
    const data = await deployed.methods.currentTokenId().encodeABI();
    let txObject = {
        // userId,
        nonce,
        from,
        to: CA,
        data,
    };
    console.log(data);
    var OPTIONS = {
        headers: {'Content-Type': 'application/json'},
        url: "http://localhost:8000/selly-article-service/create",
            body: JSON.stringify({
            metaDataUrl : req.body.metaDataUrl,
            articleName : req.body.articleName,
            articleImgUrl : req.body.articleImgUrl,
            owner: req.body.owner,
            wallet: req.body.wallet
        })
    };
    request.post(OPTIONS);

    return res.json(txObject);
});


app.get('/listen/:wallet', async (req, res) => {
    console.log("리슨");
    const networkId = await web3.eth.net.getId();
    const CA = CounterContract.networks[networkId].address;
    let subscription = web3.eth.subscribe('logs', { address : CA},(err,event) => {
        if (!err)
        console.log(event)
        if (err)
        console.log(err)
    });
    subscription.on('error', err => { 
        subscription.unsubscribe(function(error, success){
            if(success)
                console.log('Successfully unsubscribed!');
        });
        console.log(err)
        throw err
     });
    subscription.on('data', (event) => {                                        
        const params = [{type : 'address', name: 'from'}, { type: 'uint256', name: 'token' }];
        const value = web3.eth.abi.decodeLog(params, event.data);
        const list = {
            contractAddress : CA,
            token : value.token
        }
        console.log(req.params.wallet);
        console.log(value.from);
        if (req.params.wallet.toUpperCase() == value.from.toUpperCase()){
            console.log(list);
            subscription.unsubscribe(function(error, success){
            if(success)
                console.log('Successfully unsubscribed!');
        });
        return res.json(list);
        }
        
    });
});


eurekaClient.registerWithEureka("selly-contract-service", 4000);
