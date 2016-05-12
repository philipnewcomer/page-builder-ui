var dummyData = {
    rows: [
        {
            columnLayout: "1",
            columns: [
                {
                    width: "full",
                    modules: [
                        {
                            type: "html",
                            settings: {
                                heading_content: "Text/HTML Heading Content",
                                body_content: '<p><img src="http://placehold.it/250x150"></p>'
                            }
                        }
                    ]
                }
            ]
        },
        {
            columnLayout: "1-3|1-3|1-3",
            columns: [
                {
                    width: "one-third",
                    modules: [
                        {
                            type: "heading",
                            settings: {
                                content: "This is a heading!!!"
                            }
                        },
                        {
                            type: "html",
                            settings: {
                                heading_content: "Text/HTML 2 Heading Content with 150x150",
                                body_content: '<p><img src="http://placehold.it/150x150"></p>'
                            }
                        }
                    ]
                },
                {
                    width: "one-third",
                    modules: [
                        {
                            type: "heading",
                            settings: {
                                content: "Another heading"
                            }
                        },
                        {
                            type: "dummy",
                            settings: {
                                item_id: 2
                            }
                        },
                        {
                            type: "heading",
                            settings: {
                                content: "This is another heading."
                            }
                        }
                    ]
                },
                {
                    width: "one-third",
                    modules: []
                }
            ]
        },
        {
            columnLayout: "1-2|1-2",
            columns: [
                {
                    width: "one-half",
                    modules: []
                },
                {
                    width: "one-half",
                    modules: []
                }
            ]
        },
        {
            columnLayout: "1-3|2-3",
            columns: [
                {
                    width: "one-third",
                    modules: []
                },
                {
                    width: "two-thirds",
                    modules: []
                }
            ]
        }
    ]
};

var registeredModules = {
    heading: {
        name: "Heading",
        defaults: {
            content: null
        },
        form: '<p><label>Text<input name="content"></label></p>'
    },
    html: {
        name: "Text/HTML",
        defaults: {
            heading_content: null,
            body_content: "<p></p>",
        },
        form: '<p><label>Heading<input name="heading_content"></label></p><p><label>Content<textarea name="body_content"></textarea></label></p>'
    },
    dummy: {
        name: "Dummy Module",
        defaults: {
            field_input: "Input field default",
            field_textarea: "Textarea field default",
            field_select: 2
        },
        form: '<p><label>Heading<input name="field_input"></label></p>' +
              '<p><label>Content<textarea name="field_textarea"></textarea></label></p>' +
              '<p><label>Select<select name="field_select"><option value="">[None]</option><option value="1">One</option><option value="2">Two</option><option value="3">Three</option></select></label></p>'
    }
};

var registeredRows = {
    "1": {
        name: "Full Width",
        columns: [
            "full"
        ]
    },
    "1-2|1-2": {
        name: "One Half/One Half",
        columns: [
            "one-half",
            "one-half"
        ]
    },
    "1-3|1-3|1-3": {
        name: "One Third/One Third/One Third",
        columns: [
            "one-third",
            "one-third",
            "one-third"
        ]
    },
    "1-3|2-3": {
        name: "One Third/Two Thirds",
        columns: [
            "one-third",
            "two-thirds"
        ]
    },
    "2-3|1-3": {
        name: "Two Thirds/One Third",
        columns: [
            "two-thirds",
            "one-third"
        ]
    }
};
