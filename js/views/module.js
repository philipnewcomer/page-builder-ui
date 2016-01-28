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
        "click .button.module-teaser_delete": "handleModuleDelete",

        "dragstart .module-teaser__main":       "handleDragStart",
        "dragend   .module-teaser__main":       "handleDragEnd",
        "dragover  .module-teaser__droptarget": "handleDragOver",
        "drop      .module-teaser__droptarget": "handleDrop"
    },

    handleModuleEdit: function( event ) {
        event.preventDefault();

        App.editModuleLightbox.open( this.model );
    },

    handleModuleDelete: function( event ) {
        event.preventDefault();
        this.model.destroy();
    },

    // Drag and Drop Events

    handleDragStart: function( event ) {
        event.stopPropagation();

        this.$el.addClass("-dragging");

        App.currentDnD.type = "module";
        App.currentDnD.view = this;
    },

    handleDragEnd: function( event ) {
        event.stopPropagation();

        this.$el.removeClass("-dragging");
    },

    handleDragOver: function( event ) {
        event.stopPropagation();

        if ( "module" !== App.currentDnD.type ) {
            return;
        }

        if ( this.$el.hasClass("-dragging") || this.$el.prev().hasClass("-dragging") ) {
            return;
        }

        event.preventDefault();
    },

    handleDrop: function( event ) {
        event.stopPropagation();

        var draggedModel = App.currentDnD.view.model;
        var oldIndex     = App.currentDnD.view.$el.index();
        var newIndex     = this.$el.index();

        if ( this.model.collection.contains( draggedModel ) ) {
            if ( oldIndex < newIndex ) newIndex--;
            this.model.collection.moveItem( oldIndex, newIndex );
        } else {
            this.model.collection.add( draggedModel.toJSON(), { at: newIndex } );
            draggedModel.destroy();
        }
    }
});
