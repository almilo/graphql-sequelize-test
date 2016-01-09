export default function ($filter, graphqlService) {
    const jsonFilter = $filter('json');

    this.query = `
query person($personId: Int!) {
  people(id: $personId) {
    firstName
    lastName
  }
}`;
    this.variables = `
{
  "personId": 3
}
    `;
    this.result = undefined;
    this.queryEditorOptions = initializeEditorOptions('graphql', this, true);
    this.variablesEditorOptions = initializeEditorOptions('application/json', this, false);

    graphqlService.getClientSchema().then(clientSchema => {
        this.queryEditorOptions.lint = {schema: clientSchema};
        this.queryEditorOptions.hintOptions.schema = clientSchema;
    });

    this.queryEditorLoaded = editor => this.queryEditor = editor;
    this.variablesEditorLoaded = editor => this.variablesEditor = editor;

    this.sendQuery = function () {
        graphqlService.executeQuery(this.query, this.variables && JSON.parse(this.variables))
            .then(data => this.result = jsonFilter(data))
            .catch(errors => this.result = jsonFilter(errors));
    };

    function initializeEditorOptions(mode, controller, isQueryEditor) {
        return {
            mode,
            lint: true,
            hintOptions: {
                closeOnUnfocus: false,
                completeSingle: false
            },
            lineNumbers: true,
            lineWrapping: true,
            tabSize: 2,
            autoCloseBrackets: true,
            matchBrackets: true,
            showCursorWhenSelecting: true,
            foldGutter: {
                minFoldSize: 4
            },
            gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
            extraKeys: {
                'Cmd-Space': showHint,
                'Ctrl-Space': showHint,
                'Cmd-Enter': sendQuery,
                'Ctrl-Enter': sendQuery,
                'Ctrl-Left': 'goSubwordLeft',
                'Ctrl-Right': 'goSubwordRight',
                'Alt-Left': 'goGroupLeft',
                'Alt-Right': 'goGroupRight'
            }
        };

        function showHint() {
            const editor = isQueryEditor ? controller.queryEditor : controller.variablesEditor;

            editor.showHint({completeSingle: true});
        }

        function sendQuery() {
            controller.sendQuery();
        }
    }
}
