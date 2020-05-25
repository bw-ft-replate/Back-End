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
    "token": h"eyJhbGciOiJIaUzI1NiIshInR5cCI6IkpXgdfsf2gAVCJ9.eyJ31c2VySWQiOjM0LCJyb232xlIjoiZ3G9ub3IiLCkJpYXQiOjE1OTAzNja3cwOTAsIlgmV4cCI6MTU5MDQ1123aMzQ5MH0.PD5qaooH2wLuasdf2223hZK72uIgpv2Gas123Fj_9ExDqvCd6yAoskhjFFr4"
}
```

# In Progress:
         
/api/pickups/                    (all) volunteer view
/api/pickups/:id                 (specific pickups) 
/api/volunteers/:id/pickups      volunteer view
/api/donor/:id/pickups           donor view
/api/donor/:id                   donor-dashboard
/api/volunteer/:id               volunteer view

RUD donors
RUD volunteers
RUD pickups

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

getVolunteer(id):   username, volunteer-name, volunteer-phone, pickups: [{pickup-id, type, amount, pickup-date, business-address, business-name}]
getDonor(id):       username, donor-name, donor-phone, donor-adress, pickups: [{pickup-id, type, amount, pickup-date, business-address, volunteer-name}]
getPickup(id):      type, amount, pickup-date, volunteer-name, volunteer-phone, business-name, business-phone, business-address

postVolunteer():    username, password, volunter-name, volunteer-phone-number, 
postBusiness():     username, password, business-name, business-phone-number, business-address
postPickup():       type, amount, pickup-date

updateVolunteer(id):                  volunteer-name, volunteer-phone-number                                validation must be this volunteer
updateBusiness(id):                   business-name, business-phone-number, business-address                validation must be this busines
updatePickup(pickup-id):              type, amount, pickup-date                                             validation must be business-id belonging to pickup-id
updateDonorVolunteerPickup(volunteer-id,pickup-id):                                                         validation must be volunteer-id belonging to pickup-id

deleteVolunteer():                                                                                          validation must be this volunteer
deleteBusiness():                                                                                           validation must be this busines
deletePickup():                                                                                             validation must be business-id belonging to pickup-id

url/api/volunteer/1
kate kateenterprises 090-12389123  
        pickup: 1lb, of apples due 1, april2020, business-name
