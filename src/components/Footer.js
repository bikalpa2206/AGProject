import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>
                <p>&copy; {new Date().getFullYear()} Witty Travels & Eats. No rights reserved, probably.</p>
                <p className={styles.tagline}>"That's what she said." - Wayne Gretzky - Michael Scott</p>
            </div>
        </footer>
    );
}
