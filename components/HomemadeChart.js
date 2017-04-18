import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import Toast from 'react-native-root-toast';

const SCREEN_WIDTH = Dimensions.get('window').width;

class HomemadeChart extends Component {
  onBarTap = (bar) => {
    // Add a Toast on screen.
    let toast = Toast.show(bar.label, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        onShow: () => {
            // calls on toast\`s appear animation start
        },
        onShown: () => {
            // calls on toast\`s appear animation end.
        },
        onHide: () => {
            // calls on toast\`s hide animation start.
        },
        onHidden: () => {
            // calls on toast\`s hide animation end.
        }
    });
  }

  renderBar = (bar, length) => {
    const width = (SCREEN_WIDTH - 80)/length;
    return(
      <TouchableOpacity
        onPress={() => this.onBarTap(bar)}
      >
        <View>
          <Text style={styles.barAmount}>{bar.height}%</Text>
          <View
            style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, width: width, height: bar.height*2, backgroundColor: bar.color }}
          />
        </View>
      </TouchableOpacity>
    );
  }

  renderBars = (bars) => {
    const length = bars.length;
    return bars.map((bar, i) => {
      return(
        <View key={i}>
          {this.renderBar(bar, length)}
        </View>
      );
    });
  }

  renderChart (chart) {
    return(
      <View>
        <Text style={styles.chartTitle}>{chart.title}</Text>
        <Text style={styles.chartSubtitle}>{chart.subtitle}</Text>
        <View style={[styles.barBox]}>
          {this.renderBars(chart.data)}
        </View>
      </View>
    );
  }

  renderChartList (charts) {
    return charts.map((chart, i) => {
      return(
        <View key={i}>
          {this.renderChart(chart)}
        </View>
      );
    });
  }

  render() {
		return (
			<View>
        {this.renderChartList(this.props.data)}
			</View>
		);
	}
}

const styles = {
  barBox: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row'
  },
  bar: {
    width: 30,
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: 'green'
  },
  chartTitle: {
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold'
  },
  chartSubtitle: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 10,
    fontSize: 12
  },
  barAmount: {
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: 12
  }
};

export default HomemadeChart;
