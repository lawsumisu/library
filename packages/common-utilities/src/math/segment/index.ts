import { Vector2 } from 'src/math/vector';

export class Segment {
  private readonly p: Vector2;
  private readonly q: Vector2;

  constructor(p: Vector2, q: Vector2) {
    this.p = p;
    this.q = q;
  }

  public minDistanceToPoint(point: Vector2): number {
    const a = point.subtract(this.p);
    const b = this.q.subtract(this.p);
    if (b.magnitude() === 0) {
      return a.magnitude();
    }
    const projection = b.scale(a.dot(b) / b.dot(b));
    const rejection = a.subtract(projection);
    const t = b.x !== 0 ? projection.x / b.x : projection.y / b.y;
    if (t < 0) {
      return a.magnitude();
    } else if (t > 1) {
      return point.subtract(this.q).magnitude();
    } else {
      return rejection.magnitude();
    }
  }

  public minDistanceToSegment(s: Segment): number {
    if (this.intersects(s)) {
      return 0;
    }
    return Math.min(
      this.minDistanceToPoint(s.p),
      this.minDistanceToPoint(s.q),
      s.minDistanceToPoint(this.p),
      s.minDistanceToPoint(this.q)
    );
  }

  public intersects(s: Segment): boolean {
    const a = this.q.subtract(this.p);
    const b = s.q.subtract(s.p);
    const axb = a.cross(b);
    const v = s.p.subtract(this.p);
    if (axb === 0) {
      if (v.cross(a) === 0) {
        const t0 = v.dot(a) / a.dot(a);
        const t1 = t0 + b.dot(a) / a.dot(a);
        return (t0 >= 0 && t0 <= 1) || (t1 >= 0 && t1<= 1);
      } else {
        // lines are parallel and disjoint.
        return false;
      }
    } else {
      const t = v.cross(b) / axb;
      const u = v.cross(a) / axb;
      return t >= 0 && t <= 1 && u >= 0 && u <= 1;
    }
  }

  public get x1(): number {
    return this.p.x;
  }

  public set x1(v: number) {
    this.p.x = v;
  }

  public get x2(): number {
    return this.q.x;
  }

  public set x2(v: number) {
    this.q.x = v;
  }

  public get y1(): number {
    return this.p.y;
  }

  public set y1(v: number) {
    this.p.y = v;
  }

  public get y2(): number {
    return this.q.y;
  }

  public set y2(v: number) {
    this.q.y = v;
  }

}
