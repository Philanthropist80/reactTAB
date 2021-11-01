const redis = require("redis");

export default function createConnection() {
        return new Promise((resolve,reject) => {

                const client = redis.createClient();

                client.on('connect', ()=>{
                    resolve(client);
                });
                client.on('error', ()=>{
                    reject("Error: Something went wrong!");
                });

        });
    
}