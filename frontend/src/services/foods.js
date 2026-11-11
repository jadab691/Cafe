const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
const FOODS_API_URL = `${API_BASE_URL.replace(/\/$/, "")}/foods`;

async function request(path = "", options = {}) {
  const response = await fetch(`${FOODS_API_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || `Food request failed (${response.status}).`);
  }

  return data;
}

export async function getFoods() {
  const data = await request();
  if (!Array.isArray(data.foods)) {
    throw new Error("The server returned an invalid food list.");
  }
  return data.foods;
}

export async function getFood(id) {
  const data = await request(`/${encodeURIComponent(id)}`);
  if (!data.food) {
    throw new Error("The server did not return the requested food.");
  }
  return data.food;
}

export async function createFood(food) {
  const data = await request("", {
    method: "POST",
    body: JSON.stringify(food),
  });
  if (!data.food) {
    throw new Error("The server did not return the created food.");
  }
  return data.food;
}

export async function updateFood(id, food) {
  const data = await request(`/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify(food),
  });
  if (!data.food) {
    throw new Error("The server did not return the updated food.");
  }
  return data.food;
}

export async function deleteFood(id) {
  await request(`/${encodeURIComponent(id)}`, { method: "DELETE" });
}
