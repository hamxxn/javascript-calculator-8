import { ERROR_MESSAGES } from "./constant/error.js";
import { CUSTOM_DELIMITER, REGEX_PATTERNS } from "./constant/regex.js";

class StringParser {
  calculate(input) {
    if (input == null || input.trim() === "") return 0;

    this.validateInputFormat(input);

    const tokens = this.splitNumbers(input);
    const numbers = tokens.map((s) => Number(s.trim()));

    return this.add(numbers);
  }

  getCustomNumberRegex(delimiter) {
    return new RegExp(`^[1-9]\\d*(?:[${delimiter}]+[1-9]\\d*)*$`);
  }

  validateInputFormat(input) {
    if (input.startsWith(CUSTOM_DELIMITER.START)) {
      if (!REGEX_PATTERNS.CUSTOM_DELIMITER_FORMAT.test(input)) {
        throw new Error(ERROR_MESSAGES.INVALID_CUSTOM_DELIMITER);
      }

      const match = input.match(REGEX_PATTERNS.CUSTOM_DELIMITER_FORMAT);
      if (match) {
        const delimiter = match[1];
        const numbersPart = match[2];
        if (numbersPart) {
          const customNumbersRegex = this.getCustomNumberRegex(delimiter);
          if (!customNumbersRegex.test(numbersPart)) {
            throw new Error(ERROR_MESSAGES.INVALID_INPUT);
          }
        }
      }
    } else {
      if (!REGEX_PATTERNS.BASIC_DELIMITER_FORMAT.test(input)) {
        throw new Error(ERROR_MESSAGES.INVALID_INPUT);
      }
    }
  }

  splitNumbers(str) {
    if (
      str.startsWith(CUSTOM_DELIMITER.START) &&
      str.includes(CUSTOM_DELIMITER.END)
    ) {
      const match = str.match(REGEX_PATTERNS.CUSTOM_DELIMITER_FORMAT);

      const delimiter = match[1];
      const body = match[2] || "";

      return body ? body.split(delimiter) : [];
    }

    return str.split(/[,:]+/);
  }

  add(nums) {
    return nums.reduce((acc, v) => acc + v, 0);
  }
}

export default StringParser;
