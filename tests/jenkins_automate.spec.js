const { test } = require("@playwright/test");
const data = require("../data.json");

test("run test in jenkins", async ({ page }) => {
  await page.goto("http://localhost:8080/login?from=%2F");
  await page.getByPlaceholder("Username").fill(data.login);
  await page.getByPlaceholder("Password").fill(data.password);
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.goto(`http://localhost:8080/job/${data.test_link}/`);
  await page.click("text=Build Now");
});
