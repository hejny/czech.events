import * as React from 'react';
import { CollBoardObject } from './CollBoardObject';
import { Vector2 } from 'touchcontroller';

const SVG_PADDING = 10;

export class Freehand extends CollBoardObject {
    points: Vector2[];
    color: string;
    weight: number;
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;

    constructor(points: Vector2[], color: string, weight: number) {
        super();
        this.points = points;
        this.color = color;
        this.weight = weight;

        const xVals = points.map((point) => point.x);
        const yVals = points.map((point) => point.y);

        this.minX = Math.min.apply(null, xVals);
        this.maxX = Math.max.apply(null, xVals);
        this.minY = Math.min.apply(null, yVals);
        this.maxY = Math.max.apply(null, yVals);
    }

    get path(): string {
        return this.points
            .map((point, i) => {
                const pointRelative = point.subtract(new Vector2(this.minX - SVG_PADDING, this.minY - SVG_PADDING));
                return `${i === 0 ? 'M' : 'L'}${pointRelative.x} ${pointRelative.y}`;
            })
            .join(' ');
    }

    render() {
        return (
            <div
                key={this.uuid}
                className="object"
                style={{
                    position: 'absolute',
                    left: this.minX - SVG_PADDING,
                    top: this.minY - SVG_PADDING,
                    border: '2px dotted red',
                }}
            >
                <svg
                    width={this.maxX - this.minX + 2 * SVG_PADDING}
                    height={this.maxY - this.minY + 2 * SVG_PADDING}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g>
                        <path
                            d={this.path}
                            id={this.uuid}
                            fillOpacity="null"
                            strokeOpacity="null"
                            strokeWidth="3"
                            stroke="#000"
                            fill="none"
                        />
                    </g>
                </svg>
            </div>
        );
    }
}
