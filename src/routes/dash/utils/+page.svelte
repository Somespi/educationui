<script>
	import { goto } from "$app/navigation";

    let navigation = [
        {
            name: "مؤقت",
            url: "utils/tools/timer",
            icon: `<svg fill="none" width='100' stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>`,
        },

        {
            name: "حجر النرد",
            url: "utils/tools/dice",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" w class="icon icon-tabler icon-tabler-dice" width="100" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>
                        <circle cx="8.5" cy="8.5" r=".5" fill="currentColor"></circle>
                        <circle cx="15.5" cy="8.5" r=".5" fill="currentColor"></circle>
                        <circle cx="15.5" cy="15.5" r=".5" fill="currentColor"></circle>
                        <circle cx="8.5" cy="15.5" r=".5" fill="currentColor"></circle>
                        </svg>`,
        }


    ]
    
</script>


<div class="mx-10 my-3">
    <div class="grid gap-8 grid-cols-1 md:grid-cols-4">
        {#each navigation as nav}
    
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="card-grid w-full h-36 styled" on:click={() => goto(nav.url)}>
                <div class="flex flex-col h-full w-full">
                    <div class="h-16 w-full">
                        <center>
                            <div class="flex justify-center w-full flex-col ">
    
                                <div class=" rounded-lg " style="background-color: #fab40f;">
                                    <span class="svged">
                                        {@html nav.icon}
                                    </span>
                                </div>

                                <div>
                                    <h1 class="text-xl font-medium">
                                        {nav.name}
                                    </h1>
                                </div>
                            </div>
                        </center>
                    </div>
                </div>
            </div>

        {/each}
    </div>
</div>

