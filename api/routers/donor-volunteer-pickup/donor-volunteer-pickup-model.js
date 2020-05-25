
const db = require("../../../data/dbConfig");
module.exports = {
    // add,
    find,
    //findByUsername,
    // findById,
  };


function find() {
    return db("donor-volunteer-pickup");
}