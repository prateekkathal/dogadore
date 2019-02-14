// First Param: username
// Second Param: password
db.auth("dogadore", "dogadore");

db = db.getSiblingDB("dogadore_docker");

db.createUser({
  user: "dogadore",
  pwd: "dogadore",
  roles: [
    {
      role: "root",
      db: "admin"
    }
  ]
});

db.createCollection("users");
