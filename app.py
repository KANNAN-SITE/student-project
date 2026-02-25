from flask import Flask, render_template, request, redirect
import mysql.connector

app = Flask(__name__)

# MySQL connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="studentdb"
)

cursor = db.cursor()

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/submit", methods=["POST"])
def submit():
    name = request.form["name"]
    email = request.form["email"]
    course = request.form["course"]

    sql = "INSERT INTO students (name,email,course) VALUES (%s,%s,%s)"
    val = (name,email,course)

    cursor.execute(sql,val)
    db.commit()

    return redirect("/")

if __name__ == "__main__":
    app.run(debug=True)