const Discord = require('discord.js')
const secrets = require('./.env.js')
const googleSheet = require('./google.js')

const client = new Discord.Client();
const prefix = '!'

client.once('ready', () => {
    console.log('Sub bot lives!')
})

client.on('message', message => {

    // !submit
    if(message.content.startsWith(`${prefix}submit`)) {
        let member = message.author
        let link = message.content.match(/\bhttps?:\/\/\S+/gi)
        if(link){
            googleSheet.addSubmission(
                member.username, 
                link[0], 
                secrets['current-sheet']
            )

            message.channel.send(':wave: <@' + member.id + '> ' + secrets['sub-message'])
        } else {
            message.channel.send('<@' + member.id + '> Invalid submission')
        }
    }

    // !sheet
    if(message.content.startsWith(`${prefix}setsheet`)) {
        let sheetNumber = message.content.match(/[0-9]+/g)
        secrets['current-sheet'] = sheetNumber[0]
        console.log(`Sheet updated: ${sheetNumber} by ${message.author.username}`)
        message.channel.send(`Working sheet set to ${sheetNumber[0]}`)
    }

    // !currentsheet
    if(message.content.startsWith(`${prefix}currentsheet`)) {
        message.channel.send(`Current sheet is set to ${secrets['current-sheet']}`)
    }

    // !test
    if(message.content.startsWith(`${prefix}test`)) {
        console.log(message.author)
        console.log(message.author.username)
        console.log(message.author.toString())
        console.log(message.author.username.toString())
    }
})

client.login(secrets['disc-token'])