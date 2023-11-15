import json
import sys
from bson.objectid import ObjectId
from collections import OrderedDict

from pymongo import MongoClient
import os

from pymongo.errors import ConnectionFailure


import urllib.parse

DB_NAME = "hawki"
MONGO_DB = None

input_file_name = sys.argv[1]


def Init():
    MONGO_HOST=os.getenv('MONGO_HOST', 'mongodb://hawkireg.indiatimes.com')
    MONGO_PORT=int(os.getenv('MONGO_PORT', 27017))
    MONGO_USER=(os.getenv('MONGO_USER', None))
    MONGO_PASSWORD=(os.getenv('MONGO_PASSWORD', None))
    MONGO_AUTH_SOIRCE=(os.getenv('MONGO_AUTH_SOIRCE', None))
    from pymongo import MongoClient

    print("Connecting to", MONGO_HOST)


    if MONGO_USER ==None or MONGO_PASSWORD == None or MONGO_AUTH_SOIRCE  == None:
        client = MongoClient(MONGO_HOST)
    else:
        client = MongoClient(MONGO_HOST,
                              username=MONGO_USER,
                              password=MONGO_PASSWORD,
                              authSource=MONGO_AUTH_SOIRCE,
                            authMechanism='SCRAM-SHA-1')


    try:
        # The ismaster command is cheap and does not require auth.
        client.admin.command('ismaster')
        print("Connected to Mongo")
    except ConnectionFailure:
        print("Mongo Looks to be down")
    global MONGO_DB
    MONGO_DB = client[DB_NAME]


def getMongoCollection(collectionName):
    # print("MongoDb", MONGO_DB)
    return MONGO_DB[collectionName]


def validateCollection(collectionName, validator):

    if not collectionName in MONGO_DB.list_collection_names():
        print("Skipping validation" ,"Collection already exists")
        createCollection(collectionName)


    query = [('collMod', collectionName),
        ('validator', validator),
        ('validationLevel', 'moderate')]
    query = OrderedDict(query)
    MONGO_DB.command(query)

def dropCollection(collectionName):
    MONGO_DB.drop_collection(collectionName)

def createCollection(collectionName):
    MONGO_DB.create_collection(collectionName)


Init()
_app = getMongoCollection("applications")

with open(input_file_name , "r") as f:
    for line in f.readlines():
        line = line.strip()
        line  =json.loads(line)

        config = False
        

        mainDoc = {
            "_id": ObjectId( line["_id.$oid"] ),
            "project_id": ObjectId( line["project_id.$oid"] ),
            "platform": line["platform"],
            "title": line["title"],
        }

        
        for k in line:
            if line[k]:
                if "config" in k:
                    mainDoc["" + k] = line[k]
                    config = True
            


        print(mainDoc)
        if config == False:
            mainDoc["config"] = {}
        _app.update_one(  {"_id": mainDoc["_id"] }  , {"$set": mainDoc} , upsert=True)


