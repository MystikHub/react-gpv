import Box from '@material-ui/core/Box';
import Graph from 'vis-react';
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { getRepositoryNetworkGraphData } from './UserStatistics';

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

    this.state = {
      graphData: undefined
    };
  }

  async componentDidMount() {
    this.setState({ graphData: await getRepositoryNetworkGraphData() });
  }

  render() {
    if(this.state.graphData === undefined)
      return (
        <div>
          <Typography variant="h4" fullWidth><Box textAlign="center">Repository network</Box></Typography>
          <Typography variant="body1" fullWidth>
            <Box textAlign="center">
              If your GitHub access token has push access to a repository, its collaborators will be shown
              in the graph below
            </Box>
          </Typography>
          <br />

          <Typography variant="h4" fullWidth><Box textAlign="center">Language network</Box></Typography>
          <br />

        </div>
      );
    else
      return (
        <div>
          <Typography variant="h4" fullWidth><Box textAlign="center">Repository network</Box></Typography>
          <Typography variant="body1" fullWidth>
            <Box textAlign="center">
              If your GitHub access token has push access to a repository, its collaborators will be shown
              in the graph below
            </Box>
          </Typography>
          <br />
          <Graph
            graph={this.state.graphData}
            options={options}
            style={style}
            events={events}
            vis={vis => (this.vis = vis)} />

          <Typography variant="h4" fullWidth><Box textAlign="center">Language network</Box></Typography>
          <br />

        </div>
      );
  }
}
