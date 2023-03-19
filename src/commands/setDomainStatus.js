module.exports = [{
name: "setDomainStatus",
code: `
$addButton[1;Continue;success;SetStatus_$authorID;no]
$footer[1;Embed Author: $userTag • $authorID;$userAvatar[$authorID]]
$color[1;Yellow]
$thumbnail[1;$guildIcon]
$description[1;> **__Set a domain status:__**

Create an embed message that will be updated every x seconds showing information about the requests handled by OriginShield on your domain.
Click on the "Continue" button to proceed.]

$onlyIf[$httpRequest[http://api.originshield.net:$getGlobalUserVar[OriginShieldApiPort]/api/hello;GET;;output;;{"Authorization": "Bearer $getGlobalUserVar[OriginShieldApiKey]"}]!=403 error;{newEmbed:{color:Red}{description:$nonEscape[$getVar[ErrorEmoji]] **__Your credentials are not longer valid.__ Please reset them with the command \`$getVar[BotPrefix]setCredentials\`.**}}]

$onlyIf[$getGlobalUserVar[OriginShieldApiKey]!=None;{newEmbed:{description:$nonEscape[$getVar[ErrorEmoji]] **__You need first to set your originshield credentials!__**
**Use \`$getVar[BotPrefix]setCredentials\` to do it.**}{color:Red}}]

$onlyIf[$hasAnyPerm[$guildID;$authorID;administrator;managemessages;manageguild]!=false;{newEmbed:{color:Red}{description:$nonEscape[$getVar[ErrorEmoji]] **__You don't have permission to execute this command.__ Only server administrators can do it.**}}]
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionModal[Set Domain Status;setStatusForm;
    {actionRow:
        {textInput:Domaim:1:domainInput:panel.huguitisnodes.host:yes::3:100}
    }
    {actionRow:
        {textInput:Channel Name/ID:1:channelInput:domain-status (For example):yes::1:44}
    }
    {actionRow:
        {textInput:Updates every:1:updatesInput:20s:yes::3:8}
    }
]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{newEmbed:{description:$nonEscape[$getVar[ErrorEmoji]] **You are not the author of this embed!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]
        
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==SetStatus;]
`
}, {
type: "interaction",
name: "setStatusForm",
prototype: 'modal',
code: `
$setMessageVar[StatusMessage;Yes;$get[MessageID]]

$setTimeout[DomainStatus;$textInputValue[updatesInput];{"GuildID": "$guildID", "ChannelID": "$findGuildChannel[$textInputValue[channelInput];true;$guildID]", "MessageID": "$get[MessageID]", "UserID": "$authorID", "Domain": "$textInputValue[domainInput]", "Every": "$textInputValue[updatesInput]"}]

$let[MessageID;$channelSendMessage[$findGuildChannel[$textInputValue[channelInput];true;$guildID];{newEmbed:{description:> **\`$textInputValue[domainInput]\` live stats:**}{timestamp}{color:Green}{thumbnail:$guildIcon}{footer:Updates every $textInputValue[updatesInput]}

{field:Total Requests:\`\`\`$getObjectProperty[requestCounter]\`\`\`:yes}
{field:2xx Responses:\`\`\`$getObjectProperty[responses2xx]\`\`\`:yes}
{field:3xx Responses:\`\`\`$getObjectProperty[responses3xx]\`\`\`:yes}
{field:4xx Responses:\`\`\`$getObjectProperty[responses4xx]\`\`\`:yes}
{field:5xx Responses:\`\`\`$getObjectProperty[responses5xx]\`\`\`:yes}
{field:Requests per second:\`\`\`$httpRequest[http://api.originshield.net:$getGlobalUserVar[OriginShieldApiPort]/api/requests/$textInputValue[domainInput];GET;;requestPerSecond;;{"Authorization": "Bearer $getGlobalUserVar[OriginShieldApiKey]"}]\`\`\`:no}};true]]

$createObject[$httpRequest[http://api.originshield.net:$getGlobalUserVar[OriginShieldApiPort]/api/stats/$filterMessage[$nonEscape[$textInputValue[domainInput]];https://;http://];GET;;;;{"Authorization": "Bearer $getGlobalUserVar[OriginShieldApiKey]"}]]

$setGuildVar[ActiveStatus;Yes]

$interactionUpdate[;{newEmbed:{color:Green}{footer:Embed Author#COLON# $userTag • $authorID:$userAvatar[$authorID]}{description:
> $getVar[SuccessEmoji] ***__Status message are being sent successfully!__***

**Domain#COLON#** $textInputValue[domainInput]
**Channel#COLON#** <#$findGuildChannel[$textInputValue[channelInput];true;$guildID]>
**Updates every#COLON#** $textInputValue[updatesInput]
}}]

$onlyIf[$getGuildVar[ActiveStatus]!=Yes;{newEmbed:{color:Red}{description:$getVar[ErrorEmoji] **__This server already have an active status message!__**}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]

$onlyIf[$textInputValue[updatesInput]<10;{newEmbed:{color:Red}{description:$getVar[ErrorEmoji] **__You can not put less than 10 seconds!__**}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]

$onlyIf[$textInputValue[updatesInput]>3600;{newEmbed:{color:Red}{description:$getVar[ErrorEmoji] **__You can not put more than 3600 seconds!__**}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]

$onlyIf[$checkContains[$textInputValue[updatesInput];s]!=false;{newEmbed:{color:Red}{description:> $getVar[ErrorEmoji] **__Invalid time specified!__**
**It must contain "s", for example:** \`20s (For 20 seconds)\`}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]

$onlyIf[$checkContains[$textInputValue[domainInput];https://;http://]!=true;{newEmbed:{description:$getVar[ErrorEmoji] **Please do not include \`https://\` or \`http://\` in the domain!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]

$onlyIf[$guildChannelExists[$findGuildChannel[$textInputValue[channelInput];true;$guildID];$guildID]!=false;{newEmbed:{description:$getVar[ErrorEmoji] **That's not a valid channel!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]

$onlyIf[$hasAnyPerm[$guildID;$authorID;administrator;manageguild;managemessages;banmembers;kickmembers]!=false;{newEmbed:{description:$getVar[ErrorEmoji] **You don't have permission to use this button!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]
`
}, {
name: "DomainStatus",
type: "timeout",
code: `
$setTimeout[DomainStatus;$timeoutData[Every];{"GuildID": "$timeoutData[GuildID]", "ChannelID": "$timeoutData[ChannelID]", "MessageID": "$timeoutData[MessageID]", "UserID": "$timeoutData[UserID]", "Domain": "$timeoutData[Domain]", "Every": "$timeoutData[Every]"}]

$editMessage[$timeoutData[MessageID];{newEmbed:{description:> **\`$timeoutData[Domain]\` live stats:**}{timestamp}{color:Green}{thumbnail:$guildIcon[$timeoutData[GuildID]]}{footer:Updates every $timeoutData[Every]}

{field:Total Requests:\`\`\`$getObjectProperty[requestCounter]\`\`\`:yes}
{field:2xx Responses:\`\`\`$getObjectProperty[responses2xx]\`\`\`:yes}
{field:3xx Responses:\`\`\`$getObjectProperty[responses3xx]\`\`\`:yes}
{field:4xx Responses:\`\`\`$getObjectProperty[responses4xx]\`\`\`:yes}
{field:5xx Responses:\`\`\`$getObjectProperty[responses5xx]\`\`\`:yes}
{field:Requests per second:\`\`\`$httpRequest[http://api.originshield.net:$getGlobalUserVar[OriginShieldApiPort;$timeoutData[UserID]]/api/requests/$timeoutData[Domain];GET;;requestPerSecond;;{"Authorization": "Bearer $getGlobalUserVar[OriginShieldApiKey;$timeoutData[UserID]]"}]\`\`\`:no}};$timeoutData[ChannelID]]

$createObject[$httpRequest[http://api.originshield.net:$getGlobalUserVar[OriginShieldApiPort;$timeoutData[UserID]]/api/stats/$timeoutData[Domain];GET;;;;{"Authorization": "Bearer $getGlobalUserVar[OriginShieldApiKey;$timeoutData[UserID]]"}]]

$onlyIf[$messageExists[$timeoutData[MessageID];$timeoutData[ChannelID]]!=false;]

$onlyIf[$getGuildVar[ActiveStatus;$timeoutData[GuildID]]!=No;]
`
}]
