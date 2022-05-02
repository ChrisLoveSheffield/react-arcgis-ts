import { Component } from 'react'
import './Viewer.css'
// https://codepen.io/jaimerosales/pen/WZdzmN?editors=1010
class Viewer extends Component {
    embedURLfromA360: string
    viewer?: Autodesk.Viewing.GuiViewer3D

    constructor(props: any) {
        // Note: in strict mode this will be called twice
        // https://stackoverflow.com/questions/55119377/react-js-constructor-called-twice
        super(props)
        this.embedURLfromA360 =
            // 'https://myhub.autodesk360.com/ue2970ee2/shares/public/SH919a0QTf3c32634dcf7d90e49034aabd19?mode=embed' // Revit file
            // 'https://autodesk3743.autodesk360.com/shares/public/SHabee1QT1a327cf2b7a174096650e4352bf?mode=embed'
            'https://myhub.autodesk360.com/ue29c89b7/shares/public/SH7f1edQT22b515c761e81af7c91890bcea5?mode=embed' // Revit file (A360/Forge/Napa.rvt)
    }

    render() {
        return <div className="Viewer" id="MyViewerDiv" />
    }

    public componentDidMount() {
        if (!window.Autodesk) {
            this.loadCss('https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/style.min.css')

            this.loadScript(
                'https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/viewer3D.min.js'
            ).onload = () => {
                this.onScriptLoaded()
            }
        }
    }

    public loadCss(src: string): HTMLLinkElement {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = src
        link.type = 'text/css'
        document.head.appendChild(link)
        return link
    }

    private loadScript(src: string): HTMLScriptElement {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = src
        script.async = true
        script.defer = true
        document.body.appendChild(script)
        return script
    }

    private onScriptLoaded() {
        let that: any = this
        this.getURN(function (urn: string) {
            var options = {
                env: 'AutodeskProduction',
                getAccessToken: that.getForgeToken.bind(that),
            }
            var documentId: string = 'urn:' + urn
            Autodesk.Viewing.Initializer(options, function onInitialized() {
                Autodesk.Viewing.Document.load(
                    documentId,
                    that.onDocumentLoadSuccess.bind(that),
                    that.onDocumentLoadError
                )
            })
        })
    }

    getURN(onURNCallback: any) {
        $.get({
            url: this.embedURLfromA360.replace('public', 'metadata').replace('mode=embed', ''),
            dataType: 'json',
            success: function (metadata) {
                if (onURNCallback) {
                    let urn = btoa(metadata.success.body.urn).replace('/', '_').replace('=', '')
                    onURNCallback(urn)
                }
            },
        })
    }

    getForgeToken(onTokenCallback: any) {
        $.post({
            url: this.embedURLfromA360.replace('public', 'sign').replace('mode=embed', 'oauth2=true'),
            data: '{}',
            success: function (oauth) {
                if (onTokenCallback) onTokenCallback(oauth.accessToken, oauth.validitySeconds)
            },
        })
    }

    async onDocumentLoadSuccess(doc: Autodesk.Viewing.Document) {
        // A document contains references to 3D and 2D viewables.
        var items = doc.getRoot().search({
            type: 'view', //'view',
            role: '3d',
        })
        if (items.length === 0) {
            console.error('Document contains no viewables.')
            return
        }

        var viewerDiv: any = document.getElementById('MyViewerDiv')
        this.viewer = new Autodesk.Viewing.GuiViewer3D(viewerDiv)
        this.viewer.start()

        // loading it dynamically
        const { MyExtension } = await import('./MyExtension')
        MyExtension.register()
        this.viewer.loadExtension('MyExtension')

        // loading builder three add custom stuff
        // await this.viewer.loadExtension('Autodesk.Viewing.SceneBuilder')
        // let ext: any = this.viewer.getExtension('Autodesk.Viewing.SceneBuilder')
        // let modelBuilder = await ext.addNewModel({
        //     conserveMemory: false,
        //     modelNameOverride: 'My Model Name',
        // })
        // let purple = new THREE.MeshPhongMaterial({
        //     color: 0xffffff,
        // })
        // modelBuilder.addMaterial('purple', purple)
        // let box = new THREE.BufferGeometry().fromGeometry(new THREE.BoxGeometry(10, 10, 10))
        // let id = modelBuilder.addGeometry(box)
        // const transform = new THREE.Matrix4().compose(
        //     new THREE.Vector3(-15, 0, 0),
        //     new THREE.Quaternion(0, 0, 0, 1),
        //     new THREE.Vector3(1, 1, 1)
        // )
        // modelBuilder.addFragment(1, 'purple', transform)

        ///

        this.viewer.loadDocumentNode(doc, items[0], { keepCurrentModels: true })

        // var options2 = {}
        // let that: any = this
        // this.viewer.loadDocumentNode(doc, items[1], options2).then(function (model1: Autodesk.Viewing.Model) {
        //     var options1: any = {}
        //     options1.keepCurrentModels = true

        //     that.viewer.loadDocumentNode(doc, items[0], options1).then(function (model2: Autodesk.Viewing.Model) {
        //         let extensionConfig: any = {}
        //         extensionConfig['mimeType'] = 'application/vnd.autodesk.revit'
        //         extensionConfig['primaryModels'] = [model1]
        //         extensionConfig['diffModels'] = [model2]
        //         extensionConfig['diffMode'] = 'overlay'
        //         extensionConfig['versionA'] = '2'
        //         extensionConfig['versionB'] = '1'

        //         that.viewer
        //             .loadExtension('Autodesk.DiffTool', extensionConfig)
        //             .then((res: any) => {
        //                 console.log(res)
        //             })
        //             .catch(function (err: any) {
        //                 console.log(err)
        //             })
        //     })
        // })
    }

    onDocumentLoadError(errorCode: Autodesk.Viewing.ErrorCodes) {}
}

export default Viewer
