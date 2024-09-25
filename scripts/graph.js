import { Point } from "./Point.js";

/**
 * @typedef {Object} GraphConfig
 * @property {number} WIDTH
 * @property {number} HEIGHT
 * @property {number} NODE_RADIUS
 * @property {number} SPRING_LENGTH
 * @property {number} SPRING_CONSTANT
 * @property {number} REPULSION_CONSTANT
 * @property {number} DAMPING
 * @property {number} ITERATIONS
 * @property {number} MARGIN
 */

/** @typedef {{ id: number, point: Point, xpoint: Point}} Node */
/** @typedef {{ source: number, target: number }} Edge */
/** @typedef {{ edges: Array<Edge>, nodes: Array<Node> }} Graph  */

/**
 * @param {GraphConfig} arg0
 * @param {Array<Node>} nodes
 * @param {Array<Edge>} edges
 * @param {(graph:Graph) => Promise<void>} [simulationStepCallback]
 * @returns {Graph}
 */
export function calculateGraph(
  {
    WIDTH,
    HEIGHT,
    NODE_RADIUS,
    SPRING_LENGTH,
    SPRING_CONSTANT,
    REPULSION_CONSTANT,
    DAMPING,
    ITERATIONS,
    MARGIN,
  },
  nodes,
  edges,
  simulationStepCallback = undefined,
) {
  function findNode(id) {
    return nodes.find((node) => node.id === id);
  }

  function applyForces() {
    const forces = nodes.map(() => new Point(0, 0));

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const nodeA = nodes[i];
        const nodeB = nodes[j];

        const distance = nodeB.point.distanceTo(nodeA.point);
        const minDistance = 2 * NODE_RADIUS + MARGIN;

        if (distance < minDistance) {
          const force = REPULSION_CONSTANT / (distance * distance);
          const forcePoint = nodeA.point
            .minus(nodeB.point)
            .divideScalar(distance)
            .multiplyScalar(force);

          forces[i] = forces[i].minus(forcePoint);
          forces[j] = forces[j].plus(forcePoint);
        }
      }
    }

    for (let edge of edges) {
      const nodeA = findNode(edge.source);
      const nodeB = findNode(edge.target);

      const distance = nodeA.point.distanceTo(nodeB.point);
      const displacement = distance - SPRING_LENGTH;
      const force = SPRING_CONSTANT * displacement;
      const forcePoint = nodeB.point
        .minus(nodeA.point)
        .divideScalar(distance)
        .multiplyScalar(force);

      forces[edge.source - 1] = forces[edge.source - 1].plus(forcePoint);
      forces[edge.target - 1] = forces[edge.target - 1].minus(forcePoint);
    }

    return forces;
  }

  function updatePositions(forces) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      node.xpoint = node.xpoint.plus(forces[i]);

      // Apply damping to slow down over time
      node.xpoint = node.xpoint.multiplyScalar(DAMPING);
      // Update position based on velocity (xpoint)
      node.point = node.point.plus(node.xpoint);

      node.point = new Point(
        Math.max(
          -WIDTH / 2 + NODE_RADIUS,
          Math.min(WIDTH / 2 - NODE_RADIUS, node.point.x),
        ),
        Math.max(
          -HEIGHT / 2 + NODE_RADIUS,
          Math.min(HEIGHT / 2 - NODE_RADIUS, node.point.y),
        ),
      );
    }
  }

  function maintainMinimumDistance() {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const nodeA = nodes[i];
        const nodeB = nodes[j];

        const distance = nodeB.point.distanceTo(nodeA.point);
        const minDistance = 2 * NODE_RADIUS + MARGIN;

        if (distance < minDistance) {
          const overlap = minDistance - distance;

          const direction = nodeB.point
            .minus(nodeA.point)
            .divideScalar(distance);

          nodeA.point = nodeA.point.minus(
            direction.multiplyScalar(overlap / 2),
          );
          nodeB.point = nodeB.point.plus(direction.multiplyScalar(overlap / 2));
        }
      }
    }
  }

  if (simulationStepCallback) {
    Promise.resolve().then(async () => {
      for (let i = 0; i < ITERATIONS; i++) {
        const forces = applyForces();
        updatePositions(forces);
        maintainMinimumDistance();
        await simulationStepCallback({ nodes, edges });
      }
    });
  } else {
    for (let i = 0; i < ITERATIONS; i++) {
      const forces = applyForces();
      updatePositions(forces);
      maintainMinimumDistance();
    }
  }
  return { nodes, edges };
}
