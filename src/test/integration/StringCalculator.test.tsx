import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StringCalculator from "../../components/StringCalculator";

describe("UI", () => {
  it("should have entered value", () => {
    render(<StringCalculator />);
    const inputElement = screen.getByTestId("input-item") as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "//;1,2" } });
    expect(inputElement.value).toBe("//;1,2");
  });

  it("should have correct rendered value 3 for the input //;1,2", () => {
    const result = render(<StringCalculator />);
    const inputElement = screen.getByTestId("input-item") as HTMLInputElement;
    const btnElement = screen.getByRole("button");
    fireEvent.change(inputElement, { target: { value: "//;1,2" } });
    fireEvent.click(btnElement);
    expect(result.queryByText("3")).toBeInTheDocument();
    fireEvent.change(inputElement, { target: { value: "//;1" } });
    expect(result.queryByText("3")).not.toBeInTheDocument();
  });
});
