console.log("starting");

var attackerShipIds = [];
var defenderShipIds = [];

var nextShipId = 0;

function addShip(party) {
    var form = document.getElementById(party);
    var newship = document.createElement("p");
    console.log("adding ship with id " + nextShipId)
    var shiptext = document.createTextNode("This is a ship with id: " + nextShipId);
    newship.id = nextShipId;
    newship.appendChild(shiptext);
    form.appendChild(newship);
    nextShipId++;
}

document.getElementById("attacker-add-ship").addEventListener("click", function()
                                                              {
                                                                  addShip("attackers");
                                                              }, false)
document.getElementById("defender-add-ship").onclick = function() { addShip("defenders") };
