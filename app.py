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

def to_string(ship):
    return f"Ship has size {ship.size}, hull {ship.hull}"

def simulate(attackers, defenders):
    return {
        "attackers": [to_string(s) for s in attackers],
        "defenders": [to_string(s) for s in defenders],
        "attacker_win_prob": 20,
        "defender_win_prob": 80
    }

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
    return render_template("results.html", results=sim_result)

if __name__ == "__main__":
    app.run(port=8000, host="0.0.0.0")
