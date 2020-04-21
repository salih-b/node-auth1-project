const db = require('./db-configs');


module.exports = {
    add,
    find,
    findBy,
    findById,
  };
  
  function find() {
    return db("users").select("id", "username", "password");
  }
  
  function findBy(filter) {
    return db("users").where(filter);
  }
  
  async function add(user) {
      console.log('in helper');
    const [id] = await db("users").insert(user, "id");
  console.log('id in add -->', id);
    return findById(id);
  }
  
  function findById(id) {
    return db("users").where({ id }).first();
  }
  