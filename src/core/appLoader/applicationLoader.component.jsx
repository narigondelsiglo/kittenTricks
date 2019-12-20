import React from 'react';
import { AppLoading, SplashScreen, } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { LoadingAnimationComponent } from '@src/core/appLoader/loadingAnimation.component';
/**
 * Loads child component after asynchronous tasks are done
 */
export class ApplicationLoader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        };
        this.onLoadSuccess = () => {
            this.setState({ loaded: true });
            SplashScreen.hide();
        };
        this.onLoadError = (error) => {
            console.warn(error);
        };
        this.loadResources = () => {
            return this.loadResourcesAsync(this.props.assets);
        };
        this.loadFonts = (fonts) => {
            return Font.loadAsync(fonts);
        };
        this.loadImages = (images) => {
            const tasks = images.map((image) => {
                return Asset.fromModule(image).downloadAsync();
            });
            return Promise.all(tasks);
        };
        this.renderLoading = () => {
            return (<AppLoading startAsync={this.loadResources} onFinish={this.onLoadSuccess} onError={this.onLoadError} autoHideSplash={false}/>);
        };
        SplashScreen.preventAutoHide();
    }
    async loadResourcesAsync(assets) {
        const { fonts, images } = assets;
        // @ts-ignore (expo type error)
        return Promise.all([
            this.loadFonts(fonts),
            this.loadImages(images),
        ]);
    }
    render() {
        return (<React.Fragment>
        {this.state.loaded ? this.props.children : this.renderLoading()}
        <LoadingAnimationComponent isLoaded={this.state.loaded}/>
      </React.Fragment>);
    }
}
