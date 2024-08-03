import { describe, it, expect, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import Add from "../../components/Add";

describe("Add", () => {
  const originalConsoleError = console.error;

  beforeAll(() => {
    // Suppress console error messages
    console.error = vi.fn();
  });

  afterAll(() => {
    // Restore console.error after all tests are done
    console.error = originalConsoleError;
  });

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

  it("should accept '\\n' as a delimiter like , and return total of n numbers if has valid data", () => {
    render(<Add numbers="1\n2,3" />);
    expect(screen.getByText(6)).toBeDefined();
  });

  it("should return 0 if delimiter is not \n or ,", () => {
    render(<Add numbers="1--2,3" />);
    expect(screen.getByText(0)).toBeDefined();
  });

  it("should support dynamic delimiter and return 3 value based on existing implementation", () => {
    render(<Add numbers="//;\n1;2" />);
    expect(screen.getByText(3)).toBeDefined();
  });

  it("should throw error when 1 or n number of negative numbers passed", () => {
    expect(() => render(<Add numbers="//;\n-1;-2" />)).toThrowError(
      "negatives not allowed -1,-2"
    );
  });

  it("should ignore if input number contains value greater then 1000", () => {
    render(<Add numbers="//;\n2;1001" />);
    expect(screen.getByText(2)).toBeDefined();
  });

  it("should allow any length of delimiter with in the []", () => {
    render(<Add numbers="//[*][%][--]\n1*2%3--4" />);
    expect(screen.getByText(10)).toBeDefined();
  });

  it("should return 0 if any one of the delimiter is not provided", () => {
    render(<Add numbers="//[][%]\n1*2%3" />);
    expect(screen.getByText(0)).toBeDefined();
  });
});
