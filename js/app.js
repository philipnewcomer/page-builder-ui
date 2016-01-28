/*** Models ***/

var Row = Backbone.Model.extend({
    defaults: {
        columnLayout: "1",
        columns: [
            {
                width: "full",
                modules: []
            }
        ]
    }
});

var Column = Backbone.Model.extend({
    defaults: {
        width: "full",
        modules: []
    }
});

var Module = Backbone.Model.extend({
    defaults: {
        type: null,
        settings: null
    }
});

/*** Collections ***/

var RowCollection = Backbone.Collection.extend({
    model: Row,
    moveItem: function( fromIndex, toIndex ) {
        this.models.splice( toIndex, 0, this.models.splice( fromIndex, 1 )[0] );
        this.trigger( "move" );
    }
});

var ColumnCollection = Backbone.Collection.extend({
    model: Column
});

var ModuleCollection = Backbone.Collection.extend({
    model: Module,
    moveItem: function( fromIndex, toIndex ) {
        this.models.splice( toIndex, 0, this.models.splice( fromIndex, 1 )[0] );
        this.trigger( "move" );
    }
});

/*** Init ***/
var App = new AppView;
