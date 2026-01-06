import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { initializeFarcasterSDK } from './utils/farcaster'

const root = ReactDOM.createRoot(document.getElementById('root')!);

// Initialize Farcaster SDK before rendering
async function init() {
    // Try to initialize the SDK (will fail gracefully if not in Frame context)
    await initializeFarcasterSDK();

    // Render the app regardless of Frame context
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}

init();
