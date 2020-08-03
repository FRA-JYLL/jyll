from celery import shared_task
from game.models import Game, Player, PlayerTurn


@shared_task
def start_game(game_id):
    """Async game setup."""
    game = Game.objects.get(id=game_id)
    game.start()


@shared_task
def run_player_turn(player_id, turn_data):
    """Async player turn, and end turn."""
    turn = PlayerTurn(**turn_data)
    player = Player.objects.get(id=player_id)
    player.run_turn(turn)

    # check if all players have finished their turn
    # end the turn if all players are ready
    if player.game.are_all_players_ready():
        player.game.end_generation()
