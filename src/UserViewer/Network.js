import Box from '@material-ui/core/Box';
import Graph from 'vis-react';
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

var graph = {
    nodes: [
        { id: 1, label: 'Node 1' },
        { id: 2, label: 'Node 2' },
        { id: 3, label: 'Node 3' },
        { id: 4, label: 'Node 4' },
        { id: 5, label: 'Node 5' }
    ],
    edges: [
        { from: 1, to: 2 },
        { from: 1, to: 3 },
        { from: 2, to: 4 },
        { from: 2, to: 5 }
    ]
};
 
var options = {
    layout: {
        hierarchical: true
    },
    edges: {
        color: '#eee'
    },
    interaction: { hoverEdges: true }
};
 
var events = {
    select: function(event) {
        var { nodes, edges } = event;
    }
};

var style={
  height: '30rem'
}

export default class Network extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <Typography variant="h4" fullWidth><Box textAlign="center">Repository network</Box></Typography>
        <br />
        <Graph
          graph={graph}
          options={options}
          events={events}
          style={style}
          getNetwork={this.getNetwork}
          getEdges={this.getEdges}
          getNodes={this.getNodes}
          vis={vis => (this.vis = vis)} />

        <Typography variant="h4" fullWidth><Box textAlign="center">Language network</Box></Typography>
        <br />

      </div>
    );
  }
}