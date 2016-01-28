var AddModuleLightboxView = Backbone.View.extend({

    el: "#addmodule-lightbox",

    events: {
        "click .module-list a":                    "handleModuleSelect",
        "click #addmodule-lightbox-cancel-button": "handleCancel"
    },

    handleCancel: function( event ) {
        event.preventDefault();
        this.$el.removeClass("-visible");
    },

    handleModuleSelect: function( event ) {
        event.preventDefault();

        var moduleType = $(event.currentTarget).data("module-type");

        var newModule = this.collection.add({
            type: moduleType,
            settings: registeredModules[ moduleType ].defaults
        });

        this.$el.removeClass("-visible");

        App.editModuleLightbox.open( newModule, true );
    },

    open: function( collection ) {
        this.$el.addClass("-visible");

        this.collection = collection;

        this.$(".module-list").empty();
        for ( var module in registeredModules ) {
            var currentItemHTML = '<li><a href="#" data-module-type="' + module + '">' + registeredModules[ module ].name + '</a></li>';
            this.$(".module-list").append( currentItemHTML );
        }
    }
});
