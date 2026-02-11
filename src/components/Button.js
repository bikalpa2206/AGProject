import styles from './Button.module.css';

export default function Button({ children, onClick, variant = 'primary', className = '', ...props }) {
    return (
        <button
            className={`${styles.btn} ${styles[variant]} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
}
