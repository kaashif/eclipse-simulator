from flask import Flask, render_template
from eclipse_simulator.simulator import Ship, run_simulations
import urllib.parse
import base64
import json
from math import floor

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/about")
def about():
    return render_template("about.html")

def to_string(ship):
    return f"""{ship.number} {ship.size}(s) with: \
{ship.yellow} yellow di(c)e, \
{ship.orange} orange di(c)e, \
{ship.blue} blue di(c)e, \
{ship.red} red di(c)e, \
{ship.purple} purple di(c)e, \
{ship.yellow_missile} yellow missile di(c)e, \
{ship.orange_missile} orange missile di(c)e, \
+{ship.computer} from computers, \
gives enemies -{ship.shield} from shields, \
{ship.hull} extra hull (can take {int(ship.hull) + 1} hit(s)), \
{ship.initiative} initiative."""

def simulate(attackers, defenders):
    num_runs = 10
    attacker_prob, defender_prob = run_simulations(attackers, defenders, num_runs)
    return {
        "attackers": [to_string(s) for s in attackers],
        "defenders": [to_string(s) for s in defenders],
        "attacker_win_prob": floor(attacker_prob*100),
        "defender_win_prob": floor(defender_prob*100)
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
            initiative = ship["initiative"],
            number = ship["number"]
        )
        for ship in raw_ships
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
