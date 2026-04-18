const BASE_URL = "http://localhost:5001";

async function parseResponse(res, fallbackMessage) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || fallbackMessage);
  }
  return data;
}

export async function fetchProducts(search = "", category = "") {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (category) params.append("category", category);
  const res = await fetch(`${BASE_URL}/api/products?${params}`);
  return parseResponse(res, "Failed to fetch products");
}

export async function createProduct(data) {
  const res = await fetch(`${BASE_URL}/api/products`, { method:"POST", headers:{ "Content-Type":"application/json" }, body:JSON.stringify(data) });
  return parseResponse(res, "Failed to create product");
}

export async function updateProduct(id, data) {
  const res = await fetch(`${BASE_URL}/api/products/${id}`, { method:"PUT", headers:{ "Content-Type":"application/json" }, body:JSON.stringify(data) });
  return parseResponse(res, "Failed to update product");
}

export async function deleteProduct(id) {
  const res = await fetch(`${BASE_URL}/api/products/${id}`, { method:"DELETE" });
  return parseResponse(res, "Failed to delete product");
}

export async function registerUser(payload) {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseResponse(res, "Failed to register user");
}

export async function loginUser(payload) {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseResponse(res, "Failed to login");
}