import json
import sys

input_file_name = sys.argv[1]
output_file_name = sys.argv[2]

def flatten_json(y):
    out = {}
    special_char = '.'
 
    def flatten(x, name=''):
 
        # If the Nested key-value
        # pair is of dict type
        if type(x) is dict:
 
            for a in x:
                flatten(x[a], name + a + special_char)
 
        # If the Nested key-value
        # pair is of list type
        elif type(x) is list:
 
            i = 0
 
            for a in x:
                flatten(a, name + str(i) + special_char)
                i += 1
        else:
            out[name[:-1]] = x
 
    flatten(y)
    return out

platforms = {}

platformMapping = {'Web Application': 'webapp', 'Web Services / API': 'webservice', 'Android Application': 'android', 'iOS Application': 'ios'}

all_apps = []
# apps.json
with open(input_file_name, "r") as f:
    content = json.load(f)
    for app in content["data"]:
        # platforms[  app["platformId"]["$oid"] ] = True
        print(app)

        platformName = app["platformName"]

        if platformName in platformMapping:
            platformName = platformMapping[platformName]
        else:
            continue
        platforms[ platformName ] = True


        config = app["config"]
        endpoint = None


        repository = {
            "remote": None,
            "branch": None
        }

        if "git_repo" in config:
            if not config["git_repo"] == "":
                repository["remote"] = config["git_repo"] 

        
        if "git_branch" in config:
            if not config["git_branch"] == "":
                repository["branch"] = config["git_branch"] 

        


        if "app_url" in config:
            if not config["app_url"] == "":
                endpoint = config["app_url"]



        all_apps.append(
            {
                "_id": app["application"]["applicationId"],
                "title": app["application"]["applicationName"],
                "project_id": app["projectId"],
                "platform": platformName,

                "title": app["application"]["applicationName"],

                "config": {
                    "staging": {
                            "endpoint": endpoint,
                            "repository": repository
                    }
                }

            }
        )

        
        


# app-apps-formatted.json
with open(output_file_name, "w") as f:
    for app in all_apps:
        app = json.dumps( flatten_json(app) )
        f.write(app + "\n")


# print("input_file_name", input_file_name)
# print("output_file_name", output_file_name)