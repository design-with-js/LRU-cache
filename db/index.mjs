// index.js
import axios from "axios";

const data = { users: [] };
// Create 1000 users
for (let i = 0; i < 1000; i++) {
  axios.post("http://localhost:3000/users", { id: i, name: `user${i}` });
}
