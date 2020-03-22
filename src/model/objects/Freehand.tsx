import * as React from 'react';
import { AbstractObject, IS_NEAR_DISTANCE } from './AbstractObject';
import { Vector2 } from 'touchcontroller';

const SVG_PADDING = 10;

export class Freehand extends AbstractObject {
    public points: Vector2[];
    public color: string;
    public weight: number;
    private minX: number;
    private maxX: number;
    private minY: number;
    private maxY: number;

    constructor(points: Vector2[], color: string, weight: number) {
        super();
        this.points = points;
        this.color = color;
        this.weight = weight;
    }

    get path(): string {
        return this.points
            .map((point, i) => {
                const pointRelative = point.subtract(new Vector2(this.minX - SVG_PADDING, this.minY - SVG_PADDING));
                return `${i === 0 ? 'M' : 'L'}${pointRelative.x} ${pointRelative.y}`;
            })
            .join(' ');
    }

    get topLeftCorner() {
        return new Vector2(this.minX, this.minY);
    }
    get bottomRightCorner() {
        return new Vector2(this.maxX, this.maxY);
    }

    isNear(point2: Vector2) {
        // Should detect even near lines, but this is good enough
        return this.points.filter((point1) => point1.add(this.shift).length(point2) <= IS_NEAR_DISTANCE).length > 0;
    }

    private calculateBoundingBox() {
        // TODO: Maybe use BoundingBox from TouchController

        const xVals = this.points.map((point) => point.x);
        const yVals = this.points.map((point) => point.y);

        this.minX = Math.min.apply(null, xVals);
        this.maxX = Math.max.apply(null, xVals);
        this.minY = Math.min.apply(null, yVals);
        this.maxY = Math.max.apply(null, yVals);
    }

    render() {
        this.calculateBoundingBox();
        return (
            <div
                key={this.uuid}
                className="object"
                style={{
                    position: 'absolute',
                    left: this.minX - SVG_PADDING + this.shift.x,
                    top: this.minY - SVG_PADDING + this.shift.y,
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
                            stroke-linecap="round"
                            stroke="#000"
                            fill="none"
                            className="collisions"
                        />
                    </g>
                </svg>
            </div>
        );
    }
}
