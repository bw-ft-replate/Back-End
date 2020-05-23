# Back-End
API Back-End for Replate
url/api/
url/api/signup/donors
url/api/signup/volunteers           
url/api/login/donors                token
url/api/login/volunteers            token
url/api/pickups/                    (all) volunteer view
url/api/pickups/:id                 (specific pickups) 
url/api/volunteers/:id/pickups      volunteer view
url/api/donor/:id/pickups           donor view
url/api/donor/:id                   donor-dashboard
url/api/volunteer/:id               volunteer view

CRUD donors
CRUD volunteers
CRUD pickups

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
