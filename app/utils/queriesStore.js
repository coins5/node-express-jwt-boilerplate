// * This can be useful if we need to store our sql queries on files

var fs = require('fs');
module.exports = {
	selectReports : fs.readFileSync('sql/Reports/Reports.sql', 'utf-8'),
	changeContainerName: fs.readFileSync('sql/Reports/changeContainerName.sql', 'utf-8'),
	subscriptions: fs.readFileSync("sql/Reports/subscriptions.sql", "utf-8"),
	users: fs.readFileSync("sql/Reports/Users.sql", "utf-8"),
	addFolder: fs.readFileSync("sql/Reports/addFolder.sql", "utf-8"),
	moveFolder: fs.readFileSync("sql/Reports/moveFolder.sql", "utf-8")
}