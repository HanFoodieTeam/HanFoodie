// user/app/utils/api.ts
type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

export type ApiResponse<T> = {
  data: T;
};

async function request<T>(url: string, method: RequestMethod = "GET", data?: unknown): Promise<T> {
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!res.ok) {
    // nếu response là JSON trả về lỗi
    const error: { message: string } = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message);
  }

  const json: T = await res.json();
  return json;
}

export const api = {
  get: <T>(url: string) => request<T>(url, "GET"),
  post: <T>(url: string, data?: unknown) => request<T>(url, "POST", data),
  put: <T>(url: string, data?: unknown) => request<T>(url, "PUT", data),
  delete: <T>(url: string) => request<T>(url, "DELETE"),
};
