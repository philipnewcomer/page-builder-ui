<template>
	<div class="row">
		<div class="row-header">
			{{ appSettings.registeredRows[row.columnLayout].name }}
		</div>

		<div class="row-columns">
			<column v-for="column in row.columns" :column="column" :appSettings="appSettings"></column>
		</div>
	</div>
</template>

<script>
	import Column from './column';
	export default {
		components: {Column},
		props: ['row', 'appSettings']
	}
</script>
