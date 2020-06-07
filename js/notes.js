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
    // https://sweetalert2.github.io/
    mess: function (Title, Text, Icon, Button) {
        Swal.fire({
            title: Title,
            text: Text,
            icon: Icon, // "warning" "error" "success" "info"
            button: Button,
        });
    }
}

window.ck = {

    editor: null,

    CreateEditor: function (id, value) {
        var element = document.getElementById(id);
        if (element == null)
            return false;

        if (this.editor != undefined) {
            this.editor.destroy();
        }

        ClassicEditor.create(document.querySelector('#' + id),
            {
                toolbar:
                {
                    items: [
                        "removeFormat",
                        "bold",
                        "italic",
                        "strikethrough",
                        "subscript",
                        "superscript",
                        "underline",
                        "fontBackgroundColor",
                        "fontColor",
                        "fontFamily",
                        "fontSize",
                        "heading",
                        "alignment",
                        "undo",
                        "redo",
                        "blockQuote",
                        "imageTextAlternative",
                        "imageStyle:full",
                        "imageStyle:side",
                        "imageUpload",
                        "indent",
                        "outdent",
                        "link",
                        "numberedList",
                        "bulletedList",
                        "mediaEmbed",
                        "insertTable",
                        "tableColumn",
                        "tableRow",
                        "mergeTableCells",
                        "tableCellProperties",
                        "tableProperties",
                        "selectAll",
                        "horizontalLine",
                        "code",
                        "codeBlock"
                    ],
                    viewportTopOffset: 30,
                    shouldNotGroupWhenFull: true
                }
            })
            .then(editor => {
                this.editor = editor;
            })
            .catch(error => {
                console.error(error);
            });
    },

    GetEditorData: function () {
        let content = ck.editor.getData();
        console.log(content.length)
        if (content.length > 1310000)
            return "@#@";
        return content;
    },

    SetEditorData: function (data) {
        ck.editor.setData(data);
    }
}