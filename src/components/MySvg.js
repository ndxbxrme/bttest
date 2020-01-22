import Svg, {
  Circle,
  G,
  Path
} from 'react-native-svg';

import React from 'react';
import {
  View,
  Animated
} from 'react-native';

let AnimatedView = Animated.createAnimatedComponent(View);


export default class MySvg extends React.Component {
  state = {
    anim: new Animated.Value(0)
  }
  componentDidMount() {
    Animated.timing(this.state.anim, {toValue: 1}).start();
  }
  render() {
    return (
      <AnimatedView style={{width:this.state.anim,height:100}}>
        <Svg width="580" height="400">
          <G>
            <Path stroke="#000" id="svg_3" d="m-4.273337,166.453125c0,0 147.845669,-150 305.418026,-77c157.572357,73 283.046642,-41 283.046642,-41c0,0 6.808682,376 6.808682,376c0,0 -605.000039,-4 -605.000039,-4c0,0 9.726689,-254 9.726689,-254z" stroke-opacity="null" stroke-width="1.5" fill="#9ACEE6"/>
          </G>
        </Svg>
      </AnimatedView>
    )
  }
}
