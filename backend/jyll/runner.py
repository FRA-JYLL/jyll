import json
from django.test.runner import DiscoverRunner
from game.models.building import BuildingManager
from game.models.technology import TechnologyManager
from game.models.technology_domain import TechnologyDomainManager


class JyllTestSuiteRunner(DiscoverRunner):
    def __init__(self, *args, **kwargs):
        with open("game/tests/static/building/mapping.json") as file:
            BuildingManager._mapping = json.load(file)
        with open("game/tests/static/building/data.json") as file:
            BuildingManager._data = json.load(file)

        with open("game/tests/static/technology/mapping.json") as file:
            TechnologyManager._mapping = json.load(file)
        with open("game/tests/static/technology/data.json") as file:
            TechnologyManager._data = json.load(file)

        with open("game/tests/static/technology_domain/data.json") as file:
            TechnologyDomainManager._data = json.load(file)

        super(JyllTestSuiteRunner, self).__init__(*args, **kwargs)
