import { Component } from 'react'
import './Viewer.css'
import '../dashboard/dashboard.css'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)
Chart.defaults.plugins.legend.display = false

// https://codepen.io/jaimerosales/pen/WZdzmN?editors=1010
class Viewer extends Component {
    embedURLfromA360: string
    viewer?: Autodesk.Viewing.GuiViewer3D
    _modelData: any = {
        hasProperty(propertyName: string) {
            return this[propertyName] !== undefined
        },
        getLabels(propertyName: string): string[] {
            return Object.keys(this[propertyName])
        },

        getCountInstances(propertyName: string) {
            return Object.keys(this[propertyName]).map((key) => this[propertyName][key].length)
        },

        getIds(propertyName: string, propertyValue: string) {
            return this[propertyName][propertyValue]
        },
    }
    chart?: Chart

    state: {
        viewer: string
        dashboardPanel: string
    }

    constructor(props: any) {
        // Note: in strict mode this will be called twice
        // https://stackoverflow.com/questions/55119377/react-js-constructor-called-twice
        super(props)
        this.state = {
            viewer: '100%',
            dashboardPanel: '0%',
        }

        this.embedURLfromA360 =
            // 'https://myhub.autodesk360.com/ue2970ee2/shares/public/SH919a0QTf3c32634dcf7d90e49034aabd19?mode=embed' // Revit file
            // 'https://autodesk3743.autodesk360.com/shares/public/SHabee1QT1a327cf2b7a174096650e4352bf?mode=embed'
            'https://myhub.autodesk360.com/ue29c89b7/shares/public/SH7f1edQT22b515c761e81af7c91890bcea5?mode=embed' // Revit file (A360/Forge/Napa.rvt)
    }

    render() {
        return (
            <>
                <div className="Viewer transition-width" style={{ width: this.state.viewer }} id="MyViewerDiv" />
                <div id="dashboardPanel" style={{ width: this.state.dashboardPanel }} className="transition-width">
                    <canvas id="piechart"></canvas>
                </div>
            </>
        )
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
        fetch(this.embedURLfromA360.replace('public', 'metadata').replace('mode=embed', ''))
            .then((e) => e.json())
            .then((metadata) => {
                if (onURNCallback) {
                    let urn = btoa(metadata.success.body.urn).replace('/', '_').replace('=', '')
                    onURNCallback(urn)
                }
            })

        // $.get({
        //     url: this.embedURLfromA360.replace('public', 'metadata').replace('mode=embed', ''),
        //     dataType: 'json',
        //     success: function (metadata) {
        //         if (onURNCallback) {
        //             let urn = btoa(metadata.success.body.urn).replace('/', '_').replace('=', '')
        //             onURNCallback(urn)
        //             console.log(urn)
        //         }
        //     },
        // })
    }

    getForgeToken(onTokenCallback: any) {
        fetch(this.embedURLfromA360.replace('public', 'sign').replace('mode=embed', 'oauth2=true'), {
            method: 'post',
            body: '{}',
        })
            .then((e) => e.json())
            .then((oauth) => {
                // console.log(oauth)
                if (onTokenCallback) onTokenCallback(oauth.accessToken, oauth.validitySeconds)
            })
        // $.post({
        //     url: this.embedURLfromA360.replace('public', 'sign').replace('mode=embed', 'oauth2=true'),
        //     data: '{}',
        //     success: function (oauth) {
        //         console.log(oauth)
        //         if (onTokenCallback) onTokenCallback(oauth.accessToken, oauth.validitySeconds)
        //     },
        // })
    }

    async onDocumentLoadSuccess(doc: Autodesk.Viewing.Document) {
        // A document contains references to 3D and 2D viewables.
        var items = doc.getRoot().search({
            type: 'geometry', //'view', //'view',
            role: '3d',
        })
        if (items.length === 0) {
            console.error('Document contains no viewables.')
            return
        }

        var viewerDiv: any = document.querySelector('#MyViewerDiv')
        this.viewer = new Autodesk.Viewing.GuiViewer3D(viewerDiv, { theme: 'light-theme' })
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
        // var defaultModel = viewerDocument.getRoot().getDefaultGeometry();
        await this.viewer.loadDocumentNode(doc, items[0], { keepCurrentModels: true })
        this.initalizeModelData(() => this.drawChart())
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

    initalizeModelData(callback?: Function) {
        this.viewer?.getObjectTree((tree) => {
            var leaves: any[] = []
            tree.enumNodeChildren(
                tree.getRootId(),
                function (dbId) {
                    if (tree.getChildCount(dbId) === 0) {
                        leaves.push(dbId)
                    }
                },
                true
            )
            let count = leaves.length
            leaves.forEach((dbId) => {
                this.viewer?.getProperties(dbId, (props) => {
                    props.properties.forEach((prop) => {
                        try {
                            if (!prop.displayValue.length) return // let's not categorize properties that store numbers

                            // some adjustments for revit:
                            if (prop.displayValue.includes('Revit')) {
                                prop.displayValue = prop.displayValue.replace('Revit ', '') // remove this Revit prefix
                                if (prop.displayValue.indexOf('<') === 0) return // skip categories that start with <

                                // ok, now let's organize the data into this hash table
                                if (!this._modelData[prop.displayName] || this._modelData[prop.displayName] === null)
                                    this._modelData[prop.displayName] = {}

                                if (
                                    !this._modelData[prop.displayName][prop.displayValue] ||
                                    this._modelData[prop.displayName][prop.displayValue] === null
                                )
                                    this._modelData[prop.displayName][prop.displayValue] = []

                                this._modelData[prop.displayName][prop.displayValue].push(dbId)
                            }
                        } catch (error) {
                            console.log(error)
                        }
                    })

                    if (--count === 0 && callback) callback()
                })
            })
        })
    }
    generateColors(count: number) {
        var background = []
        var borders = []
        for (var i = 0; i < count; i++) {
            var r = Math.round(Math.random() * 255)
            var g = Math.round(Math.random() * 255)
            var b = Math.round(Math.random() * 255)
            background.push('rgba(' + r + ', ' + g + ', ' + b + ', 0.2)')
            borders.push('rgba(' + r + ', ' + g + ', ' + b + ', 0.2)')
        }
        return { background: background, borders: borders }
    }

    drawChart() {
        let temp: any = document.querySelector('#piechart')
        let ctx: any
        if (temp.getContext) {
            ctx = temp.getContext('2d')
        }

        var colors = this.generateColors(this._modelData.getLabels('Category').length)

        this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this._modelData.getLabels('Category'),
                datasets: [
                    {
                        data: this._modelData.getCountInstances('Category'),
                        backgroundColor: colors.background,
                        borderColor: colors.borders,
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                layout: {
                    padding: 20,
                },
                scales: {
                    y: { beginAtZero: true },
                },
                // legend: {
                //     display: false,
                // },
                onClick: (evt: any, item: any) => {
                    if (this.chart) {
                        this.viewer?.isolate(
                            this._modelData.getIds('Category', this.chart.data.labels?.[item[0].index])
                        )
                    }
                },
            },
        })
        this.setState({ viewer: '65%', dashboardPanel: '35%' })
    }
}

export default Viewer
