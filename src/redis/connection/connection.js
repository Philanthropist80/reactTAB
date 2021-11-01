const redis = require("redis");

export default function createConnection() {
        return new Promise((resolve,reject) => {
            let client = null;
            try {
                client = redis.createClient();
                } catch (error) {
                    reject("Error: Something went wrong!");
                }
              
                try {
                    client.on('connect', ()=>{
                        resolve(client);
                    });
                
                } catch (error) {
                    client.on('error', ()=>{
                        reject("Error: Something went wrong!");
                    });

                }
                
        });
    
}