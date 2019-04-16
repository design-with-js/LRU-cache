import LRU from "../src";
import axios from "axios";

const lru = new LRU(2);

describe(`Tests LRU with following operations from json-server:`, () => {
  let users;
  beforeAll(async () => {
    users = await axios
      .get("http://localhost:3000/users")
      .then(res => res.data);
  });

  it("putting all values one by one from users database", async () => {
    // await console.log(users);
    users.forEach(user => {
      lru.set(user.id, user.name);
      // console.log(lru.store);
    });
    expect(lru.dll.length).toBe(2);
  });
});
