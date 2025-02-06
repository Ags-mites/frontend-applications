export const deleteResourse = async (attr, id) => {
  if (!id && !attr) return null;

  const url = `${import.meta.env.VITE_BASE_URL}/api/v1/${attr}/${id}`;

  try {
    const resp = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!resp.ok) throw new Error(`Error: ${resp.status} ${resp.statusText}`);
    
    return resp.ok;
  } catch (error) {
    throw new Error(error);
  }
};
