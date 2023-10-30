import api from "@/utils/api";

const url = process.env.NEXT_PUBLIC_NODE_ENV === "development" ? "http://localhost:9000" : "";

export const getAllUsers = async () => {
    const { data } = await api.get(`${url}/api/users`);
    return data;
}