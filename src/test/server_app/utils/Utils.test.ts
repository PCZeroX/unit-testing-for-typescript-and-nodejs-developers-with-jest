/* Example 1 */
import { IncomingMessage } from "http";
import { getRequestBody } from "../../../app/server_app/utils/Utils";

const requestMock = {
  on: jest.fn(),
};

const someObject = {
  name: "John",
  age: 30,
  city: "Paris",
};

const someObjectAsString = JSON.stringify(someObject);

describe("getRequestBody test suite", () => {
  it("should return object for valid JSON", async () => {
    requestMock.on.mockImplementation((event, cb) => {
      if (event == "data") {
        cb(someObjectAsString);
      } else {
        cb();
      }
    });

    const actual = await getRequestBody(requestMock as any as IncomingMessage);
    expect(actual).toEqual(someObject);
  });

  it("should throw error for invalid JSON", async () => {
    requestMock.on.mockImplementation((event, cb) => {
      if (event == "data") {
        cb("a" + someObjectAsString);
      } else {
        cb();
      }
    });

    await expect(getRequestBody(requestMock as any)).rejects.toThrow(
      "Unexpected token 'a'"
    );
  });

  it("should throw error for unexpected error", async () => {
    const someError = new Error("Something went wrong!");
    requestMock.on.mockImplementation((event, cb) => {
      if (event == "error") {
        cb(someError);
      }
    });
    await expect(getRequestBody(requestMock as any)).rejects.toThrow(
      someError.message
    );
  });
});

/* Example 2 */

// import { IncomingMessage } from "http";
// import { getRequestBody } from "../../../app/server_app/utils/Utils";

// const requestMock: Partial<IncomingMessage> = {
//   on: jest.fn(),
//   aborted: false,
// };

// const requestMockOn = requestMock.on as jest.Mock;

// const someObject = {
//   name: "John",
//   age: 30,
//   city: "Paris",
// };

// const someObjectAsString = JSON.stringify(someObject);

// describe("getRequestBody test suite", () => {
//   it("should return object for valid JSON", async () => {
//     requestMockOn.mockImplementation(
//       (event: string, cb: (...args: any[]) => void) => {
//         if (event == "data") {
//           cb(someObjectAsString);
//         } else {
//           cb();
//         }
//       }
//     );

//     const actual = await getRequestBody(requestMock as any as IncomingMessage);
//     expect(actual).toEqual(someObject);
//   });

//   it("should throw error for invalid JSON", async () => {
//     requestMockOn.mockImplementation(
//       (event: string, cb: (...args: any[]) => void) => {
//         if (event == "data") {
//           cb('a' + someObjectAsString);
//         } else {
//           cb();
//         }
//       }
//     );

//     await expect(
//       getRequestBody(requestMock as any as IncomingMessage)
//     ).rejects.toThrow("Unexpected token 'a'");
//     // ).rejects.toThrow(/Unexpected token 'a'/);
//   });

//   it("should throw error for unexpected error", async () => {
//     const someError = new Error("Something went wrong!");
//     requestMockOn.mockImplementation(
//       (event: string, cb: (...args: any[]) => void) => {
//         if (event == "error") {
//           cb(someError);
//         }
//       }
//     );
//     await expect(
//       getRequestBody(requestMock as any as IncomingMessage)
//     ).rejects.toThrow(someError.message);
//   });
// });
