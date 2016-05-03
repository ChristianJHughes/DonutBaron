# The Donut Baron

<b>The Donut Baron gets gets donuts in the hands of you and your coworkers.</b>

"Donut Day" is a joyous weekly holiday in which the "Donut Dollie" brings donuts for the office; the "Donut Dollie" changes each week, as do the types of donuts available.

We've created an open donut web platform (ODWP) with the following features:

    -The flexibility to allow any organization to organize and maintain their own “Donut Day.”

    -A clear schedule for upcoming donut days, as well as who is responsible for bringing the donuts
each week.

    -A ratings system that allows users to vote on the reliability of each “Donut Dollie,” and the
quality of their pastries.

### Installation and Configuration
Download and unzip the complete "DonutBaron" directory. Sample blog posts are included -- if you are inclined to start with a clean database, simply run `node database/seed.js`.

### Running The Application
Run the server using node. The entry point for the applica
```
node app.js
```
Navigate to port 8080 on the client-side to access the web content.

### Application Usage
*Index*:
The index page contains a list of all current blog posts, and a link for creating new posts. Existing posts can be easily edited or deleted.

*Blog Posts*:
Clicking on a blog post title will navigate to a page dedicated specifically to that post. Below the blog post, comments can be added, viewed, and deleted.

*Creating and Editing Blog Posts*:
Blog posts can be easily created or edited using the appropriate link on the index page. The author can specifies a title, and can write post content using any valid HTML. Below the blog post composition area resides a tool for embedding syntactically highlighted code.

**How to add a code snippet:**
1. Copy or write your code in the Code text box.
2. Specify the programming language. Specify formatting (code block or inline).
3. Press the "Add" button, and wait for the magic!
4. Your code will be wrapped in the appropriate HTML, and added to the "Post Content" composition text box.
5. Your blog post will then contain PROPER SYNTAX HIGHLIGHTING! Rejoice, all the children of the world.
