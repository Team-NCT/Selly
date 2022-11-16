const Eureka = require("eureka-js-client").Eureka;

exports.registerWithEureka = (appName, PORT) =>{
    const client = new Eureka({
        instance: {
            app: appName,
            hostName: "selly-contract-service",
            ipAddr: '15.165.177.117',
            vipAddress: appName,
            statusPageUrl: 'https://nftselly.com:4000/info',
            port:{
                '$': PORT,
                '@enabled' :'true',
            },
            dataCenterInfo: {             
                '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
                name: 'MyOwn',
            },
            registerWithEureka: true,
            fetchRegistry: true
        },
        eureka: {
            host: '15.165.177.117',
            port: 8761,
            servicePath: '/eureka/apps/'
        }
    })
    client.start();
};
