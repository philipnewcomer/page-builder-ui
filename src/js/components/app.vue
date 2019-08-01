<template>
	<div class="app">
		<div class="rows">
			<draggable v-model="rows">
				<row v-for="row in rows" :row="row" :appSettings="appSettings"></row>
			</draggable>
		</div>
	</div>
</template>

<script>
	import Draggable from 'vuedraggable';
	import Row from './row';
	export default {
		components: {Draggable, Row},
		props: ['appData', 'appSettings'],
		data: function() {
			return {
				rows: this.appData.rows
			};
		}
	};
</script>
