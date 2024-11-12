import { GET, POST, PUT, DELETE } from './api'

export const Create = async (params) => {
    return await POST(`/articles`, params, true);
}

export const Read = async () => {
    return await GET(`/articles`, true);
}

export const ReadById = async (id) => {
    return await GET(`/articles?user=${id}`, true);
}

export const ReadOne = async (id) => {
    return await GET(`/articles/${id}`, true);
}

export const Update = async (params, id) => {
    return await PUT(`/articles/${id}`, params, true);
}

export const Delete = async (id) => {
    return await DELETE(`/articles/${ id }`, true);
}