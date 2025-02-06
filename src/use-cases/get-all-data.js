/**
 * @param {string} url
 * @returns
 */
export const getAllResourse = async (resource) => {
  const url = `${import.meta.env.VITE_BASE_URL}/${resource}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};
