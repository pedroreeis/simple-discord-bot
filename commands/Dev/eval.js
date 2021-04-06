module.exports = {
    name: "eval",
    category: "Dev",
    usage: 'eval [code]',
    aliases: ['execute', 'e'],
    description: "Comando privado",
    run: async (client, message, args) => {
      if (message.author.id == "640195412648788018") {
        const { inspect } = require("util");

        let code = args.join(" ")
        
        const user = (id) => client.users.cache.find((user) => user.id == id);
        const canal = (id) => client.channels.cache.find((c) => c.id == id);
        const role = (id) => message.guild.roles.cache.find((r) => r.id == id);
        const emoji = (id) => client.emojis.cache.find((r) => r.id == id);
        
        code = code.replace(/^`{3}(js)?|`{3}$/g, '')
        code = code.replace(/<@!?(\d{16,18})>/g, 'user($1)');
        code = code.replace(/<#?(\d{16,18})>/g, 'canal($1)');
        code = code.replace(/<@&?(\d{16,18})>/g, 'role($1)');
        code = code.replace(/<a?:.+:([0-9]+)>/g, 'emoji($1)');
        
        let result;
        
        try {
        const evaled = await eval(code);
             result = inspect(evaled, { depth: 0 }) 
        } catch (error) {
            result = error.toString();
        }
        message.channel.send(result, { code: 'js'}).then(a => {
            a.react('❌')

            const deletar = a.createReactionCollector((r, u) => r.emoji.name === "❌" && u.id === message.author.id, { time: 100000 });
            deletar.on("collect", r => {
                a.edit(`Eval Fechada`, { code: 'js'})
            })
        })
    
}
else{
    message.channel.send("Comando somente para desenvolvedores.")
}
    }
}