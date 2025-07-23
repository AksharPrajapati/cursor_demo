import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import SidebarMenuItem from "./SidebarMenuItem";

describe("SidebarMenuItem", () => {
  const icon = <span data-testid="icon">icon</span>;

  it("renders label and icon when sidebarOpen is true", () => {
    render(
      <SidebarMenuItem
        label="Test"
        icon={icon}
        selected={false}
        onClick={jest.fn()}
        sidebarOpen={true}
      />
    );
    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("does not render label when sidebarOpen is false", () => {
    render(
      <SidebarMenuItem
        label="Test"
        icon={icon}
        selected={false}
        onClick={jest.fn()}
        sidebarOpen={false}
      />
    );
    expect(screen.queryByText("Test")).toBeNull();
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  // it("applies selected styles", () => {
  //   render(
  //     <SidebarMenuItem
  //       label="Test"
  //       icon={icon}
  //       selected={true}
  //       onClick={jest.fn()}
  //       sidebarOpen={true}
  //     />
  //   );
  //   expect(screen.getByText("Test")).toHaveClass("text-blue-600");
  // });

  it("calls onClick when clicked", () => {
    const onClick = jest.fn();
    render(
      <SidebarMenuItem
        label="Test"
        icon={icon}
        selected={false}
        onClick={onClick}
        sidebarOpen={true}
      />
    );
    fireEvent.click(screen.getByText("Test"));
    expect(onClick).toHaveBeenCalled();
  });
});
