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
                    <div key={post.id} className={styles.card}>
                        <div style={{ height: '200px', backgroundColor: '#eee', overflow: 'hidden', borderBottom: '1px solid var(--color-border)' }}>
                            {/* 
                     RECOMMENDED IMAGE SIZE: 600x400px (Aspect Ratio 3:2)
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
                            <p className={styles.date}>{post.date}</p>
                            <p className={styles.cardExcerpt}>{post.excerpt}</p>
                            <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                                Read More →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
