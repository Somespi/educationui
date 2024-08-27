<script lang="ts">
	import { afterNavigate } from "$app/navigation";
	import { onMount } from "svelte";

    export let text: string
    export let to  : string
    $: loc = 'ss'
    afterNavigate(() =>{
        loc = location.href.split("/").at(-1) as unknown as string
        
    })
    
</script>

<style lang="scss">
    $neutral: #2EAC40;

    .hov-line {
        position: relative; 

        &::before, .clicking::before {
            content: '';
            height: 0;
            width: 5px;
            border-radius: 5px;
            position: absolute;
            top: 0; 
            right: 0;

            background-color: $neutral;
            transition: height 0.3s; 
        }

        &:hover {
            background-color: transparent !important;
            &::before {
                height: 100%; 
            }
        }
    }

        .clicking {
            &::before {
            height: 100%;
        }
        }

</style>

<li class="">
    <a href="/dash{to}" class="flex flex-row p-4  hov-line {(loc == to.split('/').at(-1)) ? "clicking" : ""}">
        <slot class="text-md h-5 w-5"/>
        {text}
    </a>
</li>


