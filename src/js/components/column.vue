<template>
	<div class="column" :class="columnWidth">
		<div class="column-modules">

			<draggable v-model="column.modules" :options="{group: 'modules'}">
				<module v-for="module in column.modules" :module="module" :appSettings="appSettings"></module>
			</draggable>

		</div>
	</div>
</template>

<script>
	import Draggable from 'vuedraggable';
	import Module from './module';
	export default {
		components: {Draggable, Module},
		props: ['column', 'appSettings'],
		computed: {
			columnWidth: function() {
				return this.column.width;
			}
		}
	}
</script>
