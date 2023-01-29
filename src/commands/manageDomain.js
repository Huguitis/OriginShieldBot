module.exports = [{
name: "manageDomain",
code: `
$addButton[2;Domain Stats;success;DomainStats_$authorID_$filterMessage[$nonEscape[$message[1]];https://;http://];no]
$addButton[2;IP Whitelist;primary;IPWhitelist_$authorID_$filterMessage[$nonEscape[$message[1]];https://;http://];no]
$addButton[1;Country Blacklist;primary;CountryBlacklist_$authorID_$filterMessage[$nonEscape[$message[1]];https://;http://];no]
$addButton[1;WAF;primary;WAF_$authorID_$filterMessage[$nonEscape[$message[1]];https://;http://];no]
$addButton[1;Cache;primary;Cache_$authorID_$filterMessage[$nonEscape[$message[1]];https://;http://];no]
$addButton[1;Force SSL;primary;ForceSSL_$authorID_$filterMessage[$nonEscape[$message[1]];https://;http://];no]
$addButton[1;Security Mode;primary;SecurityMode_$authorID_$filterMessage[$nonEscape[$message[1]];https://;http://];no]
$footer[1;Developed By Huguitis#4583 | Command Executed By $userTag]
$color[1;Yellow]
$description[1;> $nonEscape[$getVar[InfoEmoji]] **__Manage your OriginShield domain:__**
$filterMessage[$nonEscape[$message[1]];https://;http://]

• **Available Options:**
- \`Security Mode\`: Switch between security modes.
- \`Force SSL\`: Enable/Disable Force SSL.
- \`Cache\`: Enable/Disable Cache.
- \`WAF\`: Enable/Disable WAF.
- \`Country Blacklist\`: Add/Remove Country to Blacklist.
- \`IP Whitelist\`: Add/Remove IP to Whitelist.
> **Note:**  *We have setup general rules that contains 99% of the known patterns involved in website vulnerabilities like Nginx Anti XSS & SQL Injections, if your application requires more customisation, please create a ticket.*]

$onlyIf[$checkContains[$message[1];https://;http://]!=true;{newEmbed:{description:$nonEscape[$getVar[ErrorEmoji]] **Please do not include \`https://\` or \`http://\` in the message!**}{color:Red}}]

$onlyIf[$message[1]!=;{newEmbed:{color:Red}{description:$nonEscape[$getVar[ErrorEmoji]] **__Please include your domain in the message.__**}}]

$onlyIf[$getObjectProperty[output]!=403 error;{newEmbed:{color:Red}{description:$nonEscape[$getVar[ErrorEmoji]] **__Your credentials are not longer valid.__ Please reset them with the command \`$getVar[BotPrefix]setCredentials\`.**}}]

$createObject[$httpRequest[http://api.originshield.net:$getGlobalUserVar[OriginShieldApiPort]/api/hello;GET;;;;{"Authorization": "Bearer $getGlobalUserVar[OriginShieldApiKey]"}]]

$onlyIf[$getGlobalUserVar[OriginShieldApiKey]!=None;{newEmbed:{description:$nonEscape[$getVar[ErrorEmoji]] **__You need to set your Origin Shield api credentials first!__ To do it, use \`$getVar[BotPrefix]setCredentials\`**}{color:Red}}]
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionEdit[;{newEmbed:{color:Yellow}{footer:Developed By Huguitis#4583 | Command Executed By $userTag}{description:
> $nonEscape[$getVar[InfoEmoji]] **__Manage your OriginShield domain#COLON#__**
$advancedTextSplit[$interactionData[customId];_;3]

• **Available Options#COLON#**
- \`Security Mode\`#COLON# Switch between security modes.
- \`Force SSL\`#COLON# Enable/Disable Force SSL.
- \`Cache\`#COLON# Enable/Disable Cache.
- \`WAF\`#COLON# Enable/Disable WAF.
- \`Country Blacklist\`#COLON# Add/Remove Country to Blacklist.
- \`IP Whitelist\`#COLON# Add/Remove IP to Whitelist.
> **Note#COLON#**  *We have setup general rules that contains 99% of the known patterns involved in website vulnerabilities like Nginx Anti XSS & SQL Injections, if your application requires more customisation, please create a ticket.*
}};
{actionRow:{button:Security Mode:primary:SecurityMode_$authorID_$advancedTextSplit[$interactionData[customId];_;3]}
{button:Force SSL:primary:ForceSSL_$authorID_$advancedTextSplit[$interactionData[customId];_;3]}
{button:Cache:primary:Cache_$authorID_$advancedTextSplit[$interactionData[customId];_;3]}
{button:WAF:primary:WAF_$authorID_$advancedTextSplit[$interactionData[customId];_;3]}
{button:Country Blacklist:primary:CountryBlacklist_$authorID_$advancedTextSplit[$interactionData[customId];_;3]}}
{actionRow:{button:IP Whitelist:primary:IPWhitelist_$authorID_$advancedTextSplit[$interactionData[customId];_;3]}
{button:Domain Stats:success:DomainStats_$authorID_$advancedTextSplit[$interactionData[customId];_;3]}}]

$let[RemoveObject;$interactionDeferUpdate]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{newEmbed:{description:$nonEscape[$getVar[ErrorEmoji]] **You cannot use this button!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]
        
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==GoBack;]
`


// Available Options:
}, {
type: "interaction",
prototype: "button",
code: `
$interactionEdit[;{newEmbed:{color:Yellow}{footer:Developed By Huguitis#4583 | Command Executed By $userTag}{description:
> $nonEscape[$getVar[InfoEmoji]] **__Switch between security modes#COLON#__**
• **Available Modes#COLON#**
- \`None\`#COLON# OriginShield is essentially switched off.
- \`Low\`#COLON# OriginShield is active but invisible, this method uses HTTP response headers to block bots and DDoS attacks. Can block 75% of the attacks.
- \`Medium\`#COLON# OriginShield is active but invisible, Javascript challenge enabled, can block 90% of the attacks **(Recommended)**.
- \`High\`#COLON# OriginShield is active, Javascript challenge and captcha v2 enabled, can block 99.9% of the attacks.
> **Note#COLON#** *OriginShield automatically switches between these modes when your website is attacked, it will choose the right mode depending on the size of the attack.*
}};
{actionRow:{button:None:primary:None_$authorID_$advancedTextSplit[$interactionData[customId];_;3]}
{button:Low:primary:Low_$authorID_$advancedTextSplit[$interactionData[customId];_;3]}{button:Medium:primary:Medium_$authorID_$advancedTextSplit[$interactionData[customId];_;3]}
{button:High:primary:High_$authorID_$advancedTextSplit[$interactionData[customId];_;3]}
{button:Go Back:secondary:GoBack_$authorID_$advancedTextSplit[$interactionData[customId];_;3]}}]

$let[RemoveObject;$interactionDeferUpdate]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{newEmbed:{description:$nonEscape[$getVar[ErrorEmoji]] **You cannot use this button!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]
        
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==SecurityMode;]
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionEdit[;{newEmbed:{color:Yellow}{footer:Developed By Huguitis#4583 | Command Executed By $userTag}{description:
> $nonEscape[$getVar[InfoEmoji]] **__Enable/Disable Force SSL#COLON#__**
• **Available Options#COLON#**
- \`Enable\`#COLON# Enable Force SSL for the domain.
- \`Disable\`#COLON# Disable Force SSL for the domain.
}};
{actionRow:{button:Enable:success:EnableForceSSL_$authorID_$advancedTextSplit[$interactionData[customId];_;3]}{button:Disable:danger:DisableForceSSL_$authorID_$advancedTextSplit[$interactionData[customId];_;3]}
{button:Go Back:secondary:GoBack_$authorID_$advancedTextSplit[$interactionData[customId];_;3]}}]

$let[RemoveObject;$interactionDeferUpdate]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{newEmbed:{description:$nonEscape[$getVar[ErrorEmoji]] **You cannot use this button!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]
        
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==ForceSSL;]
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionEdit[;{newEmbed:{color:Yellow}{footer:Developed By Huguitis#4583 | Command Executed By $userTag}{description:
> $nonEscape[$getVar[InfoEmoji]] **__Enable/Disable Cache#COLON#__**
• **Available Options#COLON#**
- \`Enable\`#COLON# Enable Cache for the domain.
- \`Disable\`#COLON# Disable Cache for the domain.
}};
{actionRow:{button:Enable:success:EnableCache_$authorID_$advancedTextSplit[$interactionData[customId];_;3]}{button:Disable:danger:DisableCache_$authorID_$advancedTextSplit[$interactionData[customId];_;3]}
{button:Go Back:secondary:GoBack_$authorID_$advancedTextSplit[$interactionData[customId];_;3]}}]

$let[RemoveObject;$interactionDeferUpdate]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{newEmbed:{description:$nonEscape[$getVar[ErrorEmoji]] **You cannot use this button!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]
        
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==Cache;]
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionEdit[;{newEmbed:{color:Yellow}{footer:Developed By Huguitis#4583 | Command Executed By $userTag}{description:
> $nonEscape[$getVar[InfoEmoji]] **__Enable/Disable WAF#COLON#__**
• **Available Options#COLON#**
- \`Enable\`#COLON# Enable WAF for the domain.
- \`Disable\`#COLON# Disable WAF for the domain.
}};
{actionRow:{button:Enable:success:EnableWAF_$authorID_$advancedTextSplit[$interactionData[customId];_;3]}{button:Disable:danger:DisableWAF_$authorID_$advancedTextSplit[$interactionData[customId];_;3]}
{button:Go Back:secondary:GoBack_$authorID_$advancedTextSplit[$interactionData[customId];_;3]}}]

$let[RemoveObject;$interactionDeferUpdate]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{newEmbed:{description:$nonEscape[$getVar[ErrorEmoji]] **You cannot use this button!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]
        
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==WAF;]
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionEdit[;{newEmbed:{color:Yellow}{footer:Developed By Huguitis#4583 | Command Executed By $userTag}{description:
> $nonEscape[$getVar[InfoEmoji]] **__Add/Remove Country to Blacklist#COLON#__**
• **Available Options#COLON#**
- \`Add\`#COLON# Adds a Country to Blacklist.
- \`Remove\`#COLON# Removes a Country from Blacklist.
> **Note#COLON#** *Country must be entered with it's Alpha-2 code.*
> *You can see the available Alpha-2 codes [here](https://www.iban.com/country-codes).*
}};
{actionRow:{button:Add:success:AddCountryBlacklist_$authorID_$advancedTextSplit[$interactionData[customId];_;3]}{button:Remove:danger:RemoveCountryBlacklist_$authorID_$advancedTextSplit[$interactionData[customId];_;3]}
{button:Go Back:secondary:GoBack_$authorID_$advancedTextSplit[$interactionData[customId];_;3]}}]

$let[RemoveObject;$interactionDeferUpdate]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{newEmbed:{description:$nonEscape[$getVar[ErrorEmoji]] **You cannot use this button!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]
        
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==CountryBlacklist;]
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionEdit[;{newEmbed:{color:Yellow}{footer:Developed By Huguitis#4583 | Command Executed By $userTag}{description:
> $nonEscape[$getVar[InfoEmoji]] **__Add/Remove IP to Whitelist#COLON#__**
• **Available Options#COLON#**
- \`Add\`#COLON# Adds an IP to Whitelist.
- \`Remove\`#COLON# Removes an IP from Whitelist.
}};
{actionRow:{button:Add:success:AddIPWhitelist_$authorID_$advancedTextSplit[$interactionData[customId];_;3]}{button:Remove:danger:RemoveIPWhitelist_$authorID_$advancedTextSplit[$interactionData[customId];_;3]}
{button:Go Back:secondary:GoBack_$authorID_$advancedTextSplit[$interactionData[customId];_;3]}}]

$let[RemoveObject;$interactionDeferUpdate]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{newEmbed:{description:$nonEscape[$getVar[ErrorEmoji]] **You cannot use this button!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]
        
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==IPWhitelist;]
`


// Add/Remove IP Whitelist
}, {
type: "interaction",
prototype: "button",
code: `
$interactionEdit[;{newEmbed:{color:Yellow}{footer:Developed By Huguitis#4583 | Command Executed By $userTag}{description:> **Please __send__ the IPv4 or IPv6 you want to whitelist, remember to include the subnet size (CIDR)**
**For example, 90.164.2.122/32**
***Subnet Cheat Sheet#COLON#***}{image:https://cdn.discordapp.com/attachments/924788187539316777/1060991415930335242/subnets-2.png.webp}}]

$let[RemoveObject;$interactionDeferUpdate]

$awaitMessages[$channelID;$authorID;2m;everything;addipwhitelist;{newEmbed:{color:Red}{description:$nonEscape[$getVar[ErrorEmoji]] **Out of time.**}};{"Domain": "$advancedTextSplit[$interactionData[customId];_;3]"}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{newEmbed:{description:$nonEscape[$getVar[ErrorEmoji]] **You cannot use this button!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]
        
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==AddIPWhitelist;]
`
}, {
type: "awaited",
name: "addipwhitelist",
code: `
$addButton[1;Go Back;secondary;GoBack_$authorID_$advancedTextSplit[$interactionData[customId];_;3];no]
$color[1;Green]
$footer[1;Developed By Huguitis#4583 | Command Executed By $userTag]
$description[1;> $nonEscape[$getVar[SuccessEmoji]] **__Successfully added \`$message[1]\` to the whitelist!__**]
$let[Remove;$httpRequest[http://api.originshield.net:$getGlobalUserVar[OriginShieldApiPort]/api/whitelist_IP/$awaitData[Domain]/$message[1];GET;;;;{"Authorization": "Bearer $getGlobalUserVar[OriginShieldApiKey]"}]]
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionEdit[;{newEmbed:{footer:Developed By Huguitis#4583 | Command Executed By $userTag}{color:Yellow}{description:> **Please __send__ the IPv4 or IPv6 you want to remove from whitelist, remember to include the subnet size (CIDR)**
**For example, 90.164.2.122/32**
***Subnet Cheat Sheet#COLON#***}{image:https://cdn.discordapp.com/attachments/924788187539316777/1060991415930335242/subnets-2.png.webp}}]

$let[RemoveObject;$interactionDeferUpdate]

$awaitMessages[$channelID;$authorID;2m;everything;removeipwhitelist;{newEmbed:{color:Red}{description:$nonEscape[$getVar[ErrorEmoji]] **Out of time.**}};{"Domain": "$advancedTextSplit[$interactionData[customId];_;3]"}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{newEmbed:{description:$nonEscape[$getVar[ErrorEmoji]] **You cannot use this button!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]
        
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==RemoveIPWhitelist;]
`
}, {
type: "awaited",
name: "removeipwhitelist",
code: `
$addButton[1;Go Back;secondary;GoBack_$authorID_$advancedTextSplit[$interactionData[customId];_;3];no]
$color[1;Green]
$footer[1;Developed By Huguitis#4583 | Command Executed By $userTag]
$description[1;> $nonEscape[$getVar[SuccessEmoji]] **__Successfully removed \`$message[1]\` from the whitelist!__**]
$let[Remove;$httpRequest[http://api.originshield.net:$getGlobalUserVar[OriginShieldApiPort]/api/remove_whitelist_IP/$awaitData[Domain]/$message[1];GET;;;;{"Authorization": "Bearer $getGlobalUserVar[OriginShieldApiKey]"}]]
`


// Add/Remove Country Blacklist
}, {
type: "interaction",
prototype: "button",
code: `
$interactionEdit[;{newEmbed:{color:Yellow}{footer:Developed By Huguitis#4583 | Command Executed By $userTag}{description:> **Please __send__ the country you want to blacklist as the Alpha-2 code.**
**For example, ES (For Spain)**
***Alpha-2 Codes#COLON#*** https://www.iban.com/country-codes}}]

$let[RemoveObject;$interactionDeferUpdate]

$awaitMessages[$channelID;$authorID;2m;everything;addcountryblacklist;{newEmbed:{color:Red}{description:$nonEscape[$getVar[ErrorEmoji]] **Out of time.**}};{"Domain": "$advancedTextSplit[$interactionData[customId];_;3]"}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{newEmbed:{description:$nonEscape[$getVar[ErrorEmoji]] **You cannot use this button!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]
        
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==AddCountryBlacklist;]
`
}, {
type: "awaited",
name: "addcountryblacklist",
code: `
$addButton[1;Go Back;secondary;GoBack_$authorID_$advancedTextSplit[$interactionData[customId];_;3];no]
$color[1;Green]
$footer[1;Developed By Huguitis#4583 | Command Executed By $userTag]
$description[1;> $nonEscape[$getVar[SuccessEmoji]] **__Successfully added \`$message[1]\` to the blacklist!__**]
$let[Remove;$httpRequest[http://api.originshield.net:$getGlobalUserVar[OriginShieldApiPort]/api/blacklist_country/$awaitData[Domain]/$message[1];GET;;;;{"Authorization": "Bearer $getGlobalUserVar[OriginShieldApiKey]"}]]
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionEdit[;{newEmbed:{color:Yellow}{footer:Developed By Huguitis#4583 | Command Executed By $userTag}{description:> **Please __send__ the country you want to remove from blacklist as the Alpha-2 code.**
**For example, ES (For Spain)**
***Alpha-2 Codes#COLON#*** https://www.iban.com/country-codes}}]

$let[RemoveObject;$interactionDeferUpdate]

$awaitMessages[$channelID;$authorID;2m;everything;removecountryblacklist;{newEmbed:{color:Red}{description:$nonEscape[$getVar[ErrorEmoji]] **Out of time.**}};{"Domain": "$advancedTextSplit[$interactionData[customId];_;3]"}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{newEmbed:{description:$nonEscape[$getVar[ErrorEmoji]] **You cannot use this button!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]
        
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==RemoveCountryBlacklist;]
`
}, {
type: "awaited",
name: "removecountryblacklist",
code: `
$addButton[1;Go Back;secondary;GoBack_$authorID_$advancedTextSplit[$interactionData[customId];_;3];no]
$color[1;Green]
$footer[1;Developed By Huguitis#4583 | Command Executed By $userTag]
$description[1;> $nonEscape[$getVar[SuccessEmoji]] **__Successfully removed \`$message[1]\` from the blacklist!__**]
$let[Remove;$httpRequest[http://api.originshield.net:$getGlobalUserVar[OriginShieldApiPort]/api/remove_blacklist_country/$awaitData[Domain]/$message[1];GET;;;;{"Authorization": "Bearer $getGlobalUserVar[OriginShieldApiKey]"}]]
`


// WAF Enable/Disable:
}, {
type: "interaction",
prototype: "button",
code: `
$interactionEdit[;{newEmbed:{color:Green}{footer:Developed By Huguitis#4583 | Command Executed By $userTag}{description:
> $nonEscape[$getVar[SuccessEmoji]] **__WAF is now \`Enabled\`!__**
}};
{actionRow:{button:Go Back:secondary:GoBack_$authorID_$advancedTextSplit[$interactionData[customId];_;3]}}]
$let[Remove;$httpRequest[http://api.originshield.net:$getGlobalUserVar[OriginShieldApiPort]/api/enable_waf/$advancedTextSplit[$interactionData[customId];_;3];GET;;;;{"Authorization": "Bearer $getGlobalUserVar[OriginShieldApiKey]"}]]

$let[RemoveObject;$interactionDeferUpdate]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{newEmbed:{description:$nonEscape[$getVar[ErrorEmoji]] **You cannot use this button!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==EnableWAF;]
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionEdit[;{newEmbed:{color:Green}{footer:Developed By Huguitis#4583 | Command Executed By $userTag}{description:
> $nonEscape[$getVar[SuccessEmoji]] **__WAF is now \`Disabled\`!__**
}};
{actionRow:{button:Go Back:secondary:GoBack_$authorID_$advancedTextSplit[$interactionData[customId];_;3]}}]
$let[Remove;$httpRequest[http://api.originshield.net:$getGlobalUserVar[OriginShieldApiPort]/api/disable_waf/$advancedTextSplit[$interactionData[customId];_;3];GET;;;;{"Authorization": "Bearer $getGlobalUserVar[OriginShieldApiKey]"}]]

$let[RemoveObject;$interactionDeferUpdate]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{newEmbed:{description:$nonEscape[$getVar[ErrorEmoji]] **You cannot use this button!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==DisableWAF;]
`


// Cache Enable/Disable:
}, {
type: "interaction",
prototype: "button",
code: `
$interactionEdit[;{newEmbed:{color:Green}{footer:Developed By Huguitis#4583 | Command Executed By $userTag}{description:
> $nonEscape[$getVar[SuccessEmoji]] **__Cache is now \`Enabled\`!__**
}};
{actionRow:{button:Go Back:secondary:GoBack_$authorID_$advancedTextSplit[$interactionData[customId];_;3]}}]
$let[Remove;$httpRequest[http://api.originshield.net:$getGlobalUserVar[OriginShieldApiPort]/api/enable_cache/$advancedTextSplit[$interactionData[customId];_;3];GET;;;;{"Authorization": "Bearer $getGlobalUserVar[OriginShieldApiKey]"}]]

$let[RemoveObject;$interactionDeferUpdate]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{newEmbed:{description:$nonEscape[$getVar[ErrorEmoji]] **You cannot use this button!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==EnableCache;]
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionEdit[;{newEmbed:{color:Green}{footer:Developed By Huguitis#4583 | Command Executed By $userTag}{description:
> $nonEscape[$getVar[SuccessEmoji]] **__Cache is now \`Disabled\`!__**
}};
{actionRow:{button:Go Back:secondary:GoBack_$authorID_$advancedTextSplit[$interactionData[customId];_;3]}}]
$let[Remove;$httpRequest[http://api.originshield.net:$getGlobalUserVar[OriginShieldApiPort]/api/disable_cache/$advancedTextSplit[$interactionData[customId];_;3];GET;;;;{"Authorization": "Bearer $getGlobalUserVar[OriginShieldApiKey]"}]]

$let[RemoveObject;$interactionDeferUpdate]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{newEmbed:{description:$nonEscape[$getVar[ErrorEmoji]] **You cannot use this button!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==DisableCache;]
`


// Force SSL Enable/Disable:
}, {
type: "interaction",
prototype: "button",
code: `
$interactionEdit[;{newEmbed:{color:Green}{footer:Developed By Huguitis#4583 | Command Executed By $userTag}{description:
> $nonEscape[$getVar[SuccessEmoji]] **__Force SSL is now \`Enabled\`!__**
}};
{actionRow:{button:Go Back:secondary:GoBack_$authorID_$advancedTextSplit[$interactionData[customId];_;3]}}]
$let[Remove;$httpRequest[http://api.originshield.net:$getGlobalUserVar[OriginShieldApiPort]/api/enable_force_ssl/$advancedTextSplit[$interactionData[customId];_;3];GET;;;;{"Authorization": "Bearer $getGlobalUserVar[OriginShieldApiKey]"}]]

$let[RemoveObject;$interactionDeferUpdate]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{newEmbed:{description:$nonEscape[$getVar[ErrorEmoji]] **You cannot use this button!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==EnableForceSSL;]
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionEdit[;{newEmbed:{color:Green}{footer:Developed By Huguitis#4583 | Command Executed By $userTag}{description:
> $nonEscape[$getVar[SuccessEmoji]] **__Force SSL is now \`Disabled\`!__**
}};
{actionRow:{button:Go Back:secondary:GoBack_$authorID_$advancedTextSplit[$interactionData[customId];_;3]}}]
$let[Remove;$httpRequest[http://api.originshield.net:$getGlobalUserVar[OriginShieldApiPort]/api/disable_force_ssl/$advancedTextSplit[$interactionData[customId];_;3];GET;;;;{"Authorization": "Bearer $getGlobalUserVar[OriginShieldApiKey]"}]]

$let[RemoveObject;$interactionDeferUpdate]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{newEmbed:{description:$nonEscape[$getVar[ErrorEmoji]] **You cannot use this button!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==DisableForceSSL;]
`


// Available Modes:
}, {
type: "interaction",
prototype: "button",
code: `
$interactionEdit[;{newEmbed:{color:Green}{footer:Developed By Huguitis#4583 | Command Executed By $userTag}{description:
> $nonEscape[$getVar[SuccessEmoji]] **__Successfully switched security mode to \`None\`!__**
OriginShield now is essentially switched off.
}};
{actionRow:{button:Go Back:secondary:GoBack_$authorID_$advancedTextSplit[$interactionData[customId];_;3]}}]
$let[Remove;$httpRequest[http://api.originshield.net:$getGlobalUserVar[OriginShieldApiPort]/api/switch_security/$advancedTextSplit[$interactionData[customId];_;3]/none;GET;;;;{"Authorization": "Bearer $getGlobalUserVar[OriginShieldApiKey]"}]]

$let[RemoveObject;$interactionDeferUpdate]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{newEmbed:{description:$nonEscape[$getVar[ErrorEmoji]] **You cannot use this button!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==None;]
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionEdit[;{newEmbed:{color:Green}{footer:Developed By Huguitis#4583 | Command Executed By $userTag}{description:
> $nonEscape[$getVar[SuccessEmoji]] **__Successfully switched security mode to \`Low\`!__**
OriginShield now is active but invisible, this method uses HTTP response headers to block bots and DDoS attacks. Can block 75% of the attacks.
}};
{actionRow:{button:Go Back:secondary:GoBack_$authorID_$advancedTextSplit[$interactionData[customId];_;3]}}]
$let[Remove;$httpRequest[http://api.originshield.net:$getGlobalUserVar[OriginShieldApiPort]/api/switch_security/$advancedTextSplit[$interactionData[customId];_;3]/low;GET;;;;{"Authorization": "Bearer $getGlobalUserVar[OriginShieldApiKey]"}]]

$let[RemoveObject;$interactionDeferUpdate]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{newEmbed:{description:$nonEscape[$getVar[ErrorEmoji]] **You cannot use this button!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==Low;]
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionEdit[;{newEmbed:{color:Green}{footer:Developed By Huguitis#4583 | Command Executed By $userTag}{description:
> $nonEscape[$getVar[SuccessEmoji]] **__Successfully switched security mode to \`Medium\`!__**
OriginShield now is active but invisible, Javascript challenge enabled, can block 90% of the attacks.
}};
{actionRow:{button:Go Back:secondary:GoBack_$authorID_$advancedTextSplit[$interactionData[customId];_;3]}}]
$let[Remove;$httpRequest[http://api.originshield.net:$getGlobalUserVar[OriginShieldApiPort]/api/switch_security/$advancedTextSplit[$interactionData[customId];_;3]/medium;GET;;;;{"Authorization": "Bearer $getGlobalUserVar[OriginShieldApiKey]"}]]

$let[RemoveObject;$interactionDeferUpdate]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{newEmbed:{description:$nonEscape[$getVar[ErrorEmoji]] **You cannot use this button!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==Medium;]
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionEdit[;{newEmbed:{color:Green}{footer:Developed By Huguitis#4583 | Command Executed By $userTag}{description:
> $nonEscape[$getVar[SuccessEmoji]] **__Successfully switched security mode to \`High\`!__**
OriginShield now is active, Javascript challenge and captcha v2 enabled, can block 99.9% of the attacks.
}};
{actionRow:{button:Go Back:secondary:GoBack_$authorID_$advancedTextSplit[$interactionData[customId];_;3]}}]
$let[Remove;$httpRequest[http://api.originshield.net:$getGlobalUserVar[OriginShieldApiPort]/api/switch_security/$advancedTextSplit[$interactionData[customId];_;3]/high;GET;;;;{"Authorization": "Bearer $getGlobalUserVar[OriginShieldApiKey]"}]]

$let[RemoveObject;$interactionDeferUpdate]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{newEmbed:{description:$nonEscape[$getVar[ErrorEmoji]] **You cannot use this button!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==High;]
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionEdit[;{newEmbed:{color:Green}{footer:Developed By Huguitis#4583 | Command Executed By $userTag}{description:
> $nonEscape[$getVar[SuccessEmoji]] **__Domain Status:__**

**- __Total Requests:__** $getObjectProperty[requestCounter]
**- __2xx Responses:__** $getObjectProperty[responses2xx]
**- __3xx Responses:__** $getObjectProperty[responses3xx]
**- __4xx Responses:__** $getObjectProperty[responses4xx]
**- __5xx Responses:__** $getObjectProperty[responses5xx]

**- __Requests per second:__** $httpRequest[http://api.originshield.net:$getGlobalUserVar[OriginShieldApiPort]/api/requests/$advancedTextSplit[$interactionData[customId];_;3];GET;;requestPerSecond;;{"Authorization": "Bearer $getGlobalUserVar[OriginShieldApiKey]"}]}};
{actionRow:{button:Go Back:secondary:GoBack_$authorID_$advancedTextSplit[$interactionData[customId];_;3]}}]

$let[RemoveObject;$interactionDeferUpdate]

$createObject[$httpRequest[http://api.originshield.net:$getGlobalUserVar[OriginShieldApiPort]/api/stats/$advancedTextSplit[$interactionData[customId];_;3];GET;;;;{"Authorization": "Bearer $getGlobalUserVar[OriginShieldApiKey]"}]]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{newEmbed:{description:$nonEscape[$getVar[ErrorEmoji]] **You cannot use this button!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==DomainStats;]
`
}]
