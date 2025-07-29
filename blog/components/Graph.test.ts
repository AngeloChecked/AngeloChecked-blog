import { assertEquals } from "jsr:@std/assert";
import { adaptGraph, filterNeighbours } from "./Graph.ts";
import { GraphNode } from "../graph/knowledgeGraph.ts";

const tag1 = {
  type: "link",
  id: "tag1",
} as GraphNode;

const tag2 = {
  type: "link",
  id: "tag2",
} as GraphNode;

const tag3 = {
  type: "link",
  id: "tag3",
} as GraphNode;

const author1 = {
  type: "author",
  id: "authorId1",
  tagId: [tag1.id, tag2.id],
} as GraphNode;

const author2 = {
  type: "author",
  id: "authorId2",
  tagId: [tag1.id, tag2.id],
} as GraphNode;

const author3 = {
  type: "author",
  id: "authorId3",
  tagId: [tag1.id, tag2.id],
} as GraphNode;

const link1 = {
  type: "link",
  id: "link1",
  authorId: author1.id,
  tagId: [tag1.id, tag2.id],
} as GraphNode;

const link2 = {
  type: "link",
  id: "link2",
  authorId: author2.id,
  tagId: [tag1.id, tag2.id],
} as GraphNode;

const link3 = {
  type: "link",
  id: "link3",
  authorId: author3.id,
  tagId: [tag1.id, tag2.id],
} as GraphNode;

const link4 = {
  type: "link",
  id: "link4",
  authorId: author3.id,
  tagId: [tag3.id],
} as GraphNode;

const allNodes: GraphNode[] = [
  tag1,
  tag2,
  tag3,
  link1,
  link2,
  link3,
  link4,
  author1,
  author2,
  author3,
];

Deno.test("filter with neighbours nodes", () => {
  const filteredNodes = filterNeighbours("link1", allNodes);

  const expectedNodesIds = ["link1", "authorId1", "tag1", "tag2"];
  assertEquals(
    filteredNodes.map((node) => node.id),
    expectedNodesIds,
  );
});

Deno.test("adapt knowledge graph to the network graph draw", () => {
  const nodesWithFakeData = allNodes.map(
    (node) =>
      ({
        ...node,
        data: { title: node.id },
      }) as GraphNode,
  );

  const { nodes, edges } = adaptGraph(nodesWithFakeData);

  const expectedNodesIds = [
    "tag1",
    "tag2",
    "tag3",
    "link1",
    "link2",
    "link3",
    "link4",
    "authorId1",
    "authorId2",
    "authorId3",
  ];
  assertEquals(
    nodes.map((node) => node.id),
    expectedNodesIds,
  );

  const sourceIds = edges.map((edge) => edge.source);
  const targetIds = edges.map((edge) => edge.target);
  const expectedEdgesIdsSet = new Set(sourceIds.concat(targetIds));
  const expectedNodesIdsSet = new Set(expectedNodesIds);
  assertEquals(expectedEdgesIdsSet, expectedNodesIdsSet);
});
