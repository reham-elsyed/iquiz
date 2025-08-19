import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import HomePage from "./page";
import { getAuthSession } from "@/lib/nextAuth";

jest.mock("@/lib/nextAuth", () => ({
  getAuthSession: jest.fn(),
}));

const mockedGetAuthSession = getAuthSession as jest.MockedFunction<
  typeof getAuthSession
>;

describe("Page", () => {
  it("renders a heading", async () => {
    mockedGetAuthSession.mockResolvedValueOnce({
      user: { id: "12345", email: "john@example.com" },
      expires: "2025-12-31T23:59:59.999Z",
    });
    await act(async () => {
      render(<HomePage />);
    });

    const heading = await screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
