const Discord = require('discord.js')
const secrets = require('./.env.js')
const googleSheet = require('./google.js')
const util = require('./utils')

const client = new Discord.Client();
const prefix = '!'

client.once('ready', () => {
    console.log('I live!')
})

client.on('message', message => {
    // !submit
    // All users
    if(message.content.startsWith(`${prefix}submit`)) {
        let member = message.author

        // Extract link
        let link = message.content.match(/\bhttps?:\/\/\S+/gi)

        // Process if link
        if(link){
            let status = googleSheet.submission(
                member.username,
                link[0],
                secrets['current-sheet']
            )

            // Error handeling for submissions
            if(status){
                message.channel.send(':wave: <@' + member.id + '> ' + secrets['sub-message'])
            } else {
                message.channel.send('<@' + member.id + '> Submission, you should probably contact the mods.')
            }

        } else {
            message.channel.send('<@' + member.id + '> Invalid submission')
        }
    }

    // !setsheet
    // Mods only
    if(message.content.startsWith(`${prefix}setsheet`)) {
        let role = message.member.roles.highest.name
        let check = util.checkRoles(role)

        if(check){
            let sheetNumber = message.content.match(/[0-9]+/g)
            secrets['current-sheet'] = sheetNumber[0]
            console.log(`Sheet updated: ${sheetNumber} by ${message.author.username}`)
            message.channel.send(`Working sheet set to ${sheetNumber[0]}`)
        }
    }

    // !currentsheet
    // Mods only
    if(message.content.startsWith(`${prefix}currentsheet`)) {
        let role = message.member.roles.highest.name
        let check = util.checkRoles(role)
        if(check){
            message.channel.send(`Current sheet is set to ${secrets['current-sheet']}`)
        }
    }

    // !submission-bot
    if(message.content.startsWith(`${prefix}submission-bot`)) {
        let check = util.checkRoles(role)
        if(check) {
            message.channel.send('Available commands: !submit, !currentsheet')
        } else {
            message.channel.send('You do not have high enough privaleges!')
        }
    }
})

client.login(secrets['disc-token'])
