import Input from "./Input.vue";
import { render } from "@testing-library/vue";

it("has is-invalid class for input when help is set", () => {
  const { container } = render(Input, { props: { help: "Error message" } });
  const input = container.querySelector("input");
  expect(input).toHaveClass("is-invalid");
});

it("has invalid-feedback class for span when help is set", () => {
  const { container } = render(Input, { props: { help: "Error message" } });
  const span = container.querySelector("span");
  expect(span).toHaveClass("invalid-feedback");
});

it("does not have is-invalid class for input when help is not set", () => {
  const { container } = render(Input);
  const input = container.querySelector("input");
  expect(input).not.toHaveClass("is-invalid");
});
