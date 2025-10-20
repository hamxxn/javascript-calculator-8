import { MissionUtils } from "@woowacourse/mission-utils";

class IOHandler {
  async input() {
    const input = await MissionUtils.Console.readLineAsync(
      "덧셈할 문자열을 입력해 주세요.\n"
    );

    return input;
  }

  async print(result) {
    MissionUtils.Console.print(`결과 : ${result}`);
  }
}

export default IOHandler;
