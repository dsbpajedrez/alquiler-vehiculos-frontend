import api from "../api/axios"

export const registerOperation = async (operation) => {
    try {
        const response = await api.post("/operations/register", operation)
        return response.data
    } catch (error) {
        console.error("Error registering operation:", error)
        throw error
    }
}

export const cancelRent = async (carId) => {
    try {
        const response = await api.post(`/operations/cancel/${carId}`)
        return response.data
    } catch (error) {
        console.error("Error canceling rental:", error)
        throw error
    }
}

export const getOperations = async () => {
    try {
        const response = await api.get("/operations/registers")
        return response.data
    } catch (error) {
        console.error("Error fetching operations:", error)
        throw error
    }
}