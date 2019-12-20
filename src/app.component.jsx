import React from 'react';
import { mapping } from '@eva-design/eva';
import { ApplicationProvider } from '@kitten/theme';
import { DynamicStatusBar } from '@src/components/common';
import { ApplicationLoader, } from './core/appLoader/applicationLoader.component';
import { Router } from './core/navigation/routes';
import { trackScreenTransition } from './core/utils/analytics';
import { getCurrentStateName, } from './core/navigation/util';
import { ThemeContext, themes, ThemeStore, } from '@src/core/themes';
import { IconRegistry } from '@kitten/ui';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
const images = [
    require('./assets/images/source/image-profile-1.jpg'),
    require('./assets/images/source/image-profile-2.jpg'),
    require('./assets/images/source/image-profile-3.jpg'),
    require('./assets/images/source/image-profile-4.jpg'),
    require('./assets/images/source/image-profile-5.jpg'),
    require('./assets/images/source/image-profile-6.jpg'),
    require('./assets/images/source/image-profile-7.jpg'),
    require('./assets/images/source/image-profile-8.jpg'),
    require('./assets/images/source/image-profile-9.jpg'),
    require('./assets/images/source/image-profile-10.jpg'),
];
const fonts = {
    'opensans-semibold': require('./assets/fonts/opensans-semibold.ttf'),
    'opensans-bold': require('./assets/fonts/opensans-bold.ttf'),
    'opensans-extrabold': require('./assets/fonts/opensans-extra-bold.ttf'),
    'opensans-light': require('./assets/fonts/opensans-light.ttf'),
    'opensans-regular': require('./assets/fonts/opensans-regular.ttf'),
};
const assets = {
    images: images,
    fonts: fonts,
};
export default class App extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            theme: 'Eva Light',
        };
        this.onTransitionTrackError = (error) => {
            console.warn('Analytics error: ', error.message);
        };
        this.onNavigationStateChange = (prevState, currentState) => {
            const prevStateName = getCurrentStateName(prevState);
            const currentStateName = getCurrentStateName(currentState);
            if (prevStateName !== currentStateName) {
                trackScreenTransition(currentStateName)
                    .catch(this.onTransitionTrackError);
            }
        };
        this.onSwitchTheme = (theme) => {
            ThemeStore.setTheme(theme).then(() => {
                this.setState({ theme });
            });
        };
    }
    render() {
        const contextValue = {
            currentTheme: this.state.theme,
            toggleTheme: this.onSwitchTheme,
        };
        return (<ApplicationLoader assets={assets}>
        <IconRegistry icons={EvaIconsPack}/>
        <ThemeContext.Provider value={contextValue}>
          <ApplicationProvider mapping={mapping} theme={themes[this.state.theme]}>
            <DynamicStatusBar currentTheme={this.state.theme}/>
            <Router onNavigationStateChange={this.onNavigationStateChange}/>
          </ApplicationProvider>
        </ThemeContext.Provider>
      </ApplicationLoader>);
    }
}
