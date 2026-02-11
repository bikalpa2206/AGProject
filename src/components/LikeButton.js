"use client";
import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc, increment, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Heart } from 'lucide-react';
import styles from './LikeButton.module.css';

export default function LikeButton({ postId }) {
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false); // Local state only for visual feedback in this demo version without user-specific like tracking in DB setup for simplicity, or we can use localStorage to remember if *this* user liked it.

    useEffect(() => {
        // Subscribe to real-time updates
        const docRef = doc(db, "posts", postId);
        const unsubscribe = onSnapshot(docRef, (doc) => {
            if (doc.exists()) {
                setLikes(doc.data().likes || 0);
            }
        });

        // Check local storage for "isLiked" state
        const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '{}');
        if (likedPosts[postId]) {
            setIsLiked(true);
        }

        return () => unsubscribe();
    }, [postId]);

    const handleLike = async () => {
        if (isLiked) return; // Prevent spamming for this simple demo

        setIsLiked(true);

        // Update local storage
        const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '{}');
        likedPosts[postId] = true;
        localStorage.setItem('likedPosts', JSON.stringify(likedPosts));

        // Update Firestore
        const docRef = doc(db, "posts", postId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            await setDoc(docRef, { likes: 1 });
        } else {
            await updateDoc(docRef, {
                likes: increment(1)
            });
        }
    };

    return (
        <button
            className={`${styles.likeBtn} ${isLiked ? styles.liked : ''}`}
            onClick={handleLike}
            disabled={isLiked}
        >
            <Heart className={styles.icon} fill={isLiked ? "currentColor" : "none"} />
            <span>{likes} {likes === 1 ? 'Person agrees' : 'People agree'}</span>
        </button>
    );
}
