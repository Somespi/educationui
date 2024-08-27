<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
    import {Colors} from 'chart.js/auto'
    export let dataFlow
	let homework:any;
	const data = {
        fill: true,
        
        labels: [1,2,3,4,5],
		display: false,
        datasets: [
            {
                label:"",
                fill: true,
				data: dataFlow,
				backgroundColor: ['#66cd8b'],
                borderColor: "#157145",
				borderWidth:2,
                tension: 0.3
			}
		]
	};
    
    const config = {
        type: 'line',
        data: data,
        label: "",
        options: {
                borderRadius: '30',
                responsive: true,
                cutout: '5%',
                spacing: 2,
                plugins: {
                    legend: {
                        position: 'bottom',
                        display: false,
                        labels: {
                            padding: 0,
                            font: {
                                size: 14
                            }
                        }
                    },
                    label: {
                        display: false,
                    },
                    title: {
                        display: false,
                    }
                }
            }
        };

    
	onMount(() => {
		const ctx = homework.getContext('2d');
        //@ts-ignore
		var myChart = new Chart(ctx, config);
	});
</script>

 <canvas bind:this={homework} />
