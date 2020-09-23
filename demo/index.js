var Viva = require('vivagraphjs');

var graph = require('./createGraph.js');

var kruskal = require('../index.js');
var path = kruskal(graph);
// The rest is just rendering.
var pathGraph = Viva.Graph.graph();
path.forEach(addToPathGraph);
renderGraph(graph, 'left');
renderGraph(pathGraph, 'right');

function renderGraph(graph, container) {
  var layout = Viva.Graph.Layout.forceDirected(graph, {
    springLength: 35,
    springCoeff: 0.00055,
    dragCoeff: 0.09,
    gravity: -1
  });

  var svgGraphics = Viva.Graph.View.svgGraphics();
  svgGraphics.node(function(node) {
    var color = '#dedede';
    var circle = Viva.Graph.svg('circle')
      .attr('r', 7)
      .attr('stroke', '#fff')
      .attr('stroke-width', '1.5px')
      .attr("fill", color);

    return circle;
  }).placeNode(function(nodeUI, pos) {
    nodeUI.attr("cx", pos.x).attr("cy", pos.y);
  });

  svgGraphics.link(function(link) {
    var width = 1;
    var color = '#999';
    if (pathGraph.getLink(link.fromId, link.toId)) {
      width = 3;
      color = '#ff00af';
    }
    return Viva.Graph.svg('line')
      .attr('stroke', color)
      .attr('stroke-width', width);
  });

  var renderer = Viva.Graph.View.renderer(graph, {
    container: document.getElementById(container),
    layout: layout,
    graphics: svgGraphics,
    prerender: 20
  });

  renderer.run();
}

function addToPathGraph(el) {
  pathGraph.addLink(el.fromId, el.toId);
}
