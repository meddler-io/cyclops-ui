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

# input_file_name = sys.argv[1]


def Init():
    MONGO_HOST = os.getenv('MONGO_HOST', 'mongodb://hawkireg.indiatimes.com')
    MONGO_PORT = int(os.getenv('MONGO_PORT', 27017))
    MONGO_USER = (os.getenv('MONGO_USER', None))
    MONGO_PASSWORD = (os.getenv('MONGO_PASSWORD', None))
    MONGO_AUTH_SOIRCE = (os.getenv('MONGO_AUTH_SOIRCE', None))
    from pymongo import MongoClient

    print("Connecting to", MONGO_HOST)

    if MONGO_USER == None or MONGO_PASSWORD == None or MONGO_AUTH_SOIRCE == None:
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
        print("Skipping validation", "Collection already exists")
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


assesment_naming = {
    'Static Code Assesment': 'sast', 
    'Dynamic Scanning Request': 'dast', 
    'Manual Testing Request': 'pentest'
}

if __name__ == "__main__":

    Init()
    assesment = getMongoCollection("assesment")
    engagementCollection = getMongoCollection("engagement")
    
    assesments = assesment.find()

    assesments = list(assesments)

    names = set()
    
    states = set()
    revalidation_state = set()
    
    
    
    engagementData = []
    # {'REVALIDATION', 'DECLINED', 'REQUESTED', 'ENQUEUED', 'PROCESSING', 'COMPLETED'}
    
    for assesment in assesments:
        
        
        
        
        _state = assesment["state"]
        
        
        
        
        
        
        
            
            
        
        
        if "extras" in assesment:
            _extras = assesment["extras"]
            print("extras", _extras)
            if "postmanDetails" in _extras:
                _postmanDetails = _extras["postmanDetails"]
                print("_postmanDetails", _postmanDetails, len(_postmanDetails) )
        
        
        if "doc" in assesment:
            _doc = assesment["doc"]
        else:
            _doc = None
        if "dou" in assesment:
            _dou = assesment["dou"]
        else:
            _dou = None
        
        
        
        if "requestor" in assesment:
            requestor = [assesment["requestor"]]
            print("requestor", requestor)
        else:
            requestor = []
            
        if "assigned" in assesment:
            assigned = assesment["assigned"]
            print("assigned", assigned)
        else:
            assigned = []
            
        if "instructions" in assesment:
            instructions =  assesment["instructions"].strip("")
            if len(instructions) == 0:
                instructions = []
            else:
                instructions = [instructions]
                
            print("instructions", instructions)
        else:
            instructions = []

        if "comments" in assesment:
            comments = assesment["comments"]

            if type(comments) == str:
                print(comments)
            elif  type(comments) == dict:
                print(comments)
                if "comments" in comments:
                    comments = comments["comments"]
                if "inscope" in comments:
                    inscope = comments["inscope"]
                if "outscope" in comments:
                    outscope = comments["outscope"]
            else:
                print(comments)
                pass

                
                
            
        if "REVALIDATION" == _state:
            _revalidate_status = assesment["revalidate_status"]
            revalidation_state.add(_revalidate_status)
        else:
            _revalidate_status = None
            
        states.add(_state)
        # assesment = json.loads(assesment)
        if "assesment" in assesment:
            # assesment = assesment["assesment"]
            _type = assesment["assesment"]["name"]
            _applicationId =  ObjectId( assesment["applicationId"] )
            _id =  ObjectId( assesment["_id"] )
            if _type not in assesment_naming:
                continue
            _type = assesment_naming[_type]
            names.add(_type)
            requestor = []
            env = "staging"
            
            if "requestor" in assesment:
                requestor = [assesment["requestor"]]
                pass
                # print(assesment)
                
                # print(_type)
                # print(_state)
                # print(_applicationId)
                
                # break
            else:
                pass
                # print("0")
            engagement = {
            "_id": _id,
            "application_id": _applicationId,
            
            
            }

        else:
            pass
            # print("1")
            # print(assesment )
        # print( assesment["requestor"])
        
        
        state_derive = {'COMPLETED': 'closed', 'PROCESSING' :'in_progress', 'ENQUEUED' :'in_progress', 'REVALIDATION' : 'open', 'REQUESTED' :'open', 'DECLINED': 'rejected'}
        # break
        if "issues" in assesment:
            _issues = assesment["issues"]
        else:
            _issues = []
            
        print("_issues", _id, _issues)
        
        discovered_findings = []
        findings_to_be_reviewed = []
        
        engagement_type = { "new" : True , "revalidate": False  }
        if _state == "REVALIDATION":
            {"new" : False , "revalidation": True  }
            findings_to_be_reviewed = _issues 
            discovered_findings = []
            
            if _revalidate_status == "REVALIDATION COMPLETED":                
                print("_state_state" , _id, _state , _revalidate_status)
                _state = "ENQUEUED"
            else:
                _state = "COMPLETED"
        else:
            engagement_type = { "new" : True , "revalidate": False  }
            discovered_findings = _issues 
            findings_to_be_reviewed = []
            pass
                
        engagement = {
            "_id": _id,
            "application_id": _applicationId,
            "created_at": _doc,
            "updated_at": _dou,
            "state": state_derive[_state],
            "engagement": _type,
            "engagement_type": engagement_type,
            "_imported_from_hawki_": True,
            
            "findings": discovered_findings,
            "findings_under_review": findings_to_be_reviewed,
            
            
        }
        
        print("_engagement", engagement)
        engagementData.append(engagement)
        
    
    for mainDoc in engagementData:
        engagementCollection.update_one(  {"_id": mainDoc["_id"] }  , {"$set": mainDoc} , upsert=True)
        print("boomboom")

        

        
        
        
    print(names)
    print(states)
    print(revalidation_state)
