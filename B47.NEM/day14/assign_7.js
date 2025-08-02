const redis = require("redis");

const client = redis.createClient();

client.on("error", (err) => {
  console.error("Redis error:", err);
});

client.connect().then(async () => {
  try {
   
    await client.set("name", "John Doe");
    console.log("Stored: 'name' = 'John Doe'");

    const value = await client.get("name");
    console.log("Retrieved:", value);

    await client.del("name");
    console.log("Deleted key: 'name'");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.quit();
  }
});
