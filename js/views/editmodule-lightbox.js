var EditModuleLightboxView = Backbone.View.extend({

    el: "#editmodule-lightbox",

    events: {
        "click #editmodule-lightbox-cancel-button": "handleCancel",
        "click #editmodule-lightbox-save-button":   "handleSave"
    },

    handleCancel: function( event ) {
        event.preventDefault();

        if ( this.deleteOnCancel ) {
            this.model.destroy();
        }

        this.$el.removeClass("-visible");
    },

    handleSave: function( event ) {
        event.preventDefault();

        var newSettings = {};

        for ( var setting in this.settings ) {
            newSettings[ setting ] = this.$('[name="' + setting + '"]').val();
        }

        this.model.set( "settings", newSettings );

        this.$el.removeClass("-visible");
    },

    open: function( model, deleteOnCancel ) {

        var template = registeredModules[ model.get("type") ];
        var settings = _.defaults( model.get("settings"), template.defaults );

        this.model = model;
        this.settings = settings;
        this.deleteOnCancel = deleteOnCancel || false;

        this.$el.addClass("-visible");

        this.$(".lightbox__header_title").text( template.name );
        this.$(".lightbox__body").html( template.form );

        for ( var setting in settings ) {
            this.$('[name="' + setting + '"]').val( settings[ setting ] );
        }
    }
});
