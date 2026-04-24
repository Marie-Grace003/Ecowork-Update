import { createContext, useState, useCallback } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([])

    const addToast = useCallback((message, type = 'success') => {
        const id = Date.now()
        setToasts(prev => [...prev, { id, message, type }])
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id))
        }, 3500)
    }, [])

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id))
    }, [])

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </ToastContext.Provider>
    )
}

export { ToastContext }

const icons = {
    success: 'bi-check-circle-fill',
    error: 'bi-x-circle-fill',
    warning: 'bi-exclamation-circle-fill',
}

const styles = {
    success: 'bg-white border-l-4 border-eco-blue text-gray-800',
    error:   'bg-white border-l-4 border-red-400 text-gray-800',
    warning: 'bg-white border-l-4 border-yellow-400 text-gray-800',
}

const iconColors = {
    success: 'text-eco-blue',
    error:   'text-red-400',
    warning: 'text-yellow-400',
}

function ToastContainer({ toasts, onRemove }) {
    if (toasts.length === 0) return null

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full px-4">
            {toasts.map(toast => (
                <div
                    key={toast.id}
                    className={`flex items-start gap-3 px-4 py-3 rounded-xl shadow-lg transition-all animate-fade-in ${styles[toast.type]}`}
                >
                    <i className={`bi ${icons[toast.type]} mt-0.5 text-lg ${iconColors[toast.type]}`}></i>
                    <p className="flex-1 text-sm leading-snug">{toast.message}</p>
                    <button
                        onClick={() => onRemove(toast.id)}
                        className="text-gray-300 hover:text-gray-500 transition-colors ml-1"
                    >
                        <i className="bi bi-x text-base"></i>
                    </button>
                </div>
            ))}
        </div>
    )
}