import { useRouter } from "next/navigation";
import { render } from "@testing-library/react";
import Home from "./page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Home page redirect logic", () => {
  let replaceMock: jest.Mock;

  beforeEach(() => {
    // Setup localStorage mock
    const localStorageMock = (() => {
      let store: Record<string, string> = {};

      return {
        getItem: jest.fn((key: string) => store[key] || null),
        setItem: jest.fn((key: string, value: string) => {
          store[key] = value;
        }),
        removeItem: jest.fn((key: string) => {
          delete store[key];
        }),
        clear: jest.fn(() => {
          store = {};
        }),
      };
    })();

    Object.defineProperty(global, "localStorage", {
      value: localStorageMock,
      writable: true,
    });

    // Mock router.replace
    replaceMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      replace: replaceMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("redirects to /profile if signed in", () => {
    (global.localStorage.getItem as jest.Mock).mockReturnValue("true");
    render(<Home />);
    expect(replaceMock).toHaveBeenCalledWith("/profile");
  });

  it("redirects to /login if not signed in", () => {
    (global.localStorage.getItem as jest.Mock).mockReturnValue("false");
    render(<Home />);
    expect(replaceMock).toHaveBeenCalledWith("/login");
  });
});
