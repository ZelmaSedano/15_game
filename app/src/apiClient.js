export const getTasks = () => _get("/api/tasks");

// export const getUsers = () => _get("/api/users");

export const getUsers = async () => {
  const response = await fetch("/api/users");
  return response.json();
};

export const addTask = (name) => _post("/api/tasks", { name });

const _get = async (url) => (await fetch(url)).json();

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
