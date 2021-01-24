from flask import Flask, render_template
from eclipse_simulator.simulator import Ship
import urllib.parse
import base64
import json

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/about")
def about():
    return render_template("about.html")

def dump(obj):
    res = "{"
    for attr in dir(obj):
        res += " obj.%s = %r " % (attr, getattr(obj, attr))
    res += "}"
    return res

def simulate(attackers, defenders):
    return "attackers: \n" + "\n".join([dump(ship) for ship in attackers]) + "\ndefenders: \n" + "\n".join([dump(ship) for ship in defenders])

def to_ships(raw_ships):
    return [
        Ship(
            size = ship["size"],
            yellow = ship["yellow"],
            orange = ship["orange"],
            blue = ship["blue"],
            red = ship["red"],
            purple = ship["purple"],
            yellow_missile = ship["yellow_missile"],
            orange_missile = ship["orange_missile"],
            computer = ship["computer"],
            shield = ship["shield"],
            hull = ship["hull"],
            initiative = ship["initiative"]
        )
        for ship in raw_ships.values()
    ]

@app.route("/results/<input>")
def results(input):
    json_text = base64.b64decode(urllib.parse.unquote(input))
    raw_ships = json.loads(json_text)
    sim_result = simulate(to_ships(raw_ships["attackers"]),
                          to_ships(raw_ships["defenders"]))
    result_text = f"idk but here's the input: {sim_result}"
    return render_template("results.html", results=result_text)

if __name__ == "__main__":
    app.run(port=8000, host="0.0.0.0")
