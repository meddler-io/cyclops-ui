import json

platforms = {}

with open("apps.json", "r") as f:
    content = json.load(f)
    for app in content["data"]:
        platforms[  app["platformId"]["$oid"] ] = True
        platforms[ app["platformName"] ] = True
        print(app)

print(platforms)

print(len(content["data"]))