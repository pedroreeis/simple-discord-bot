const { Collection } = require("discord.js")
module.exports.run = (client) => {
    client.commands = new Collection();
    client.aliases = new Collection();

    require('../handlerController.js')(client);

    console.log(`[DISCORD] Running.`);
    //Verificar os servidores que o bot esta
    client.guilds.cache.keyArray().forEach(id => {
      client.connection.query(`SELECT * FROM guilds_informations WHERE guild_id = ${id}`, async (er, row) => {
       if(!row[0]) {
        client.connection.query(`INSERT INTO guilds_informations (guild_id, guild_owner_id, guild_prefix) VALUES (${id},'${client.guilds.cache.get(id).ownerID}','!')`)
       }
       })
     })


    client.users.cache.keyArray().forEach(id => {
        client.connection.query(`SELECT * FROM users_informations WHERE user_id = ${id}`, function(err, row) {
          if(!row[0]) {
            if(client.users.cache.get(id).bot == true) {
              return;
            }else {
            client.connection.query(`INSERT INTO users_informations (user_id, user_dev) VALUES ('${id}', 'false')`)
            }
          }
        })
    })
}
