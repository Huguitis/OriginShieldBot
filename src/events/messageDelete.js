module.exports = [{
type: "messageDelete",
code: `
$setGuildVar[ActiveStatus;No]

$onlyIf[$getMessageVar[StatusMessage;$messageID]!=No;]
`
}]