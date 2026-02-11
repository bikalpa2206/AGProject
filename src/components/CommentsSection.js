"use client";
import { useState, useEffect } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/lib/AuthContext';
import Button from './Button';
import styles from './CommentsSection.module.css';

export default function CommentsSection({ postId }) {
    const { user, login } = useAuth();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(
            collection(db, `posts/${postId}/comments`),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const comms = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setComments(comms);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [postId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim() || !user) return;

        await addDoc(collection(db, `posts/${postId}/comments`), {
            text: newComment,
            authorName: user.displayName || 'Anonymous',
            authorPhoto: user.photoURL,
            uid: user.uid,
            createdAt: serverTimestamp()
        });

        setNewComment('');
    };

    return (
        <div className={styles.section}>
            <h3>Comments ({comments.length})</h3>

            {/* Input Area */}
            {user ? (
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.userInfo}>
                        <img src={user.photoURL} alt={user.displayName} className={styles.avatar} />
                        <span>Commenting as {user.displayName}</span>
                    </div>
                    <textarea
                        className={styles.textarea}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add your sarcastic remark..."
                        rows="3"
                        required
                    />
                    <Button type="submit" disabled={!newComment.trim()}>Post Comment</Button>
                </form>
            ) : (
                <div className={styles.loginPrompt}>
                    <p>Want to complain about my opinion? You need to sign in.</p>
                    <Button variant="google" onClick={login}>Sign in with Google</Button>
                </div>
            )}

            {/* List */}
            <div className={styles.list}>
                {comments.map(comment => (
                    <div key={comment.id} className={styles.comment}>
                        <img src={comment.authorPhoto || '/default-avatar.png'} alt="User" className={styles.commentAvatar} />
                        <div className={styles.commentContent}>
                            <div className={styles.commentHeader}>
                                <strong>{comment.authorName}</strong>
                                <span className={styles.date}>
                                    {comment.createdAt?.toDate ? new Date(comment.createdAt.toDate()).toLocaleDateString() : 'Just now'}
                                </span>
                            </div>
                            <p>{comment.text}</p>
                        </div>
                    </div>
                ))}
                {!loading && comments.length === 0 && (
                    <p className={styles.empty}>No comments yet. Be the first to judge me.</p>
                )}
            </div>
        </div>
    );
}
