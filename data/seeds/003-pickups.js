
exports.seed = function(knex) {
  
      return knex('pickups').insert([
        {
          "pickup-id":1,
          "type": "Apples",
          "amount": "3 bushels",
          "pickup-date": "2020-02-27"
        },
        {
          "pickup-id":2,
          "type": "Naan",
          "amount": "24 loaves",
          "pickup-date": "2020-05-29"
        },
        {
          "pickup-id":3,
          "type": "Macaroni Cheese",
          "amount": "16 servings",
          "pickup-date": "2030-06-3"
        }
      ]);

};
