import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./Modal";

describe("Modal", () => {
  it("renders children when show is true", () => {
    render(
      <Modal show={true} onClose={jest.fn()}>
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("does not render when show is false", () => {
    render(
      <Modal show={false} onClose={jest.fn()}>
        <div>Should not show</div>
      </Modal>
    );
    expect(screen.queryByText("Should not show")).toBeNull();
  });

  it("calls onClose when backdrop is clicked", () => {
    const onClose = jest.fn();
    render(
      <Modal show={true} onClose={onClose}>
        <div>Modal Content</div>
      </Modal>
    );
    const content = screen.getByText("Modal Content");
    const backdrop = content.parentElement?.parentElement;
    if (backdrop) fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalled();
  });
});
