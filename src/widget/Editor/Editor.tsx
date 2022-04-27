import { useEffect, useRef } from 'react'
import { BaseWigetOption } from '../BaseWidget'
import { Editor } from '../library'

interface EditorProps extends BaseWigetOption {}
const EditorDiv: React.FC<EditorProps> = ({ esri_map }) => {
    const editorDiv = useRef(null)
    let editor: Editor | undefined
    function initialize() {
        if (esri_map && !editor) {
            editor = new Editor({
                view: esri_map,
                container: editorDiv.current ?? undefined,
            })
            // window.esri_map.ui.add(editor, 'top-right')
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => initialize(), [esri_map])
    return (
        <>
            <div id="Editor" ref={editorDiv}></div>
        </>
    )
}
export default EditorDiv
