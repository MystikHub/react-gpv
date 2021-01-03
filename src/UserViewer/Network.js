import Box from '@material-ui/core/Box';
import Graph from 'vis-react';
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { getRepoList, getRepositoryNetworkGraph } from './UserStatistics';

var options = {
    // layout: {
    //     hierarchical: true
    // },
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

    getRepoList(() => {console.log("Finished!")});
  }

  render() {
    return (
      <div>
        <Typography variant="h4" fullWidth><Box textAlign="center">Repository network</Box></Typography>
        <br />
        <Graph
          graph={getRepositoryNetworkGraph()}
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