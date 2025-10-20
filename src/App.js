import { Console } from "@woowacourse/mission-utils";
import IOHandler from "./IOHandler.js";
import StringParser from "./StringParser.js";

class App {
  constructor() {
    this.ioHandler = new IOHandler();
    this.stringParser = new StringParser();
  }

  async run() {
    try {
      const input = await this.ioHandler.input();
      const result = this.stringParser.calculate(input);

      await this.ioHandler.print(result);
    } catch (error) {
      Console.print(error.message);
      throw error;
    }
  }
}

export default App;
