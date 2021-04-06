const { MessageEmbed } = require('discord.js')

module.exports = (client, message) => {
  client.simpleEmbed = function(description) {//Embed comum com description
        let embed = new MessageEmbed()
            .setDescription(description)
            .setColor(0x2F3136)
            .setTimestamp()
        
            message.channel.send(embed)
      }
      client.errorEmbed = function(description) {//embed de erro
          let embed = new MessageEmbed()
              .setTitle(`**Ops... Alguma coisa deu errado.**`)
              .setDescription(`${description}`)
              .setColor('RED')
              .setTimestamp()

              message.channel.send(embed)
      }
      client.customEmbed = function(author, title, description, thumbnail, image) {      
        let embed = new MessageEmbed()
            embed.setAuthor(author)
            embed.setTitle(`${title}`)
            embed.setDescription(`${description}`)
            if(thumbnail) {
            embed.setThumbnail(thumbnail) 
            }else {
                console.log(`Sem thumb`)
            }
            if(image) {
            embed.setImage(image)
            }else {
                console.log(`sem image`)
            }
            embed.setColor(0x2F3136)
            embed.setTimestamp()
            message.channel.send(embed)
    }
}