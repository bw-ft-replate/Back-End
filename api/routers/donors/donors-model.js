const db = require("../../../data/dbConfig");

module.exports = {
    add,
    findByUsername,
    findById,
    update,
    remove
  };

function findByUsername(username){
  return db("donors").where({username:username}).first();
}

async function add(user) {
  try {
    const [id] = await db("donors").insert(user, "donor-id");
    return findById(id);
  } catch (error) {
    throw error;
  }
}

function findById(id) {
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