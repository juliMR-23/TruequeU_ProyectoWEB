const BASE_URL = import.meta.env.VITE_API_URL;

const getHeaders = (includeContentType = true) => ({
    ...(includeContentType ? { "Content-Type": "application/json" } : {}),
    ...(localStorage.getItem("eia_token")
        ? { "Authorization": `Bearer ${localStorage.getItem("eia_token")}` }
        : {})
});

export const api = {
    get: async (endpoint: string) => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            headers: getHeaders(false) // ← sin Content-Type en GET
        });
        if (!response.ok) {
            const errorBody = await response.text();
            console.error("Error del back:", errorBody);
            throw new Error(`Error ${response.status}`);
        }
        return response.json();
    },

    post: async (endpoint: string, body?: unknown) => {
        const bodyString = body ? JSON.stringify(body) : undefined;
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: "POST",
            headers: getHeaders(),
            body: bodyString
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error("Error del back:", errorBody);
            throw new Error(`Error ${response.status}`);
        }

        // Si no hay contenido, no intenta parsear JSON
        const text = await response.text();
        return text ? JSON.parse(text) : null;
    },

    patch: async (endpoint: string, body?: unknown) => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: "PATCH",
            headers: getHeaders(),
            body: body ? JSON.stringify(body) : undefined
        });
        if (!response.ok) {
            const errorBody = await response.text();
            console.error("Error del back:", errorBody);
            throw new Error(`Error ${response.status}`);
        }
        const text = await response.text();
        return text ? JSON.parse(text) : null;
    },

    delete: async (endpoint: string) => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: "DELETE",
            headers: getHeaders()
        });
        if (!response.ok) throw new Error(`Error ${response.status}`);
        return response.status === 204 ? null : response.json();
    },
    put: async (endpoint: string, body?: unknown) => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: "PUT",
            headers: getHeaders(),
            body: body ? JSON.stringify(body) : undefined
        });
        if (!response.ok) {
            const errorBody = await response.text();
            console.error("Error del back:", errorBody);
            throw new Error(`Error ${response.status}`);
        }
        const text = await response.text();
        return text ? JSON.parse(text) : null;
    }
};