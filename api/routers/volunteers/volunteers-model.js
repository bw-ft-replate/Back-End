const db = require("../../../data/dbConfig");

module.exports = {
    add,
    // find,
    findByUsername,
    findById,
  };

// function find() {
//     return db("users").select("id", "username");
// }

function findByUsername(username){
  console.log("Find by username",username)
  return db("volunteers").where({username:username}).first();
}

async function add(user) {

    console.log("volunteer in model:",user)
    
  try {
    const [id] = await db("volunteers").insert(user, "volunteer-id");
    console.log(id)
    return findById(id);
  } catch (error) {
      console.log(error)
    throw error;
  }
}

async function findById(id) {
  try {
    return await db("volunteers").where("volunteer-id",id).first();
  } catch (error) {
    console.log(error)
    throw error;
}

  
  
}