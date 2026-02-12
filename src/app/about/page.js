"use client";
import { useEffect } from 'react';
import { useBackground } from '@/lib/BackgroundContext';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

// Remove metadata export from client component
// export const metadata = { ... };

export default function About() {
    const { setBackground } = useBackground();

    useEffect(() => {
        // Cozy/Personal background for About page
        setBackground('https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?auto=format&fit=crop&q=80');
    }, [setBackground]);

    return (
        <div className="container" style={{ padding: '4rem 20px', maxWidth: '800px' }}>
            <Link href="/" className={styles.backButton}>← Back to Home</Link>

            <h1 className={styles.title}>The "About Me" Section...</h1>
            <p className={styles.subtitle}>(where I pretend to be interesting)</p>

            <div className={styles.content}>
                <p>
                    Hi, I'm the person behind this website. If my life was a TV show, it would be a mix of
                    <em> The Office</em> (lots of awkward staring at the camera) and <em>Friends</em> (but without the massive apartment in Manhattan).
                </p>

                <p>
                    I started this blog because I realized my friends were tired of hearing me complain about
                    overpriced tourist traps and "deconstructed" food that's just ingredients on a slate.
                    So now, I'm complaining to you, the internet.
                </p>

                <h3>Why Travel & Food?</h3>
                <p>
                    Because I like going places, and I like eating. It's not that deep.
                    Sometimes I go places <em>just</em> to eat. Sometimes I eat so I can tolerate the places I've gone to.
                    It's a beautiful, chaotic cycle.
                </p>

                <h3>My Philosophy</h3>
                <blockquote>
                    "I'm not superstitious, but I am a little stitious." - Michael Scott
                </blockquote>
                <p>
                    Also, never trust a restaurant with a menu that's more than 10 pages long.
                    That's just a binded book of lies.
                </p>
            </div>
        </div>
    );
}
