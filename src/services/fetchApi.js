const fetchQuestions = async (token) => {
  const endpoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const request = await fetch(endpoint);
  const response = await request.json();
  return response;
};

export const fetchToken = async () => {
  const requestToken = await fetch('https://opentdb.com/api_token.php?command=request');
  const responseToken = await requestToken.json();
  return responseToken;
};

export default fetchQuestions;
