const db = require("../../../data/dbConfig");

module.exports = {
    add,
    findByUsername,
    findById,
    update,
    remove
  };

function findByUsername(username){
  console.log("Find by username",username)
  return db("volunteers").where({username:username}).first();
}

async function add(user) {
  try {
    const [id] = await db("volunteers").insert(user, "volunteer-id");
    return findById(id);
  } catch (error) {
      console.log(error)
    throw error;
  }
}

async function findById(id) {
  console.log("id:",id)
  try {
    const v =  await db("volunteers").where("volunteer-id",id).first();
    console.log(v)
    return v
  } catch (error) {
    console.log(error)
    throw error;
  }
}

function update(changes,id) {
  return db("volunteers")
  .where("volunteer-id",id)
  .update(changes)
  .then(() => {
    return findById(id)
  })
}

async function remove(id){
  try {
    await db("donor-volunteer-pickup").where("volunteer-id",id).update("volunteer-id",null);
    await db("volunteers").where("volunteer-id",id).del();
  } catch (error ){
    console.log(error)
    throw error
  }
}