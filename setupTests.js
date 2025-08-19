import "@testing-library/jest-dom";
import "regenerator-runtime/runtime";
jest.mock("next-auth/react", () => require("../__mocks__/getAuthMock.ts"));
