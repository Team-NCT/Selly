const express = require('express');
const app = express();
const cors = require('cors');
const Web3 = require('web3');
const feignjs = require("feignjs");
const request = require("request");
const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://goerli.infura.io/ws/v3/459eac8168754754974e54e9d436e036'));
// const mintingContract = require('./contracts/EventTest.json');
const mintingContract = require('./contracts/SellyERC721.json');
const eurekaClient = require('./config/eureka-client');
const sellregistContract = require("./contracts/FractionalizedNFT.json")
const nftsale = require("./contracts/F_NFTSale.json")
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
    const CA = mintingContract.networks[networkId].address;
    const abi = mintingContract.abi;
    const deployed = await new web3.eth.Contract(abi, CA);
    const data = await deployed.methods.createMine(req.body.metaDataUrl).encodeABI();
    // const data = await deployed.methods.currentTokenId().encodeABI();
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
    request.post(OPTIONS, (err, res, body) =>{ });

    return res.json(txObject);
});


app.get('/listen/:wallet', async (req, res) => {
    console.log("리슨");
    const networkId = await web3.eth.net.getId();
    const CA = mintingContract.networks[networkId].address;
    let subscription = await web3.eth.subscribe('logs', { address : CA, 
        topics: [
        "0x8f839153139787443f022f61f0970bdd4fe0e1d1422ab05e0ec211288fd6b540"
    ]},(err,event) => {
        if(event){
            console.log(event);                         
        const params = [{type : 'uint256', name: 'tokenId'}, {type: "address", name: "owner"},{type: 'string', name: 'tokenURI'}]
        // const params = [{type : 'uint256', name: 'tokenId', indexed: true}, {type: "address", name: "owner", indexed: true}]
        // const params2 = {type: 'string', name: 'tokenURI'}
        // const params = [{type : 'address', name: 'from'}, { type: 'uint256', name: 'token' } ];
        const value = web3.eth.abi.decodeLog(params, event.data);
        // const value2 = web3.eth.abi.decodeLog(params, event.data);
        console.log(value);

        console.log("--------------------------------")
        const list = {
            contractAddress : CA,
            tokenId : value.tokenId
        }
        console.log(req.params.wallet);
        if (req.params.wallet.toUpperCase() == value.owner.toUpperCase()){
            console.log(list);
            subscription.unsubscribe(function(error, success){
            if(success)
                console.log('Successfully unsubscribed!');
        });
        return res.json(list);
        }
        }
        if (err){
            subscription.unsubscribe(function(error, success){
                if(success)
                    console.log('Successfully unsubscribed!');
            });
            console.log(err)
            throw err
        }
    });
    // subscription.on('error', err => { 
    //     subscription.unsubscribe(function(error, success){
    //         if(success)
    //             console.log('Successfully unsubscribed!');
    //     });
    //     console.log(err)
    //     throw err
    //  });
    // subscription.on('data', (event) => {               
    //     console.log(event);                         
    //     const params = [{type : 'uint256', name: 'tokenId'}, {type: "address", name: "owner"},{type: 'string', name: 'tokenURI'}]
    //     // const params = [{type : 'uint256', name: 'tokenId', indexed: true}, {type: "address", name: "owner", indexed: true}]
    //     // const params2 = {type: 'string', name: 'tokenURI'}
    //     // const params = [{type : 'address', name: 'from'}, { type: 'uint256', name: 'token' } ];
    //     const value = web3.eth.abi.decodeLog(params, event.data);
    //     // const value2 = web3.eth.abi.decodeLog(params, event.data);
    //     console.log(value);

    //     console.log("--------------------------------")
    //     const list = {
    //         contractAddress : CA,
    //         tokenId : value.tokenId
    //     }
    //     console.log(req.params.wallet);
    //     if (req.params.wallet.toUpperCase() == value.owner.toUpperCase()){
    //         console.log(list);
    //         subscription.unsubscribe(function(error, success){
    //         if(success)
    //             console.log('Successfully unsubscribed!');
    //     });
    //     return res.json(list);
    //     }
        
    // });
});

