import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "Add Task" }).click();
  await page.getByPlaceholder("Enter Task Title").click();
  await page.getByPlaceholder("Enter Task Title").fill("Test");
  await page.getByPlaceholder("Enter Task Description").click();
  await page.getByPlaceholder("Enter Task Description").fill("Testing ");
  await page.getByRole("button", { name: "Save" }).click();
});
