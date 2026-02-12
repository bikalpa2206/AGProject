"use client";
import { useEffect } from 'react';
import Link from 'next/link';
import { useBackground } from '@/lib/BackgroundContext';
import { useState } from 'react';
import Button from '@/components/Button';
import styles from './page.module.css';

export default function Contact() {
    const { setBackground } = useBackground();
    const [status, setStatus] = useState(null);

    useEffect(() => {
        // Calm/Minimal background for Contact
        setBackground('https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&q=80');
    }, [setBackground]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate submission
        setStatus('sending');
        setTimeout(() => {
            setStatus('success');
        }, 1500);
    };

    return (
        <div className="container" style={{ padding: '4rem 20px', maxWidth: '600px' }}>
            <Link href="/" className={styles.backButton}>← Back to Home</Link>

            <h1 className={styles.title}>Contact Me</h1>
            <p className={styles.subtitle}>
                Have a complaint? A suggestion? A burning desire to tell me I'm wrong?
                <br />
                Go ahead. I probably won't read it, but you'll feel better.
            </p>

            {status === 'success' ? (
                <div className={styles.success}>
                    <h3>Message Sent!</h3>
                    <p>It has been filed in the "Important" folder (the trash). Just kidding. Maybe.</p>
                    <Button onClick={() => setStatus(null)} variant="secondary" style={{ marginTop: '1rem' }}>
                        Send Another Complaint
                    </Button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.field}>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" required placeholder="Michael Scott" />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" required placeholder="michael@dundermifflin.com" />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="message">Message</label>
                        <textarea id="message" rows="5" required placeholder="I declare bankruptcy!" />
                    </div>

                    <Button type="submit" disabled={status === 'sending'}>
                        {status === 'sending' ? 'Sending...' : 'Send Message'}
                    </Button>
                </form>
            )}
        </div>
    );
}
