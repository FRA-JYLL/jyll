from celery import shared_task
from game.models import Game


@shared_task
def start_game(game_id):
    game = Game.objects.get(id=game_id)
    game.start()
