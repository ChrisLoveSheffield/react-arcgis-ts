import React from 'react'
import { MapView } from './library'
const _init = (target: BaseWidgeInterface, propertyKey: string) => {
    target.postCreate()
}

class BaseWidgeInterface extends React.Component {
    state: 'postCreate' | 'startUp' | 'onOpen' | 'onClose' = 'postCreate'
    /**
     * fire before create
     */
    postCreate(): void {}
    /**
     * fire after create
     */
    startUp(): void {}
    /**
     * fire when open
     */
    onOpen(): void {}
    /**
     * fire before close
     */
    onClose(): void {}

    @_init
    render() {
        return <></>
    }
}
interface BaseWigetOption {
    esri_map?: MapView
}

export type { BaseWigetOption }
