import { CalciteActionBar, CalciteAction, CalcitePanel } from '@esri/calcite-components-react'
import { useState } from 'react'
import { BaseWigetOption } from './BaseWidget'
import EditorDiv from './Editor/Editor'
import BasemapDiv from './Basemap/Basemap'
import LegendDiv from './Legend/LegendDIv'

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
interface widgetManger {
    wgtState: WigetState
    setWigetState: (e: React.MouseEvent<HTMLCalciteActionElement, MouseEvent>) => void
}

const useWidgetManager = (state: WigetState) => {
    const [wgtState, wgtSetState] = useState(state)
    return {
        wgtState,
        setWigetState: (e: React.MouseEvent<HTMLCalciteActionElement, MouseEvent>) => {
            const target = e.target as HTMLCalciteActionElement
            const targetWgt = target.dataset.actionId as keyof WigetState

            wgtSetState((prev) => {
                let newState = { ...prev } as WigetState
                let p: keyof WigetState
                for (p in newState) {
                    if (p === targetWgt && newState[targetWgt]) {
                        newState[targetWgt] = false
                    } else newState[p] = true
                }

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
const wigetfactory = ({ wgtState, setWigetState }: widgetManger, { esri_map }: BaseWigetOption) => {
    return (
        <>
            <CalciteActionBar id="widgetBar" expand-disabled>
                <>
                    {
                        // eslint-disable-next-line array-callback-return
                        wigets.map((wgt) => (
                            <CalciteAction
                                key={wgt.text}
                                text={wgt.text}
                                icon={wgt.icon}
                                data-action-id={wgt.actionId}
                                onClick={(e) => setWigetState(e)}
                            ></CalciteAction>
                        ))
                    }
                </>
            </CalciteActionBar>
            <>
                {
                    // eslint-disable-next-line array-callback-return
                    wigets.map((wgt) => (
                        <CalcitePanel
                            className="WidgetPanel"
                            key={wgt.text}
                            heading={wgt.text}
                            data-panel-id={wgt.actionId}
                            hidden={wgtState[wgt.actionId]}
                        >
                            {/* <CalciteAction
                                icon="x"
                                text="close"
                                slot="header-menu-actions"
                                onClick={(e) => setWigetState(e)}
                            ></CalciteAction>
                            <CalciteAction icon="minus" text="min" slot="header-menu-actions"></CalciteAction> */}
                            <wgt.content esri_map={esri_map} />
                        </CalcitePanel>
                    ))
                }
            </>
        </>
    )
}

const WidgetPad: React.FC<BaseWigetOption> = ({ esri_map }) => {
    const { wgtState, setWigetState } = useWidgetManager(defaultState)
    return wigetfactory({ wgtState, setWigetState }, { esri_map })
}

export default WidgetPad
