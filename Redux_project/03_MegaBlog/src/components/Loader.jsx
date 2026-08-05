import React from 'react'

const Loader = () => {
    return (
        <>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100vw',
                height: '100vh',
                background: '#050302',
                color: '#f3e9d8',
                fontFamily: 'sans-serif'
            }}>
                <div style={{
                    border: '4px solid rgba(243, 233, 216, 0.1)',
                    borderLeftColor: '#e2a03f',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    animation: 'spin 1s linear infinite'
                }} />
                <style>{`
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                `}</style>
            </div>
        </>
    )
}

export default Loader