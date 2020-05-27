# Back-End

###  Deployed at: https://replater.herokuapp.com  ###

# Register

As of now **register** is working: 

route: /api/auth/register

key|type|example|donor|volunteer
---|---|---|---|---
username|string|gord|yes|yes
password|string|hard2guess|yes|yes
role|string|donor/business|yes|no
name|string|ACNE|yes|yes
phone|string|000 000 0000|yes|yes
address|string|1 roundabout way|yes|no

**If you provide any string other than donor or business for role, it will route to volunteer signup**

If you provide string donor or business for role it will register a donor and return an object like so:
```
{
    "donor-id": 1,
    "username": "gord",
    "password": "890123098HASHEDPASSWORD70958289341234",
    "business-name": "User Donor Enterprises",
    "business-phone": "123 456 789",
    "business-address": "1 User Way, Userville"
}
```

providing any other string for role will look like this: 

```
{
    "volunteer-id": 2,
    "username": "gord",
    "password": "890123098HASHEDPASSWORD70958289341234",
    "volunteer-name": "User Donor Enterprises",
    "volunteer-phone": "123 456 789"
}
```

Usernames have to be unique per table, so there can only be one "gord" donor and one "gord" volunteer.
If you try register another user with the same username it will throw a 500 error. For now, under detail, you will see why.

# Login

As of now **login** is working

route: /api/auth/login

key | type | example
---|---|---
username | string | gord
password | string | gord
role     | string | donor

If you enter:
```
{
	"username": "George",
	"password": "validPassword",
	"role": "donor",
}
```
Server will return: 
```
{
    "message": "Success",
    "token": "eyJhbGciOiJIaUzI1NiIshInR5cCI6IkpXgdfsf2gAVCJ9.eyJ31c2VySWQiOjM0LCJyb232xlIjoiZ3G9ub3IiLCkJpYXQiOjE1OTAzNja3cwOTAsIlgmV4cCI6MTU5MDQ1123aMzQ5MH0.PD5qaooH2wLuasdf2223hZK72uIgpv2Gas123Fj_9ExDqvCd6yAoskhjFFr4"
}
```

# Pickups
#### POST #### 
For pickups is working. This only works for users logged in as a donor, however, users marked as volunteers will not be able to post.

route: /api/pickups

key | type | example
---|---|---
type | string | bread
amount | string | 12 loaves
pickup-date | date(yyyy-mm-dd) |  2020-05-25

