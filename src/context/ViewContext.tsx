import { createContext } from 'react'
import { MapView, Widget } from '../widget/library'
interface WidgetManager {
    view?: MapView
    widgets?: Array<Widget>
}
export const ViewContext = createContext<WidgetManager>({})
