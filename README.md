# The Donut Baron

<b>The Donut Baron gets *MORE DONUTS* into the hands of you and your coworkers.</b>

"Donut Day" is a joyous weekly holiday in which the "Donut Dollie" brings donuts for the office; the "Donut Dollie" changes each week, as do the types of donuts available.

**The Donut Baron** is an Open Donut Web Platform (ODWP) with the following features:

- The flexibility to allow any organization to organize and maintain their own “Donut Day.”

- A clear schedule for upcoming donut days, as well as who is responsible for bringing the donuts each week.

- A ratings system that allows users to vote on the reliability of each “Donut Dollie,” and the quality of their pastries.

The website is implemented as a Node module suitable for publishing to npm.

![Homepage Screenshot](http://i.imgur.com/G9nKFgo.jpg "Homepage Screenshot")

![Ratings Screenshot](http://i.imgur.com/urimYPF.png "Ratings Screenshot")

---

### Installation and Configuration
Download and unzip the complete "DonutBaron" directory. Run `node database/seed.js` to create a sample donut database. View sample content with **username:** cjhughes255 **password:** password1.

To create a new database for your organization, modify *database/seed.js* to insert your initial users (in place of the 3 sample users provided).

**Please note:** One user *must* have their `is_donut_baron` property set to `1` upon database creation.

### Running The Application
The entry point for the application resides in the top level directory as *app.js*. Start the server with Node by running:
```
node app.js
```
The server operates on port 8080 by default (customizable in *app.js*).

### Feature Breakdown:
##### User Account Creation/Authentication
New users can easily register to join the Donut List. Only registered users can log in and view the site.

##### Automatic Donut List Management:
The Donut List is automatically updated every week, so that all involved know exactly who is responsible for bringing the donuts.

##### Advanced Donut Ranking System:
Crazy mathematical algorithms rank the donut list members. Bring the best donuts, and make it to the top.

##### Email Notifications:
Email reminders are automatically sent to the upcoming "Donut Dollie."

##### Weekly Comments Section:
The comments section is host to weeks' hot donut gossip.

---

### Donut Glosary
**Donut Baron** : The name of this, the greatest website in all the land.

**Donut Day** : The world's greatest pastry themed weekly holiday. Everybody gets donuts.

**Donut Dollie** : The courier of donuts for the week.
