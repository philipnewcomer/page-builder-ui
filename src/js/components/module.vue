<template>
	<div class="module">
		{{ appSettings.registeredModules[module.type].name }}
		<div>{{ module.settings.content }}</div>
		<div><input v-model="module.settings.content"></div>
	</div>
</template>

<script>
	export default {
		props: ['module', 'appSettings']
	}
</script>
