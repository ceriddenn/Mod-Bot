Moderation Bot otherwise known as Express1
-
This bot has many commands that store data in a database in this case, mongodb. In order for the bot to function you do have the edit the code a bit. Since there is no config file you will have to go into index.js and mongo.js and change the env variables to your credentials. In mongo change "process.env['SRV']" to your mongo db's srv connection string. In index.js change the client.login(process.env['TOKEN']" to your token. MAKE SURE TO REMOVE PROCESS.ENV[] OR CREATE AN .ENV FILE INSTEAD.

Commands
-
- dbstatus - returns a number determining the connection status of the database.
- ban - bans a user from the CURRENT guild (server) the command was run in.
- bans - lists the bans of a user wether they are active or old (doesn't really work well kinda glitchy)
- deafen - was a command that users could run to deafen themselves to focus while playing video games (doesn't really work as well - will be fixed in next update)
- kick - Otherwise known as a soft-ban this command will kick a user from the CURRENT guild (server) the command was run in.
- kicks - Lists the kicks of a specifed user or user-ID will only list the kicks of the guild, so if the bot was in multiple servers as say snoodle#0001 it will only lists the kicks that happened on the guild that the command was run from. Even if there were kicks on another guild.
- ping - simple ping command. Lists the latency between the client and the bot and that's pretty much it
- warn - Warns a specified user with a dm message from the bot.
- warns- Lists the amount of warns a user has and the WARN_ID of each warn, a unique UUID. This warn_id comes in handy with the next command.
- rmwarns - Removes a warn from a user with the WARN_ID specified as an argument.
- updates - This is a blank code file that has the basic structure to make a command so if your feeling smart try and make a custom command for server!

Credits
-
- Ceriddenn - Main code base
- SneakyB - Helped with some mongo stuff
