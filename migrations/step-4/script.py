import json
import sys


# import necessary libraries 
from bs4 import BeautifulSoup
import html




def extract_links(text):
    links = []

    # soup = BeautifulSoup(text, 'html.parser')
    # for a_tag in soup.find_all('a', href=True):
    #     links.append(a_tag['href'])
    # return links

    # If the text is HTML, use BeautifulSoup
    # if '<html' in text.lower():
    try:

        soup = BeautifulSoup(text, 'html5lib')
        for a_tag in soup.find_all('a', href=True):
            links.append(a_tag['href'])
    
    except:
        pass

    # If the text is ASCII, use html module to parse links
    # else:
    try:

        # Parse HTML entities in ASCII text
        text = html.unescape(text)

        # Split the text into lines
        lines = text.split('\n')

        for line in lines:
            # Extract links from href attributes
            href_start = line.find('href="')
            if href_start != -1:
                href_end = line.find('"', href_start + 6)
                if href_end != -1:
                    links.append(line[href_start + 6:href_end])

            # Extract links from plain URLs
            words = line.split()
            for word in words:
                if word.startswith(('http://', 'https://', 'www.')):
                    links.append(word)

    except:
        pass
    return links






input_file_name = sys.argv[1]
secinput_file_name = sys.argv[2]

output_file_name = sys.argv[3]


app_prim_set = {

}

app_sec_set = {

}

# app-apps-formatted.json
with open(input_file_name, "r") as f:
    for line in f.readlines():
        line = json.loads(line)
        _id = line["_id.$oid"]
        p_id = line["project_id.$oid"]
        app_prim_set[_id] = line
        # print(line)

PREV_APP_COUNT = len(app_prim_set)

# app-apps-formatted.json
with open(secinput_file_name, "r") as f:
    for line in f.readlines():
        line = json.loads(line)
        _id = line["_id"]["$oid"]
        p_id = line["projectId"]["$oid"]
        app_sec_set[_id] = line

        platform = line["platform"]
        try:
            filename =  line["staging.file"]["filename"]
            # print("file", platform, filename)
            # print("##",  line["staging.file"]["bucket"])
            # print("##",  line["staging.file"]["path"])
            # print("##", app_prim_set[_id])
        except:
            pass
        if _id in  app_prim_set:
            if platform == "android" or platform == "ios":
                # print(_id, app_prim_set[_id])
                if "staging.file" in line:
                    if line["staging.file"]["filename"].endswith("apk") or line["staging.file"]["filename"].endswith("ipa") or line["staging.file"]["filename"].endswith("zip"):
                        app_prim_set[_id]["config.staging.file"] = {
                            "bucket": line["staging.file"]["bucket"],
                            "path": line["staging.file"]["path"],
                            "filename":  line["staging.file"]["filename"],
                            

                        }
                        # print(platform, app_prim_set[_id])
            # elif platform == "ios":
                # pass
                # if "staging.file" in line:
                    # print("ios", line["staging.file"]["bucket"] , line["staging.file"]["path"])

                # print("ios",  line)
            elif platform == "webapp":
                pass
                # print(line)
                if "production.endpoint" in line:
                    # print("webapp", line["production.endpoint"])
                    extractedLinks = extract_links(line["production.endpoint"])
                    # print("##webapp", extractedLinks)



                pass
                # print("webapp",  line)
            elif platform == "webservice":
                pass
                # print("webservice",  line)
            
        else:
            if platform == "webapp":
                new_app = {
                    "_id.$oid": line["_id"]["$oid"],
                    "project_id.$oid": line["projectId"]["$oid"],
                    "platform": platform,
                    "title": line["title"],
                    "config.production.endpoint": line["production.endpoint"],
                    "refrences": line["refrences"]
                    
                }
                app_prim_set[_id] = new_app
                # print(platform, line)
            else:
                if platform == "android" or platform == "ios":
                # print(_id, app_prim_set[_id])
                    if "staging.file" in line:
                        if line["staging.file"]["filename"].endswith("apk") or line["staging.file"]["filename"].endswith("ipa") or line["staging.file"]["filename"].endswith("zip"):
                            app_prim_set[_id] = {
                                "_id.$oid": line["_id"]["$oid"],
                                "project_id.$oid": line["projectId"]["$oid"],
                                "platform": platform,
                                "title": line["title"],
                                "refrences": line["refrences"],


                                "config.staging.file": {
                                    "bucket": line["staging.file"]["bucket"],
                                    "path": line["staging.file"]["path"],
                                    "filename":  line["staging.file"]["filename"],
                                    }
                                
                            }

                            print(platform, app_prim_set[_id])
        # if "staging.file" in line:
            # print(line)

        # break

# json.dumps(open("1.json", "w") , )

# print("prim_in_apps", len( app_prim_set.keys()) )
# print("sec_in_apps", len( app_sec_set.keys()) )

combined_set = set( app_prim_set.keys() ) | set( app_sec_set.keys() ) 
# print("combined_in_apps", len(combined_set)     )


# print("combined_in_apps", set(app_prim_set.keys( ) ) -  set(app_sec_set.keys() )    )
# print("combined_in_apps", set(app_sec_set.keys( ) ) -  set(app_prim_set.keys() )    )



AFTER_APP_COUNT = len(app_prim_set)
print(
    "PREV_APP_COUNT",PREV_APP_COUNT,
    "AFTER_APP_COUNT", AFTER_APP_COUNT
)

with open(output_file_name, "w") as f:
    for app in app_prim_set.values():
        app = json.dumps(app)
        print(app)
        f.write(app + "\n")


# print("input_file_name", input_file_name)
# print("output_file_name", output_file_name)