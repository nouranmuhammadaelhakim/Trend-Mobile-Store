import React from 'react';
import { Link } from 'react-router-dom';
import { SignIn } from '@clerk/clerk-react';
import styles from './Auth.module.css';

const SignInPage = () => {
    return (
        <div className={styles.authPage}>
            <div className={styles.authContainer}>
                <h1>Welcome Back</h1>
                <p>Sign in to your account</p>
                <div className={styles.clerkWrapper}>
                    <SignIn 
                        routing="path"
                        path="/sign-in"
                        signUpUrl="/sign-up"
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

export default SignInPage;
