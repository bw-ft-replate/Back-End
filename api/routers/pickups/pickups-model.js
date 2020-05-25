const db = require("../../../data/dbConfig");

module.exports = {
    add,
    find,
    //findByUsername,
    findById,
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



function findById(id) {
    console.log("FindbyID id: ",id)
  return db("pickups").where("pickup-id",id).first();
}