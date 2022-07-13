import React from 'react'
import { MapView, Widget } from './library'
const init = (target: BaseWidgeInterface, propertyKey: string) => {
    target.postCreate()
}

abstract class BaseWidgeInterface extends Widget {
    _state: 'postCreate' | 'startUp' | 'onOpen' | 'onClose' = 'postCreate'
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
}
interface BaseWigetOption {
    esri_map?: MapView
}

export type { BaseWigetOption }
