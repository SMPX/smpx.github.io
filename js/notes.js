window.browserResize = {

    limit: 0,
    prevWidth: 0,

    registerResizeCallback: function (l) {
        this.limit = l;
        window.addEventListener("resize", browserResize.resized);
        if (window.innerWidth > l)
            DotNet.invokeMethodAsync('Notes', 'SetSmall', false);
    },

    resized: function () {
        var currentWidth = window.innerWidth;
        if (currentWidth > browserResize.limit && browserResize.prevWidth <= browserResize.limit) {
            DotNet.invokeMethodAsync('Notes', 'SetSmall', false);
        }
        if (currentWidth < browserResize.limit && browserResize.prevWidth >= browserResize.limit) {
            DotNet.invokeMethodAsync('Notes', 'SetSmall', true);
        }
        browserResize.prevWidth = currentWidth;
    }
}

window.utils = {
    // https://sweetalert.js.org/docs/
    mess: function (Title, Text, Icon, Button) {
        swal({
            title: Title,
            text: Text,
            icon: Icon, // "warning" "error" "success" "info"
            button: Button,
        });
    }
}

window.ck = {

    editor: null,

    CreateEditor: function (id) {
        var element = document.getElementById(id);
        if (element == null)
            return false;

        //Это все что включено в сборку
        //["blockQuote", "bold", "ckfinder", "heading", "imageTextAlternative", "imageStyle:full", "imageStyle:side", "imageUpload", "indent", "outdent", "italic", "link", "numberedList", "bulletedList", "mediaEmbed", "undo", "redo", "insertTable", "tableColumn", "tableRow", "mergeTableCells", "alignment:left", "alignment:right", "alignment:center", "alignment:justify", "alignment", "code", "codeBlock", "fontBackgroundColor", "fontColor", "fontSize", "fontFamily", "highlight:yellowMarker", "highlight:greenMarker", "highlight:pinkMarker", "highlight:blueMarker", "highlight:redPen", "highlight:greenPen", "removeHighlight", "highlight", "horizontalLine", "MathType", "ChemType", "pageBreak", "removeFormat", "specialCharacters", "strikethrough", "subscript", "superscript", "tableCellProperties", "tableProperties", "underline"]
        //console.log(Array.from(editor.ui.componentFactory.names()));

        ClassicEditor.create(document.querySelector('#' + id),
            {
                toolbar:
                {
                    items: [
                        "bold", "italic", "strikethrough", "subscript", "superscript", "underline",
                        "fontBackgroundColor", "fontColor", "fontSize", "fontFamily", "heading",
                        "removeFormat", "blockQuote", "imageStyle:full", "imageStyle:side", "imageUpload",
                        "indent", "outdent", "link", "numberedList", "bulletedList", "mediaEmbed", "specialCharacters", 
                        "undo", "redo",
                        "insertTable", "tableColumn", "tableRow", "mergeTableCells", "tableCellProperties", "tableProperties",
                        "alignment",
                        "code", "codeBlock",
                        "horizontalLine"
                    ],
                    //viewportTopOffset: 30,
                    shouldNotGroupWhenFull: true
                }
            })
            .then(editor => {
                this.editor = editor;
            })
            .catch(error => {
                console.error(error);
            });
        return true;
    },

    GetEditorData: function () {
        return ck.editor.getData();
    },

    SetEditorData: function (data) {
        ck.editor.setData(data);
    }
}