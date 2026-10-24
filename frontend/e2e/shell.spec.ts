import { expect, test, type Browser, type Page } from "@playwright/test";

const widths = [390, 768, 1280] as const;
const themes = ["light", "dark"] as const;
const motions = ["no-preference", "reduce"] as const;

async function openPage(
  browser: Browser,
  path: string,
  width: number,
  theme: (typeof themes)[number],
  motion: (typeof motions)[number],
) {
  const pageErrors: string[] = [];
  const context = await browser.newContext({
    viewport: { width, height: 844 },
    reducedMotion: motion,
  });
  if (theme === "dark") {
    await context.addInitScript(() => {
      localStorage.setItem("swiftradish-theme", "dark");
    });
  }
  const page = await context.newPage();
  page.on("pageerror", (error) => {
    pageErrors.push(error.message);
  });
  await page.goto(path);
  return { context, page, pageErrors };
}

async function expectQuietShell(page: Page, path: "/" | "/home") {
  if (path === "/") {
    await expect(page.getByRole("heading", { name: "Publish something worth following." })).toBeVisible();
  } else {
    await expect(page.getByRole("heading", { name: "Your home is empty." })).toBeVisible();
    await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Account" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Search" })).toHaveCount(0);
    await expect(page.getByRole("link", { name: "Communities" })).toHaveCount(0);
    await expect(page.getByRole("link", { name: "Activity" })).toHaveCount(0);
  }
  await expect(page.getByRole("button", { name: "Use dark mode" })).toBeVisible();
}

test("captures the signed-out page and the empty home", async ({ browser }) => {
  for (const motion of motions) {
    for (const theme of themes) {
      for (const width of widths) {
        for (const path of ["/", "/home"] as const) {
          const { context, page, pageErrors } = await openPage(browser, path, width, theme, motion);
          await expectQuietShell(page, path);
          if (theme === "dark") {
            await expect(page.locator("html")).toHaveClass(/dark/);
          } else {
            await expect(page.locator("html")).not.toHaveClass(/dark/);
          }
          const folder = path === "/" ? "intro" : "home";
          await page.screenshot({
            path: `test-results/visual/${folder}-${width}-${theme}-${motion}.png`,
            fullPage: true,
          });
          expect(pageErrors).toEqual([]);
          await context.close();
        }
      }
    }
  }
});

test("keyboard reaches the signed-out actions and sign-in stays disabled", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Swiftradish" })).toBeFocused();

  await page.getByRole("link", { name: "Sign in" }).click();
  await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Password")).toBeVisible();
  const submit = page.getByRole("button", { name: "Sign in" });
  await expect(submit).toBeDisabled();
  await expect(page.getByText("Sign in connects in the next phase.")).toBeVisible();
  await page.screenshot({ path: "test-results/visual/login-390-light.png", fullPage: true });
  await submit.click({ force: true });
  await expect(page).toHaveURL(/\/login$/);

  await page.goto("/register");
  const create = page.getByRole("button", { name: "Create account" });
  await expect(create).toBeDisabled();
  await expect(page.getByText("Create account connects in the next phase.")).toBeVisible();
});

test("dark theme toggles from the control", async ({ page }) => {
  await page.goto("/home");
  await page.getByRole("button", { name: "Use dark mode" }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.getByRole("button", { name: "Use light mode" }).click();
  await expect(page.locator("html")).not.toHaveClass(/dark/);
});
