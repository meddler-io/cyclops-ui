import json
data = json.load(open("/Users/meddler/Workspace/hawki-til/meddler-api/meddler-genz-ui/migrations/step-4/files.db.json", "r"))

files_db = {

}

for file in data:
    if "path" in file:
        if  "/opt/hawki/uploads/" in file["path"]:
            file_path= file["path"].split("/opt/hawki/uploads/")[1]
            bucket = file_path.split("/", 1)
            if len(bucket) < 2:
                path = ""
            else:
                path = bucket[1]
            files_db[file["_id"]["$oid"]] ={
                "bucket": bucket[0],
                "path": path,
            }

for id, file in files_db.items():
    print(id, file)