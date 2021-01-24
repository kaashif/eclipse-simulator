console.log("starting");

var attackers = {};
var defenders = {};

var nextShipId = 0;

function removeShip(id, party) {
    console.log("removing " + id + " from " + party);

    var ships = {};

    if (party === "attackers") {
        ships = attackers;
    } else {
        ships = defenders;
    }

    document.getElementById(id).remove();

    delete ships[id];
}

function makeDropdown() {

}

function addShip(party) {
    var form = document.getElementById(party);
    var newship = document.createElement("div");

    var id = "ship-" + nextShipId;

    newship.id = id;
    newship.className = "panel panel-default"

    var heading = document.createElement("div");
    heading.className = "panel-heading";
    heading.appendChild(document.createTextNode("This is a ship with id: " + id));
    newship.appendChild(heading);

    var remove = document.createElement("button");
    remove.id = "remove-" + nextShipId;
    remove.type = "button";
    remove.className = "btn btn-danger";
    remove.appendChild(document.createTextNode("Remove ship"));

    remove.onclick = function() {
        removeShip(id, party);
    };

    var panelbody = document.createElement("div");
    panelbody.className = "panel-body";
    panelbody.appendChild(remove);

    var ships = {};

    if (party === "attackers") {
        ships = attackers;
    } else {
        ships = defenders;
    }

    ships[id] = {
        size: "size",
        yellow: "yellows",
        orange: "oranges",
        blue: "blues",
        red: "reds",
        purple: "purples",
        yellow_missile: "yellow_missile",
        orange_missile: "orange_missile",
        computer: "computers",
        shield: "shields",
        hull: "hulls",
        initiative: "initiative"
    };


    newship.appendChild(panelbody);

    form.appendChild(newship);
    nextShipId++;
}

document.getElementById("attacker-add-ship").onclick = function() { addShip("attackers") };
document.getElementById("defender-add-ship").onclick = function() { addShip("defenders") };

document.getElementById("submit").onclick = function() {
    var json = btoa(JSON.stringify({
        attackers: attackers,
        defenders: defenders
    }));
    window.location = "/results/" + encodeURIComponent(json);
};
