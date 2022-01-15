import { DebugDrawPlugin } from 'src/plugins/debug.plugin';
import { Capsule, Quadtree, QuadtreeBounds, Vector2 } from '@lawsumisu/common-utilities';

export class QuadtreePF {
  public static debug(plugin: DebugDrawPlugin, q: Quadtree, pxUnit = 1): void {
    q.forEachNode((node: Quadtree) => {
      const { x, y, width, height } = node.bounds;
      plugin.rect({ x: x * pxUnit, y: y * pxUnit, width: width * pxUnit, height: height * pxUnit });
    });
  }

  public static getCircleBounds(c: Phaser.Geom.Circle): QuadtreeBounds {
    return {
      x: c.left,
      y: c.top,
      width: c.radius * 2,
      height: c.radius * 2
    };
  }

  public static getCapsuleBounds(c: Capsule): QuadtreeBounds {
    const x1 = Math.min(c.x1, c.x2) - c.r;
    const x2 = Math.max(c.x1, c.x2) + c.r;
    const y1 = Math.min(c.y1, c.y2) - c.r;
    const y2 = Math.min(c.y1, c.y2) + c.r;
    return {
      x: x1,
      y: y1,
      width: x2 - x1,
      height: y2 - y1,
    };
  }
}

export enum RectPosition {
  START = 'START',
  CENTER = 'CENTER',
  END = 'END'
}

export class RectanglePF {
  public static create(position: Vector2, size: Vector2, options: Partial<{ posX: RectPosition, posY: RectPosition}> = {}) {
    const { posX = RectPosition.CENTER, posY = RectPosition.CENTER } = options;
    const offset = Vector2.ZERO;
    switch (posX) {
      case RectPosition.CENTER:
        offset.x = size.x / 2;
        break;
      case RectPosition.END:
        offset.x = size.x;
        break;
    }

    switch (posY) {
      case RectPosition.CENTER:
        offset.y = size.y / 2;
        break;
      case RectPosition.END:
        offset.y = size.y;
        break;
    }
    return new Phaser.Geom.Rectangle(position.x - offset.x, position.y - offset.y, size.x, size.y);
  }
}
