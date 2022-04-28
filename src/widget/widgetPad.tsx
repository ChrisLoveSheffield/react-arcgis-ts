import { CalciteAction, CalciteShellPanel, CalciteShell, CalciteIcon } from '@esri/calcite-components-react'
import { useState } from 'react'
import Draggable from 'react-draggable'

import { BaseWigetOption } from './BaseWidget'
import EditorDiv from './Editor/Editor'
import BasemapDiv from './Basemap/Basemap'
import LegendDiv from './Legend/LegendDIv'

import './css/draggable.css'
import { Toast } from 'react-bootstrap'
interface WigetState {
    basemap: boolean
    editor: boolean
    legend: boolean
}

let defaultState: WigetState = { editor: true, basemap: true, legend: true }
interface BaseWigetProps {
    text: string
    icon: string
    actionId: keyof WigetState
    onClick?: React.MouseEvent<HTMLCalciteActionElement, MouseEvent>
    content: React.FC<BaseWigetOption> | string
}

const wigets: BaseWigetProps[] = [
    {
        text: 'Editor',
        icon: 'layers-editable',
        actionId: 'editor',
        content: EditorDiv,
    },
    {
        text: 'Basemap Gallery',
        actionId: 'basemap',
        icon: 'basemap',
        content: BasemapDiv,
    },
    {
        text: 'Legend',
        actionId: 'legend',
        icon: 'legend',
        content: LegendDiv,
    },
]
// interface widgetManger {
//     wgtState: WigetState
//     setWigetState: (e: React.MouseEvent<HTMLCalciteActionElement, MouseEvent>) => void
// }

function useWidgetManager(state: WigetState) {
    const [wgtState, wgtSetState] = useState(state)
    return {
        wgtState,
        setWigetState: function (e: React.MouseEvent<Element, MouseEvent>, actionId: keyof WigetState) {
            wgtSetState((prev) => {
                let newState = { ...prev } as WigetState

                newState[actionId] = !newState[actionId]
                console.log(newState)
                return newState
            })
        },
    }
}

/**
 * Customize widget base on user type
 * post server check permission
 * @param param0
 * @param param1
 * @returns
 */

const WidgetPad: React.FC<BaseWigetOption> = ({ esri_map }) => {
    const { wgtState, setWigetState } = useWidgetManager(defaultState)
    return (
        <>
            <CalciteShell>
                <CalciteShellPanel id="widgetBar" slot="primary-panel" position="end" detached>
                    {
                        // eslint-disable-next-line array-callback-return
                        wigets.map((wgt) => (
                            <CalciteAction
                                key={'_' + wgt.text}
                                text={wgt.text}
                                icon={wgt.icon}
                                data-widget-id={wgt.actionId}
                                onClick={(e) => setWigetState(e, wgt.actionId)}
                            ></CalciteAction>
                        ))
                    }
                </CalciteShellPanel>
            </CalciteShell>
            <div>
                {
                    // eslint-disable-next-line array-callback-return
                    wigets.map((wgt, i) => (
                        <Draggable
                            key={'_' + wgt.text}
                            handle="strong"
                            bounds="body"
                            defaultPosition={{ x: 60, y: 15 + 48 * i }}
                        >
                            <div className="no-cursor widgetDialog">
                                <Toast
                                    hidden={wgtState[wgt.actionId]}
                                    key={'_' + wgt.text}
                                    animation
                                    onClose={(e) => {
                                        if (e) {
                                            return setWigetState(
                                                e as React.MouseEvent<Element, MouseEvent>,
                                                wgt.actionId
                                            )
                                        }
                                    }}
                                >
                                    <Toast.Header>
                                        <strong className="cursor widgetHeader">
                                            <CalciteIcon
                                                className="widgetHeaderIcon"
                                                scale="m"
                                                icon={wgt.icon}
                                            ></CalciteIcon>
                                            <strong className="me-auto widgetHeaderText">{wgt.text}</strong>
                                        </strong>
                                    </Toast.Header>
                                    <Toast.Body>
                                        <div className="WidgetPanel">
                                            <wgt.content esri_map={esri_map} />
                                        </div>
                                    </Toast.Body>
                                </Toast>
                            </div>
                        </Draggable>
                    ))
                }
            </div>
        </>
    )
}

export default WidgetPad
