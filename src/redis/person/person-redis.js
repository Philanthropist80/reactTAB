import createConnection from '../connection/connection';


export default function personData(){


    var client = createConnection().then((client) => {return client;});
    client.HMSET('defaultData','defaultData', JSON.stringify())


}