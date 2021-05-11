import { Vector2, PolarVector} from 'src/math/vector';
import { assert, expect } from 'chai';

describe('Vector2 Tests', () => {
  describe('add()', () => {
    it('adds two vectors together', () => {
      const p = new Vector2(1, 2);
      const q = new Vector2(3, 4);
      expect(p.add(q)).to.deep.equal(new Vector2(4, 6));

      // Check that old vectors are unchanged
      expect(p).to.deep.equal(new Vector2(1, 2));
      expect(q).to.deep.equal(new Vector2(3, 4));
    });

    it('additive identity', () => {
      expect(new Vector2(1, 10).add(Vector2.ZERO)).to.deep.equal(new Vector2(1, 10));
    });

    it('addition is communicative', () => {
      const p = new Vector2(1.1, -3.8);
      const q = new Vector2(0, 2.2);
      expect(p.add(q)).to.deep.equal(q.add(p));
    });
  });

  describe('subtract()', () => {
    it('subtracts two vectors', () => {
      const p = new Vector2(1, 2);
      const q = new Vector2(3, 4);
      expect(p.subtract(q)).to.deep.equal(new Vector2(-2, -2));

      // Check that old vectors are unchanged
      expect(p).to.deep.equal(new Vector2(1, 2));
      expect(q).to.deep.equal(new Vector2(3, 4));
    });
  });

  describe('negate()', () => {
    it('negates the vector', () => {
      expect(new Vector2(2, -3).negate()).to.deep.equal(new Vector2(-2, 3));
    });
  });

  describe('scale()', () => {
    it('scales the vector', () => {
      const p = new Vector2(51, 8);
      expect(p.scale(2)).to.deep.equal(new Vector2(102, 16));

      // Check that old vector is unchanged
      expect(p).to.deep.equal(new Vector2(51, 8));
    });
  });

  describe('magnitude()', () => {
    it('calculates magnitude', () => {
      expect(new Vector2(3, 4).magnitude()).to.equal(5);
    });

    it('additive inverse', () => {
      const p = new Vector2(2, 2);
      const q = p.negate();
      expect(p.add(q)).to.deep.equal(Vector2.ZERO);
    });
  });

  describe('normalize()', () => {
    it('normalizes vector', () => {
      const v = new Vector2(1, 1);
      expect(v.normalize()).to.deep.equal(new Vector2(1 / Math.sqrt(2), 1 / Math.sqrt(2)));
    });
    it('normalizing zero vector returns zero vector', () => {
      expect(Vector2.ZERO.normalize()).to.deep.equal(Vector2.ZERO);
    });
  });
});
describe('PolarVector Tests', () => {
  describe('new', () => {
    it('r is always nonnegative', () => {
      const p = new PolarVector(-2, Math.PI / 2);
      expect(p.r).to.equal(2);
      expect(p.theta).to.equal((3 * Math.PI) / 2);
    });

    it('theta is always [-2*pi, 2*pi]', () => {
      const p = new PolarVector(2, 5 * Math.PI);
      expect(p.r).to.equal(2);
      expect(p.theta).to.equal(Math.PI);
    });
  });

  describe('toPolar()', () => {
    it('converts from Cartesian to Polar', () => {
      const p = new Vector2(3, 4).toPolar();
      expect(p.r).to.equal(5);
      expect(p.theta).to.equal(Math.atan2(4, 3));
    });

    it('converts back to Cartesian from Polar', () => {
      const v = new Vector2(-3, 4).toPolar().toCartesian();
      assert.approximately(v.x, -3, 0.00001);
      assert.approximately(v.y, 4, 0.00001);
    });
  });
});
