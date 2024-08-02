import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Add from "./Add";

describe("Add", () => {
  it("it should return 0 if input value is empty", () => {
    render(<Add numbers="" />);
    expect(screen.getByText("0")).toBeDefined();
  });
});
