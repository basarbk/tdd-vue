import SignUpPage from "./SignUpPage.vue";
import { render, screen } from "@testing-library/vue";
import "@testing-library/jest-dom";

it("has Sign Up Header", () => {
  render(SignUpPage);
  const header = screen.queryByRole("heading", { name: "Sign Up" });
  expect(header).toBeInTheDocument();
});
