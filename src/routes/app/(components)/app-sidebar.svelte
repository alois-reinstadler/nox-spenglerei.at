<script lang="ts">
	import NavMain from './nav-main.svelte';
	import NavProjects from './nav-projects.svelte';
	import NavUser from './nav-user.svelte';
	import TeamSwitcher from './team-switcher.svelte';

	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { data } from './constants';
	import type { ComponentProps } from 'svelte';

	let {
		ref = $bindable(null),
		collapsible = 'icon',
		...restProps
	}: ComponentProps<typeof Sidebar.Root> = $props();

	const classes = [
		'flex-1 flex-col justify-between bg-background/50 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
		'transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]'
	];
</script>

<Sidebar.Root bind:ref {collapsible} {...restProps}>
	<div class={classes.join(' ')}>
		<Sidebar.Header>
			<TeamSwitcher teams={data.teams} />
		</Sidebar.Header>
		<Sidebar.Content>
			<NavMain items={data.navMain} />
			<NavProjects projects={data.projects} />
		</Sidebar.Content>
		<Sidebar.Footer>
			<NavUser user={data.user} />
		</Sidebar.Footer>
	</div>
</Sidebar.Root>
