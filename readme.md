# Community Cook Book


Community Cook Book is a web application designed with the purpose of allowing users to upload and edit their own
recipes to an online database of recipes. Users can view other peoples submitted recipes and use an upvote/downvote system to
mark which recipes they enjoy or dislike.


## UX

Community Cook Book will have two types of users, readers and contributors.

####  Contriubtors

Contributors can user the 'add recipe' page to add recipes to the database. They access this page
via the navbar or the link on the landing page. They fill out the form which includes 8 required fields
which includes : 
* Title of recipe
* Submitters Username
* Recipe Category
* Time taken
* Price of the recipe
* Calories in the recipe
* Ingredients
* Creation steps


#### Readers

Readers can access the recipes that are available by heading to the 'menu' page on the navbar. From here they can
select filters to help them find more specific results. Pagination is added so that only 6 recipes appear at a time on the page.


## Features

* Landing page. Built using a bootstrap template, the landing page uses a modern looking full screen image to catch the eye of the user. It has an easy to understand navbar and large
  to action buttons for the two main areas of the site
* Menu page. This is where the recipes from the database are displayed for the user to find. It comes with a filters tab which a reader can use to filter out specific types of recipes, and pagination built in. Users can click on recipes to be taken to -
* Single Recipe page. Displays all the info and creation steps for the specific recipe.
* Add Recipe page. For contributors, this is where they can add a recipe into the database. It contains 8 fields that must be filled out by the user. Once submitted they will be redirected to -
* Newest Recipe. The recipe that was just added by the user to the database.
* Edit/Delete recipes. From the single recipe page, a user can select to edit or delete a recipe. If this project required authentication then I would have made it so that only the user who submitted the recipe (or a moderator) could delete/edit it.
* User page. A page to display stats and recipes for a specific user. Currently it shows the username, their recipe count and their upvote count.
* Upvote/downvote system. Each individual recipe has an upvote and downvote system on the page. The total upvotes is displayed and users can click an up or down arrow to change the number.
  The amount of upvotes is used to order the recipes on the menu pages.
* Database summary. This page has 3 graphs on it, which can be clicked to apply specific filters. Users can use this to see how many recipes in the database fit each filter. Each of the 3 graphs can
  have 1 filter on it, and each graph can be reset individually or all can be reset at once.

#### Potential future features

* User authentication
* Ability to upload unique recipe images. Currently there arent unique images because I have no way of checking that the content uploaded is actually a recipe.
  If this website was launched properly a moderator would be checking everything submitted and making sure it is appropriate.


## Technologies Used

* HTML5/CSS with Bootstrap 4 for layout, styling and presentation
* Python with Flask microframework for backend and connecting to the database
* MongoDB for the database. I used 2 Collections, one for the Meal Categories and one which held each individual recipe document.
* Javascript/Jquery. Used for DOM manipulation and the graphs on the database summary page.
* AJAX. Used to implement pagination without needing to reload the page by making ajax calls to specific urls and taking the html from that to
 replace the html already on the page.
* Google Charts. I used Google Charts to create the 3 pie charts on the database summary.


## Testing

The majority of the testing for this site was done manually by using the site as a pretend user. I tested every piece on functionality that the site provides.
Below is a list of the specific tests that I ran manually.

### Base Navbar

* Check the navbar is appearing correctly on all pages and that the layouts are as expected.
* Make sure the navbar is mobile responsive.
* Ensure the links in the navbar go to the correct places.
* Check the linkedin link in the footer is correct.


### Index Page

* Ensure that the call to action buttons redirect correctly.
* Double check that the templated 'database summary' numbers at the bottom of the page are accurate.
* Make sure the index page looks ok and works on mobile

### Add Recipe Page

* Try to submit a recipe without all the fields filled. Do this for every input field one at a time to make sure all are required
* Submit an ingredients list in an incorrect format, and check that the 'make_list()' function handles that as expected.
* Make sure that after submitting, the recipe enters the database in the correct collection. Ensure the user is redirected to the 'new_recipe' page.
* Check adding a new step textbox works and that the new textbox is submitted correctly to the steps list.

