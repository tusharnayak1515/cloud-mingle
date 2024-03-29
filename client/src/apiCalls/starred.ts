import api from "@/utils/api";

const url = process.env.NEXT_PUBLIC_NODE_ENV === "development" ? "http://localhost:9000" : "";

export const getStarredCollections = async () => {
    const { data } = await api.get(`${url}/api/starred/`);
    return data;
}

export const starCollection = async (id:string) => {
    const { data } = await api.put(`${url}/api/starred/${id}`, {});
    return data;
}