import assert from "node:assert";
import MyExtension from "../src/index.js";

console.log("Running getInfo test...");

const inst = new MyExtension();
const info = inst.getInfo();

// Basic shape assertions
assert.ok(info && typeof info === "object");
assert.strictEqual(info.id, "myextension");
assert.strictEqual(info.name, "My Extension");
assert.ok(Array.isArray(info.blocks));
assert.ok(info.blocks.length >= 1);

assert.strictEqual(inst.sayHello(), "Hello, world!");

const echoed = inst.echo("test-value");
assert.strictEqual(echoed, "test-value");

console.log("All tests passed!");