app.post("/sellregist", async(req, res) => {
    const from = req.body.wallet;
    const nonce = await web3.eth.getTransactionCount(from);
    const CA = req.body.ownershipContractAddress;
    const abi = sellregistContract.abi;
    const deployed = await new web3.eth.Contract(abi, CA);
    console.log(req.body.pieceCnt)
    console.log(Web3.utils.toWei(String(req.body.tradePrice), 'ether'))
    const data = await deployed.methods.createSale(req.body.pieceCnt, Web3.utils.toWei(String(req.body.tradePrice), 'ether')).encodeABI();
    console.log(data);
    let txObject = {
        nonce,
        from,
        to: CA,
        data,
    };
    var OPTIONS = {
        headers: {'Content-Type': 'application/json'},
        url: "http://localhost:8000/selly-trade-service/p2p-sell-regist",
            body: JSON.stringify({
            seller : req.body.seller,
            contractAddress : req.body.contractAddress,
            ownershipContractAddress : req.body.ownershipContractAddress,
            pieceCnt : req.body.pieceCnt,
            tradePrice : req.body.tradePrice,
            metaDataUrl : req.body.metaDataUrl,
            articleImgUrl : req.body.articleImgUrl,
            category : req.body.category,
            wallet : req.body.wallet,
            articleName : req.body.articleName,
            tokenId: req.body.tokenId
        })
    };
    request.post(OPTIONS, (err, res, body) =>{ });
    return res.json(txObject);
})

app.get('/listen/:wallet/:ca', async (req, res) => {
    console.log("CA리슨");
    const CA = req.params.ca;
    console.log(CA);
    let subscription = await web3.eth.subscribe('logs', { address : CA, topics:[
        "0xf800216b49e9f4066dd1d33ae81712cebc8643f9aa20ad16aa348eae951825a7"
    ]},(err,event) => {
        if (event){
            console.log(event);                                      
        const params = [{type : 'address', name: 'ownershipCA'},{type : 'address', name: 'saleCA'},{type : 'address', name: 'wallet'}, { type: 'uint256', name: 'piece' }, { type: 'uint256', name: 'price' }];
        const value = web3.eth.abi.decodeLog(params, event.data);
        const list = {
            saleContractAddress : value.saleCA,
        }
        console.log(req.params.wallet);
        console.log(value);
        if (req.params.wallet.toUpperCase() == value.wallet.toUpperCase()){
            console.log(list);
            subscription.unsubscribe(function(error, success){
            if(success)
                console.log('Successfully unsubscribed!');
        });
        return res.json(list);
        }
        }
        if (err){
            subscription.unsubscribe(function(error, success){
                if(success)
                    console.log('Successfully unsubscribed!');
            });
            console.log(err)
            throw err
        }
    });
    // subscription.on('error', err => { 
    //     subscription.unsubscribe(function(error, success){
    //         if(success)
    //             console.log('Successfully unsubscribed!');
    //     });
    //     console.log(err)
    //     throw err
    //  });
    // subscription.on('data', (event) => {  
    //     console.log(event);                                      
    //     const params = [{type : 'address', name: 'ownershipCA'},{type : 'address', name: 'saleCA'},{type : 'address', name: 'wallet'}, { type: 'uint256', name: 'piece' }, { type: 'uint256', name: 'price' }];
    //     const value = web3.eth.abi.decodeLog(params, event.data);
    //     const list = {
    //         saleContractAddress : value.saleCA,
    //     }
    //     console.log(req.params.wallet);
    //     console.log(value);
    //     if (req.params.wallet.toUpperCase() == value.wallet.toUpperCase()){
    //         console.log(list);
    //         subscription.unsubscribe(function(error, success){
    //         if(success)
    //             console.log('Successfully unsubscribed!');
    //     });
    //     return res.json(list);
    //     }
        
    // });
});

app.post('/buy', async (req, res) => {
    const from = req.body.wallet;
    const nonce = await web3.eth.getTransactionCount(from);
    const CA = req.body.saleContractAddress;
    console.log(CA);
    const abi = nftsale.abi;
    const deployed = await new web3.eth.Contract(abi, CA);
    const data = await deployed.methods.purchase(req.body.pieceCnt).encodeABI();
    // const data = await deployed.methods.currentTokenId().encodeABI();
    
    const va = (req.body.pieceCnt * req.body.tradePrice).toFixed(4);
    console.log(va);
    let txObject = {
        nonce,
        from,
        to: CA,
        data,
        value : Web3.utils.toWei(String(va), 'ether')
    };
    console.log(data);
    var OPTIONS = {
        headers: {'Content-Type': 'application/json'},
        url: "http://localhost:8000/selly-trade-service/trade",
            body: JSON.stringify({
            saleContractAddress : req.body.saleContractAddress,
            pieceCnt : req.body.pieceCnt,
            tradePrice : req.body.tradePrice,
            wallet : req.body.wallet,
            sellerId : req.body.sellerId,
            buyerId : req.body.buyerId,
            articleId: req.body.articleId
        })
    };
    request.post(OPTIONS, (err, res, body) =>{ });

    return res.json(txObject);
});

