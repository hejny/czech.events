import * as React from 'react';

// TODO: Deprecated remove
export function ErrorComponent({ children }: React.PropsWithChildren<{}>) {
    return (
        <>
            <div className="error">{children}</div>
        </>
    );
}
