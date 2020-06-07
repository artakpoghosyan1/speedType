const STORAGE_PREFIX = 'type'

interface IGetLocalStorage {
    setItem: (key: string, item: any) => void
    getItem: (key: string) => any
    removeItem: (key: string) => void
}

export function getLocalStorage(): IGetLocalStorage {
    const setItem = (key: string, item: any): void => {
        localStorage.setItem(`${STORAGE_PREFIX}_${key}`, JSON.stringify(item))
    }

    const getItem = (key: string): any => {
        const item: string | null = localStorage.getItem(`${STORAGE_PREFIX}_${key}`)
        return item ? JSON.parse(item) : undefined
    }

    const removeItem = (key: string): void => {
        localStorage.removeItem(`${STORAGE_PREFIX}_${key}`)
    }

    return {
        setItem,
        getItem,
        removeItem
    }
}
