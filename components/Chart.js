import React, { Component } from 'react';
import { ActivityIndicator, View, Text, ScrollView, Dimensions, Image, TouchableHighlight } from 'react-native';
import Chart from 'react-native-chart';

const data = [
	[0, 1],
	[1, 3],
	[3, 7],
	[4, 9],
];

const SCREEN_WIDTH = Dimensions.get('window').width;

class Charts extends Component {
  render() {
		return (
			<View style={styles.container}>
				<Chart
					style={styles.chart}
					data={data}
					verticalGridStep={10}
					type="pie"
					showDataPoint={true}
				 />
			</View>
		);
	}
}

const styles = {
  container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	chart: {
		width: SCREEN_WIDTH-20,
		height: 200,
	},
};

export default Charts;
