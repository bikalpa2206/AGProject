"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react'; // Example icons
import { useState, useEffect } from 'react';
import styles from './Header.module.css';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Blog', href: '/blog' },
        { name: 'About Me', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={`container ${styles.container}`}>
                {/* Left: Menu Toggle */}
                <div className={styles.leftSection}>
                    <button className={styles.menuToggle} onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                    {/* Desktop Nav (Hidden initially, shown in menu) */}
                </div>

                {/* Center: Logo */}
                <div className={styles.centerSection}>
                    <Link href="/" className={styles.logo}>
                        Witty<span className={styles.accent}>Travels</span>
                    </Link>
                </div>

                {/* Right: Search (Placeholder for now) */}
                <div className={styles.rightSection}>
                    {/* Placeholder for search icon if needed later */}
                </div>

                {/* Mobile/Overlay Nav */}
                <div className={`${styles.navOverlay} ${isOpen ? styles.open : ''}`}>
                    <nav className={styles.navContent}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={styles.navLink}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
}
