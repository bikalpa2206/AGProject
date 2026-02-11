import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug } from '@/lib/posts';
import LikeButton from '@/components/LikeButton';
import CommentsSection from '@/components/CommentsSection';
import styles from './page.module.css';

export async function generateMetadata({ params }) {
    const post = getPostBySlug(params.slug);
    if (!post) return { title: 'Post Not Found' };
    return { title: `${post.title} | Witty Travels & Eats` };
}

export default function BlogPost({ params }) {
    const post = getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="container" style={{ padding: '4rem 20px', maxWidth: '800px' }}>
            <Link href="/blog" className={styles.backLink}>← Back to Rants</Link>

            <article className={styles.article}>
                {/* Header */}
                <header className={styles.header}>
                    <span className={styles.category}>{post.category}</span>
                    <h1 className={styles.title}>{post.title}</h1>
                    <p className={styles.date}>{post.date}</p>
                </header>

                {/* Feature Image */}
                <div className={styles.imagePlaceholder}>
                    {/* 
               RECOMMENDED IMAGE SIZE: 1200x600px (Aspect Ratio 2:1) or 1200x800px (3:2)
               This is the main banner image for the post.
           */}
                    <img
                        src={post.image}
                        alt={post.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
                    />
                </div>

                {/* Content */}
                <div className={styles.content}>
                    <p className={styles.excerpt}>{post.excerpt}</p>
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    {/* Note: In a real app, use a markdown renderer. For this simple demo, content is plain text/html string */}
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
