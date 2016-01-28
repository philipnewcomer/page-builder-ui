var EditColumnsLightboxView = Backbone.View.extend({

    el: "#editcolumns-lightbox",

    events: {
        "click .column-list a":                      "handleColumnsSelect",
        "click #editcolumns-lightbox-cancel-button": "handleCancel"
    },

    handleCancel: function( event ) {
        event.preventDefault();
        this.$el.removeClass("-visible");
    },

    handleColumnsSelect: function( event ) {
        event.preventDefault();

        var columnType = $(event.currentTarget).data("column-type");
        this.rowView.updateColumnLayout( columnType );

        this.$el.removeClass("-visible");
    },

    open: function( rowView ) {
        this.$el.addClass("-visible");

        this.rowView = rowView;

        this.$(".column-list").empty();
        for ( var row in registeredRows ) {
            var currentItemHTML = '<li><a href="#" data-column-type="' + row + '">' + registeredRows[ row ].name + '</a></li>';
            this.$(".column-list").append( currentItemHTML );
        }
    }
});
