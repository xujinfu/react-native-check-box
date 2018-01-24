/**
 * react-native-check-box
 * Checkbox component for react native, it works on iOS and Android
 * https://github.com/crazycodeboy/react-native-check-box
 * Email:crazycodeboy@gmail.com
 * Blog:http://jiapenghui.com
 * @flow
 */

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    ViewPropTypes,
    Image,
    Text,
    TouchableHighlight
} from 'react-native'
import PropTypes from 'prop-types';

export default class CheckBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: this.props.isChecked,
            disabled: this.props.disabled
        }
    }

    static propTypes = {
        ...(ViewPropTypes || View.PropTypes),
        leftText: PropTypes.string,
        leftTextView: PropTypes.element,
        rightText: PropTypes.string,
        leftTextStyle: PropTypes.object,
        rightTextView: PropTypes.string,
        rightTextStyle: PropTypes.object,
        checkedImage: PropTypes.element,
        unCheckedImage: PropTypes.element,
        onClick: PropTypes.func.isRequired,
        isChecked: PropTypes.bool,
        disabled: PropTypes.bool
    }

    static defaultProps = {
        isChecked: false,
        disabled: false,
        leftTextStyle: {},
        rightTextStyle: {}
    }

    _renderLeft() {
        if (this.props.leftTextView) return this.props.leftTextView;
        if (!this.props.leftText) return null;
        return (
            <Text style={[styles.leftText, this.props.leftTextStyle]}>{this.props.leftText}</Text>
        )
    }

    _renderRight() {
        if (this.props.rightTextView) return this.props.rightTextView;
        if (!this.props.rightText) return null;
        return (
            <Text style={[styles.rightText, this.props.rightTextStyle]}>{this.props.rightText}</Text>
        )
    }

    _renderImage() {
        if (this.state.isChecked) {
            return this.props.checkedImage ? this.props.checkedImage : this.genCheckedImage();
        } else {
            return this.props.unCheckedImage ? this.props.unCheckedImage : this.genCheckedImage();
        }
    }

    genCheckedImage() {
        var source = this.state.isChecked ? require('./img/ic_check_box.png') : require('./img/ic_check_box_outline_blank.png');

        return (
            <Image source={source}/>
        )
    }

    onClick() {
        if (!this.state.disabled) {
            this.setState({
                isChecked: !this.state.isChecked
            });
            this.props.onClick();
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.isChecked !== this.state.isChecked) {
            this.setState({
                isChecked: newProps.isChecked
            })
        }

        if (newProps.disabled !== this.state.disabled) {
            this.setState({
                disabled: newProps.disabled
            })
        }
    }

    render() {
        return (
            <TouchableHighlight
                style={this.props.style}
                onPress={() => this.onClick()}
                underlayColor='transparent'
            >
                <View style={styles.container}>
                    {this._renderLeft()}
                    {this._renderImage()}
                    {this._renderRight()}
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    leftText: {
        flex: 1,
    },
    rightText: {
        flex: 1,
        marginLeft: 10
    }
});
