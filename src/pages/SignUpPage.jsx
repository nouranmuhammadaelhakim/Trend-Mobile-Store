import React from 'react';
import { Link } from 'react-router-dom';
import { SignUp } from '@clerk/clerk-react';
import styles from './Auth.module.css';

const SignUpPage = () => {
    return (
        <div className={styles.authPage}>
            <div className={styles.authContainer}>
                <h1>Create Account</h1>
                <p>Join us and start shopping</p>
                <div className={styles.clerkWrapper}>
                    <SignUp 
                        routing="path"
                        path="/sign-up"
                        signInUrl="/sign-in"
                        redirectUrl="/dashboard"
                    />
                </div>
                <Link to="/" className={styles.backLink}>
                    ← Back to Store
                </Link>
            </div>
        </div>
    );
};

export default SignUpPage;
