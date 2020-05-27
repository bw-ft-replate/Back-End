
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('pickups').del()
    .then(function () {
      // Inserts seed entries
      return knex('pickups').insert([
        {
          "type": "Apples",
          "amount": "3 bushels",
          "pickup-date": "2020-02-27"
        },
        {
          "type": "Naan",
          "amount": "24 loaves",
          "pickup-date": "2020-05-29"
        },
        {
          "type": "Macaroni Cheese",
          "amount": "16 servings",
          "pickup-date": "2030-06-3"
        }
      ]);
    });
};
