var RowView = Backbone.View.extend({

    className: "row",

    template: _.template( $("#template-row").html() ),

    initialize: function() {

        // Current model listeners
        this.listenTo( this.model, "change",  this.render );
        this.listenTo( this.model, "destroy", this.remove );

        // Init child collection
        this.columns = new ColumnCollection({ model: Column });

        // Init child collection listeners
        this.listenTo( this.columns, "add",  this.renderNewColumn );
        this.listenTo( this.columns, "move", this.render );

        this.listenTo( this.columns, "change", this.saveColumns );
        this.listenTo( this.columns, "update", this.saveColumns );

        // Insert initial child collection data
        this.columns.reset( this.model.get("columns") );
    },

    saveColumns: function() {
        var columns = [];
        this.columns.each( function( column ) {
            columns.push( column.toJSON() );
        });
        this.model.set( "columns", columns );
    },

    render: function() {
        var templateVars = this.model.toJSON();
        templateVars.registeredRows = registeredRows;
        this.$el.html( this.template( templateVars ) );
        this.columns.each( this.renderNewColumn, this );
        return this;
    },

    renderNewColumn: function( column, collection, options ) {
        var columnView = new ColumnView({ model: column });
        var columnViewHTML = columnView.render().el;

        if ( undefined != options.at && this.columns.length > 1 ) {
            this.$(".row__columns > .column:nth-child(" + ( options.at + 1 )  + ")").before( columnViewHTML );
        } else {
            this.$(".row__columns").append(columnViewHTML);
        }
    },

    // Events

    events: {
        "click .button.row_delete":       "handleRowDelete",
        "click .button.row_edit-columns": "handleEditColumns",

        "dragstart .row__header":     "handleDragStart",
        "dragend   .row__header":     "handleDragEnd",
        "dragover  .row__droptarget": "handleDragOver",
        "drop      .row__droptarget": "handleDrop"
    },

    handleRowDelete: function( event ) {
        event.preventDefault();
        this.model.destroy();
    },

    handleEditColumns: function( event ) {
        event.preventDefault();
        App.editColumnsLightbox.open( this );
    },

    // Drag and Drop Events

    handleDragStart: function( event ) {
        event.stopPropagation();

        this.$el.addClass("-dragging");

        App.currentDnD.type = "row";
        App.currentDnD.view = this;
    },

    handleDragEnd: function( event ) {
        event.stopPropagation();

        this.$el.removeClass("-dragging");
    },

    handleDragOver: function( event ) {
        event.stopPropagation();

        if ( "row" !== App.currentDnD.type ) {
            return;
        }

        if ( this.$el.hasClass("-dragging") || this.$el.prev().hasClass("-dragging") ) {
            return;
        }

        event.preventDefault();
    },

    handleDrop: function( event ) {
        event.stopPropagation();

        var oldIndex = App.currentDnD.view.$el.index();
        var newIndex = this.$el.index();

        if ( oldIndex < newIndex ) newIndex--;
        this.model.collection.moveItem( oldIndex, newIndex );
    },

    // Utility

    updateColumnLayout: function( newLayout ) {

        var newColumns = registeredRows[ newLayout ].columns;

        // Loop over the new layout's columns, updating the column width, or creating new columns.
        _.each( newColumns, function( columnWidth, i ) {

            if ( this.columns.at( i ) ) {
                this.columns.at( i ).set( "width", columnWidth );
            } else {
                this.columns.add({
                    width: columnWidth
                });
            }
        }, this );

        // If the new layout has fewer columns than before, delete the leftover old columns.
        var modelsToRemove = [];
        for ( var removeIndex = newColumns.length; removeIndex < this.columns.length; removeIndex++ ) {
            modelsToRemove.push( this.columns.at( removeIndex ) );
        }
        modelsToRemove.forEach( function( model ) {
            model.destroy();
        });

        // Update the model.
        this.model.set( "columnLayout", newLayout );
    }
});
