export async function fetchJSON(url, options) {
  const res = await fetch(url, options);
  const contentType = res.headers.get("content-type");

  let data = null;
  if (res.status !== 204 && contentType && contentType.includes("application/json")) {
    data = await res.json();
  }

  return { status: res.status, data };
}
