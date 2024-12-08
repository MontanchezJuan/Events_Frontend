import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ButtonBlack, ButtonBorder, PrimaryButton } from "./Button";

describe("Button Variants", () => {
  it("aplica el estilo verde en PrimaryButton", () => {
    render(<PrimaryButton>Click aquí</PrimaryButton>);
    const buttonElement = screen.getByText(/Click aquí/i);
    expect(buttonElement).toHaveClass("bg-[#00ff66] text-zinc-900");
  });

  it("aplica el estilo negro en ButtonBlack", () => {
    render(<ButtonBlack>Click aquí</ButtonBlack>);
    const buttonElement = screen.getByText(/Click aquí/i);
    expect(buttonElement).toHaveClass("bg-zinc-900 text-white");
  });

  it("aplica el borde blanco en ButtonBorder", () => {
    render(<ButtonBorder>Click aquí</ButtonBorder>);
    const buttonElement = screen.getByText(/Click aquí/i);
    expect(buttonElement).toHaveClass("border border-white");
  });
});
