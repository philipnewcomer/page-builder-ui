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

        // Initialize jQuery UI Sortable
        this.$(".column__module-teasers").sortable({
            connectWith: '.column__module-teasers',
            cursor: 'move',
            helper: function( event, element ) {
                return $('<div class="module-teaser__drag-helper" />');
            },
            placeholder: 'module-teaser__drop-placeholder',
            receive: this.handleReceive.bind( this ),
            start: this.handleDragStart.bind( this ),
            tolerance: 'pointer',
            update: this.handleDragUpdate.bind( this )
        });

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

        "drop": "handleItemDrop"
    },

    handleModuleAdd: function( event ) {
        event.preventDefault();
        App.addModuleLightbox.open( this.modules );
    },

    handleDragStart: function( event, ui ) {
        ui.item.indexStart = ui.item.index();
        ui.item.sendingCollection = this.modules;
        ui.item.sendingModel = this.modules.at( ui.item.index() );
    },

    handleDragUpdate: function( event, ui ) {
        ui.item.trigger( 'drop', ui );
    },

    handleItemDrop: function( event, ui ) {
        // Only run if the item is in the same collection. Items dragged across collections are handled by the receive function.
        if ( this.modules !== ui.item.sendingCollection ) {
            return;
        }

        this.modules.moveItem( ui.item.indexStart, ui.item.index() );
    },

    handleReceive: function( event, ui ) {
        this.modules.add( ui.item.sendingModel.toJSON(), { at: ui.item.index() } );
        ui.item.sendingModel.destroy();
    }
});
