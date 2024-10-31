<script lang="ts">
	import { cn } from '$lib/components/utils';

	const classes = cn(
		'aspect-video rounded-xl',
		'bg-background/50 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
		'transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]'
	);
</script>

<div class="grid auto-rows-min gap-4 md:grid-cols-3">
	<div class={classes}></div>
	<div class={classes}></div>
	<div class={classes}></div>
</div>
<div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min"></div>
