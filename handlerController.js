const { readdirSync } = require("fs");
const { join } = require('path')
const ascii = require("ascii-table");
const color = require('colors')
let table = new ascii("Command Handler");
table.setHeading("Comandos", "Status de carregamento");

module.exports = (client) => {
    readdirSync(join(__dirname, "commands")).forEach(dir => { 
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js")); //filtra todos arquivos .js no diretório 
        
        for (let file of commands) { // faz um loop
            let pull = require(`./commands/${dir}/${file}`); //Pega o comando
    
            if (pull.name) {//se ele consiga pegar o nome do comando ele seta o comando no client
                client.commands.set(pull.name, pull);
                table.addRow(file, '✅ -> Carregado!');//Adiciona uma linha na table
            } else {
                table.addRow(file, '❌ -> Ops, houve um erro ao carregar!'); //Se ele não conseguir ele da um erro
                continue; //e passa pro poximo comando
            }
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name)); //Se ele tiver aliases e for um array ele pega todos aliases e seta como aliase
        }
    });
    console.log(table.toString()); //Printa a table
}