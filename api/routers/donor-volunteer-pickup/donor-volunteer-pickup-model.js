
const db = require("../../../data/dbConfig");
module.exports = {
    // add,
    find,
    //findByUsername,
    findById,
    findByPickupId,
    updateVolunteer,
    remove
  };


function find() {
 
  return db("donor-volunteer-pickup");
}

async function findByPickupId(id){
  try {
    const data = await db("donor-volunteer-pickup").where("pickup-id",id).first();
    return data
  } catch(error){
    console.log(error)
    throw error
  }
  

}

async function findById(role,id) {
  console.log("Finding",id,role)
  let idType
  let tableName
  try {
    if (role === "donor" || role === "business"){
      console.log("it's a donor")
      idType = "donor-id"
      tableName = "donors"
      return await db.select("*")
            .from("donor-volunteer-pickup")
            .join("pickups", "pickups.pickup-id", "=", "donor-volunteer-pickup.pickup-id")
            .join("donors", "donors.donor-id", "=", "donor-volunteer-pickup.donor-id")
            .where(`${tableName}.${idType}`, id)
  
    } else {
      idType = "volunteer-id"
      tableName = "v"
      return await db.select("p.pickup-id","p.type","p.amount","p.pickup-date","d.donor-id","d.business-name","d.business-address","d.business-phone")
      .from("donor-volunteer-pickup as dvp")
      .join("pickups as p", "p.pickup-id", "=", "dvp.pickup-id")
      .join("donors as d", "d.donor-id", "=", "dvp.donor-id")
      .join("volunteers as v", "v.volunteer-id", "=", "dvp.volunteer-id") 
      .where(`${tableName}.${idType}`, id)
  
    }

  } catch (error){
    console.log(error)
    throw error
  }
  
}

async function updateVolunteer(id,volunteerId) {
  try {
    return await db("donor-volunteer-pickup").where("pickup-id", id).update("volunteer-id", volunteerId)
  } catch(error){
    console.log(error)
    throw error
  }
}

function remove(id){
  return db("donor-volunteer-pickup").where("pickup-id",id).del();
}