import json
import sys

input_file_name = sys.argv[1]
# output_file_name = sys.argv[2]

from bs4 import BeautifulSoup
import html

import json
data = json.load(open("/Users/meddler/Workspace/hawki-til/meddler-api/meddler-genz-ui/migrations/step-4/files.db.json", "r"))

files_db = {

}


word_map = {

"report" : "Report",
"Report" : "Report",
"" : "" ,
"Dynamic Report" : "Report",
"Upload your assessment" : "Report",
"" : "" ,
"file" : "Attachment",
"attachments" : "Attachment",
"" : "" ,
"Title" : "Title",
"Defination" : "Title",
"title" : "Title",
"DEFINITION" : "Title",
"definition" : "Title",
"Defintion" : "Title",
"" : "" ,
"Additional Details" : "Description",
"details" : "Description",
"Definition" : "Description",
"def" : "Description",
"DESC" : "Description",
"details" : "Description",
"Description" : "Description",
"desc" : "Description",
"dc" : "Description",
"df" : "Description",
"Description" : "Description",
"definition" : "Description",
"Definition" : "Description",
"dsc" : "Description",
"description" : "Description",
"Details" : "Description",
"des" : "Description",
"DESCRIPTION" : "Description",
"des" : "Description",
"Dscr" : "Description",
"dec" : "Description",
"DF" : "Description",
"" : "" ,
"mitigation" : "Mitigation",
"Mitigation" : "Mitigation",
"mit" : "Mitigation",
"mtg" : "Mitigation",
"Mtg" : "Mitigation",
"MITIGATION" : "Mitigation",
"MIT" : "Mitigation",
"mitigation" : "Mitigation",
"miti" : "Mitigation",
"Mitigation" : "Mitigation",
"Mitigations" : "Mitigation",
"Mitigations" : "Mitigation",
"mt" : "Mitigation",
"" : "" ,
"Proof Of Concept(PoC)" : "Proof_of_concept",
"Proof of concept(PoC)" : "Proof_of_concept",
"Steps to reproduce" : "Proof_of_concept",
"steps to reproduce" : "Proof_of_concept",
"step" : "Proof_of_concept",
"Steps to Produce" : "Proof_of_concept",
"Steps To Produce" : "Proof_of_concept",
"steps to produce" : "Proof_of_concept",
"str" : "Proof_of_concept",
"Steps to reproduce" : "Proof_of_concept",
"steps to produce" : "Proof_of_concept",
"Step To Reproduce" : "Proof_of_concept",
"Steps To Produce" : "Proof_of_concept",
"steps" : "Proof_of_concept",
"POC" : "Proof_of_concept",
"Steps to produce" : "Proof_of_concept",
"poc" : "Proof_of_concept",
"Steps tp produce" : "Proof_of_concept",
"stp" : "Proof_of_concept",
"PoC" : "Proof_of_concept",
"PROOF OF CONCEPT" : "Proof_of_concept",
"Proof of concept" : "Proof_of_concept",
"Proof Of Concept" : "Proof_of_concept",
"Proof of Concept" : "Proof_of_concept",
"STEPS TO PRODUCE" : "Proof_of_concept",
"Step To Produce" : "Proof_of_concept",
"proof of concept" : "Proof_of_concept",
"Steps to produce" : "Proof_of_concept",
"STEPS" : "Proof_of_concept",
"Steps To produce" : "Proof_of_concept",
"Steps to Produce" : "Proof_of_concept",
"Step to Reproduce" : "Proof_of_concept",
"proof of concept(Poc)" : "Proof_of_concept",
"sop" : "Proof_of_concept",
"Steps to Reproduce" : "Proof_of_concept",
"Proof Of Concept (PoC)" : "Proof_of_concept",
"Proof Of Concept" : "Proof_of_concept",
"Step to reproduce" : "Proof_of_concept",
"Proof of concept (PoC)" : "Proof_of_concept",
"Poc(For GIRF)" : "Proof_of_concept",
"Poc(For Event)" : "Proof_of_concept",
"poc2" : "Proof_of_concept",
"poc1" : "Proof_of_concept",
"proof" : "Proof_of_concept",
"" : "" ,
"issues" : "Issue",
"No issues found" : "Issue",
"No Issue" : "Issue",
"" : "" ,
"" : "" ,
"" : "" ,
"categories" : "Category",
"xss type" : "Category",
"" : "" ,
"Impact" : "Impact",
"Risk" : "Impact",
"imp" : "Impact",
"" : "" ,
"Remediation" : "Mitigation",
"rmd" : "Mitigation",
"rem" : "Mitigation",
"" : "" ,
"ID" : "" ,
"" : "" ,
"Host Header Injection" : "" ,
"" : "" ,
"File Upload" : "" ,
"" : "" ,
"Infrastructure Scan Report" : "" ,
"" : "" ,
"Attachment" : "Attachment",
"" : "" ,
"information" : "Details",
"" : "" ,
"test" : "" ,
"" : "" ,
"in scope out of scope" : "In_Scope",

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

# for id, file in files_db.items():
    # print(id, file)


def extract_urls(text):
    # Check if the text contains HTML tags
    if any(tag in text for tag in ['<', '>']):
        # Use BeautifulSoup for HTML parsing
        soup = BeautifulSoup(text, 'html.parser')
        # Find all anchor tags and extract URLs from 'href' attribute
        anchor_tags = soup.find_all('a', href=True)
        urls = [tag['href'] for tag in anchor_tags]
    else:
        # Use regular expression for non-HTML content
        url_pattern = re.compile(r"""
            \b(?:https?|ftp):\/\/
            (?:(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b
            |(?:\d{1,3}\.){3}\d{1,3}\b)
            (?:[-a-zA-Z0-9@:%_\+.~#?&//=]*)\b
        """, re.VERBOSE)
        urls = re.findall(url_pattern, text)

    # Parse and normalize URLs using urlparse
    parsed_urls = [urlparse(url) for url in urls]

    # Extract hostnames or IPs from the parsed URLs
    extracted_urls = [url.netloc for url in parsed_urls]

    return extracted_urls


def extract_links(text):
    # return extract_urls(text)
    links = []

    # soup = BeautifulSoup(text, 'html.parser')
    # for a_tag in soup.find_all('a', href=True):
    #     links.append(a_tag['href'])
    # return links

    # If the text is HTML, use BeautifulSoup
    # if '<html' in text.lower():
    try:

        soup = BeautifulSoup(text, 'html.parser')
        text = text  + "\n" + soup.text
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


_print = print

def print(*arg):
    pass


__print = _print

def _print(*arg):
    pass


parent_attrs = set()
nested_attrs = set()

TITLE = "title"

group_words_title = {
"Definition":			TITLE,
"Definition":			TITLE,
"Defination":			TITLE,
"DEFINITION":			TITLE,
"Defintion"	:		TITLE,
"definition":			TITLE,
"Title":			TITLE,
"title":			TITLE,
"Title":			TITLE,


"Details":TITLE,
"Details": TITLE,
"Description":TITLE,
"DESCRIPTION":TITLE,
"description":TITLE,
"Additional Details":TITLE,
}


# target_struct = json.load(open("target.struct.json"))
target_struct = ['_id', 'Key', 'applicationId', 'businessId', 'found_by', 'id', 'platformId', 'active', 'buildId', 'component_name', 'component_version', 'created', 'cve', 'cvssv3', 'cvssv3_score', 'cwe', 'date', 'defect_review_requested_by', 'defect_review_requested_by_id', 'description', 'duplicate', 'duplicate_finding', 'duplicate_finding_id', 'dynamic_finding', 'endpoints', 'engagement', 'engagement_id', 'false_p', 'file_path', 'finding_group', 'has_finding_group', 'has_jira_configured', 'has_jira_group_issue', 'has_jira_issue', 'hash_code', 'impact', 'is_mitigated', 'last_reviewed', 'last_reviewed_by', 'last_reviewed_by_id', 'last_status_update', 'line', 'mitigated', 'mitigated_by', 'mitigated_by_id', 'mitigation', 'nb_occurences', 'numerical_severity', 'out_of_scope', 'param', 'payload', 'pk', 'product', 'product_id', 'publish_date', 'references', 'refrence_ids', 'reporter', 'reporter_id', 'review_requested_by', 'review_requested_by_id', 'risk_accepted', 'sast_sink_object', 'sast_source_file_path', 'sast_source_line', 'sast_source_object', 'scanner_confidence', 'service', 'severity', 'severity_justification', 'sla_age', 'sla_start_date', 'sonarqube_issue', 'sonarqube_issue_id', 'static_finding', 'steps_to_reproduce', 'test', 'test_id', 'thread_id', 'title', 'under_defect_review', 'under_review', 'unique_id_from_tool', 'unsaved_request', 'unsaved_response', 'unsaved_tags', 'url', 'verified', 'vuln_id_from_tool', 'unsaved_files']

# title
# description : [ description ]
# engagement: manual PT
# product: manual PT
# references: []
# refrence_ids: [assessment_id]
# severity: severity | None | undefined
# severity_justification: If None, 'mention' a reason
# under_review: if revalidation : true , else false
# url: URL From assessment request
# mitigation: Mitigation
# hash_code: Random
# last_reviewed
# payload: Proof of concept
# references: [  "name: " , "source" , ... additional_attributes]
# reporter_id : 1


target_struct = {
'_id': '',
'Key': '',
'applicationId': '',
'businessId': '',
'found_by': '',
'id': '',
'platformId': '',
'active': '',
'buildId': '',
'component_name': '',
'component_version': '',
'created': '',
'cve': '',
'cvssv3': '',
'cvssv3_score': '',
'cwe': '',
'date': '',
'defect_review_requested_by': '',
'defect_review_requested_by_id': '',
'description': '',
'duplicate': '',
'duplicate_finding': '',
'duplicate_finding_id': '',
'dynamic_finding': '',
'endpoints': '',
'engagement': '',
'engagement_id': '',
'false_p': '',
'file_path': '',
'finding_group': '',
'has_finding_group': '',
'has_jira_configured': '',
'has_jira_group_issue': '',
'has_jira_issue': '',
'hash_code': '',
'impact': '',
'is_mitigated': '',
'last_reviewed': '',
'last_reviewed_by': '',
'last_reviewed_by_id': '',
'last_status_update': '',
'line': '',
'mitigated': '',
'mitigated_by': '',
'mitigated_by_id': '',
'mitigation': '',
'nb_occurences': '',
'numerical_severity': '',
'out_of_scope': '',
'param': '',
'payload': '',
'pk': '',
'product': '',
'product_id': '',
'publish_date': '',
'references': '',
'refrence_ids': '',
'reporter': '',
'reporter_id': '',
'review_requested_by': '',
'review_requested_by_id': '',
'risk_accepted': '',
'sast_sink_object': '',
'sast_source_file_path': '',
'sast_source_line': '',
'sast_source_object': '',
'scanner_confidence': '',
'service': '',
'severity': '',
'severity_justification': '',
'sla_age': '',
'sla_start_date': '',
'sonarqube_issue': '',
'sonarqube_issue_id': '',
'static_finding': '',
'steps_to_reproduce': '',
'test': '',
'test_id': '',
'thread_id': '',
'title': '',
'under_defect_review': '',
'under_review': '',
'unique_id_from_tool': '',
'unsaved_request': '',
'unsaved_response': '',
'unsaved_tags': '',
'url': '',
'verified': '',
'vuln_id_from_tool': '',
'unsaved_files': ''
}

platforms = {}
types  ={}

DEDE = []

def parseWhole(attrs , _main=True , _break = False):
    if _break:
        DEDE.append({"empty_node", ""})
        return []
    for _ in attrs:
        res = parseData(_, attrs[_])

        DEDE.append({
            "main": _main,
            "data": res
        })

        return [res]
        return [{
            "main": _main,
            "data": res
        }]
        # __print(res)


def parseData(_ , data):
    __ = None
    # data = None
    # __print(_)
    if _.startswith("parent."):
        _ = _.split("parent.")[1]
        __ = _ in parent_attrs
        # data = _additional_attributes["parent."  +  _]
        data["structure"] = "parent"

    elif _.startswith("nested."):
        _ = _.split("nested.")[1]
        __ = _ in nested_attrs
        # data = _additional_attributes[ "nested." + _]
        data["structure"] = "nested"



    else:
        # _ = None
        print("attriubute", _)
        return
    # if _ == None:
    if _ == False or __ == False:
        print("attribute",  _  , __ )
    else:
        print(data)
    
    if data["structure"] == "parent":
        # __print( "#",  data["title"])
        # __print()
        vals = list()
        vals.append(data["title"])
        vals.append(data["title"])
        # return {"main": vals}
        return vals

    else:
        # pass
        vals = list()
        vals.append(data["title"])
        vals.append(data["identifier"])

        type =  data["type"]

        # __print(data["structure"], data["title"])
        # __print(data["structure"], data["identifier"])

        if type == 0:
            vals.append(data["value"])

        if "values" in data:


            # __print(type , data["values"])
            values = data["values"]

            if type == 3:
                multiSelect = data["multiSelect"]
                for value in values:
                    if value["selected"]:
                        vals.append(value["value"])
                        # __print( vals)

            elif type == 5:
                # pass
                for value in values:
                    # vals.append({
                    #     "bucket": "bucket" + value['value'],
                    #     "path": value['name']
                    # })

                    try:
                        file_ref  =files_db[ value['value']]
                        file_ref["filename"]  = value['name']
                        print("except" , value)
                        vals.append(file_ref)

                    except:
                        print("except" , value)
                        # vals.append({"fucked": "up"})

                    # vals.append(f"File: [{value['name'] }]({value['value']})   ")

                    


            else:
                pass
                # __print( "None" )

        else:
            pass
            # __print( "None" , type)

        # __print( "")
        # __print( "")
        # __print( vals )
        # __print( "")
        # __print( "")


            # __print(type , "No Value")

        if "value" in data:
            pass
            # __print(vals)
            # __print( data["value"] )
        # __print()
        # return {"details": vals}
        return vals




FINDINGS  = []

# with open("issues.json", "r") as f:
# with open("issues_with_app.json", "r") as f:
with open(input_file_name, "r") as f:

    _additional_attributes = {}
    content = json.load(f)

    def _parser(app):

        findings = {
            "details": []
        }
        _POOP_ = parseWhole({}  , _break=True)
        findings["details"] = findings["details"] + _POOP_ 


        platforms[  app["platform_id"]["$oid"] ] = True
        issue = app["issue"]

        name = issue["name"]
        issue["_id"] = app["_id"]

        findings["_id"] = app["_id"]
        findings["platform_id"] = app["platform_id"]
        findings["application_id"] = app["application_id"]



        meta = issue["meta"]

        severity = None
        if "severity" in issue:
            severity = issue["severity"]
            print("severity", severity)

        
        data = issue["data"]

        findings["title"] = name
        findings["description"] = name
        findings["severity"] = severity

        additional_attributes = {}


        data = [ { _["title"] : _ } for _ in data]

        meta_data = {}
        main_data = {}
        print()
        print("*" ,name)
        print()
        for _ in meta:
            meta_data[_["key"]] = _


        print(name , meta_data.keys() )

        desrived_title = None

        for _ in data:
            additional_attributes = {}

            for __ in _:
                print( "**" , __  )
                print()
                # print( "#" , _[__]['id']  )
                print( "#" , _[__]['title']  )
                additional_attributes[ "parent." +   _[__]['title']  ] = _[__]
                additional_attributes[ "parent." +  _[__]['id']  ] = _[__]


                if   _[__]['title'].strip().lower()  in  group_words_title.keys():
                    print("found")
                    desrived_title = group_words_title[ _[__]['title'].strip().lower() ]
                elif   _[__]['id'].strip().lower()  in  group_words_title.keys():
                    desrived_title = group_words_title[ _[__]['id'].strip().lower() ]
                else:
                    print("Not found",  _[__]['id'].strip().lower() ,  _[__]['title'].strip().lower())
                


                parent_attrs.add(  _[__]['id'] )
                parent_attrs.add(  _[__]['title'] )

                _POOP_ = parseWhole(additional_attributes)
                findings["details"] = findings["details"] + _POOP_ 


                # print( "##" , len( _[__]) , len(data)  )
                for _ in _[__]["data"]:
                    additional_attributes = {}

                    print("###" , "type" , _["type"])
                    type = _["type"]
                    additional_attributes [  "nested." +    _['identifier']  ] = _
                    nested_attrs.add(  _['identifier']  ) 



                    if type == 0: # Add label to refrences 
                        additional_attributes["details"] = _["value"]
                    elif type == 5:
                        additional_attributes["file"]= _
                    elif type == 3:
                        additional_attributes["categories"]= _
                    elif type == 7:
                        additional_attributes["categories"]= _["value"]
                    elif type == 4:
                        additional_attributes["ip_addresses"]= _

                    # print("additional_attributes", additional_attributes)

                    


                    

                    
                    

                    types[type] = []
                    if "values" in _:
                        types[type] = _["values"]
                    else:
                        types[type] = _
                    _POOP_ = parseWhole(additional_attributes, _main=False)
                    findings["details"] = findings["details"] + _POOP_ 






        print()
        print("****")
        print()

        # _additional_attributes  = { **additional_attributes  , **_additional_attributes }

        details = []
        # for attr in additional_attributes:
            # details.append( parseData(attr) )

        # __print(details)
        # __print("")
        # __print("")

        findings["assessment"] = under_parser(app["_id_"])
        findings["application"] = under_parser(app["application"])

        findings["applicationName"] = app["application"]["name"]

        findings["projectId"] = app["_id_"]["projectId"]["$oid"]




    
        FINDINGS.append(findings)

    def under_parser(app):

        findings = {
            "details": []
        }
        _POOP_ = parseWhole({}  , _break=True)
        findings["details"] = findings["details"] + _POOP_ 


        # platforms[  app["platform_id"]["$oid"] ] = True
        issue = app

        name = issue["name"]
        issue["_id"] = app["_id"]

        findings["_id"] = app["_id"]
        # findings["platform_id"] = app["platform_id"]
        # findings["application_id"] = app["application_id"]


        meta = {}
        if "meta" in issue:
            meta = issue["meta"]

        severity = None
        if "severity" in issue:
            severity = issue["severity"]
            print("severity", severity)

        
        data = issue["data"]

        findings["title"] = name
        findings["description"] = name
        findings["severity"] = severity

        additional_attributes = {}


        data = [ { _["title"] : _ } for _ in data]

        meta_data = {}
        main_data = {}
        print()
        print("*" ,name)
        print()
        for _ in meta:
            meta_data[_["key"]] = _


        print(name , meta_data.keys() )

        desrived_title = None

        for _ in data:
            additional_attributes = {}

            for __ in _:
                print( "**" , __  )
                print()
                # print( "#" , _[__]['id']  )
                print( "#" , _[__]['title']  )
                additional_attributes[ "parent." +   _[__]['title']  ] = _[__]
                additional_attributes[ "parent." +  _[__]['id']  ] = _[__]


                if   _[__]['title'].strip().lower()  in  group_words_title.keys():
                    print("found")
                    desrived_title = group_words_title[ _[__]['title'].strip().lower() ]
                elif   _[__]['id'].strip().lower()  in  group_words_title.keys():
                    desrived_title = group_words_title[ _[__]['id'].strip().lower() ]
                else:
                    print("Not found",  _[__]['id'].strip().lower() ,  _[__]['title'].strip().lower())
                


                parent_attrs.add(  _[__]['id'] )
                parent_attrs.add(  _[__]['title'] )

                _POOP_ = parseWhole(additional_attributes)
                findings["details"] = findings["details"] + _POOP_ 


                # print( "##" , len( _[__]) , len(data)  )
                for _ in _[__]["data"]:
                    additional_attributes = {}

                    print("###" , "type" , _["type"])
                    type = _["type"]
                    additional_attributes [  "nested." +    _['identifier']  ] = _
                    nested_attrs.add(  _['identifier']  ) 



                    if type == 0: # Add label to refrences 
                        additional_attributes["details"] = _["value"]
                    elif type == 5:
                        additional_attributes["file"]= _
                    elif type == 3:
                        additional_attributes["categories"]= _
                    elif type == 7:
                        additional_attributes["categories"]= _["value"]
                    elif type == 4:
                        additional_attributes["ip_addresses"]= _

                    # print("additional_attributes", additional_attributes)

                    


                    

                    
                    

                    types[type] = []
                    if "values" in _:
                        types[type] = _["values"]
                    else:
                        types[type] = _
                    _POOP_ = parseWhole(additional_attributes, _main=False)
                    findings["details"] = findings["details"] + _POOP_ 






        print()
        print("****")
        print()

        # _additional_attributes  = { **additional_attributes  , **_additional_attributes }

        details = []
        # for attr in additional_attributes:
            # details.append( parseData(attr) )

        # __print(details)
        # __print("")
        # __print("")


        # FINDINGS.append(findings)
        return findings



    for app in content["data"]:
        _parser(app)
        

for type in types:
    print(type , types[type])

# print(len(content["data"]))

print()
print(target_struct)
print()
print()
for _ in _additional_attributes:
    print("matching", _)
# json.dump( _additional_attributes ,  open("dump.json", "w") )

print("parent")
print()

print( "\n".join( parent_attrs) )
print("nested")
print( "\n".join( nested_attrs) )



# for _ in _additional_attributes:
    # __print(_)
    # continue
    # parseData(_)




# with open("dump.json", "w") as f:
#     for _ in _additional_attributes.keys():
#         f.write(_  +  ": ")
#         f.write( json.dumps(  _additional_attributes[_]  ) )
#         f.write("\n")
                



_assessments = {}

platform_id = {
    "5e0dd2a6ae21f272971db085": "webapp",
    "5e0dd2c0ae21f272971db087": "docker",
    # "5e0dd2c7ae21f272971db088": "infrastructure",
    "5e0dd2fdae21f272971db089": "ios",
    "5e0dd2aaae21f272971db086": "android",
    "5e0dd443ae21f272971db08e": "webservice",
}

assessment_types = set()

application_ids = set()
application_sets = {}


for _ in FINDINGS:

    __print("**",  _["_id"]["$oid"])

    for detail in _["details"]:
        # __ = detail[0]
        for __ in detail:
            if isinstance(  __ , str):
                if  __ in word_map :
                    __print("Mapping", __  , __ in word_map)
        # __print("#",  detail[0] )

    __print("*******************")
    # break



    original_finding = _

    # __print("_id"  , _["_id"])
    # continue

    title = _["assessment"]["title"]
    # __print("assessment", _["assessment"])
    _platform_id= _["platform_id"]["$oid"]

    projectId = _["projectId"]





    if _platform_id in platform_id:
        _platform_id = platform_id[_platform_id]
    else:
        continue



    _assessments[ (_["assessment"]["title"]) ] = _["assessment"]

    details = _["assessment"]["details"]

    assessment_type = "pentest"


    if "Manual Testing Request" == title:
        assessment_type = "pentest"
    elif "Static Code Assesment" == title:
        assessment_type = "static"
    elif "Dynamic Scanning Request" == title:
        assessment_type = "dynamic"
    elif "Infrastructure Security Assessment" == title:
        assessment_type = ""
        continue

    # assessment_types.add(assessment_type)
    # continue
    # __print(assessment_type , _platform_id)
    # continue

    attrs = []
    application_attrs = original_finding["application"]["details"]

    application_name = original_finding["applicationName"]



    application_id = original_finding["application"]["_id"]["$oid"] 
    # __print("application_attrs", application_id)
    application_ids.add(application_id)

    # application_sets["application_id"] = 
    application_attr_for_placeholders ={
        "refrences": []
    }


    if len(details) == 0:
        continue


    if _platform_id == "ios":

        ipa_file = None
        try:
            ipa_file = application_attrs[1][2]
            
            application_attr_for_placeholders["staging.file"]= ipa_file
        except:
            pass

        appstore_url = ""
        try:
            appstore_url = application_attrs[2][2]

            _ex_ = extract_links( appstore_url ) 
            if _ex_ > 0:
                application_attr_for_placeholders["refrences"] =  ["Appstore Url"  ] + _ex_ 
        except:
            pass
        # __print("ipa_file" , ipa_file)
        # __print("appstore_url" , appstore_url)
        pass
    elif _platform_id == "android":

        apk_file = None
        try:
            apk_file = application_attrs[1][2]
            application_attr_for_placeholders["staging.file"]= apk_file
        except:
            pass

        playstore_url = ""
        try:
            playstore_url = application_attrs[2][2]

            # application_attr_for_placeholders["staging.endpoint"] = playstore_url
            _ex_ = extract_links( playstore_url ) 
            if _ex_ > 0:
                application_attr_for_placeholders["refrences"] =  ["Playstore Url"  ]  + playstore_url


        except:
            pass
        # __print("apk_file" , apk_file)
        # __print("playstore_url" , playstore_url)

        pass
    elif _platform_id == "webapp":

        public_urls = ""
        private_urls = ""
        try:
            public_urls = application_attrs[1][2]

            
            
            
            _ex_ = extract_links( public_urls ) 
            application_attr_for_placeholders["production.endpoint"] = public_urls
            # application_attr_for_placeholders["production.endpoint"] = str(_ex_)
            
            if len(_ex_) > 0:
                if len(_ex_) == 1:
                    application_attr_for_placeholders["production.endpoint"] = _ex_[0]
                else:
                    application_attr_for_placeholders["refrences"] +=  ["Producion Url"  ] + _ex_ 

            # print("application_attrs",public_urls)

            

            


        except:
            # import traceback
            # traceback.print_exc()
            # raise Exception("error")
            pass

        try:
            private_urls = application_attrs[2][2]


            _ex_ = extract_links( private_urls ) 
            if _ex_ > 0:
                if len(_ex) == 1:
                    application_attr_for_placeholders["staging.endpoint"] = _ex_[0]
                else:
                    application_attr_for_placeholders["refrences"] +=  ["Private Url"  ] + _ex_ 





        except:
            pass

        # __print("private_urls" , private_urls)


        pass
    elif _platform_id == "webservice":
        credentials = ""
        webservice_data = ""
        try:
            credentials = application_attrs[1][2]

            application_attr_for_placeholders["refrences"] +=  ["Credentials" + credentials ]  


        except:
            pass

        try:
            webservice_data = application_attrs[2][2]
            application_attr_for_placeholders["refrences"] +=  ["Webservice Data"  ] + webservice_data 


        except:
            pass

        # __print("credentials" , credentials)
        # __print("webservice_data" , webservice_data)

    else:
        raise Exception("Error" + _platform_id)
    


    
    application_attr_for_placeholders["projectId"] =  {"$oid": projectId} 
    application_attr_for_placeholders["platform"] =  _platform_id
    application_attr_for_placeholders["title"] =  application_name
    application_sets[application_id] = application_attr_for_placeholders

    



    if assessment_type == "pentest":
        try:
            _ = details[0][0]
            attrs.append("Assessment")
            attrs.append(details[0][0])
        except:
            pass


        try:
            _ = details[1][2]
            attrs.append("Credentials")
            attrs.append(details[1][2])
        except:
            pass


        try:
            _ = details[2][2]
            attrs.append("Attachments")
            attrs.append(details[2][2])
        except:
            pass
        

        try:
            _ = details[3][2]
            attrs.append("Walkthrough")
            attrs.append(details[3][2])
        except:
            pass

        

        _print(
            #  original_finding["_id"],
            _platform_id,
            assessment_type, 
                    # details[0][0], 
                    # details,
                    attrs,
                    _,
                    "\n\n**",
            application_attrs
                    #   _platform_id
                      )
        # __print()
        # __print()
        # __print(   original_finding["_id"]["$oid"],  "details",  original_finding["application"])
        # __print()
        # break
    elif assessment_type == "dynamic":

        preprod_url = details[1] [2] 
        credentials = details[2] [2] 

        # __print( "** Url"   , preprod_url )  # pre prod urls
        # __print( "** Credentials " ,credentials  ) # creds

        pass
    elif assessment_type == "static":
        
        # preprod_url = details[1] [2] 
        # credentials = details[2] [2] 

        repo = ""
        access_instructions = ""

        try:
            repo = details[1][2]
        except:
            # __print("details",  details[1])
            pass

        try:
            access_instructions = details[2][2]
        except:
            pass


        
        # __print(repo ,  "**" , access_instructions)




        # __print( "** Url"   , preprod_url )  # pre prod 





