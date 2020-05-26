const db = require("../../../data/dbConfig");

module.exports = {
    add,
    find,
    //findByUsername,
    findById,
    findUnassigned,
    update,
    remove

  };

async function add(pickup,donorId) {   
try {
    const [id] = await db("pickups").insert(pickup, "pickup-id");
    await db("donor-volunteer-pickup").insert({"donor-id": donorId, "pickup-id":id})
    console.log(id)
    return findById(id);
} catch (error) {
    console.log(error)
    throw error;
}
}

function find() {
    return db("pickups");
}

// function findByUsername(username){
//   return db("donors").where({username:username}).first();
// }

async function findUnassigned() {
  try {
    return await  db.select(
      "dvp.donor-id", "p.pickup-id", "p.type", "p.amount", "p.pickup-date", "d.business-name", "d.business-phone", "d.business-address")
      .from("donor-volunteer-pickup as dvp")
      .join("pickups as p", "p.pickup-id","=", "dvp.pickup-id")
      .join("donors as d", "d.donor-id","=", "dvp.donor-id")
      .where("dvp.volunteer-id",null)
  } catch(error){
    console.log(error)
    throw error
  }  
}

function findById(id) {
  console.log("FindbyID id: ",id)
  return db("pickups").where("pickup-id",id).first();
}

function update(changes,id) {
  return db("pickups")
  .where("pickup-id",id)
  .update(changes)
  .then(() => {
    return findById(id)
  })
}

function remove(id){
  return db("pickups").where("pickup-id",id).del();
}