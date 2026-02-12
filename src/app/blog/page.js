"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllPosts, getPostsByCategory } from '@/lib/posts';
import Button from '@/components/Button';
import { useBackground } from '@/lib/BackgroundContext';
import styles from './page.module.css';

export default function BlogListing() {
    const [filter, setFilter] = useState('All');
    const { setBackground } = useBackground();

    const allPosts = getAllPosts();
    const travelPosts = getPostsByCategory('Travel');
    const foodPosts = getPostsByCategory('Food');

    const displayedPosts = filter === 'All' ? allPosts : (filter === 'Travel' ? travelPosts : foodPosts);

    useEffect(() => {
        if (filter === 'Travel') {
            // Travel: Road trip / Map
            setBackground('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80');
        } else if (filter === 'Food') {
            // Food: Table spread
            setBackground('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80');
        } else {
            // Default: Scenic
            setBackground('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80');
        }
    }, [filter, setBackground]);

    return (
        <div className="container" style={{ padding: '4rem 20px' }}>
            <Link href="/" className={styles.backButton}>← Back to Home</Link>

            <h1 className={styles.title}>The Blog</h1>
            <p className={styles.subtitle}>Choose your poison.</p>

            {/* Filter Tabs */}
            <div className={styles.filters}>
                <Button
                    variant={filter === 'All' ? 'primary' : 'secondary'}
                    onClick={() => setFilter('All')}
                >
                    All Rants
                </Button>
                <Button
                    variant={filter === 'Travel' ? 'primary' : 'secondary'}
                    onClick={() => setFilter('Travel')}
                >
                    Travel Disasters
                </Button>
                <Button
                    variant={filter === 'Food' ? 'primary' : 'secondary'}
                    onClick={() => setFilter('Food')}
                >
                    Food Crimes
                </Button>
            </div>

            {/* Grid */}
            <div className={styles.grid}>
                {displayedPosts.map(post => (
                    <Link href={`/blog/${post.slug}`} key={post.id} className={styles.card}>
                        <div className={styles.cardImageContainer}>
                            <img
                                src={post.image}
                                alt={post.title}
                                className={styles.cardImage}
                            />
                        </div>
                        <div className={styles.cardContent}>
                            <span className={styles.tag}>{post.category}</span>
                            <h3 className={styles.cardTitle}>{post.title}</h3>
                            <p className={styles.date}>{post.date}</p>
                            <p className={styles.cardExcerpt}>{post.excerpt}</p>
                            <span className={styles.readMore}>
                                Read More →
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
