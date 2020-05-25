
const db = require("../../../data/dbConfig");
module.exports = {
    // add,
    find,
    //findByUsername,
    findById,
  };


function find() {
 
  return db("donor-volunteer-pickup");
}

function findById(role,id) {
  let idType
  let tableName
  if (role === "donor" || role === "business"){
    console.log("")
    idType = "donor-id"
    tableName = "donors"
    return db.select("*")
          .from("donor-volunteer-pickup")
          .join("pickups", "pickups.pickup-id", "=", "donor-volunteer-pickup.pickup-id")
          .join("donors", "donors.donor-id", "=", "donor-volunteer-pickup.donor-id")
          .where(`${tableName}.${idType}`, id)

  } else {
    idType = "volunteer-id"
    tableName = "volunteers"
    return db.select("*")
    .from("donor-volunteer-pickup")
    .join("pickups", "pickups.pickup-id", "=", "donor-volunteer-pickup.pickup-id")
    .join("donors", "donors.donor-id", "=", "donor-volunteer-pickup.donor-id")
    .join("volunteers", "volunteers.volunteer-id", "=", "donor-volunteer-pickup.volunteer-id") 
    .where(`${tableName}.${idType}`, id)

  }
}