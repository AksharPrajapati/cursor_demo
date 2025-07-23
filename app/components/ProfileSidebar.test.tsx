import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import ProfileSidebar from "./ProfileSidebar";

describe("ProfileSidebar", () => {
  const user = { name: "Test User", email: "test@example.com" };
  const sidebarOptions = [
    {
      label: "Overview",
      value: "overview",
      color: "blue",
      icon: <span>O</span>,
    },
    {
      label: "Settings",
      value: "settings",
      color: "slate",
      icon: <span>S</span>,
    },
  ];
  const colorMap = { blue: "border-blue-500", slate: "border-slate-500" };

  it("renders user info and options when open", () => {
    render(
      <ProfileSidebar
        sidebarOpen={true}
        setSidebarOpen={jest.fn()}
        selected={"overview"}
        setSelected={jest.fn()}
        theme={"dark"}
        setTheme={jest.fn()}
        user={user}
        setShowLogoutModal={jest.fn()}
        sidebarOptions={sidebarOptions}
        colorMap={colorMap}
      />
    );
    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    expect(screen.getByText("Overview")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("toggles theme", () => {
    const setTheme = jest.fn();
    render(
      <ProfileSidebar
        sidebarOpen={true}
        setSidebarOpen={jest.fn()}
        selected={"overview"}
        setSelected={jest.fn()}
        theme={"dark"}
        setTheme={setTheme}
        user={user}
        setShowLogoutModal={jest.fn()}
        sidebarOptions={sidebarOptions}
        colorMap={colorMap}
      />
    );
    fireEvent.click(screen.getByText("Switch to Light Mode"));
    expect(setTheme).toHaveBeenCalledWith("light");
  });

  it("calls setShowLogoutModal on logout button", () => {
    const setShowLogoutModal = jest.fn();
    render(
      <ProfileSidebar
        sidebarOpen={true}
        setSidebarOpen={jest.fn()}
        selected={"overview"}
        setSelected={jest.fn()}
        theme={"dark"}
        setTheme={jest.fn()}
        user={user}
        setShowLogoutModal={setShowLogoutModal}
        sidebarOptions={sidebarOptions}
        colorMap={colorMap}
      />
    );
    fireEvent.click(screen.getByText("Logout"));
    expect(setShowLogoutModal).toHaveBeenCalledWith(true);
  });

  it("collapses and expands sidebar", () => {
    const setSidebarOpen = jest.fn();
    const { rerender } = render(
      <ProfileSidebar
        sidebarOpen={true}
        setSidebarOpen={setSidebarOpen}
        selected={"overview"}
        setSelected={jest.fn()}
        theme={"dark"}
        setTheme={jest.fn()}
        user={user}
        setShowLogoutModal={jest.fn()}
        sidebarOptions={sidebarOptions}
        colorMap={colorMap}
      />
    );
    fireEvent.click(screen.getAllByRole("button")[0]);
    expect(setSidebarOpen).toHaveBeenCalledWith(false);
    rerender(
      <ProfileSidebar
        sidebarOpen={false}
        setSidebarOpen={setSidebarOpen}
        selected={"overview"}
        setSelected={jest.fn()}
        theme={"dark"}
        setTheme={jest.fn()}
        user={user}
        setShowLogoutModal={jest.fn()}
        sidebarOptions={sidebarOptions}
        colorMap={colorMap}
      />
    );
    fireEvent.click(screen.getAllByRole("button")[0]);
    expect(setSidebarOpen).toHaveBeenCalledWith(true);
  });
});
