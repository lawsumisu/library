import { Segment } from 'src/math/segment';
import { Vector2 } from 'src/math/vector';
import * as _ from 'lodash';

interface CapsuleLike {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  r: number;
}

interface CircleLike {
  x: number;
  y: number;
  r: number;
}

export class Capsule {
  public readonly r: number;
  private readonly s: Segment;

  constructor(r: number, points: { x1: number; y1: number; x2: number; y2: number }) {
    this.r = r;
    this.s = new Segment(new Vector2(points.x1, points.y1), new Vector2(points.x2, points.y2));
  }

  public intersects(o: CapsuleLike | CircleLike) {
    const d = this.r + o.r;
    if (_.has(o, 'x')) {
      const circle = o as CircleLike;
      return this.s.minDistanceToPoint(new Vector2(circle.x, circle.y)) <= d;
    } else {
      const cap = o as CapsuleLike;
      return this.s.minDistanceToSegment(new Segment(new Vector2(cap.x1, cap.y1), new Vector2(cap.x2, cap.y2))) <= d;
    }
  }

  public get x1(): number {
    return this.s.x1;
  }

  public set x1(v: number) {
    this.s.x1 = v;
  }

  public get x2(): number {
    return this.s.x2;
  }

  public set x2(v: number) {
    this.s.x2 = v;
  }

  public get y1(): number {
    return this.s.y1;
  }

  public set y1(v: number) {
    this.s.y1 = v;
  }

  public get y2(): number {
    return this.s.y2;
  }

  public set y2(v: number) {
    this.s.y2 = v;
  }
}
