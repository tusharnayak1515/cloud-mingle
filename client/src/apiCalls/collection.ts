import api from "@/utils/api";

const url = process.env.NEXT_PUBLIC_NODE_ENV === "development" ? "http://localhost:9000" : "";

export const getAllCollections = async () => {
    const { data } = await api.get(`${url}/api/collections/`);
    return data;
}

export const getCollectionById = async (id:string) => {
    const { data } = await api.get(`${url}/api/collections/${id}`);
    return data;
}

type addCollectionPropType = {
    name: String;
}

export const addCollection = async ({name}:addCollectionPropType) => {
    const { data } = await api.post(`${url}/api/collections/`, {name});
    return data;
}

export const addFile = async ({formData, id}:any) => {
    const { data } = await api.post(`${url}/api/collections/add-files/${id}`, formData);
    return data;
}

export const deleteCollection = async (id:string) => {
    const { data } = await api.delete(`${url}/api/collections/${id}`);
    return data;
}