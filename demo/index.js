var Viva = require('vivagraphjs');

var graph = require('./createGraph.js');

var kruskal = require('../index.js');
var path = kruskal(graph);

// The rest is just trendering.
path.forEach(indexLink);

var layout = Viva.Graph.Layout.forceDirected(graph, {
  springLength: 35,
  springCoeff: 0.00055,
  dragCoeff: 0.09,
  gravity: -1
});

var svgGraphics = Viva.Graph.View.svgGraphics();
svgGraphics.node(function(node) {
  var groupId = node.data.group;
  var color = '#dedede';
  var circle = Viva.Graph.svg('circle')
    .attr('r', 7)
    .attr('stroke', '#fff')
    .attr('stroke-width', '1.5px')
    .attr("fill", color);

  circle.append('title').text(node.data.name);

  return circle;
}).placeNode(function(nodeUI, pos) {
  nodeUI.attr("cx", pos.x).attr("cy", pos.y);
});

svgGraphics.link(function(link) {
  var width = 1;
  var color = '#999';
  if (link.onPath) {
    width = 3;
    color = '#ff00af';
  }
  return Viva.Graph.svg('line')
    .attr('stroke', color)
    .attr('stroke-width', width);
});

var renderer = Viva.Graph.View.renderer(graph, {
  container: document.getElementById('graph'),
  layout: layout,
  graphics: svgGraphics,
  prerender: 20
});

renderer.run();

function indexLink(el) {
  var link = graph.getLink(el.fromId, el.toId);
  link.onPath = true;
}
