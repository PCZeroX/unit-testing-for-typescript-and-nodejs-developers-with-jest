import {
  OtherStringUtils,
  calculateComplexity,
  toUpperCaseWithCb,
} from "../../app/doubles/OtherUtils";

describe("OtherUtils test suite", () => {
  describe("OtherStringUtils tests with spies", () => {
    let sut: OtherStringUtils;

    beforeEach(() => {
      sut = new OtherStringUtils();
    });

    test.only("Use a spy to track calls", () => {
      const toUpperCaseSpy = jest.spyOn(sut, "toUpperCase");
      sut.toUpperCase("asa");
      expect(toUpperCaseSpy).toHaveBeenCalledWith("asa");
      // expect(toUpperCaseSpy).toBeCalledWith("asa");
    });

    test("Use a spy to track calls to other module", () => {
      const consoleLogSpy = jest.spyOn(console, "log");
      sut.toUpperCase("abc");
      expect(consoleLogSpy).toHaveBeenCalledWith("abc");
      // expect(consoleLogSpy).toBeCalledWith("abc");
    });

    test.only("Use a spy to replace the implementation of a method", () => {
      jest.spyOn(sut, "callExternalService").mockImplementation(() => {
        console.log("calling mocked implementation!!!");
      });
      sut.callExternalService();
    });
  });

  describe.only("Tracking callbacks with Jest mocks", () => {
    const callBackMock = jest.fn();

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("calls callback for invalid argument - track calls", () => {
      const actual = toUpperCaseWithCb(undefined, callBackMock);
      expect(actual).toBeUndefined();
      // expect(callBackMock).toBeCalledWith("Invalid argument!");
      // expect(callBackMock).toBeCalledTimes(1);
      expect(callBackMock).toHaveBeenCalledWith("Invalid argument!");
      expect(callBackMock).toHaveBeenCalledTimes(1);
    });

    it("calls callback for valid argument - track calls", () => {
      const actual = toUpperCaseWithCb("abc", callBackMock);
      expect(actual).toBe("ABC");
      // expect(callBackMock).toBeCalledWith("called function with abc");
      // expect(callBackMock).toBeCalledTimes(1);
      expect(callBackMock).toHaveBeenCalledWith("called function with abc");
      expect(callBackMock).toHaveBeenCalledTimes(1);
    });
  });

  describe.only("Tracking callbacks", () => {
    let cbArgs: string[] = [];
    let timesCalled = 0;

    function callBackMock(arg: string) {
      cbArgs.push(arg);
      timesCalled++;
    }

    afterEach(() => {
      // clearing tracking fields:
      cbArgs = [];
      timesCalled = 0;
    });

    it("calls callback for invalid argument - track calls", () => {
      const actual = toUpperCaseWithCb("", callBackMock);
      expect(actual).toBeUndefined();
      expect(cbArgs).toContain("Invalid argument!");
      expect(timesCalled).toBe(1);
    });

    it("calls callback for valid argument - track calls", () => {
      const actual = toUpperCaseWithCb("abc", callBackMock);
      expect(actual).toBe("ABC");
      expect(cbArgs).toContain("called function with abc");
      expect(timesCalled).toBe(1);
    });
  });

  describe.only("ToUpperCase", () => {
    it("ToUpperCase - calls callback for invalid argument", () => {
      const actual = toUpperCaseWithCb("", () => {});
      expect(actual).toBeUndefined();
    });

    it("ToUpperCase - calls callback for valid argument", () => {
      const actual = toUpperCaseWithCb("abc", () => {});
      expect(actual).toBe("ABC");
    });

    it("Calculates complexity", () => {
      const someInfo = {
        length: 5,
        extraInfo: {
          field1: "someInfo",
          field2: "someOtherInfo",
        },
      };

      const actual = calculateComplexity(someInfo);
      expect(actual).toBe(10);
    });
  });
});
