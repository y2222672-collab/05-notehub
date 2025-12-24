import axios from "axios";
import type { Note } from "../types/note";

const noteApi = axios.create({
    baseURL: "https://notehub-public.goit.study/api",
});

noteApi.defaults.headers.common["Authorization"] = `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`

export interface FetchNotesResponse {
    notes: Note[];
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
}

export const fetchNotes = async (page = 1, perPage = 12, search ="") :Promise<FetchNotesResponse> => {
const response = await noteApi.get<FetchNotesResponse>("/notes", {
    params:{page, perPage, search},
});
return response.data; 
}

export const createNote = async (noteData: { title: string; content: string; tag: string }) => {
    const response = await noteApi.post("/notes", noteData);
    return response.data;
};

// export const createNote = async (noteData: Omit<Note, "id" | "createdAt">) : Promise<Note> => {
// const response = await noteApi.post<Note>("/notes", noteData);
//     return response.data;

// }

export const deleteNote = async (id: string) : Promise<Note> => {
    const response = await noteApi.delete<Note>(`/notes/${id}`);
    return response.data;
} 