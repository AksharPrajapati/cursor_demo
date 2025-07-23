import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import LogoutModal from "./LogoutModal";

describe("LogoutModal", () => {
  it("renders when show is true", () => {
    render(
      <LogoutModal show={true} onClose={jest.fn()} onLogout={jest.fn()} />
    );
    expect(screen.getByText("Confirm Logout")).toBeInTheDocument();
    expect(
      screen.getByText("Are you sure you want to log out?")
    ).toBeInTheDocument();
  });

  it("does not render when show is false", () => {
    render(
      <LogoutModal show={false} onClose={jest.fn()} onLogout={jest.fn()} />
    );
    expect(screen.queryByText("Confirm Logout")).toBeNull();
  });

  it("calls onClose when Cancel is clicked", () => {
    const onClose = jest.fn();
    render(<LogoutModal show={true} onClose={onClose} onLogout={jest.fn()} />);
    fireEvent.click(screen.getByText("Cancel"));
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onLogout when Logout is clicked", () => {
    const onLogout = jest.fn();
    render(<LogoutModal show={true} onClose={jest.fn()} onLogout={onLogout} />);
    fireEvent.click(screen.getByText("Logout"));
    expect(onLogout).toHaveBeenCalled();
  });
});
