import Widget from '@arcgis/core/widgets/Widget'
import { subclass, property } from '@arcgis/core/core/accessorSupport/decorators'
import { watchUtils } from './library'

@subclass('esri.widgets.widget')
class CustomWidget extends Widget {
    // Create 'name' property
    @property()
    name: string = 'John Smith'

    constructor(params?: any) {
        super(params)
        this._onNameUpdate = this._onNameUpdate.bind(this)
    }

    // Create private _onNameUpdate method
    private _onNameUpdate(): string {
        return `${this.name}`
    }
    postInitialize() {
        const handle = watchUtils.init(this, 'name', this._onNameUpdate)

        // Helper used for cleaning up resources once the widget is destroyed
        this.own(handle)
    }
    render() {
        return <div> {this._onNameUpdate()}</div>
    }
}
export default CustomWidget
