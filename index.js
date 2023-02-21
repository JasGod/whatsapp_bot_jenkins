const qrcode = require("qrcode-terminal");
const childProcess = require("child_process");
const { Client, LocalAuth } = require("whatsapp-web.js");

// Use the saved values
const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", (msg) => {
  if (msg.body === "Run jira-test") {
    run_jenkins_test();
    msg.reply("Test run, see the result on Slack channel General");
  }

  if (msg.body === "Run playwright") {
    msg.reply("run playwright");
  }
});

client.initialize();

function run_jenkins_test() {
  const playwright_run = childProcess.spawn("npm test", { shell: true });
  playwright_run.stderr.on("close", () => {
    console.log("test end");
  });
}
