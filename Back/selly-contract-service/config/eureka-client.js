const Eureka = require("eureka-js-client").Eureka;

exports.registerWithEureka = (appName, PORT) =>{
    const client = new Eureka({
        instance: {
            app: appName,
            hostName: "localhost",
            ipAddr: '127.0.0.1',
            vipAddress: appName,
            statusPageUrl: 'http://127.0.0.1:4000/info',
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
            host: '127.0.0.1',
            port: 8761,
            servicePath: '/eureka/apps/'
        }
    })
    client.start();
};
