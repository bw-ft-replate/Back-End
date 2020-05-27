const db = require("../../../data/dbConfig");

module.exports = {
    add,
    // find,
    findByUsername,
    findById,
    update,
    remove
  };

// function find() {
//     return db("users").select("id", "username");
// }

function findByUsername(username){
  return db("donors").where({username:username}).first();
}

async function add(user) {

    console.log("donor in model:",user)
    
  try {
    const [id] = await db("donors").insert(user, "donor-id");
    console.log(id)
    return findById(id);
  } catch (error) {
      console.log(error)
    throw error;
  }
}

function findById(id) {
    console.log("FindbyID id: ",id)
  return db("donors").where("donor-id",id).first();
}



function update(changes,id) {
  return db("donors")
  .where("donor-id",id)
  .update(changes)
  .then(() => {
    return findById(id)
  })
}

async function remove(id){
  try {
    await db("donor-volunteer-pickup").where("donor-id",id).del();
    await db("donors").where("donor-id",id).del();
  } catch (error ){
    console.log(error)
    throw error
  }
}