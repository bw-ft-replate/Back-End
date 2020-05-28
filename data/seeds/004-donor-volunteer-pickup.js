
exports.seed = function(knex) {
 
      return knex('donor-volunteer-pickup').insert([
        {
          "donor-id": 1,
          "pickup-id": 1,
          "volunteer-id": 1,
        },
        {
          "donor-id": 1,
          "pickup-id": 2,
          "volunteer-id": 1,
        },
        {
          "donor-id": 1,
          "pickup-id": 3,
          "volunteer-id": null,
        },
      ]);

};
