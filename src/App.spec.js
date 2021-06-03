import { render, screen } from "@testing-library/vue";
import App from "./App.vue";
import i18n from "./locales/i18n";
import userEvent from "@testing-library/user-event";
import router from "./routes/router";

const setup = async (path) => {
  render(App, {
    global: { plugins: [i18n, router] },
  });
  router.replace(path);
  await router.isReady();
};

describe("Routing", () => {
  it.each`
    path         | pageTestId
    ${"/"}       | ${"home-page"}
    ${"/signup"} | ${"signup-page"}
    ${"/login"}  | ${"login-page"}
    ${"/user/1"} | ${"user-page"}
    ${"/user/2"} | ${"user-page"}
  `("displays $pageTestId when path is $path", async ({ path, pageTestId }) => {
    await setup(path);
    const page = screen.queryByTestId(pageTestId);
    expect(page).toBeInTheDocument();
  });

  it.each`
    path         | pageTestId
    ${"/"}       | ${"signup-page"}
    ${"/"}       | ${"login-page"}
    ${"/"}       | ${"user-page"}
    ${"/signup"} | ${"home-page"}
    ${"/signup"} | ${"login-page"}
    ${"/signup"} | ${"user-page"}
    ${"/login"}  | ${"home-page"}
    ${"/login"}  | ${"signup-page"}
    ${"/login"}  | ${"user-page"}
    ${"/user/1"} | ${"home-page"}
    ${"/user/1"} | ${"signup-page"}
    ${"/user/1"} | ${"login-page"}
  `(
    "does not display $pageTestId when path is $path",
    async ({ path, pageTestId }) => {
      await setup(path);
      const page = screen.queryByTestId(pageTestId);
      expect(page).not.toBeInTheDocument();
    }
  );

  it.each`
    targetPage
    ${"Home"}
    ${"Sign Up"}
    ${"Login"}
  `("has link to $targetPage on NavBar", async ({ targetPage }) => {
    await setup("/");
    const link = screen.queryByRole("link", { name: targetPage });
    expect(link).toBeInTheDocument();
  });

  it.each`
    initialPath  | clickingTo   | visiblePage
    ${"/"}       | ${"Sign Up"} | ${"signup-page"}
    ${"/signup"} | ${"Home"}    | ${"home-page"}
    ${"/"}       | ${"Login"}   | ${"login-page"}
  `(
    "displays $visiblePage after clicking $clickingTo link",
    async ({ initialPath, clickingTo, visiblePage }) => {
      await setup(initialPath);
      const link = screen.queryByRole("link", { name: clickingTo });
      await userEvent.click(link);
      const page = await screen.findByTestId(visiblePage);
      expect(page).toBeInTheDocument();
    }
  );

  it("displays home page when clicking brand logo", async () => {
    await setup("/login");
    const image = screen.queryByAltText("Hoaxify Logo");
    await userEvent.click(image);
    const page = await screen.findByTestId("home-page");
    expect(page).toBeInTheDocument();
  });
});
