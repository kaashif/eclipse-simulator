import random

class Ship:
    def __init__(self, size, yellow, orange, blue, red, purple, yellow_missile, orange_missile, computer, shield, hull, initiative, number):
        self.size = size
        self.yellow = yellow
        self.orange = orange
        self.blue = blue
        self.red = red
        self.purple = purple
        self.yellow_missile = yellow_missile
        self.orange_missile = orange_missile
        self.computer = computer
        self.shield = shield
        self.hull = hull
        self.initiative = initiative
        self.number = number

# TODO: actually simulate Eclipse
def run_simulations(attackers, defenders, num_runs):
    attack_wins = 0
    defense_wins = 0
    for _ in range(num_runs):
        winner = random.choice([0, 1])
        if winner == 0:
            attack_wins += 1
        else:
            defense_wins += 1
    return (attack_wins/num_runs, defense_wins/num_runs)