sending:
```
{
	"type": "Apples",
	"amount": "1lbs",
	"pickup-date": "2030-02-20"
}
```
returns
```
{
    "pickup-id": 9,
    "type": "Apples",
    "amount": "1lbs",
    "pickup-date": "2030-02-20T06:00:00.000Z"
}
```
I suggest using [momentjs](https://momentjs.com/) to take the pickup-date and format back to a readable format
``` 
const moment = require('moment')
date = moment('2030-02-20T06:00:00.000Z').format('ll')
console.log(date) // outputs Feb 20, 2030
```

#### GET ####
for pickups is working.

route: /api/pickups/all
This will return ALL pickups associated with the logged in user.
If you are a business, this will return the relevant pickup information as well as your information, it will then check to see if there is a volunteer assigned, if there is no volunteer assigned it will return a null value for volunteerInfo

route: /api/pickups/unassigned
This will return ALL pickups that are not associated with a volunteer. This is for the purpose of displaying a list of available pickups for volunteers to assign themselves to.

route: /api/pickups
Get request for donor: 
In the first request the volunteer is assigned, in the second the volunteer is not assigned.
```
[
    {
        "pickup-id": 8,
        "type": "Apples",
        "amount": "1lbs",
        "pickup-date": "2030-02-20T06:00:00.000Z",
        "business-name": "User Donor Enterprises",
        "business-phone": "123 456 789",
        "business-address": "1 User Way, Userville",
        "volunteer-info": {
            "volunteer-id": 7,
            "volunteer-name": "User Donor Enterprises",
            "volunteer-phone": "123 456 789"
        }
    },
    {
        "pickup-id": 10,
        "type": "banana bread ",
        "amount": "20 loaves ",
        "pickup-date": "2020-05-30T05:00:00.000Z",
        "business-name": "User Donor Enterprises",
        "business-phone": "123 456 789",
        "business-address": "1 User Way, Userville",
        "volunteer-info": null
    }
]

```
route: /api/pickups
GET request for volunteer:
```
[
    {
        "pickup-id": 7,
        "type": "Apples",
        "amount": "1lbs",
        "pickup-date": "2030-02-20T06:00:00.000Z",
        "donor-id": 1,
        "business-name": "User Donor Enterprises",
        "business-address": "1 User Way, Userville",
        "business-phone": "123 456 789"
    },
    {
        "pickup-id": 6,
        "type": "Apples",
        "amount": "1lbs",
        "pickup-date": "2030-02-20T06:00:00.000Z",
        "donor-id": 1,
        "business-name": "User Donor Enterprises",
        "business-address": "1 User Way, Userville",
        "business-phone": "123 456 789"
    }
]
```
#### PUT ####
requests are PARTIALLY working

route: /api/pickups/assign/:id

This is used to update a selected pickup to the logged in VOLUNTEER. This will return an error if a donor or business is logged in (decoded via token)

key | type | example
---|---|---
"volunteer-id"|string|"asdf"

The api checks if is a pickup existing with the pickup-id equal to the req.params.id if there is it will then:
The api checks if the string is null, if it is null, it will remove the currently assigned volunteer-id.
If it is not null it will assign the currently logged in volunteer to the pickup matching the req.params.id.

PUT /api/pickups/assign/7 LOGGED IN AS volunteer
Body:
```
{
	"volunteer-id": "asdf"
}
```
returns
```
{
    "message": "Pickup 7 was successfully assigned to user: 3",
    "updated": 1
}
```
Body: 
```
{
	"volunteer-id": null
}
```
returns:
```
{
    "message": "Pickup 7 was successfully assigned to no user",
    "updated": 1
}
```
##### pickups put #####
Donors can now PUT and edit the pickups they have created
/api/pickups/:id

key | type | example
---|---|---
type | string | bread
amount | string | 12 loaves
pickup-date | date(yyyy-mm-dd) |  2020-05-25

```
{
    "pickup-id": 13,
    "type": "naan",
    "amount": "20kg ",
    "pickup-date": "2020-05-30T05:00:00.000Z"
}
```
put:
```
{
	"type": "oranges"
}
```
returns: 
```
{
    "pickup-id": 13,
    "type": "oranges",
    "amount": "20kg ",
    "pickup-date": "2020-05-30T05:00:00.000Z"
}
```

#### Delete ####

route: /api/pickups/:id

This will delete the pickup with the associated pickup-id of :id. Can only be done by donors, and only by the donor that the pickup is associated with. 

# Donors

Put is working
route: /api/donors

key | type | example
---|---|---
name | string | ACNE
address | string | 123 Parklane Dr
phone | string | 088 234 5607

```
	"name": "Gordilocks volunteer Enterprises",
        "address": "1 User Way, Userville",
        "phone": "123 456 789"
```

DELETE is working
route: /api/donors

this will delete the logged in donor

GET is working
route: /api/donors

this will get the information for the logged in donor
# Volunteers

Put is working
route: /api/volunteers

key | type | example
---|---|---
name | string | ACNE
phone | string | 088 234 5607

```
	"name": "Gordilocks volunteer Enterprises",
        "phone": "123 456 789"
```

DELETE is working
route: /api/volunteers

this will delete the logged in volunteer

GET is working
route: /api/volunteers

this will get the information for the logged in volunteer

# In Progress:


RUD donors
RUD volunteers
UD pickups

DONOR:
id  username    business-name     address         phone         password
1   gordon  gordonenterprises   1 gordon way    0899109402      
2   kate

VOLUNTEER
id  username    volunteer-name  phone                           password
1   kate    kateenterprises     090-12389123                    809238409oisdjhf098asdfkhj123.12098309iasdf,..123981209380123
2   gordon

PICKUP
1   pears  1lb                 1 april 2020

VOLUNTEER-DONOR-PICKUP
1   donor-id    volunteer-id     pickup-id


Pickup of apples, belongs to gordonenterprises(donor), assigned to kateenterprises(volunteer), to be picked up by 1 april 2020, gordonenterprises address, gordonenterprises phone number, kateenterprises phone number
