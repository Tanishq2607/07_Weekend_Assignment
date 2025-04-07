import Instance from "../Instance/instance"

export const getEntries = async () => {
  const res = await Instance.get("/users/entries");
  return res.data;
};

export const postEntry = async (entry) => {
  const res = await Instance.post("/users/entries", entry);
  return res.data;
};

export const getDetails = async (id) => {
  const res = await Instance.get(`/users/entries/${id}`);
  return res.data;
};
