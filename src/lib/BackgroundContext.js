"use client";
import { createContext, useContext, useState } from 'react';

const BackgroundContext = createContext({
    currentImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80',
    setBackground: () => { },
});

export const useBackground = () => useContext(BackgroundContext);

export const BackgroundProvider = ({ children }) => {
    // Default Scenic
    const [currentImage, setCurrentImage] = useState('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80');

    const setBackground = (image) => {
        setCurrentImage(image);
    };

    return (
        <BackgroundContext.Provider value={{ currentImage, setBackground }}>
            {children}
        </BackgroundContext.Provider>
    );
};
