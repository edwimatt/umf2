import React, { Component } from "react";
import _ from "lodash";
import { View, Text, Animated } from "react-native";
import PropTypes from "prop-types";
import ListEmpty from "./ListEmpty";
import ListFooter from "./ListFooter";
import Loader from "../Loader";
class FlatListHandler extends Component {
  static propTypes = {
    data: PropTypes.array,
    isFetching: PropTypes.bool,
    loader: PropTypes.object,
    fetchRequest: PropTypes.func,
  };

  static defaultProps = { data: [], isFetching: false };

  constructor(props) {
    super(props);
  }

  keyExtractor = (item, index) => `item_${index}`;

  deBouncedOnEndReached = _.debounce(() => {
    const { meta } = this.props;

    // dummy meta obj has current page set to 0. this check is needed in case if meta was not sent to flat list handler
    if (meta && meta.current_page) {
      const { current_page, last_page } = meta;
      if (current_page < last_page) {
        this.props.fetchRequest &&
          this.props.fetchRequest(true, current_page + 1);
      }
    } else {
      // executing the prev fetch logic
      this.props.fetchRequest &&
        this.props.fetchRequest(true, this.props.data.length / 10 + 1);
    }
  }, 1000);

  onEndReached = () => this.deBouncedOnEndReached();
  /* old onEndReached
onEndReached = () => {
this.props.fetchRequest &&
this.props.data.length % 10 === 0 &&
this.props.fetchRequest(true, this.props.data.length / 10 + 1);
};
*/
  onRefresh = () =>
    this.props.fetchRequest && this.props.fetchRequest(false, 1);

  renderItem = ({ index }) => (
    <View>
      <Text>{`item ${index}`}</Text>
    </View>
  );

  renderListEmpty = () =>
    !this.props.data.length ? (
      <ListEmpty emptyList={this.props.emptyList} />
    ) : null;
  renderListFooter = () =>
    this.props.isFetching && this.props.data.length % 10 === 0 ? (
      <ListFooter showLoader={true} />
    ) : null;

  render() {
    const {
      contentContainerStyle = {},
      nScroll,
      data,
      loader,
      isFetching,
    } = this.props;

    if (isFetching && !data.length) {
      return loader ? loader : <Loader />;
    }
    / Rendering contains all the basic stuff list needs to render it self what ever extra props is passed to is overridden /;
    return (
      <Animated.FlatList
        useNativeDriver={false}
        data={data}
        renderItem={this.renderItem}
        refreshing={isFetching}
        onRefresh={this.onRefresh}
        onEndReached={this.onEndReached}
        keyExtractor={this.keyExtractor}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={this.renderListEmpty}
        ListFooterComponent={this.renderListFooter}
        contentContainerStyle={
          data.length
            ? {}
            : [styles.contentContainerStyle, contentContainerStyle]
        }
        scrollEventThrottle={5}
        showsVerticalScrollIndicator={false}
        onScroll={
          nScroll
            ? Animated.event(
                [{ nativeEvent: { contentOffset: { y: nScroll } } }],
                {
                  useNativeDriver: true,
                }
              )
            : undefined
        }
        {...this.props}
      />
    );
  }
}

const styles = {
  contentContainerStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
};

export default FlatListHandler;
