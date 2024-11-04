<script lang="ts">
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';

	let {
		items
	}: {
		items: {
			title: string;
			url: string;
			// this should be `Component` after lucide-svelte updates types
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			icon?: any;
			isActive?: boolean;
			items?: {
				title: string;
				url: string;
			}[];
		}[];
	} = $props();

	const btnRefs: Array<null | HTMLElement> = [];
</script>

<Sidebar.Group>
	<Sidebar.GroupLabel>Platform</Sidebar.GroupLabel>
	<Sidebar.Menu>
		{#each items as mainItem, i (mainItem.title)}
			<Collapsible.Root open={mainItem.isActive} class="group/collapsible">
				{#snippet child({ props })}
					<Sidebar.MenuItem {...props}>
						<Collapsible.Trigger>
							{#snippet child({ props })}
								{#if mainItem.url}
									<a
										href={mainItem.url}
										{...props}
										onclick={(event) => {
											if (btnRefs[i] && event.target === btnRefs[i]) event.preventDefault();
										}}
									>
										<Sidebar.MenuButton>
											{#snippet tooltipContent()}
												{mainItem.title}
											{/snippet}
											{#if mainItem.icon}
												<mainItem.icon />
											{/if}
											<span>{mainItem.title}</span>
											<ChevronRight
												class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
											/>
											<!-- collapse guard -->
											<div bind:this={btnRefs[i]} class="absolute right-0 h-6 w-6"></div>
										</Sidebar.MenuButton>
									</a>
								{:else}
									<Sidebar.MenuButton {...props}>
										{#snippet tooltipContent()}
											{mainItem.title}
										{/snippet}
										{#if mainItem.icon}
											<mainItem.icon />
										{/if}
										<span>{mainItem.title}</span>
										<ChevronRight
											class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
										/>
									</Sidebar.MenuButton>
								{/if}
							{/snippet}
						</Collapsible.Trigger>
						<Collapsible.Content>
							{#if mainItem.items}
								<Sidebar.MenuSub>
									{#each mainItem.items as subItem (subItem.title)}
										<Sidebar.MenuSubItem>
											<Sidebar.MenuSubButton>
												{#snippet child({ props })}
													<a href={subItem.url} {...props}>
														<span>{subItem.title}</span>
													</a>
												{/snippet}
											</Sidebar.MenuSubButton>
										</Sidebar.MenuSubItem>
									{/each}
								</Sidebar.MenuSub>
							{/if}
						</Collapsible.Content>
					</Sidebar.MenuItem>
				{/snippet}
			</Collapsible.Root>
		{/each}
	</Sidebar.Menu>
</Sidebar.Group>
