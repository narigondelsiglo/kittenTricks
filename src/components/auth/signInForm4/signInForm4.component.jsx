import React from 'react';
import { View, } from 'react-native';
import { withStyles, } from '@kitten/theme';
import { textStyle, ValidationInput, } from '@src/components/common';
import { PhoneNumberValidator, SMSCodeValidator, } from '@src/core/validators';
import { LockIconFill, PhoneIconFill, } from '@src/assets/icons';
class SignInForm4Component extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            phone: undefined,
            code: undefined,
        };
        this.onPhoneInputTextChange = (phone) => {
            this.setState({ phone });
        };
        this.onCodeInputTextChange = (code) => {
            this.setState({ code });
        };
        this.isValid = (value) => {
            const { phone, code } = value;
            return phone !== undefined
                && code !== undefined;
        };
    }
    componentDidUpdate(prevProps, prevState) {
        const oldFormValid = this.isValid(prevState);
        const newFormValid = this.isValid(this.state);
        const isStateChanged = this.state !== prevState;
        const becomeValid = !oldFormValid && newFormValid;
        const becomeInvalid = oldFormValid && !newFormValid;
        const remainValid = oldFormValid && newFormValid;
        if (becomeValid) {
            this.props.onDataChange(this.state);
        }
        else if (becomeInvalid) {
            this.props.onDataChange(undefined);
        }
        else if (isStateChanged && remainValid) {
            this.props.onDataChange(this.state);
        }
    }
    render() {
        const { style, themedStyle, theme, ...restProps } = this.props;
        return (<View {...restProps} style={[themedStyle.container, style]}>
        <ValidationInput style={themedStyle.phoneInput} textStyle={textStyle.paragraph} placeholder='Phone Number' icon={PhoneIconFill} validator={PhoneNumberValidator} onChangeText={this.onPhoneInputTextChange}/>
        <ValidationInput style={themedStyle.codeInput} textStyle={textStyle.paragraph} placeholder='SMS Code' secureTextEntry={true} icon={LockIconFill} validator={SMSCodeValidator} onChangeText={this.onCodeInputTextChange}/>
      </View>);
    }
}
export const SignInForm4 = withStyles(SignInForm4Component, (theme) => ({
    container: {},
    phoneInput: {},
    codeInput: {
        marginTop: 16,
    },
}));
