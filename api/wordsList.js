import { allWords, wordsAcceptedAsInput } from "./constants/";

export default function handler(request, response) {
  response.status(200).json({
    body: request.body,
    allWords: allWords,
    wordsAcceptedAsInput: wordsAcceptedAsInput,
  });
}
