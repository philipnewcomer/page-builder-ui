var ColumnView = Backbone.View.extend({

    className: "column",

    template: _.template( $("#template-column").html() ),

    initialize: function() {

        // Current model listeners
        this.listenTo( this.model, "change",  this.render );
        this.listenTo( this.model, "destroy", this.remove );

        // Init child collection
        this.modules = new ModuleCollection({ model: Module });

        // Init child collection listeners
        this.listenTo( this.modules, "add",  this.renderNewModule );
        this.listenTo( this.modules, "move", this.render );

        this.listenTo( this.modules, "change", this.saveModules );
        this.listenTo( this.modules, "move",   this.saveModules );
        this.listenTo( this.modules, "update", this.saveModules );

        // Insert initial child collection data
        this.modules.reset( this.model.get( "modules" ) );
    },

    saveModules: function() {
        var modules = [];
        this.modules.each( function( module ) {
            modules.push( module.toJSON() );
        });
        this.model.set( "modules", modules );
    },

    render: function() {
        this.$el.html( this.template( this.model.toJSON() ) );
        this.$el.removeClass().addClass("column").addClass( "-" + this.model.get("width") );
        this.modules.each( this.renderNewModule, this );
        return this;
    },

    renderNewModule: function( module, collection, options ) {
        var moduleView = new ModuleTeaserView({ model: module });
        var moduleViewHTML = moduleView.render().el;
        if ( undefined != options.at && this.modules.length > 1 ) {
            this.$(".column__module-teasers > .module-teaser:nth-child(" + ( options.at + 1 )  + ")").before( moduleViewHTML );
        } else {
            this.$(".column__module-teasers").append(moduleViewHTML);
        }
    },

    // View Events

    events: {
        "click .button.module-teaser_add": "handleModuleAdd",

        "dragover .module-teaser__droptarget": "handleDragOver",
        "drop     .module-teaser__droptarget": "handleDrop"
    },

    handleModuleAdd: function( event ) {
        event.preventDefault();
        App.addModuleLightbox.open( this.modules );
    },

    // Drag and Drop Events

    handleDragOver: function( event ) {
        event.stopPropagation();

        if ( "module" !== App.currentDnD.type ) {
            return;
        }

        if ( this.$(".column__module-teasers > .module-teaser").last().hasClass("-dragging") ) {
            return;
        }

        event.preventDefault();
    },

    handleDrop: function( event ) {
        event.stopPropagation();

        var draggedModel = App.currentDnD.view.model;
        var oldIndex     = App.currentDnD.view.$el.index();
        var newIndex     = this.modules.length - 1;

        if ( this.modules.contains( draggedModel ) ) {
            this.modules.moveItem( oldIndex, newIndex );
        } else {
            this.modules.add( draggedModel.toJSON() );
            draggedModel.destroy();
        }
    }
});
