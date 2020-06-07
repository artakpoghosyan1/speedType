import { compose } from 'redux'

export const composeEnhancers = (storeNameForDevTool: string) =>
    ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            name: storeNameForDevTool,
        })) ||
    compose
