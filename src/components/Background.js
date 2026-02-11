"use client";
import { useBackground } from '@/lib/BackgroundContext';
import styles from './Background.module.css';

export default function Background() {
    const { currentImage } = useBackground();

    return (
        <div className={styles.backgroundContainer}>
            {currentImage && (
                <div
                    className={styles.backgroundImage}
                    style={{ backgroundImage: `url(${currentImage})` }}
                />
            )}
            <div className={styles.overlay} />
        </div>
    );
}
