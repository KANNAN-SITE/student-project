from flask import Flask, render_template, request, redirect
import psycopg2

app = Flask(__name__)


conn = psycopg2.connect(
    host="aws-1-ap-southeast-1.pooler.supabase.com",
    database="postgres",
    user="postgres.oaiosgwqqeklecmduvui",
    password="Kannan200719761977",
    port="5432"
)
cur = conn.cursor()
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/submit", methods=["POST"])
def submit():
    name = request.form["name"]
    email = request.form["email"]
    course = request.form["course"]

    cur.execute(
        "INSERT INTO students (name,email,course) VALUES (%s,%s,%s)",
        (name,email,course)
    )
    conn.commit()

    return redirect("/")

if __name__ == "__main__":
    app.run(debug=True)