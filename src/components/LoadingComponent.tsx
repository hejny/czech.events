import * as React from 'react';

export function LoadingComponent() {
    return (
        <>
            <div className="loading">Načítání...</div>

            <style jsx>
                {`
                    .loading {
                        background-color: #ccc;
                        color: #fff;
                    }
                `}
            </style>
        </>
    );
}
