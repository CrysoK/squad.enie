from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/aprender")
def aprender():
    return render_template("aprender.html")


@app.route("/jugar")
def jugar():
    return render_template("jugar.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=81, debug=True)
