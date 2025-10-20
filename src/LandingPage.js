import React, { useState } from 'react';
import './LandingPage.css';

const LandingPage = ({ onSwipeUp }) => {
    const [isSwiping, setIsSwiping] = useState(false);

    const handleSwipeUp = () => {
        setIsSwiping(true);
        setTimeout(() => {
            onSwipeUp();
        }, 800);
    };

    // Simple arrow icon component
    const ArrowIcon = () => (
        <div style={{ 
            width: '24px', 
            height: '24px', 
            border: '2px solid currentColor',
            borderTop: 'none',
            borderLeft: 'none',
            transform: 'rotate(45deg)',
            margin: '0 auto'
        }}></div>
    );

    // Simple medical icon component
    const MedicalIcon = () => (
        <div style={{
            width: '40px',
            height: '40px',
            border: '2px solid currentColor',
            borderRadius: '8px',
            position: 'relative',
            margin: '0 auto'
        }}>
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '20px',
                height: '2px',
                backgroundColor: 'currentColor'
            }}></div>
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) rotate(90deg)',
                width: '20px',
                height: '2px',
                backgroundColor: 'currentColor'
            }}></div>
        </div>
    );

    return (
        <div className={`landing-container ${isSwiping ? 'swiping-up' : ''}`}>
            {/* Background with gradient overlay */}
            <div className="landing-background">
                <div className="gradient-overlay"></div>
            </div>

            {/* Main content */}
            <div className="landing-content">
                {/* Logo/Title */}
                <div className="logo-section">
                    <div className="logo-icon">
                        <MedicalIcon />
                    </div>
                    <h1 className="app-title">MediCare</h1>
                    <p className="app-subtitle">Patient Management System</p>
                </div>

                {/* Feature highlights */}
                <div className="features-section">
                    <div className="feature-card">
                        <div className="feature-icon">⚕️</div>
                        <h3>Secure & Compliant</h3>
                        <p>HIPAA compliant patient data management</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📊</div>
                        <h3>Easy Management</h3>
                        <p>Streamlined patient records and scheduling</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🔒</div>
                        <h3>Protected Access</h3>
                        <p>Role-based secure authentication</p>
                    </div>
                </div>

                {/* Swipe up indicator */}
                <div 
                    className="swipe-indicator"
                    onClick={handleSwipeUp}
                >
                    <div className="swipe-arrow">
                        <ArrowIcon />
                    </div>
                    <p className="swipe-text">Click to enter</p>
                    <p className="click-text">Patient Management System</p>
                </div>
            </div>

            {/* Animated swipe-up overlay */}
            <div className={`swipe-overlay ${isSwiping ? 'active' : ''}`}>
                <div className="swipe-content">
                    <div className="loading-spinner"></div>
                    <p>Loading Patient Management System...</p>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;