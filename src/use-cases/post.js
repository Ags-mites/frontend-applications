export const createResourse = async (newResource, attr) => {
  if (!newResource && !attr) return null;

  const url = `${import.meta.env.VITE_BASE_URL}/api/v1/${attr}`;

  try {
    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(newResource),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!resp.ok)
      throw new Error(`Error: ${resp.status} ${resp.statusText}`);
    const ApiResp = await resp.json();
    return ApiResp;
  } catch (error) {
    throw new Error(error);
  }
};
