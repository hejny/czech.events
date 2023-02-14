import React from 'react';
import styles from './ErrorComponent.module.css';

export function ErrorComponent({ children }: React.PropsWithChildren<{}>) {
    return <div className={styles.ErrorComponent}>{children}</div>;
}

/**
 * TODO: This component is deprecated and should be removed
 */
