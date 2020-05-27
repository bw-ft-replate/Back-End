const bcryptjs = require("bcryptjs")

let password = bcryptjs.hashSync("gord", 2)

exports.seed = function(knex) {
    return knex('volunteers').del()
      .then(function () {
        return knex('volunteers').insert([
            {
                username:"gord",
                password:`${password}`,
                "volunteer-name": "Donor Establishment",
                "volunteer-phone": "123 456 789",
            }
        ]);
      });
};