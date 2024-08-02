import { describe, it, expect } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import Add from "./Add";

describe("Add", () => {
  afterEach(() => {
    cleanup();
  });

  it("should return 0 if input value is empty", () => {
    render(<Add numbers="" />);
    expect(screen.getByText("0")).toBeDefined();
  });

  it("should return 1 if input string length has 1 and it is a number", () => {
    render(<Add numbers="1" />);
    expect(screen.getByText("1")).toBeDefined();
  });

  it("should return 0 if input string length has 1 and it is not a number", () => {
    render(<Add numbers="a" />);
    expect(screen.getByText("0")).toBeDefined();
  });

  it("should return 3 if input string length has two number with , separator", () => {
    render(<Add numbers="1,2" />);
    expect(screen.getByText(3)).toBeDefined();
  });

  it("should return 0 if input string length has two number with - separator", () => {
    render(<Add numbers="1-2" />);
    expect(screen.getByText(0)).toBeDefined();
  });

  it("should return 6 if input has n number of strings with , separator", () => {
    render(<Add numbers="1,2,3" />);
    expect(screen.getByText(6)).toBeDefined();
  });

  it("should return 0 if input has n number of strings with , separator and invalid data", () => {
    render(<Add numbers="1,2,a" />);
    expect(screen.getByText(0)).toBeDefined();
  });
});
