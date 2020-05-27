const bcryptjs = require("bcryptjs")

let password = bcryptjs.hashSync("gord", 2)

exports.seed = function(knex) {

        return knex('volunteers').insert([
            {
                "volunteer-id":1,
                username:"gord",
                password:`${password}`,
                "volunteer-name": "Donor Establishment",
                "volunteer-phone": "123 456 789",
            }
        ]);

};