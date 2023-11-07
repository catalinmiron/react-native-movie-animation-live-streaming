import { registerRootComponent } from 'expo';
import App from './src/App.tsx';

import { enableReactTracking } from "@legendapp/state/config/enableReactTracking";

enableReactTracking({
    auto: true,
});

export default registerRootComponent(App);
