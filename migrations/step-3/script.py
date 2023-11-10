import json



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
                    vals.append(f"File: [{value['name'] }]({value['value']})   ")
                    

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
with open("issues_with_app.json", "r") as f:

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

for _ in FINDINGS:


    original_finding = _

    # __print("_id"  , _["_id"])
    # continue

    title = _["assessment"]["title"]
    _platform_id= _["platform_id"]["$oid"]


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

    if len(details) == 0:
        continue


    if _platform_id == "ios":

        ipa_file = None
        try:
            ipa_file = application_attrs[1][2]
        except:
            pass

        appstore_url = ""
        try:
            appstore_url = application_attrs[2][2]
        except:
            pass
        # __print("ipa_file" , ipa_file)
        # __print("appstore_url" , appstore_url)
        pass
    elif _platform_id == "android":

        apk_file = None
        try:
            apk_file = application_attrs[1][2]
        except:
            pass

        playstore_url = ""
        try:
            playstore_url = application_attrs[2][2]
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
        except:
            pass

        try:
            private_urls = application_attrs[2][2]
        except:
            pass

        # __print("private_urls" , private_urls)


        pass
    elif _platform_id == "webservice":
        credentials = ""
        webservice_data = ""
        try:
            credentials = application_attrs[1][2]
        except:
            pass

        try:
            webservice_data = application_attrs[2][2]
        except:
            pass

        # __print("credentials" , credentials)
        # __print("webservice_data" , webservice_data)

    else:
        raise Exception("Error" + _platform_id)
    

    


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


        
        __print(repo ,  "**" , access_instructions)



        # __print( "** Url"   , preprod_url )  # pre prod 






for (k,v) in _assessments.items():
    pass
    # __print(k , v)
    # __print(v["details"][0])
    # __print()
    # break
# json.dump( FINDINGS  , open("test_dumps.json", "w"))