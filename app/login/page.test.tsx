import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "./page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace: jest.fn(), push: jest.fn() }),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        success: true,
        token: "token",
        user: { id: "1", name: "Test", email: "test@example.com" },
      }),
  })
) as jest.Mock;

describe("LoginPage", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
    localStorage.clear();
  });

  it("renders sign in and sign up tabs", () => {
    render(<LoginPage />);
    expect(screen.getByText("Sign in")).toBeInTheDocument();
    expect(screen.getByText("Create account")).toBeInTheDocument();
  });

  it("switches to sign up tab", () => {
    render(<LoginPage />);
    fireEvent.click(screen.getByText("Create account"));
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
  });

  it("shows error on failed login", async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: false, message: "Invalid" }),
      })
    );
    render(<LoginPage />);
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "a@b.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByText("Sign in with Brainwave"));
    await waitFor(() =>
      expect(screen.getByText("Invalid")).toBeInTheDocument()
    );
  });

  it("stores token and user on successful login", async () => {
    render(<LoginPage />);
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "a@b.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByText("Sign in with Brainwave"));
    await waitFor(() => expect(localStorage.getItem("token")).toBe("token"));
    expect(localStorage.getItem("user")).toContain("Test");
  });
});
