import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import styles from '../Styles/sketchModal.module.css';

export default function SketchModal({ children }) {
        const DASH = 2000;  
    
        useEffect(() => {
            document.body.classList.add('modal-active');
            return () => document.body.classList.remove('modal-active');
        }, []);
            

    
        return (
            <div className={[styles.container, styles.sketch].join(' ')}
                    style={{ '--dash': `${DASH}px` }}>
            <div className={styles.background}>
                <div
                className={styles.modal}
                onClick={e => e.stopPropagation()}
                >
            <div className={styles.content}>
                {children}
                </div>
                <svg className={styles.svg} xmlns="http://www.w3.org/2000/svg">
                    <rect x="0" y="0" width="100%" height="100%" rx="3" ry="3" />
                </svg>
                </div>
            </div>
            </div>
        );
    }