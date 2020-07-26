from flask import Flask, render_template

app = Flask(__name__)

i = 1
@app.route('/')
def root():
    pa_vad = "Hej Andreas"
    return render_template("index.html", pa_vad=pa_vad)


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=4886, debug=True)
