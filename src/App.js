import IOHandler from "./IOHandler.js";
import StringParser from "./StringParser.js";

class App {
  constructor() {
    this.ioHandler = new IOHandler();
    this.stringParser = new StringParser();
  }

  async run() {
    const input = await this.ioHandler.input();
    const result = this.stringParser.calculate(input);

    await this.ioHandler.print(result);
  }
}

export default App;
