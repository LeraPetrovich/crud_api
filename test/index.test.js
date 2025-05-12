import { describe, it, before } from "node:test";
import { fetchJSON } from "./fetchApi.js";
import assert from "node:assert";

const apiUrl = "http://localhost:3000/api/users";

const clearUsers = async () => {
  await fetch(`${apiUrl}/all`, {
    headers: { "Content-Type": "application/json", method: "DELETE" },
  }).catch(() => {});
};

describe("test api", () => {
  before(async () => {
    await clearUsers();
  });
  it("should return all users", async () => {
    const { status, data } = await fetchJSON(apiUrl);
    assert.strictEqual(status, 200);
    assert.deepStrictEqual(data, []);
  });
  it("should create new user", async () => {
    const postData = {
      username: "TEST3",
      age: 21,
      hobbies: [],
    };
    const { status, data } = await fetchJSON(apiUrl, {
      method: "POST",
      body: JSON.stringify(postData),
    });
    assert.strictEqual(status, 201);
    delete data.id;
    assert.deepStrictEqual(data, {
      username: "TEST3",
      age: 21,
      hobbies: [],
    });
  });
  it("should get user by id", async () => {
    const postData = {
      username: "TEST3",
      age: 21,
      hobbies: [],
    };
    const { data: dataPost } = await fetchJSON(apiUrl, {
      method: "POST",
      body: JSON.stringify(postData),
    });
    console.log(dataPost);
    const { status, data } = await fetchJSON(`${apiUrl}/${dataPost.id}`);
    assert.strictEqual(status, 200);
    assert.deepStrictEqual(data, {
      id: dataPost.id,
      username: "TEST3",
      age: 21,
      hobbies: [],
    });
  });
  it("should get user by id", async () => {
    const postData = {
      username: "TEST3",
      age: 21,
      hobbies: [],
    };
    const { data: dataPost } = await fetchJSON(apiUrl, {
      method: "POST",
      body: JSON.stringify(postData),
    });
    const { status, data } = await fetchJSON(`${apiUrl}/${dataPost.id}`);
    assert.strictEqual(status, 200);
    assert.deepStrictEqual(data, {
      id: dataPost.id,
      username: "TEST3",
      age: 21,
      hobbies: [],
    });
  });
  it("should update user by id", async () => {
    const postData = {
      username: "TEST3",
      age: 21,
      hobbies: [],
    };
    const { data: dataPost } = await fetchJSON(apiUrl, {
      method: "POST",
      body: JSON.stringify(postData),
    });

    const newData = {
      username: "TEST",
      age: 21,
      hobbies: [],
    };
    const { status, data } = await fetchJSON(`${apiUrl}/${dataPost.id}`, {
      method: "PUT",
      body: JSON.stringify(newData),
    });
    assert.strictEqual(status, 200);
    console.log(data);
    assert.deepStrictEqual(data, {
      username: "TEST",
      age: 21,
      hobbies: [],
      id: dataPost.id,
    });
  });

  it("should delete user by id", async () => {
    const postData = {
      username: "TEST3",
      age: 21,
      hobbies: [],
    };
    const { data: dataPost } = await fetchJSON(apiUrl, {
      method: "POST",
      body: JSON.stringify(postData),
    });

    const { status } = await fetchJSON(`${apiUrl}/${dataPost.id}`, {
      method: "DELETE",
    });
    assert.strictEqual(status, 204);
  });

  it("error get element by id", async () => {
    const postData = {
      username: "TEST3",
      age: 21,
      hobbies: [],
    };
    const { data: dataPost } = await fetchJSON(apiUrl, {
      method: "POST",
      body: JSON.stringify(postData),
    });

    await fetchJSON(`${apiUrl}/${dataPost.id}`, {
      method: "DELETE",
    });

    const { status } = await fetchJSON(`${apiUrl}/${dataPost.id}`);
    assert.strictEqual(status, 404);
  });
});
