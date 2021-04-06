module.exports = {
    name: "shell",
    category: "Dev",
    usage: 'shell [cmd]',
    aliases: ['konsole', 'bash'],
    description: "Comando privado",
    run: async (client, message, args) => {
        var {exec} = require('shelljs');
      if (message.author.id == "640195412648788018") {
        const cmdarg = args.join(' ')
        if(!cmdarg) return client.errorEmbed(`Insira um comando.`)
        const execute = await exec(cmdarg);

        if (execute.code === 0)  message.channel.send(execute.stdout + execute.stderr, { code: 'bash' })
    }
    else{
        message.channel.send("Comando somente para desenvolvedores.")
    }
    }
}