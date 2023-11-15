# 1. Dumps all apps
echo "Dumping list of all applications";
curl -s 'http://localhost:9898/api/v1/customer/getUserApplication?&searchQuery=&filterProjectId=&filterBusinessId=' --compressed -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:120.0) Gecko/20100101 Firefox/120.0' -H 'Accept: application/json, text/plain, */*' -H 'Accept-Language: en-US,en;q=0.5' -H 'Accept-Encoding: gzip, deflate, br' -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InByYWtoYXIuYWduaWhvdHJpQHRpbWVzaW50ZXJuZXQuaW4iLCJkb21haW5zIjpbeyIkb2lkIjoiNWUwZGQ0ZjJhZTIxZjI3Mjk3MWRiMDkzIn0seyIkb2lkIjoiNWUwZGQzNjRhZTIxZjI3Mjk3MWRiMDhhIn0seyIkb2lkIjoiNWUwZGQzOTdhZTIxZjI3Mjk3MWRiMDhiIn0seyIkb2lkIjoiNWUwZGQ0ODJhZTIxZjI3Mjk3MWRiMDhmIn0seyIkb2lkIjoiNWUwZGQ0OGZhZTIxZjI3Mjk3MWRiMDkwIn0seyIkb2lkIjoiNWUwZGQ0OWFhZTIxZjI3Mjk3MWRiMDkxIn0seyIkb2lkIjoiNWUwZGQ0YjVhZTIxZjI3Mjk3MWRiMDkyIn1dLCJyb2xlcyI6WyJzdXBlcmFkbWluIiwiYWRtaW4iLCJ1c2VyIiwiY2xpZW50Il0sInVwZGF0ZWRBdCI6IjIwMjMtMDktMjkgMjA6Mjg6NDcuMjQ0MDk3In0.MjfZIUbwMpP5pLE001D42JxTaRZqXFH_cGwiWSv5b-Y' -H 'Connection: keep-alive' -H 'Referer: https://hawki.indiatimes.com/devsec/switch' -H 'Cookie: _grx=0b345ae9-a2dc-4b57-95a0-fbbe187143e6; _col_uuid=9e91c720-aa18-4368-996f-62eefbf433a0-10ol4; _ga_WZ3Z4GGVRC=GS1.1.1688325712.3.0.1688325712.60.0.0; _ga=GA1.2.1854680771.1688033746; _cc_id=22d6ada92f02053738901eff4f0e5c4e; cto_bundle=cm_dpV9iV2M4cll4dndYazRuZGV1bXFkOWdaVmZGdW4lMkJYWWJmQXNGRnNDTiUyQlZuUHAzJTJGMzM4cCUyRkZ1SyUyRngwbiUyRjZJb083aVFKMTIlMkZHU2FYQ1hnRnFjdzIxMEtwNGhrJTJCb3k1WXVYTFBFU21XSmZGano5STEzQ1F2cHMxdTRDTkQ5bFEyNm4lMkZTQXl0YUwyOUglMkJOaWNoJTJGWDBlNGZCVWZBVzFHZmt6VWM3MjhSTXdXaFN5cjlCJTJCbEFkbWRUWFdEVmtBdFhZck01WTB0dUlIcjhCbDZJaFZQYXJNUmdnJTNEJTNE; deviceid=aobxudgy555fy575u3zk8vyv1; __gads=ID=cd2f1650c5f96b84-22b4c47ed9e700d5:T=1688033845:RT=1698951091:S=ALNI_MZZmVhbchRnWJwpc3_jpaL2p1OAWQ; __gpi=UID=00000c1c83a97bbd:T=1688033845:RT=1698951091:S=ALNI_MYm9Y4R_IwpEwxz8UJ4XqCPwigzOA; fpid=e9de43dcd6be83556d1f55059f9bf4c11688034003; pfuuid=622689834215329; _ga_51B2JJKF6V=GS1.1.1699215235.14.1.1699215443.0.0.0; cpd25-10-2023_til_expando=2; _ga_FCN624MN68=GS1.1.1698952877.3.0.1698952877.60.0.0; geostate=MP; RT="z=1&dm=indiatimes.com&si=3d51bade-39de-4a09-b0f6-c68ffc318459&ss=logk9oyf&sl=0&tt=0"; connectId={"ttl":86400000,"lastUsed":1698924864017,"lastSynced":1698924864017}; _pubcid=3abae5b0-db2c-4b1a-a187-d8070a6d973f; _au_1d=AU1D-0100-001698924877-VT0XO4Q8-2S5G; _au_last_seen_pixels=eyJhcG4iOjE2OTg5MjQ4NzcsInR0ZCI6MTY5ODkyNDg3NywicHViIjoxNjk4OTI0ODc3LCJydWIiOjE2OTg5MjQ4NzcsInRhcGFkIjoxNjk4OTI0ODc3LCJhZHgiOjE2OTg5MjQ4NzcsImdvbyI6MTY5ODkyNDg3NywiYW1vIjoxNjk4OTI0ODc3LCJiZWVzIjoxNjk4OTI0ODc3LCJzb24iOjE2OTg5MjQ4NzcsInVucnVseSI6MTY5ODkyNTg5MiwiY29sb3NzdXMiOjE2OTg5MjU4OTIsInBwbnQiOjE2OTg5MjU4OTIsImFkbyI6MTY5ODkyNTg5MiwiaW1wciI6MTY5ODkyNTg5MiwidGFib29sYSI6MTY5ODkyNTg5MiwiaW5kZXgiOjE2OTg5MjU4OTIsInNtYXJ0IjoxNjk4OTI1ODkyLCJvcGVueCI6MTY5ODkyNTg5Mn0%3D; _ga_DGH2MSM4NL=GS1.1.1698951079.5.0.1698952871.60.0.0; _fbp=fb.1.1698926138735.1037363267; BubbleDomainCookie=YqsyWJmwx7UXGA5z0R7rlUGepGP2GESrMLtS7tUCTAS%2F9ApoSR2fsKUWU8IHJ%2BJhaR6F6evCljvARxfFQVKrEObYLETZHJfWfVuXdsjwpjV5dLodx82JAHFYzpN5De2me4aPkwq6WMpgmJjY8qBBSYEOzRSrWbJbL1NGjCkPYXWIWjYcaJpPPuGelNE5iOmT; _gid=GA1.2.252901717.1699046723; _gat_gtag_UA_146710577_1=1' -H 'Sec-Fetch-Dest: empty' -H 'Sec-Fetch-Mode: cors' -H 'Sec-Fetch-Site: same-origin' -H 'TE: trailers' -o app-dump.json

echo "Dumped list of all applications to apps.json";


poetry shell


# 2. Format apps to v2 format 
python ../step-2/script.py app-dump.json apps.json


# 3. Fetch all issues with apps
curl -s 'http://localhost:9898/api/v1/customer/assesment/beta_findings?page=1&limit=1000000' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:120.0) Gecko/20100101 Firefox/120.0' -H 'Accept: application/json, text/plain, */*' -H 'Accept-Language: en-US,en;q=0.5' -H 'Accept-Encoding: gzip, deflate, br' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYWtoYXIuYWduaWhvdHJpQHRpbWVzaW50ZXJuZXQuaW4iLCJkb21haW5zIjpbeyIkb2lkIjoiNWUwZGQ0ZjJhZTIxZjI3Mjk3MWRiMDkzIn0seyIkb2lkIjoiNWUwZGQzNjRhZTIxZjI3Mjk3MWRiMDhhIn0seyIkb2lkIjoiNWUwZGQzOTdhZTIxZjI3Mjk3MWRiMDhiIn0seyIkb2lkIjoiNWUwZGQ0ODJhZTIxZjI3Mjk3MWRiMDhmIn0seyIkb2lkIjoiNWUwZGQ0OGZhZTIxZjI3Mjk3MWRiMDkwIn0seyIkb2lkIjoiNWUwZGQ0OWFhZTIxZjI3Mjk3MWRiMDkxIn0seyIkb2lkIjoiNWUwZGQ0YjVhZTIxZjI3Mjk3MWRiMDkyIn1dLCJyb2xlcyI6WyJzdXBlcmFkbWluIiwiYWRtaW4iLCJ1c2VyIiwiY2xpZW50Il0sInVwZGF0ZWRBdCI6IjIwMjMtMTEtMDUgMTI6NTU6MzUuMjU0MjMyIn0.fYnz7OHHshM4ioJhsyoDjsDT9BbVqW1ZPzicg73o6a8' -H 'Origin: http://localhost:4200' -H 'Connection: keep-alive' -H 'Referer: http://localhost:4200/' -H 'Sec-Fetch-Dest: empty' -H 'Sec-Fetch-Mode: cors' -H 'Sec-Fetch-Site: same-site' -o issues_with_app.json


# 4. Fill empty attributes of app with latest assessment_data if applicable
python  ../step-3/script.py   issues_with_app.json  apps-from-assessment.json 


# remap the apps and concile
python  ../step-4/script.py   apps.json  apps-from-assessment.json  all_apps.json
# 


source ../step-5/.env
python ../step-5/main.py  all_apps.json



# Transform all the issues to findings
python ../step-6/script.py  issues_with_app.json

