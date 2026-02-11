"use client";
import Link from 'next/link';
import Button from '@/components/Button';
import { getAllPosts } from '@/lib/posts';
import styles from './page.module.css';
import { Search } from 'lucide-react';

export default function Home() {
    // We are no longer using the global background context for the home page
    // as we want a specific hero section.

    const posts = getAllPosts(); // Get all posts for the grid

    return (
        <div className={styles.wrapper}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroOverlay} />
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        WANDERING THE GLOBE
                    </h1>
                    <p className={styles.heroSubtitle}>
                        One Bad Idea at a Time.
                    </p>

                    {/* Search Bar */}
                    <div className={styles.searchContainer}>
                        <input
                            type="text"
                            placeholder="Search Witty Travels..."
                            className={styles.searchInput}
                        />
                        <button className={styles.searchButton}>
                            <Search size={20} />
                        </button>
                    </div>
                </div>
            </section>

            {/* Featured/Latest Posts Section */}
            <section className={`container ${styles.postsSection}`}>
                <h2 className={styles.sectionTitle}>LATEST RANTS</h2>

                <div className={styles.grid}>
                    {posts.map(post => (
                        <Link href={`/blog/${post.slug}`} key={post.id} className={styles.card}>
                            <div className={styles.cardImageContainer}>
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className={styles.cardImage}
                                />
                                <span className={styles.categoryTag}>{post.category}</span>
                            </div>
                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>{post.title}</h3>
                                <p className={styles.cardExcerpt}>{post.excerpt}</p>
                                <span className={styles.readMore}>Read More</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
