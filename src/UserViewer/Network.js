import Box from '@mui/material/Box';
import vis from 'vis-network';
import React, { Component } from 'react';
import Typography from '@mui/material/Typography';
import { getRepositoryNetworkGraphData } from './UserStatistics';

var options = {
  edges: {
    color: '#eee'
  },
  interaction: { hoverEdges: true }
};

var style = {
  height: '30rem'
}

export default class Network extends Component {
  constructor(props) {
    super(props);

    this.visRef = React.createRef();
  }

  async componentDidMount() {
    let graphData = await getRepositoryNetworkGraphData();
    new vis.Network(
      this.visRef.current,
      {
        nodes: graphData.nodes,
        edges: graphData.edges
      },
      options
    );
  }

  render() {
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
        <div ref={this.visRef} style={style} />

        {/* <Typography variant="h4" fullWidth><Box textAlign="center">Language network</Box></Typography>
        <br /> */}

      </div>
    );
  }
}
