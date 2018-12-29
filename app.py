import os
from flask import Flask, render_template, redirect, request, url_for
from flask_pymongo import PyMongo
from bson.objectid import ObjectId





app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'cook_book'
app.config['MONGO_URI'] = 'mongodb://thurco:youtube123@ds129540.mlab.com:29540/cook_book'

mongo = PyMongo(app)

## function for returning recipes
def get_recipes(page_number):
    recipes = mongo.db.recipe.find().skip((page_number -1) * 6).limit(6)
    return recipes
    

## function for taking a long string from a textarea and splitting it into a list.
def make_list(data):
    spliced_on_new_line = data.splitlines()
    spliced_list = []
    for ingredient in spliced_on_new_line:
        ingredient = ingredient.split(",")
        spliced_list.extend(ingredient)
        finished_list = filter(None, spliced_list) ##Filter empty list items
    return finished_list
    

@app.route("/")
def index():
    return render_template('index.html')
    

@app.route("/recipes")

##main page with the links to all recipes and options to filter/search
def recipes():
    
    recipes = get_recipes(1)
    
   
    return render_template("recipes.html", 
    recipes=recipes)
    

@app.route("/recipes/<page_number>")
def recipe_page(page_number):
    page_number = int(page_number)
    return render_template("recipe_card.html",  recipes=get_recipes(page_number))



##page to add new recipes to the database
@app.route("/add_recipe")
def add_recipe():
    
    categories = mongo.db.meal_category.find()
    category_list = [category for category in categories]
    
    return render_template("add_recipe.html", categories = category_list)
    
@app.route("/insert_recipe", methods=["POST"])
def insert_recipe():
    recipes = mongo.db.recipe
    
    ingredients_list = make_list(request.form["ingredients"])
    
    
    ## all values from the textboxes with a name of 'step'
    steps_list = request.form.getlist('step')
    

    recipe_dict = {
        "username": request.form["username"],
        "title": request.form["title"],
        "meal_category" : request.form["meal_category"],
        "time": request.form["time"],
        "price": request.form["price"],
        "calories": request.form["calories"],
        "ingredients": ingredients_list,
        "steps": steps_list,
        "upvotes": 1
    
    }
    
    recipes.insert_one(recipe_dict)
    return redirect(url_for('recipes'))
    





if __name__ == '__main__':
    app.run(host=os.environ.get('IP'), 
    port=int(os.environ.get('PORT')),
    debug=True)
    



