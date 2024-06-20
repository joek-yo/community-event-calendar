const bcrypt = require('bcryptjs');

const users = [];

const addUser = (username, password) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  users.push({ username, password: hashedPassword });
};

const findUser = (username) => {
  return users.find(user => user.username === username);
};

module.exports = { addUser, findUser };