app.get("/listensa/:wallet/:sa", async(req, res) =>{
    console.log("구매 들어옴!");
    const CA = req.params.sa;
    let subscription = await web3.eth.subscribe('logs', { address : CA, topics:[
        "0xdccb5bce6e0213237e0f6a2b3fac1111566917989d8d207b69e82385a13a9759"
    ]},(err,event) => {
        if (event){
            console.log(event);                                      
        const params = [{type : 'address', name: 'F_CA'},{type : 'address', name: 'saleCA'},{type : 'address', name: 'seller'}, { type: 'address', name: 'buyer' }, { type: 'uint256', name: 'buyAmount' }, { type: 'uint256', name: 'payValue' }];
        const value = web3.eth.abi.decodeLog(params, event.data);
        console.log(req.params.wallet);
        console.log(value);
        var price = parseFloat(Web3.utils.fromWei(value.payValue, 'ether'));
        console.log(price);
        const list = {
            saleContractAddress: value.saleCA,
            sellerId : value.seller,
            buyerId : value.buyer,
            pieceCnt : value.buyAmount,
            tradePrice : price,
        }
        // return res.json(list);
        if (req.params.wallet.toUpperCase() == value.buyer.toUpperCase()){
            console.log(list);
            subscription.unsubscribe(function(error, success){
            if(success)
                console.log('Successfully unsubscribed!');
        });
        return res.json(list);
        }
        }
        if (err){
            subscription.unsubscribe(function(error, success){
                if(success)
                    console.log('Successfully unsubscribed!');
            });
            console.log(err)
            throw err
        }
    });

    // subscription.on('data', (event) => {  
    //     console.log(event);                                      
    //     const params = [{type : 'address', name: 'F_CA'},{type : 'address', name: 'saleCA'},{type : 'address', name: 'seller'}, { type: 'address', name: 'buyer' }, { type: 'uint256', name: 'buyAmount' }, { type: 'uint256', name: 'payValue' }];
    //     const value = web3.eth.abi.decodeLog(params, event.data);
    //     console.log(req.params.wallet);
    //     console.log(value);
    //     var price = parseFloat(Web3.utils.fromWei(value.payValue, 'ether'));
    //     console.log(price);
    //     const list = {
    //         saleContractAddress: value.saleCA,
    //         sellerId : value.seller,
    //         buyerId : value.buyer,
    //         pieceCnt : value.buyAmount,
    //         tradePrice : price,
    //     }
    //     // return res.json(list);
    //     if (req.params.wallet.toUpperCase() == value.buyer.toUpperCase()){
    //         console.log(list);
    //         subscription.unsubscribe(function(error, success){
    //         if(success)
    //             console.log('Successfully unsubscribed!');
    //     });
    //     return res.json(list);
    //     }
    // });
})
app.post("/cancleSale", async(req, res) =>{
    const from = req.body.wallet;
    const nonce = await web3.eth.getTransactionCount(from);
    const CA = req.body.saleContractAddress;
    console.log(CA);
    const abi = nftsale.abi;
    const deployed = await new web3.eth.Contract(abi, CA);
    const data = await deployed.methods.cancelSale().encodeABI();
    let txObject = {
        nonce,
        from,
        to: CA,
        data
    };

    var OPTIONS = {
        headers: {'Content-Type': 'application/json'},
        url: "http://localhost:8000/selly-trade-service/trade-cancel",
            body: JSON.stringify({
            saleContractAddress : req.body.saleContractAddress,
            wallet : req.body.wallet,
            seller : req.body.seller,
        })
    };
    request.post(OPTIONS, (err, res, body) =>{ });

    return res.json(txObject);
})
app.get("/listencancel/:wallet/:sa", async(req, res)=>{
    const CA = req.params.sa;
    let subscription = web3.eth.subscribe('logs', { address : CA, topics:[
        "0xd9b6a328868f7e8d317d22d8a06ed8853be50e49fa45fb32826e7efaef4b8651"
    ]},(err,event) => {
        if (event){
            console.log(event);                                      
        const params = [{type : 'address', name: 'ownershipCA'},{type : 'address', name: 'saleCA'},{type : 'address', name: 'seller'}];
        const value = web3.eth.abi.decodeLog(params, event.data);
        console.log(req.params.wallet);
        console.log(value);
        const list = {
            saleContractAddress: value.saleCA,
            sellerWallet : value.seller,
        }
        // return res.json(list);
        if (req.params.wallet.toUpperCase() == value.seller.toUpperCase()){
            console.log(list);
            subscription.unsubscribe(function(error, success){
            if(success)
                console.log('Successfully unsubscribed!');
        });
        return res.json(list);
        }
        }
        if (err){
            subscription.unsubscribe(function(error, success){
                if(success)
                    console.log('Successfully unsubscribed!');
            });
            console.log(err)
            throw err
        }
    });
})
eurekaClient.registerWithEureka("selly-contract-service", 4000);
