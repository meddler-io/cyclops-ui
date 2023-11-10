# Move issues to findings
## Critical step before we move forward


curl 'http://localhost:9898/api/v1/customer/assesment/beta_findings?page=1&limit=1000000' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:120.0) Gecko/20100101 Firefox/120.0' -H 'Accept: application/json, text/plain, */*' -H 'Accept-Language: en-US,en;q=0.5' -H 'Accept-Encoding: gzip, deflate, br' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYWtoYXIuYWduaWhvdHJpQHRpbWVzaW50ZXJuZXQuaW4iLCJkb21haW5zIjpbeyIkb2lkIjoiNWUwZGQ0ZjJhZTIxZjI3Mjk3MWRiMDkzIn0seyIkb2lkIjoiNWUwZGQzNjRhZTIxZjI3Mjk3MWRiMDhhIn0seyIkb2lkIjoiNWUwZGQzOTdhZTIxZjI3Mjk3MWRiMDhiIn0seyIkb2lkIjoiNWUwZGQ0ODJhZTIxZjI3Mjk3MWRiMDhmIn0seyIkb2lkIjoiNWUwZGQ0OGZhZTIxZjI3Mjk3MWRiMDkwIn0seyIkb2lkIjoiNWUwZGQ0OWFhZTIxZjI3Mjk3MWRiMDkxIn0seyIkb2lkIjoiNWUwZGQ0YjVhZTIxZjI3Mjk3MWRiMDkyIn1dLCJyb2xlcyI6WyJzdXBlcmFkbWluIiwiYWRtaW4iLCJ1c2VyIiwiY2xpZW50Il0sInVwZGF0ZWRBdCI6IjIwMjMtMTEtMDUgMTI6NTU6MzUuMjU0MjMyIn0.fYnz7OHHshM4ioJhsyoDjsDT9BbVqW1ZPzicg73o6a8' -H 'Origin: http://localhost:4200' -H 'Connection: keep-alive' -H 'Referer: http://localhost:4200/' -H 'Sec-Fetch-Dest: empty' -H 'Sec-Fetch-Mode: cors' -H 'Sec-Fetch-Site: same-site' -o issues_with_app.json



## Types of fields

    LABEL = 0,
    TEXT = 1,
    TEXTAREA = 2,
    CATEGORY = 3,
    IPADRESS = 4,
    FILEUPLOAD = 5,
    URL = 6,
    CUSTOM_REGEX = 7

