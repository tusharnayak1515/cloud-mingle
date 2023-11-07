import api from "@/utils/api";

const url = process.env.NEXT_PUBLIC_NODE_ENV === "development" ? "http://localhost:9000" : "";

type sendOtpProps = {
    email: String;
}

export const sendOtp = async ({ email }: sendOtpProps) => {
    const { data } = await api.post(`${url}/api/otp/send`, { email });
    return data;
}

type signupProps = {
    name: String;
    email: String;
    password: String;
    otp: number;
}

export const userSignup = async ({ name, email, password, otp }: signupProps) => {
    const { data } = await api.post(`${url}/api/auth/signup`, { name, email, password, otp });
    return data;
}

type signinProps = {
    email: String;
    password: String;
}

export const userSignin = async ({ email, password }: signinProps) => {
    const { data } = await api.post(`${url}/api/auth/signin`, { email, password });
    return data;
}

type updateProfilePropType = {
    name: String;
    email: String;
    dp: String | null;
}

export const updateProfile = async ({ name, email, dp }: updateProfilePropType) => {
    const { data } = await api.put(`${url}/api/auth/profile`, { name, email, dp });
    return data;
}

type updatePasswordPropType = {
    oldPassword: String;
    newPassword: String;
    confirmPassword: String;
}

export const updatePassword = async ({ oldPassword, newPassword, confirmPassword }: updatePasswordPropType) => {
    const { data } = await api.put(`${url}/api/auth/change-password`, { oldPassword, newPassword, confirmPassword });
    return data;
}

type resetPasswordPropType = {
    email: String;
    newPassword: String;
    confirmPassword: String;
    otp: number;
}

export const resetPassword = async ({ email, newPassword, confirmPassword, otp }: resetPasswordPropType) => {
    const { data } = await api.put(`${url}/api/auth/reset-password`, { email, newPassword, confirmPassword, otp });
    return data;
}

export const getProfile = async () => {
    const { data } = await api.get(`${url}/api/auth/profile`);
    return data;
}

export const logoutUser = async () => {
    const res = await api.post(`${url}/api/auth/logout`);
    return res;
}