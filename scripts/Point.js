export class Point {
  /**
   * @constructor
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * @param {Point} point
   * @returns {Point}
   */
  minus(point) {
    return new Point(this.x - point.x, this.y - point.y);
  }

  /**
   * @param {Point} point
   * @returns {Point}
   */
  plus(point) {
    return new Point(this.x + point.x, this.y + point.y);
  }

  /**
   * @param {Point} point
   * @returns {Point}
   */
  multiply(point) {
    return new Point(this.x * point.x, this.y * point.y);
  }

  /**
   * @param {Point} point
   * @returns {Point}
   */
  divide(point) {
    return new Point(this.x / point.x, this.y / point.y);
  }

  /**
   * @param {number} scalar
   * @returns {Point}
   */
  multiplyScalar(scalar) {
    return new Point(this.x * scalar, this.y * scalar);
  }

  /**
   * @param {number} scalar
   * @returns {Point}
   */
  divideScalar(scalar) {
    return new Point(this.x / scalar, this.y / scalar);
  }

  /**
   * @param {Point} point
   * @returns {number}
   */
  distanceTo(point) {
    const dx = this.x - point.x;
    const dy = this.y - point.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * @param {Point} point
   * @returns {number}
   */
  angleTo(point) {
    const dx = point.x - this.x;
    const dy = point.y - this.y;
    return Math.atan2(dy, dx) * (180 / Math.PI); // Convert to degrees
  }
}
