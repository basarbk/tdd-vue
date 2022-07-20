import AccountActivationPage from "./AccountActivationPage.vue";
import { render, screen } from "@testing-library/vue";
import { setupServer } from "msw/node";
import { rest } from "msw";

const server = setupServer();

beforeAll(() => server.listen());

beforeEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("Account Activation Page", () => {
  const setup = (token) => {
    render(AccountActivationPage, {
      global: {
        mocks: {
          $route: {
            params: {
              token: token,
            },
          },
        },
      },
    });
  };

  let counter;
  beforeEach(() => {
    counter = 0;
    server.use(
      rest.post("/api/1.0/users/token/:token", (req, res, ctx) => {
        if (req.params.token === "5678") {
          return res(
            ctx.status(400),
            ctx.json({ message: "Activation failure" }),
            ctx.delay(50)
          );
        }

        counter += 1;
        return res(ctx.status(200), ctx.delay(50));
      })
    );
  });

  it("displays activation success message when token is correct", async () => {
    setup("1234");
    const message = await screen.findByText("Account is activated");
    expect(message).toBeInTheDocument();
  });

  it("sends activation request to backend", async () => {
    setup("1234");
    await screen.findByText("Account is activated");
    expect(counter).toBe(1);
  });
  it("displays activation failure message when token is incorrect", async () => {
    setup("5678");
    const message = await screen.findByText("Activation failure");
    expect(message).toBeInTheDocument();
  });
  it("displays spinner during activation api call", async () => {
    setup("1234");
    const spinner = await screen.findByRole("status");
    expect(spinner).toBeInTheDocument();
    await screen.findByText("Account is activated");
    expect(spinner).not.toBeInTheDocument();
  });
});
