module.exports = [{
name: "setCredentials",
code: `
$addButton[1;Continue;success;SetCredentials_$authorID;no]
$color[1;Yellow]
$description[1;$nonEscape[$getVar[InfoEmoji]] **__Set your OriginShield credentials:__**

For this, you will need to provide 2 things. You can obtain them on your client area.
- API Key
- Api Port

> Click on the "Continue" button to proceed.]
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionModal[Set Credentials;setCredentialsForm;
    {actionRow:
        {textInput:OriginShield Api Key:1:apikeyInput:yes:U329PjFCkqJ2LCR3bD1KVANvePW2qw9k22BUxBbJEw6uaFmzaoC:50:50}
    }
    {actionRow:
        {textInput:OriginShield Api Port:1:apiportInput:yes:2500:4:4}
    }
]
    
$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{newEmbed:{description:$nonEscape[$getVar[ErrorEmoji]] **You cannot use this button!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]
        
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==SetCredentials;]
`
}, {
type: "interaction",
name: "setCredentialsForm",
prototype: 'modal',
code: `
$interactionUpdate[;{newEmbed:{color:Green}{description:
> **__Logged In Successfully!__** $nonEscape[$getVar[SuccessEmoji]]

**Thanks for using Origin Shield.**}}]

$setGlobalUserVar[OriginShieldApiKey;$textInputValue[apikeyInput]]
$setGlobalUserVar[OriginShieldApiPort;$textInputValue[apiportInput]]

$onlyIf[$getObjectProperty[output]!=403 error;{{newEmbed:{color:Red}{description:$nonEscape[$getVar[ErrorEmoji]] **__Your credentials are not valid.__ Please check them and then execute again the command.**}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]

$createObject[$httpRequest[http://api.originshield.net:$textInputValue[apiportInput]/api/hello;GET;;;;{"Authorization": "Bearer $textInputValue[apikeyInput]"}]]

$onlyIf[$isNumber[$textInputValue[apiportInput]]!=false;{newEmbed:{color:Red}{description:$nonEscape[$getVar[ErrorEmoji]] **__Your port is not valid.__ Please check it and then execute again the command.**}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]

$suppressErrors
`
}]
