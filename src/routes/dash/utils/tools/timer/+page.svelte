<script>
	import { tweened } from 'svelte/motion';

	$: minutes = 0;
	$: seconds = 0;

	$: original = minutes * 60 + seconds;
	$: timer = tweened(original);

	$: minutes_display = Math.floor($timer / 60);
	$: seconds_display = Math.floor($timer - minutes_display * 60);

	const setup = () => {
		//@ts-ignore
		document.querySelector('#setup').style.display = 'none';
		//@ts-ignore
		document.querySelector('#timer').style.display = 'grid';

		const interval = setInterval(() => {
			if ($timer <= 0) {
				clearInterval(interval);
                new Audio('/sound/alarm.mp3').play();
			}
			if ($timer > 0) $timer--;
		}, 1000);
	};
</script>

<div
	class="radial-progress text-primary"
	id="timer"
	style="--value:{($timer / original) * 100}; --size:20rem; --thickness: 15px; display: none;"
>
	<h1 class="font-bold text-xl text-black" style="font-size: 4.25rem;">
		{`${minutes_display}:${seconds_display}`}
	</h1>
</div>

<div class="p-10 px-20 card-grid" id="setup">
	<h1 class="font-bold text-2xl">ضبط الوقت</h1>

	<br />
	<center>
		<div class="flex justify-between flex-row items-center">
			<div>
				<label for="sec" class="text-xs font-extralight">ثانية</label>
				<div
					id="sec"
					class="
                relative h-full max-w-22 min-w-22 w-22 text-center text-xl ring-0 outline-none font-semibold border-b-2 border-primary
                before-min"
					bind:textContent={seconds}
					contenteditable="true"
				/>
			</div>

			<div class="text-xl font-bold">:</div>
			<div>
				<label for="min" class="text-xs font-extralight"> دقيقة </label>
				<div
					id="min"
					class="
                relative h-full w-22 text-center text-xl ring-0 outline-none font-semibold border-b-2 border-primary
                before-min"
					bind:textContent={minutes}
					contenteditable="true"
				/>
			</div>
		</div>

		<button class="btn btn-primary mt-5 w-[90%]" on:click={setup}> تشغيل </button>
	</center>
</div>
