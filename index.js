var DisjointSet = require('ngraph.disjoint-set');
module.exports = kruskal;

function kruskal(graph, getWeight) {
  var tree = [];
  getWeight = getWeight || uniformWeight;
  // map of disjoint sets for quick lookup
  var nodes = new Map();
  // Sorted array of edges by their weight
  var links = [];

  graph.forEachNode(initSet);
  graph.forEachLink(initLink);
  links.sort(byWeight);

  for (var i = 0; i < links.length; ++i) {
    var fromId = links[i].fromId;
    var toId = links[i].toId;
    var fromSet = nodes.get(fromId);
    var toSet = nodes.get(toId);
    if (fromSet.find() !== toSet.find()) {
      tree.push(new TreeNode(fromId, toId));
      fromSet.union(toSet);
    }
  }

  return tree;

  function initLink(link) {
    links.push(link);
  }

  function initSet(node) {
    nodes.set(node.id, new DisjointSet(node.id));
  }

  function byWeight(x, y) {
    return getWeight(x) - getWeight(y);
  }
}

function uniformWeight(link) {
  return 1;
}

function TreeNode(fromId, toId) {
  this.fromId = fromId;
  this.toId = toId;
}
