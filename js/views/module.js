var ModuleTeaserView = Backbone.View.extend({

    className: "module-teaser",

    template: _.template( $("#template-module_teaser").html() ),

    initialize: function() {

        // Current model listeners
        this.listenTo( this.model, "change",  this.render );
        this.listenTo( this.model, "destroy", this.remove );
    },

    render: function() {
        var templateVars = this.model.toJSON();
        templateVars.moduleTemplate = registeredModules[ templateVars.type ];
        templateVars.settings = _.defaults( templateVars.settings, templateVars.moduleTemplate.defaults );
        this.$el.html( this.template( templateVars ) );
        return this;
    },

    // Events

    events: {
        "click .button.module-teaser_edit":   "handleModuleEdit",
        "click .button.module-teaser_delete": "handleModuleDelete"
    },

    handleModuleEdit: function( event ) {
        event.preventDefault();

        App.editModuleLightbox.open( this.model );
    },

    handleModuleDelete: function( event ) {
        event.preventDefault();
        this.model.destroy();
    }
});
