import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/vue";
import LoginPage from "./LoginPage.vue";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { rest } from "msw";
import i18n from "../locales/i18n";
import en from "../locales/en.json";
import tr from "../locales/tr.json";
import LanguageSelector from "../components/LanguageSelector.vue";
import store from "../state/store";
import storage from "../state/storage";

let requestBody,
  acceptLanguageHeader,
  counter = 0;
const server = setupServer(
  rest.post("/api/1.0/auth", (req, res, ctx) => {
    requestBody = req.body;
    counter += 1;
    acceptLanguageHeader = req.headers.get("Accept-Language");
    return res(
      ctx.status(401),
      ctx.json({
        message: "Incorrect credentials",
      })
    );
  })
);

beforeAll(() => server.listen());

beforeEach(() => {
  counter = 0;
  server.resetHandlers();
});

afterAll(() => server.close());

let emailInput, passwordInput, button;
const setup = async () => {
  render(LoginPage, {
    global: {
      plugins: [i18n, store],
      mocks: {
        $router: {
          push: () => {},
        },
      },
    },
  });
  emailInput = screen.queryByLabelText("E-mail");
  passwordInput = screen.queryByLabelText("Password");
  button = screen.queryByRole("button", { name: "Login" });
};

const loginSuccess = rest.post("/api/1.0/auth", (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      id: 5,
      username: "user5",
      image: null,
      token: "abcdefgh",
    })
  );
});

describe("Login Page", () => {
  describe("Layout", () => {
    it("has Login header", async () => {
      await setup();
      const header = screen.queryByRole("heading", { name: "Login" });
      expect(header).toBeInTheDocument();
    });

    it("has email input", async () => {
      await setup();
      const input = screen.queryByLabelText("E-mail");
      expect(input).toBeInTheDocument();
    });
    it("has password input", async () => {
      await setup();
      const input = screen.queryByLabelText("Password");
      expect(input).toBeInTheDocument();
    });
    it("has password type for password input", async () => {
      await setup();
      const input = screen.queryByLabelText("Password");
      expect(input.type).toBe("password");
    });
    it("has Login button", async () => {
      await setup();
      const button = screen.queryByRole("button", { name: "Login" });
      expect(button).toBeInTheDocument();
    });
    it("disables the button initially", async () => {
      await setup();
      const button = screen.queryByRole("button", { name: "Login" });
      expect(button).toBeDisabled();
    });
  });
  describe("Interactions", () => {
    const setupFilled = async () => {
      await setup();
      await userEvent.type(emailInput, "user100@mail.com");
      await userEvent.type(passwordInput, "P4ssword");
    };

    it("enables the button when email and password inputs are filled", async () => {
      await setupFilled();
      expect(button).toBeEnabled();
    });
    it("displays spinner after clicking the button", async () => {
      await setupFilled();
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
      await userEvent.click(button);
      expect(screen.queryByRole("status")).toBeInTheDocument();
    });
    it("hides spinner after api call finishes with fail response", async () => {
      await setupFilled();
      await userEvent.click(button);
      const spinner = screen.queryByRole("status");
      await waitFor(() => {
        expect(spinner).not.toBeInTheDocument();
      });
    });
    it("sends email and password to backend after clicking the button", async () => {
      await setupFilled();
      await userEvent.click(button);
      const spinner = screen.queryByRole("status");
      await waitForElementToBeRemoved(spinner);
      expect(requestBody).toEqual({
        email: "user100@mail.com",
        password: "P4ssword",
      });
    });
    it("disables the button when there is an api call", async () => {
      await setupFilled();
      await userEvent.click(button);
      await userEvent.click(button);
      const spinner = screen.queryByRole("status");
      await waitForElementToBeRemoved(spinner);
      expect(counter).toBe(1);
    });
    it("displays authentication fail message", async () => {
      await setupFilled();
      await userEvent.click(button);
      const errorMessage = await screen.findByText("Incorrect credentials");
      expect(errorMessage).toBeInTheDocument();
    });
    it("clears authentication fail message when email field is changed", async () => {
      await setupFilled();
      await userEvent.click(button);
      const errorMessage = await screen.findByText("Incorrect credentials");
      await userEvent.type(emailInput, "new@mail.com");
      expect(errorMessage).not.toBeInTheDocument();
    });
    it("clears authentication fail message when password field is changed", async () => {
      await setupFilled();
      await userEvent.click(button);
      const errorMessage = await screen.findByText("Incorrect credentials");
      await userEvent.type(passwordInput, "N3wP4ssword");
      expect(errorMessage).not.toBeInTheDocument();
    });
    it("stores id, username and image in storage", async () => {
      server.use(loginSuccess);
      await setupFilled();
      await userEvent.click(button);
      const spinner = screen.queryByRole("status");
      await waitForElementToBeRemoved(spinner);
      const storedState = storage.getItem("auth");
      const keys = Object.keys(storedState);
      expect(keys.includes("id")).toBeTruthy();
      expect(keys.includes("username")).toBeTruthy();
      expect(keys.includes("image")).toBeTruthy();
    });
    it("stores authorization header value in storage", async () => {
      server.use(loginSuccess);
      await setupFilled();
      await userEvent.click(button);
      const spinner = screen.queryByRole("status");
      await waitForElementToBeRemoved(spinner);
      const storedState = storage.getItem("auth");
      expect(storedState.header).toBe("Bearer abcdefgh");
    });
  });

  describe("Internationalization", () => {
    let turkishLanguage;
    const setupTranslation = () => {
      const app = {
        components: {
          LoginPage,
          LanguageSelector,
        },
        template: `
        <LoginPage />
        <LanguageSelector />
        `,
      };

      render(app, {
        global: {
          plugins: [i18n],
        },
      });
      turkishLanguage = screen.queryByTitle("Türkçe");
    };

    it("initially displays all text in English", async () => {
      setupTranslation();
      expect(
        screen.queryByRole("heading", { name: en.login })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: en.login })
      ).toBeInTheDocument();
      expect(screen.queryByLabelText(en.email)).toBeInTheDocument();
      expect(screen.queryByLabelText(en.password)).toBeInTheDocument();
    });
    it("displays all text in turkish after changing language", async () => {
      setupTranslation();
      await userEvent.click(turkishLanguage);
      expect(
        screen.queryByRole("heading", { name: tr.login })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: tr.login })
      ).toBeInTheDocument();
      expect(screen.queryByLabelText(tr.email)).toBeInTheDocument();
      expect(screen.queryByLabelText(tr.password)).toBeInTheDocument();
    });
    it("sends accept-language header as tr in login request", async () => {
      setupTranslation();
      await userEvent.click(turkishLanguage);
      const emailInput = screen.queryByLabelText(tr.email);
      const passwordInput = screen.queryByLabelText(tr.password);
      await userEvent.type(emailInput, "user100@mail.com");
      await userEvent.type(passwordInput, "P4ssword");
      const button = screen.queryByRole("button", { name: tr.login });
      await userEvent.click(button);
      const spinner = screen.queryByRole("status");
      await waitForElementToBeRemoved(spinner);
      expect(acceptLanguageHeader).toBe("tr");
    });
  });
});
