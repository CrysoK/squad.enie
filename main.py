from flask import Flask, redirect, render_template, request
from dotenv import load_dotenv
import smtplib
import os

load_dotenv()

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


@app.route("/form", methods=["POST"])
def form():
    nombre = request.form.get("nombre")
    correo = request.form.get("correo")
    asunto = request.form.get("asunto")
    mensaje = request.form.get("mensaje")

    if correo == "" or asunto == "" or mensaje == "":
        return """
        Faltan datos obligatorios.<br>
        <a href="/">Volver</a>
        """

    server = smtplib.SMTP(
        host=os.environ["SMTP_SERVER"], port=os.environ["SMTP_PORT"]
    )
    server.starttls()
    server.login(os.environ["SMTP_USER"], os.environ["SMTP_PASSWORD"])
    server.sendmail(
        os.environ["SMTP_FROM"],
        os.environ["SMTP_TO"],
        f"From: {nombre} <{correo}>\nSubject: {asunto}\n\n{mensaje}",
    )
    return redirect("/")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=81, debug=True)
