var test = require('tap').test;
var kruskal = require('../');
var fromDot = require('ngraph.fromdot');
var createGraph = require('ngraph.graph');

test('it can find spanning tree', function(t) {
  var graph = fromDot('digraph G { 1 -> 2 }');
  var tree = kruskal(graph);
  t.ok(tree.length === 1, 'Tree has one edge');
  t.equals(tree[0].fromId, 1, 'it starts at 1');
  t.equals(tree[0].toId, 2, 'and ends starts at 2');
  t.end();
});

test('it can use weights', function(t) {
  var graph = createGraph();
  // weight of 1 -> 2 is heavier than weight of 1 -> 3 + 3 -> 2
  graph.addLink(1, 2, 2);
  graph.addLink(1, 3, 1);
  graph.addLink(3, 2, 1);

  // thus the tree should be 1 -> 3 -> 2
  var tree = kruskal(graph, function (link) {
    // this is our custom weight.
    return link.data;
  });
  t.ok(tree.length === 2, 'Tree has one edge');
  t.equals(tree[0].fromId, 1, 'it starts at 1');
  t.equals(tree[0].toId, 3, 'midpoint at 3');

  t.equals(tree[1].fromId, 3, 'second midpoint 3');
  t.equals(tree[1].toId, 2, 'ends at 2');
  t.end();
});

test('it finds all trees in the forest', function (t) {
  var graph = fromDot('digraph G { 1 -> 2; 3 -> 4 }');
  var forest = kruskal(graph);
  t.ok(forest.length === 2, 'There are two elements in the forest');
  t.equals(forest[0].fromId, 1, 'first starts at 1');
  t.equals(forest[0].toId, 2, 'ends at 2');

  t.equals(forest[1].fromId, 3, 'second starts at 3');
  t.equals(forest[1].toId, 4, 'ends at 4');
  t.end();
});
