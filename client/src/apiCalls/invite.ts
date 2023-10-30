import api from "@/utils/api";

const url = process.env.NEXT_PUBLIC_NODE_ENV === "development" ? "http://localhost:9000" : "";

export const getAllInvites = async () => {
    const { data } = await api.get(`${url}/api/invites`);
    return data;
}

export const inviteUsers = async ({id, membersObj}:any) => {
    const { data } = await api.post(`${url}/api/invites/${id}`, {membersObj});
    return data;
}

export const acceptInvite = async (id:string) => {
    const { data } = await api.put(`${url}/api/invites/accept/${id}`, {});
    return data;
}

export const rejectInvite = async (id:string) => {
    const { data } = await api.put(`${url}/api/invites/reject/${id}`, {});
    return data;
}