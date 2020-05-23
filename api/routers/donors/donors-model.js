const db = require("../../../data/dbConfig");

module.exports = {
    add,
    // find,
    // findBy,
    findById,
  };

// function find() {
//     return db("users").select("id", "username");
// }

// function findBy(key){
//   return db("users").where(key)
// }

async function add(user) {
    console.log("got here")
    newUser = {username: user.username, password:user.password}
  try {
    const [id] = await db("donors").insert(newUser, "id");
    console.log(id)
    return findById(id);
  } catch (error) {
      console.log(error)
    throw error;
  }
}

function findById(id) {
  return db("donors").where({ id }).first();
}