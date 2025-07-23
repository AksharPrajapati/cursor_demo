import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ProfileMain from "./ProfileMain";

describe("ProfileMain", () => {
  const user = {
    id: "1",
    name: "Test User",
    email: "test@example.com",
    created_at: new Date(),
    updated_at: new Date(),
  };
  const theme = "dark";
  const sidebarOpen = true;

  it("renders correct content for each selected option", () => {
    render(
      <ProfileMain
        selected="overview"
        user={user}
        theme={theme}
        sidebarOpen={sidebarOpen}
      />
    );
    expect(screen.getByText("Test User")).toBeInTheDocument();
  });
});
