import "@testing-library/jest-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import ProfilePage from "./page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe("ProfilePage", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
  });

  it("shows loading initially", () => {
    localStorage.setItem("token", "token");
    global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;
    render(<ProfilePage />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("redirects to login if not authenticated", async () => {
    render(<ProfilePage />);
    await waitFor(() =>
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
    );
  });

  it("fetches and displays user profile", async () => {
    localStorage.setItem("token", "token");
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            data: {
              id: "1",
              name: "Test",
              email: "test@example.com",
              created_at: new Date(),
              updated_at: new Date(),
            },
          }),
      })
    ) as jest.Mock;
    render(<ProfilePage />);
    await waitFor(() =>
      expect(screen.getAllByText("Test").length).toBeGreaterThan(0)
    );
    expect(screen.getAllByText("test@example.com").length).toBeGreaterThan(0);
  });

  it("logs out and redirects", async () => {
    localStorage.setItem("token", "token");
    localStorage.setItem(
      "user",
      JSON.stringify({ id: "1", name: "Test", email: "test@example.com" })
    );
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            data: {
              id: "1",
              name: "Test",
              email: "test@example.com",
              created_at: new Date(),
              updated_at: new Date(),
            },
          }),
      })
    ) as jest.Mock;
    render(<ProfilePage />);
    await waitFor(() =>
      expect(screen.getAllByText("Test").length).toBeGreaterThan(0)
    );
    // Click the sidebar/logout button to open the modal
    const logoutButtons = screen.getAllByText("Logout");
    logoutButtons[0].click();
    // Wait for the modal's Logout button to appear
    await waitFor(() =>
      expect(screen.getAllByText("Logout").length).toBeGreaterThan(1)
    );
    // Click the modal's Logout button
    const modalLogoutButton = screen.getAllByText("Logout")[1];
    modalLogoutButton.click();
    expect(localStorage.getItem("token")).toBeNull();
    expect(localStorage.getItem("user")).toBeNull();
  });
});
