export const updateResourse = async (newResource, attr, id) => {
  if (!newResource && !attr) return null;

  const url = `${import.meta.env.VITE_BASE_URL}/api/v1/${attr}/${id}`;

  try {
    const resp = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(newResource),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!resp.ok) throw new Error(`Error: ${resp.status} ${resp.statusText}`);
    const ApiResp = await resp.json();
    return ApiResp;
  } catch (error) {
    throw new Error(error);
  }
};
