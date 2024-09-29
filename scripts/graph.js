import { Point } from "./Point.js";

/**
 * @typedef {Object} GraphConfig
 * @property {number} WIDTH
 * @property {number} HEIGHT
 * @property {number} SPRING_LENGTH
 * @property {number} SPRING_CONSTANT
 * @property {number} REPULSION_CONSTANT
 * @property {number} DAMPING
 * @property {number} ITERATIONS
 * @property {number} MARGIN
 */

/** @typedef {{ id: string | number, text: string, link: string, color: string, radius: number }} Node */
/** @typedef {{ source: string | number, target: string | number, text: string }} Edge */
/** @typedef {{ nodes: Array<Node> edges: Array<Edge>,  }} Graph  */

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
    SPRING_LENGTH,
    SPRING_CONSTANT,
    REPULSION_CONSTANT,
    DAMPING,
    ITERATIONS,
    MARGIN,
  },
  { nodes, edges },
  simulationStepCallback = undefined,
) {
  function randomPoint(width, height) {
    return () =>
      new Point(
        (Math.random() * width) / 2 - width / 4,
        (Math.random() * height) / 2 - height / 4,
      );
  }

  function findNode(id) {
    return nodes.find((node) => node.id === id);
  }

  function applyForces() {
    const forces = {};
    for (const node of nodes) {
      forces[node.id] = new Point(0, 0);
    }

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const nodeA = nodes[i];
        const nodeB = nodes[j];

        const distance = nodeB.point.distanceTo(nodeA.point);
        const minDistance = nodeA.radius + nodeB.radius + MARGIN;

        if (distance < minDistance) {
          const force = REPULSION_CONSTANT / (distance * distance);
          const forcePoint = nodeA.point
            .minus(nodeB.point)
            .divideScalar(distance)
            .multiplyScalar(force);

          forces[nodeA.id] = forces[nodeA.id].minus(forcePoint);
          forces[nodeB.id] = forces[nodeB.id].plus(forcePoint);
        }
      }
    }

    for (let edge of edges) {
      const nodeA = findNode(edge.source);
      const nodeB = findNode(edge.target);

      if (!nodeA || !nodeB) {
        continue;
      }

      const distance = nodeA.point.distanceTo(nodeB.point);
      const displacement = distance - SPRING_LENGTH;
      const force = SPRING_CONSTANT * displacement;
      const forcePoint = nodeB.point
        .minus(nodeA.point)
        .divideScalar(distance)
        .multiplyScalar(force);

      forces[edge.source] = forces[edge.source].plus(forcePoint);
      forces[edge.target] = forces[edge.target].minus(forcePoint);
    }

    return forces;
  }

  function updatePositions(forces) {
    for (const key in forces) {
      const node = findNode(key);
      if (!node) {
        continue;
      }
      node.xpoint = node.xpoint.plus(forces[key]);

      // Apply damping to slow down over time
      node.xpoint = node.xpoint.multiplyScalar(DAMPING);
      // Update position based on velocity (xpoint)
      node.point = node.point.plus(node.xpoint);

      node.point = new Point(
        Math.max(
          -WIDTH / 2 + node.radius,
          Math.min(WIDTH / 2 - node.radius, node.point.x),
        ),
        Math.max(
          -HEIGHT / 2 + node.radius,
          Math.min(HEIGHT / 2 - node.radius, node.point.y),
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
        const minDistance = nodeA.radius + nodeB.radius + MARGIN;

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

  const newLocal = /\ |-/g;
  const createRandomPoint = randomPoint(WIDTH, HEIGHT);
  for (let node of nodes) {
    node.point = createRandomPoint();
    node.xpoint = new Point(0, 0);
    const adjustId = node.id.replaceAll?.(newLocal, "_");
    if (adjustId) {
      node.id = adjustId;
    }
  }
  for (let edge of edges) {
    const adjustSource = edge.source.replaceAll?.(newLocal, "_");
    const adjustTarget = edge.target.replaceAll?.(newLocal, "_");
    if (adjustSource) {
      edge.source = adjustSource;
    }
    if (adjustTarget) {
      edge.target = adjustTarget;
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
