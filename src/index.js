class MyExtension {
  constructor() {
    // any instance state can go here
  }

  sayHello() {
    return "Hello, world!";
  }

  echo(value) {
    return typeof value === "undefined" ? "" : String(value);
  }

  getInfo() {
    return {
      id: "myextension",
      name: "My Extension",
      blocks: [
        {
          opcode: "sayHello",
          blockType: "reporter",
          text: "say hello",
        },
        {
          opcode: "echo",
          blockType: "reporter",
          text: "echo [VALUE]",
          arguments: {
            VALUE: {
              type: "string",
              defaultValue: "hello",
            },
          },
        },
      ],
    };
  }

  sayHelloOpcode() {
    return this.sayHello();
  }

  echoOpcode(args) {
    const value = args && args.VALUE !== undefined ? args.VALUE : "";
    return this.echo(value);
  }
}

// ESM default export
export default MyExtension;

// CommonJS compatibility
if (typeof module !== "undefined" && module.exports) {
  module.exports = MyExtension;
}

// Register with TurboWarp runtime if present
try {
  if (
    typeof Scratch !== "undefined" &&
    Scratch.extensions &&
    typeof Scratch.extensions.register === "function"
  ) {
    const inst = new MyExtension();
    Scratch.extensions.register({
      getInfo: () => inst.getInfo(),
      sayHello: () => inst.sayHello(),
      echo: (args) => inst.echo(args && args.VALUE),
    });
  }
} catch {
  console.warn("Scratch runtime not found.");
  console.warn("Aborted registration.");
}
