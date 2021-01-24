console.log("starting");

var nextShipId = 0;

function removeShip(id, party) {
    console.log("removing " + id + " from " + party);

    document.getElementById(id).remove();
}

function makeDropdown(name, id, choices) {
    var dropdown = document.createElement("select");

    dropdown.name = name;
    dropdown.id = id;
    dropdown.className = "form-control";

    for (choice of choices) {
        var option = document.createElement("option");
        option.className = "form-control";
        option.value = choice;
        option.appendChild(document.createTextNode(choice));
        dropdown.appendChild(option);
    }

    return dropdown;
}

function makeLabel(id, labelString) {
    var label = document.createElement("label");
    label.htmlFor = id;
    label.className = "form-check-label";
    label.appendChild(document.createTextNode(labelString));
    return label;
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

    var size_group = document.createElement("div");
    size_group.className = "form-group";
    panelbody.appendChild(size_group);

    size_group.appendChild(makeLabel("size-"+id, "size"));
    size_group.appendChild(makeDropdown("size", "size-"+id,
                          [
                              "interceptor",
                              "cruiser",
                              "dreadnought",
                              "starbase"
                          ]));

    nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    numerical_choices = ["yellow",
                         "orange",
                         "blue",
                         "red",
                         "purple",
                         "yellow_missile",
                         "orange_missile",
                         "computer",
                         "shield",
                         "hull",
                         "initiative",
                         "number"];

    for (choice of numerical_choices){
        var choiceid = choice + "-" + id;

        var group = document.createElement("div");
        group.className = "form-group";
        panelbody.appendChild(group);

        group.appendChild(makeLabel(choiceid, choice));
        group.appendChild(makeDropdown(choice, choiceid, nums));
    }

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
        initiative: "initiative",
        number: 1
    };


    newship.appendChild(panelbody);

    form.appendChild(newship);
    nextShipId++;
}

function findChildrenByClass(node, className) {
    var children = [];
    for (let i = 0; i < node.childNodes.length; i++) {
        if (node.childNodes[i].className && node.childNodes[i].className.includes(className)) {
            children.push(node.childNodes[i]);
        }
    }
    return children;
}

function findChildrenByNodeType(node, nodeType) {
    var children = [];
    for (let i = 0; i < node.childNodes.length; i++) {
        if (node.childNodes[i].nodeName === nodeType) {
            children.push(node.childNodes[i]);
        }
    }
    return children;
}


function extractShips(party) {
    var form = document.getElementById(party);
    var ships = [];

    console.log("extracting ships for " + party);

    var panels = findChildrenByClass(form, "panel");
    for (panel of panels) {
        console.log("in a panel");
        var panelbody = findChildrenByClass(panel, "panel-body")[0];
        var ship = {};
        var formgroups = findChildrenByClass(panelbody, "form-group");
        for (formgroup of formgroups) {
            console.log("in a form group");
            var opt = findChildrenByNodeType(formgroup, "SELECT")[0];
            ship[opt.name] = opt.value;
        }
        console.log("constructed ship " + JSON.stringify(ship))
        ships.push(ship);
    }

    console.log("extracted " + ships);

    return ships;
}

document.getElementById("attacker-add-ship").onclick = function() { addShip("attackers") };
document.getElementById("defender-add-ship").onclick = function() { addShip("defenders") };

document.getElementById("submit").onclick = function() {
    var json = btoa(JSON.stringify({
        attackers: extractShips("attackers"),
        defenders: extractShips("defenders")
    }));
    window.location = "/results/" + encodeURIComponent(json);
};
