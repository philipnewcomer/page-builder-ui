var AppView = Backbone.View.extend({

    el: $("#app"),

    initialize: function() {

        // Init child collection
        this.rows = new RowCollection({ model: Row });

        // Init child collection listeners
        this.listenTo( this.rows, "add",  this.renderNewRow );
        this.listenTo( this.rows, "move", this.renderAllRows );

        // Insert initial child collection data
        this.rows.reset( dummyData.rows );

        // Render rows
        this.renderAllRows();

        // Initialize lightboxes
        this.addModuleLightbox   = new AddModuleLightboxView;
        this.editModuleLightbox  = new EditModuleLightboxView;
        this.editColumnsLightbox = new EditColumnsLightboxView;
    },

    serialize: function() {
        var serialized = {};
        serialized.rows = [];
        this.rows.each( function( row ) {
            serialized.rows.push( row.toJSON() );
        });
        return serialized;
    },

    renderNewRow: function( row ) {
        var rowView = new RowView({ model: row });
        this.$(".app__rows").append( rowView.render().el );
    },

    renderAllRows: function() {
        this.$(".app__rows").empty();
        this.rows.each( this.renderNewRow, this );
    },

    // View Events

    events: {
        "click .button.row_add": "handleRowAdd"
    },

    handleRowAdd: function( event ) {
        event.preventDefault();
        this.rows.add({});
    }
});
