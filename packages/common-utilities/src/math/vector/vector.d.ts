export interface Point {
    x: number;
    y: number;
}
export declare class Vector2 implements Point {
    x: number;
    y: number;
    constructor(x: number, y: number);
    static get ZERO(): Vector2;
    add(v: Vector2): Vector2;
    subtract(v: Vector2): Vector2;
    negate(): Vector2;
    scale(s: number): Vector2;
    normalize(): Vector2;
    magnitude(): number;
    clone(): Vector2;
    dot(v: Vector2): number;
    reflect(n: Vector2): Vector2;
    toPolar(): PolarVector;
}
export declare class Vector3 {
    x: number;
    y: number;
    z: number;
    static get ZERO(): Vector3;
    constructor(x: number, y: number, z: number);
}
/**
 * Represents a polar coordinate (r, theta).
 * r: magnitude of line measured from the origin to this coordinate.
 * theta: angle between the vector and the x-axis. Range: [-pi, pi]
 */
export declare class PolarVector {
    r: number;
    private _theta;
    constructor(r: number, theta: number);
    get theta(): number;
    set theta(t: number);
    toCartesian(): Vector2;
}
