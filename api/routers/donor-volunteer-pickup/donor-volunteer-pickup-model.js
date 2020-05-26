
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

async function findById(role,id) {
  let idType
  let tableName
  try {
    if (role === "donor" || role === "business"){
      console.log("")
      idType = "donor-id"
      tableName = "donors"
      return await db.select("*")
            .from("donor-volunteer-pickup")
            .join("pickups", "pickups.pickup-id", "=", "donor-volunteer-pickup.pickup-id")
            .join("donors", "donors.donor-id", "=", "donor-volunteer-pickup.donor-id")
            .where(`${tableName}.${idType}`, id)
  
    } else {
      idType = "volunteer-id"
      tableName = "volunteers"
      return await db.select("*")
      .from("donor-volunteer-pickup")
      .join("pickups", "pickups.pickup-id", "=", "donor-volunteer-pickup.pickup-id")
      .join("donors", "donors.donor-id", "=", "donor-volunteer-pickup.donor-id")
      .join("volunteers", "volunteers.volunteer-id", "=", "donor-volunteer-pickup.volunteer-id") 
      .where(`${tableName}.${idType}`, id)
  
    }

  } catch (error){
    console.log(error)
    throw error
  }
  
}