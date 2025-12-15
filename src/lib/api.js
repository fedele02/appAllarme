import axios from 'axios'

const API_URL = 'https://unexploitative-emmalyn-unroosting.ngrok-free.dev/api'

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
    },
})

// Add a request interceptor to inject the token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

export const auth = {
    login: async (username, password) => {
        const response = await api.post('/auth/login', {
            username,
            password,
            // Empty string or null for TOTP as requested "passagli only username/password"
            // but structure implied full object. If strict, send partial or full with emptiness.
            // User said "passagli { username, password }" so I will stick to that.
        })
        return response.data
    },
    verify: async () => {
        const response = await api.get('/auth/verify')
        return response.data
    },
    register: async (userData) => {
        const response = await api.post('/notifications/register', userData)
        return response.data
    },
    me: async () => {
        // Assuming this is still valid or used for something else, keeping it safe.
        // But primary verification is via /auth/verify now.
        const response = await api.get('/users/me')
        return response.data
    }
}

export const alarm = {
    getStatus: async () => {
        const response = await api.get('/status')
        return response.data
    },
    arm: async () => {
        const response = await api.post('/arm')
        return response.data
    },
    disarm: async () => {
        const response = await api.post('/disarm')
        return response.data
    }
}

export const gpio = {
    getPins: async () => {
        const response = await api.get('/gpio/pins')
        return response.data
    }
}

export default api
