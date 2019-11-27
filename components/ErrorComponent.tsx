import * as React from 'react';

export function ErrorComponent({ children }: React.PropsWithChildren<{}>) {
    return (
        <>
            <div className="error">{children}</div>

            <style jsx>
                {`
                    .error {
                        background-color: #f00;
                        color: #fff;
                    }
                `}
            </style>
        </>
    );
}
