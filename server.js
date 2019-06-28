const Hapi = require('@hapi/hapi');
const mysql=require('mysql');

    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
        routes : {
            cors :true
        }
    });
   
    server.route([{
        method:"GET",
        path:"/",
        handler: (request,reply)=>{
            return new Promise((resolve,reject)=>{
                const connection = mysql.createConnection({
                    host     : 'localhost',
                    user     :'root',
                    password : '',
                    database : 'project'
                  });
                  connection.connect();
                  connection.query(`SELECT * from persons`, function (error, results, fields) {
                    if (error) reject(error);
                    resolve(results);
                  });
            
            })
        }
    },
    {
    method:"POST",
        path:"/add",
        handler: (request,reply)=>{
           var  item = request.payload;
            return new Promise((resolve,reject)=>{
                const connection = mysql.createConnection({
                    host     : 'localhost',
                    user     :'root',
                    password : '',
                    database : 'project'
                  });
                  connection.connect();
                  connection.query(`insert into persons (Name,Dob,Contact,Email) values('${item.Name}','${item.Dob}','${item.Contact}','${item.Email}')`, function (error, results, fields) {
                    if (error) reject(error);
                    resolve(results);
                  });
            
            })
        }
    },
    {
        method:"POST",
            path:"/edit",
            handler: (request,reply)=>{
               var  item = request.payload;
                return new Promise((resolve,reject)=>{
                    const connection = mysql.createConnection({
                        host     : 'localhost',
                        user     :'root',
                        password : '',
                        database : 'project'
                      });
                      connection.connect();
                      connection.query(`UPDATE persons SET Name ='${item.Name}', Dob ='${item.Date1}', Contact='${item.Contact}', Email = '${item.Email}' WHERE Id ='${item.Id}'`, function (error, results, fields) {
                        if (error) reject(error);
                        
                        resolve(results);
                      });
                
                })
            }
        },
        {
            method:"POST",
                path:"/delete",
                handler: (request,reply)=>{
                   var  item = request.payload;
                    return new Promise((resolve,reject)=>{
                        const connection = mysql.createConnection({
                            host     : 'localhost',
                            user     :'root',
                            password : '',
                            database : 'project'
                          });
                          connection.connect();
                          connection.query(`delete from  persons  WHERE Id ='${item}'`, function (error, results, fields) {
                            if (error) reject(error);
                            
                            resolve(results);
                          });
                    
                    })
                }
            }
]);
    
  
 
  server.start();
    console.log('Server running on %s', server.info.uri);


process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});
