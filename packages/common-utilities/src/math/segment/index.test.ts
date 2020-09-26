import { Vector2 } from 'src/math/vector';
import { Segment } from 'src/math/segment';
import { assert, expect } from 'chai';

describe('Segment Tests', () => {
  it('constructor', () => {
    const s = new Segment(Vector2.ZERO, new Vector2(3, -7.8));
    expect(s.x1).to.equal(0);
    expect(s.x2).to.equal(3);
    expect(s.y1).to.equal(0);
    expect(s.y2).to.equal(-7.8);

    s.y1 = 1;
    s.y2 = 7;
    expect(s.y1).to.equal(1);
    expect(s.y2).to.equal(7);
  });

  describe('minDistanceToPoint()', () => {
    it ('finds min distance', () => {
      const s = new Segment(Vector2.ZERO, new Vector2(5, 0));
      const p = new Vector2(3, 3);
      expect(s.minDistanceToPoint(p)).to.equal(3);
    });

    it('finds min distance when point closest to segment endpoint', () => {
      const s = new Segment(Vector2.ZERO, new Vector2(4, 6));
      const p1 = new Vector2(-3, -4);
      const p2 = new Vector2(7, 10);
      expect(s.minDistanceToPoint(p1)).to.equal(5);
      expect(s.minDistanceToPoint(p2)).to.equal(5);
    });

    it('finds min distance when segment is actually a point', () => {
      const s = new Segment(Vector2.ZERO, Vector2.ZERO);
      const p1 = new Vector2(3, 4);
      expect(s.minDistanceToPoint(p1)).to.equal(5);
    });

    it('min distance is 0 when point is collinear', () => {
      const s = new Segment(Vector2.ZERO, new Vector2(4, 4));
      const p1 = new Vector2(1,1);
      expect(s.minDistanceToPoint(p1)).to.equal(0);
    })
  });

  describe('intersects()', () => {
    it ('returns true when segments intersect', () => {
      const s1 = new Segment(Vector2.ZERO, new Vector2(4, 0));
      const s2 = new Segment(new Vector2(2, -2), new Vector2(2, 2));
      assert.isTrue(s1.intersects(s2));
      assert.isTrue(s2.intersects(s1));
    });

    it('returns false when segments are disjoint', () => {
      const s1 = new Segment(Vector2.ZERO, new Vector2(4, 0));
      const s2 = new Segment(new Vector2(5, 2), new Vector2(5, -2));
      assert.isFalse(s1.intersects(s2));
      assert.isFalse(s2.intersects(s1));
    });

    it('handles parallel lines', () => {
      const s1 = new Segment(Vector2.ZERO, new Vector2(4, 0));
      const s2 = new Segment(new Vector2(1, 4), new Vector2(5, 4));
      assert.isFalse(s1.intersects(s2));
      assert.isFalse(s2.intersects(s1));
    });

    it('handles collinear lines', () => {
      const s1 = new Segment(Vector2.ZERO, new Vector2(4, 0));
      const s2 = new Segment (new Vector2(2, 0), new Vector2(6, 0));
      const s3 = new Segment (new Vector2(6, 0), new Vector2(2, 0));
      assert.isTrue(s1.intersects(s2));
      assert.isTrue(s1.intersects(s3));
    });

    it('handles collinear lines when they are disjoint', () => {
      const s1 = new Segment(Vector2.ZERO, new Vector2(4, 0));
      const s2 = new Segment (new Vector2(5, 0), new Vector2(6, 0));
      assert.isFalse(s2.intersects(s1));
    })
  });

  describe('minDistanceToSegment()', () => {
    it('minDistance is line from s1.q to s2', () => {
      const s1 = new Segment(Vector2.ZERO, new Vector2(4, 0));
      const s2 = new Segment(new Vector2(-4, -3), new Vector2(5, 6));
      assert.approximately(s1.minDistanceToSegment(s2), 1 / Math.sqrt(2), .00001);
      assert.approximately(s2.minDistanceToSegment(s1), 1 / Math.sqrt(2), .00001);
    });

    it('minDistance is line from s1.p to s2', () => {
      const s1 = new Segment(Vector2.ZERO, new Vector2(4, 0));
      const s2 = new Segment(new Vector2(-1, 6), new Vector2(10, -5));
      assert.approximately(s1.minDistanceToSegment(s2), 1 / Math.sqrt(2), .00001);
      assert.approximately(s2.minDistanceToSegment(s1), 1 / Math.sqrt(2), .00001);
    });

    it('minDistance for intersection', () => {
      const s1 = new Segment(Vector2.ZERO, new Vector2(4, 0));
      const s2 = new Segment(new Vector2(2, -2), new Vector2(2, 2));
      expect(s1.minDistanceToSegment(s2)).to.equal(0);
    })
  });
});