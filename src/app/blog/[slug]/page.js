import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getPostBySlug } from '@/lib/posts';
import LikeButton from '@/components/LikeButton';
import CommentsSection from '@/components/CommentsSection';
import styles from './page.module.css';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return { title: 'Post Not Found' };
    return { title: `${post.title} | Witty Travels & Eats` };
}

export default async function BlogPost({ params }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="container" style={{ padding: '4rem 20px', maxWidth: '800px' }}>
            <Link href="/" className={styles.backLink}>← Back to Home</Link>

            <article className={styles.article}>
                {/* Header */}
                <header className={styles.header}>
                    <span className={styles.category}>{post.category}</span>
                    <h1 className={styles.title}>{post.title}</h1>
                    <p className={styles.date}>{post.date}</p>
                </header>

                {/* Feature Image */}
                <div className={styles.imageContainer}>
                    <Image
                        src={post.image}
                        alt={post.title}
                        width={1200}
                        height={675}
                        priority
                        className={styles.featureImage}
                    />
                </div>

                {/* Content */}
                <div className={styles.content}>
                    <p className={styles.excerpt}>{post.excerpt}</p>
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>

                {/* Interaction */}
                <div className={styles.interaction}>
                    <LikeButton postId={post.id} />
                </div>
            </article>

            {/* Comments */}
            <CommentsSection postId={post.id} />
        </div>
    );
}
