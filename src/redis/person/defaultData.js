import createConnection from '../connection/connection';

export default function defaultData(){

    
                    var jsonObj = ([
                        {initials: 'Mr.',name: 'Taimoor',phone: '234234',email: 'tab@tab.com',organization: 'qwewqe',assistant: 'qwe',group: 'qwe',location: 'ISB',imgsrc: ''},
                        {initials: 'Mr.',name: 'Taimoor Adil',phone: '544332',email: 'tabadil@tab.com',organization: 'qwewqe',assistant: 'qwe',group: 'qwe',location: 'ISB',imgsrc: ''},
                        {initials: 'Mr.',name: 'Adil',phone: '5544',email: 'adil@tab.com',organization: 'qwewqe',assistant: 'qwe',group: 'qwe',location: 'ISB',imgsrc: ''}
                    ]);
                    var client = createConnection().then((client) => {return client;});
                    client.HMSET('defaultData','defaultData', JSON.stringify(jsonObj));
    
}