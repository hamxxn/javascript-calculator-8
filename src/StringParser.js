import { ERROR_MESSAGES } from "./constant/error.js";
import { REGEX_PATTERNS } from "./constant/regex.js";

class StringParser {
  validateInputFormat(input) {
    if (input.startsWith("//")) {
      if (!REGEX_PATTERNS.CUSTOM_DELIMITER_FORMAT.test(input)) {
        throw new Error(ERROR_MESSAGES.INVALID_CUSTOM_DELIMITER);
      }

      const match = input.match(REGEX_PATTERNS.CUSTOM_DELIMITER_FORMAT);
      if (match) {
        const delimiter = match[1];
        const numbersPart = match[2];
        if (numbersPart) {
          const customNumbersRegex = new RegExp(
            `^[1-9]\\d*(?:[${delimiter}]+[1-9]\\d*)*$`
          );
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
    if (str.startsWith("//") && str.includes("\\n")) {
      const match = str.match(REGEX_PATTERNS.CUSTOM_DELIMITER_FORMAT);

      const delimiter = match[1];
      const body = match[2] || "";

      return body ? body.split(delimiter) : [];
    }

    return str.split(/[,:]+/);
  }
}

export default StringParser;
