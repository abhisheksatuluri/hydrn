import React from 'react'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null, errorInfo: null }
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error }
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error('ErrorBoundary caught an error', error, errorInfo)
        this.setState({ errorInfo })
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null, errorInfo: null })
        window.location.reload()
    }

    render() {
        if (this.state.hasError) {
            // Fallback UI
            return (
                <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center bg-hydrn-dark/50 rounded-xl border border-red-500/20 m-4">
                    <div className="text-red-400 text-5xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-white mb-2">Something went wrong.</h2>
                    <p className="text-gray-400 mb-6 max-w-md">
                        We encountered an unexpected error while loading this section.
                    </p>

                    <div className="flex gap-4">
                        <button
                            onClick={() => this.setState({ hasError: false })}
                            className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-medium"
                        >
                            Try Again
                        </button>
                        <button
                            onClick={this.handleRetry}
                            className="px-6 py-2 bg-hydrn-accent text-black rounded-lg hover:bg-white transition-colors text-sm font-bold"
                        >
                            Reload Page
                        </button>
                    </div>

                    {/* Dev details - hidden in prod ideally, or behind a toggle */}
                    {import.meta.env.DEV && this.state.error && (
                        <div className="mt-8 p-4 bg-black/80 rounded text-left overflow-auto max-w-full w-full text-xs font-mono text-red-300">
                            <p className="font-bold mb-2">{this.state.error.toString()}</p>
                            <pre>{this.state.errorInfo?.componentStack}</pre>
                        </div>
                    )}
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
