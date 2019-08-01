let data = require('./data');
import Vue from 'vue';
import App from './components/app';

var app = new Vue({
	components: {App},
	template: '<app :appData="content" :appSettings="appSettings"></app>',
	el: '#app',
	data: {
		content: data.content
	},
	computed: {
		appSettings: function() {
			return {
				registeredRows: data.registeredRows,
				registeredModules: data.registeredModules
			};
		}
	}
});
