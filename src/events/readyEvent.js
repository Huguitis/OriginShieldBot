module.exports = ({
type: "ready",
code: `
$log[
  ╭─━━━━━━━━━━━━━━━━━━━━━━━━━━━━─╮
   Client: $userTag[$clientID]
   Client ID: $clientID
   Owner: $userTag[$botOwnerID]
   Commands: $commandsCount
   Servers: $serverCount
  ╰─━━━━━━━━━━━━━━━━━━━━━━━━━━━━─╯
]
`
})