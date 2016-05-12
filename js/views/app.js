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

        // Initialize jQuery UI Sortable
        this.$(".app__rows").sortable({
            axis: 'y',
            cursor: 'move',
            handle: '.row__header',
            helper: function( event, element ) {
                return $('<div class="row__drag-helper" />');
            },
            placeholder: 'row__drop-placeholder',
            start: this.handleDragStart.bind( this ),
            stop: this.handleDragStop.bind( this )
        });
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
    },

    handleDragStart: function( event, ui ) {
        ui.item.indexStart = ui.item.index();
    },

    handleDragStop: function( event, ui ) {
        this.rows.moveItem( ui.item.indexStart, ui.item.index() );
    }
});
