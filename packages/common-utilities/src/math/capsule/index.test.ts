import { Capsule } from 'src/math/capsule';
import { assert, expect } from 'chai';

describe('Capsule Tests', () => {
  it('constructor', () => {
    const cap = new Capsule(2, { x1: 0, y1: 0, x2: 5, y2: 3.4});
    expect(cap.r).to.equal(2);
    expect(cap.x1).to.equal(0);
    expect(cap.y1).to.equal(0);
    expect(cap.x2).to.equal(5);
    expect(cap.y2).to.equal(3.4);

    cap.x1 = 2;
    cap.x2 = 2;
    expect(cap.x1).to.equal(2);
    expect(cap.x2).to.equal(2);
  });

  describe('intersects()', () => {
    it('returns true if intersects circle', () => {
      const cap = new Capsule(2, { x1: 0, y1: 0, x2: 5, y2: 5});
      assert.isTrue(cap.intersects({ x: 3, y: 5, r: 10}))
    });

    it('returns false if it does not intersect circle', () => {
      const cap = new Capsule(2, { x1: 0, y1: 0, x2: 5, y2: 5});
      assert.isFalse(cap.intersects({ x: 3, y: 10, r: 1}))
    });

    it ('returns true during self-intersection', () => {
      const cap = new Capsule(2, { x1: 0, y1: 0, x2: 5, y2: 5});
      assert.isTrue(cap.intersects(cap));
    });

    it('returns true is it intersects capsule', () => {
      const cap = new Capsule(2, { x1: 0, y1: 0, x2: 5, y2: 5});
      assert.isTrue(cap.intersects({ x1: 0, y1: -2, x2: -3, y2: -10, r: 1}))
    });

    it('returns false is it does not intersects capsule', () => {
      const cap = new Capsule(2, { x1: 0, y1: 0, x2: 5, y2: 5});
      assert.isFalse(cap.intersects({ x1: 0, y1: -3.5, x2: -3, y2: -10, r: 1}))
    });
  });
});