"use client";
import { useEffect } from 'react';
import { useBackground } from '@/lib/BackgroundContext';
import Link from 'next/link';
import Button from '@/components/Button';
import { getAllPosts } from '@/lib/posts';
import styles from './page.module.css';

export default function Home() {
    const { setBackground } = useBackground();

    // Set default home background
    useEffect(() => {
        setBackground('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80');
    }, [setBackground]);

    const posts = getAllPosts().slice(0, 3); // Featured posts

    return (
        <div>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className="container">
                    <h1 className={styles.heroTitle}>
                        Wandering the Globe,<br />
                        <span className={styles.highlight}>One Bad Idea at a Time.</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Welcome to the Chronicles of a Lost Soul who judges food and places so you don't have to.
                    </p>
                    <div className={styles.heroActions}>
                        <Link href="/blog">
                            <Button>Read the Disasters</Button>
                        </Link>
                        <Link href="/about">
                            <Button variant="secondary">Who am I?</Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Section */}
            <section className="container" style={{ padding: '4rem 20px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Latest Rants</h2>
                <div className={styles.grid}>
                    {posts.map(post => (
                        <div key={post.id} className={styles.card}>
                            <div className={styles.cardImage}>
                                {/* 
                     RECOMMENDED IMAGE SIZE: 600x400px (Aspect Ratio 3:2)
                     If you replace these images later, try to keep this ratio for the grid consistency.
                 */}
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.tag}>{post.category}</span>
                                <h3 className={styles.cardTitle}>{post.title}</h3>
                                <p className={styles.cardExcerpt}>{post.excerpt}</p>
                                <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                                    Read More →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
