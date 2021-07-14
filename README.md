# ngraph.kruskal [![build status](https://github.com/anvaka/ngraph.kruskal/actions/workflows/tests.yaml/badge.svg)](https://github.com/anvaka/ngraph.kruskal/actions/workflows/tests.yaml)

A minimum-spanning-tree algorithm for [ngraph.graph](https://github.com/anvaka/ngraph.graph).
Runtime: `O(E log E)`, where `E` is number of edges in the graph.

# usage

``` js
var kruskal = require('ngraph.kruskal');
// graph is an instance of ngraph.graph
var tree = kruskal(graph);

// Tree is array of edges that constitute minimum spanning tree (MSP).
assert(Array.isArray(tree));

// Each edge of the MSP is an edge of the graph:
var treeEdge = tree[0];
assert(
  graph.getLink(treeEdge.fromId, treeEdge.toId)
);
```

Note: This algorithm finds all trees, even in the graph with disconnected
components.

# install

```
npm install ngraph.kruskal
```

# License

MIT
