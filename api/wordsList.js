export default function wordList(request, response) {
  console.log("WORDLIST API");
  response.status(200).json({
    body: request.body,
    query: request.query,
    cookies: request.cookies,
  });
}
