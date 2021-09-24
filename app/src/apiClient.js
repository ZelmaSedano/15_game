export const getUsers = async () => {
  const response = await fetch("/api/users");
  return response.json();
};

export const addUser = (user) => _post("/api/users", user);

// add to the number_of_wins
// export const addScore = async () => {
//   const response = await fetch("/api/users");
//   return response.json();
// };

// you already used async/await down here, and when we use _get & _post, they are innately using async/await
// const _get = async (url) => (await fetch(url)).json();

const _post = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let result;
  try {
    result = await response.json();
  } catch {}

  return result;
};
