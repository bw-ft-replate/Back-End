
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('donor-volunteer-pickup').del()
    .then(function () {
      // Inserts seed entries
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
    });
};
