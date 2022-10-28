import mysql from 'mysql2';
import fp from 'fastify-plugin';

const Sqldb = fp(async function sqldb(fastify) {
    const connection = mysql.createConnection({
      host : fastify.config.database.host,
      user : fastify.config.database.user,
      password : fastify.config.database.password,
      database : fastify.config.database.db,
    });
    
    connection.connect((err) => {
      if (err){
        console.log(
          `Database cannot be connected: ${fastify.config.database.db} `.red
        );
        fastify.log.error(err);
      }else{
        console.log(
          `Database connected succesfully ==> ${fastify.config.database.db}\n`
            .green
        );
      }
    });

    fastify.decorate('sqldb', connection);

});

export default Sqldb;