export interface Point {
  x: number;
  y: number;
}

export class Vector2 implements Point {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public static get ZERO(): Vector2 {
    return new Vector2(0, 0);
  }

  public add(v: Vector2): Vector2 {
    return new Vector2(this.x + v.x, this.y + v.y);
  }

  public subtract(v: Vector2): Vector2 {
    return new Vector2(this.x - v.x, this.y - v.y);
  }

  public negate(): Vector2 {
    return new Vector2(-this.x, -this.y);
  }

  public scale(s: number): Vector2 {
    return new Vector2(this.x * s, this.y * s);
  }

  public normalize(): Vector2 {
    if (this.x === 0 && this.y === 0) {
      return this;
    } else {
      return this.scale(1 / this.magnitude());
    }
  }

  public magnitude(): number {
    return Math.sqrt(this.x**2 + this.y**2);
  }

  public clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  public dot(v: Vector2): number {
    return this.x*v.x + this.y*v.y;
  }

  public cross(v: Vector2): number {
    return this.x*v.y - this.y*v.x;
  }

  public reflect(n: Vector2): Vector2 {
    return n.scale(n.dot(this)).scale(2).subtract(this);
  }

  public toPolar(): PolarVector {
    return new PolarVector(this.magnitude(), Math.atan2(this.y, this.x));
  }
}

export class Vector3 {
  public x: number;
  public y: number;
  public z: number;

  public static get ZERO(): Vector3 {
    return new Vector3(0, 0, 0);
  }

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

/**
 * Represents a polar coordinate (r, theta).
 * r: magnitude of line measured from the origin to this coordinate.
 * theta: angle between the vector and the x-axis. Range: [-2*pi, 2*pi]
 */
export class PolarVector {
  public _r: number;
  private _theta: number;

  constructor(r: number, theta: number) {
    this.theta = theta;
    this.r = r;
  }

  public get r(): number {
    return this._r;
  }

  public set r(r: number) {
    if (r < 0) {
      this._theta = (this._theta + Math.PI) % (Math.PI * 2);
    }
    this._r = Math.abs(r);
  }

  public get theta(): number {
    return this._theta;
  }

  public set theta(t: number) {
    this._theta = t % (Math.PI * 2);
  }

  public toCartesian(): Vector2 {
    return new Vector2(this.r * Math.cos(this.theta), this.r * Math.sin(this.theta));
  }
}
