import * as React from 'react';
import { ISelectorProps } from './selector';
import { drawingColors } from '../../../tools/AbstractTool';
import { IconColor } from '../Icon';

export function ColorSelector(props: ISelectorProps) {
    return (
        <>
            {Object.keys(drawingColors).map((key) => (
                <IconColor
                    color={drawingColors[key]}
                    active={props.value === drawingColors[key]}
                    onClick={() => props.onChange(drawingColors[key])}
                />
            ))}
        </>
    );
}