### Edit Recipe Page

* Check that editing a recipe and submitting it does actually edit the correct recipe that the user intended.
* Try to edit a recipe, and check that the form pre-populates with the recipes current information.
* Remove the text from one of the text-areas and submit. Make sure that a blank string isn't submitted as a step(would cause a pointless empty step to be created on the individual page)
* Check adding a new step textbox works and that the new textbox is added when the edited recipe is submitted.
* Make sure the cancel button returns the user to the correct recipe.

### Individual Recipe Page

* Check the layout is correct on mobile.
* Make sure the image that is displayed matches the meal category.
* Use the upvote and downvote system. Check that the user is returned to the correct recipe page, and that the upvote or downvote is submitted to the database correctly.
* Make sure the edit, delete and 'back to top' links work
* Ensure the ingredients list is displayed as a list and not a string.
* Test that the username link redirects to the correct user.
* Test that the Time/Price/Calories icons and text match the recipes values.
* Make sure the home button takes a user home.

### Menu Page

* Check the cards layout looks good on mobile
* Make sure the cards hover effects work as intended
* Test the filters dropdown button is working correctly.
* Click a filter. Check to see if the filter is applied (the recipes displayed should change) and that the appropriate 'clicked'
  styles are applied. Click it again and check that the filter is removed.
* Test the 'reset filters' button actually resets the filters back to none.
* Ensure the number displayed in the 'number of recipes found' text is accurate
* Check that when no recipes are found, the user sees the correct error message.
* Make sure the pagination works with and without filters.
* Click on a recipe. Check that the user is linked to the correct recipe page.
* Make sure the recipes are ordered by upvotes.
* Check the icons in the cards are accurate to the recipes values.

### User page

* Verify that the users recipe count and upvote count are accurate and change when a new upvote or recipe is added.
* Check that clicking on a users recipe redirects correctly.
* Check that the recipes displayed are indeed created by the user.
* Check that if the user tries to edit the url (for example /user/randomfakeuser) they are redirected to an error page.

### Database Summary

* Ensure the values the charts display are accurate
* Check that adding a filter to one chart updates all 3 charts to include the specific filter.
* Make sure that all 3 charts can have filters applied and that all 3 filters are applied to all 3 charts.
* Check the individual reset buttons work and that all 3 charts change to accomodate the change in filters.
* Make sure the reset all button works.


##### Database Schema

The database has 2 collections, meal category and recipe. The meal category collection contains the 7 meal categories that 
are currently available for a user to filter, select when they add new recipes etc. These are in a seperate collection so that it would be
easier to potentially add new meal categories in the future with very little to no editing required in the html or python code.

The recipe collection is where the individual recipes are stored in the form of documents. Each document has the 
same keys, to make displaying them on the webpage simply.

Each recipe has these Keys:

* Username - Used so later I can identify recipes made by the same person
* Title - Title of the recipe, displayed on the individual recipe and the menu page.
* Meal Category - links to the other collection. Selected when the user adds a recipe
* Steps - This is a list of steps that the user inputs. The amount of steps in the list depends entirely on how many the user adds themself on the add recipe page.
* Ingredients - Also a list, that the user inputs as well.
* Upvotes - By default is 1. Each individual recipe page has buttons to up or downvotes, which edits this number in the database
* Price - Either cheap, medium or expensive. User input on the add recipe page for this too.
* Time - Fast, Medium or Long. User input
* Calories - Low, Medium or High. Also a user input on the add page.
 
Price, time and calories are all displayed on the individual and menu pages, with different icons depending on 
the value.


## Deployment

The site is deployed on heroku and can be found at https://thurcos-cook-book.herokuapp.com/
The app uses Python 2.7.6 and a 'runtime.txt' file has been added to ensure that heroku knows to use this python version.

Heroku Config Vars

IP 0.0.0.0
PORT 5000

## Credits

I obtained 'dummy recipes' to prepopulate the database from:

*  realfood.tesco.com
*  blueapron.com
*  bbcgoodfood.com








