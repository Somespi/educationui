<script lang="ts">
// @ts-nocheck
    import {supabase} from '$lib/SupabaseClient'
    import { v4 as uuidv4 } from 'uuid';
    import RichText from "$lib/RichText.svelte";
	import { onMount } from 'svelte';

    let tutorials = []
    let text = "اكتب هنا";
    
    onMount(async () => getTutorials())

    const getTutorials = async () => {
        await supabase  
        .from("tutorials")
        .select("*")
        .eq("subject", localStorage.getItem("subject-id"))
        .eq("pin", localStorage.getItem("pin"))
        .then((res) => tutorials = res.data)
    }


    const createTutorial = async (e: SubmitEvent) => {
        let form: FormData = new FormData(e.target as HTMLFormElement)

        document.querySelector("#tutorials_close").disabled = true
        document.querySelector("#tutorials_send").disabled = true
        document.querySelector('#tutorials_send').innerHTML =
			"<span class='loading loading-spinner'></span>";
        
        await supabase.from("tutorials").insert({
            content: text, 
            name:  form.get("name"),
            subject: localStorage.getItem("subject-id"),
            pin: localStorage.getItem("pin"),
            uuid: uuidv4()
        }).then(_res => {
            getTutorials()
            tutorial_view.close()
            document.querySelector('#tutorials_send').innerHTML =
			"حفظ";
            document.querySelector("#tutorials_close").disabled = false
            document.querySelector("#tutorials_send").disabled = false
        })
    }


    const openViewAs = (uuid: string) => {
        document.querySelector("#view_content").innerHTML = tutorials.find((t) => t.uuid == uuid).content
        view.showModal()
    }
    

    const deleteAs = async (uuid: string) => {
        document.querySelector(`#progress-${uuid}`).classList.remove("hidden")
        
        await supabase
        .from("tutorials")
        .delete()
        .match({uuid: uuid})
        .then(() => {
            tutorials = tutorials.filter((t) => {return t.uuid != uuid})
        })
    }
</script>



<dialog id="tutorial_view" class="modal" dir="rtl">
		<form method="dialog" class="modal-box" on:submit|preventDefault={createTutorial} >
			<!-- svelte-ignore a11y-missing-content -->
			<h3 class="font-bold text-lg" id="tutorial-header">إضافة مُلحق</h3>
            <div class="w-full flex justify-center flex-col space-y-5 my-5">
                <div>
                    <input
                    autocomplete="off"
                    type="text"
                    class="input input-bordered w-full"
                    name="name"
                    required
                    placeholder="إسم للمُلحق"
                    />
                </div>


                <div class="w-full">
                    <RichText bind:text={text} />
                </div>
            </div>
            

			<div class="modal-action flex justify-between">
				<button type="button" id="tutorials_close"  onclick="tutorial_view.close()" class="btn">إغلاق</button>
                <button type="submit" id="tutorials_send" class="btn">حفظ</button>

			</div>
		</form>
</dialog>



<dialog id="view" class="modal" dir="rtl">
		<form method="dialog" class="modal-box" >
			<!-- svelte-ignore a11y-missing-content -->
            <div class="w-full flex justify-center flex-col space-y-5 my-5">

                <div class="w-full">
                    
                    <div class=" w-full rounded-md" dir="ltr">
                        <div class="flex flex-col w-full">
                            <div class="h-60 overflow-auto">
                                <div class="outline-none m-3 h-52" dir="rtl" id="view_content">
                                
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            

			<div class="modal-action flex justify-between">
				<button type="button" id="tutorials_close"  onclick="view.close()" class="btn">إغلاق</button>

			</div>
		</form>
</dialog>



<div class="mx-10 my-5">
    <div class="grid gap-8 grid-cols-1 md:grid-cols-4" >
        {#each tutorials as tutorial}

            <div class="card-grid w-full h-36">
                <div class="flex flex-col h-full w-full">
                    <div class="h-16 w-full">
                        <div class="flex justify-between flex-row-reverse">
                            <div class="ml-3 h-11 w-11 rounded-tl-md bg-[#ea590d]" style="clip-path: polygon(0 0, 100% 0, 100% 63%, 50% 100%, 0 63%);" />

                            <div class="m-3">
                                <h1 class="text-xl font-medium">
                                    {tutorial.name}
                                </h1>
                            </div>
                        </div>
                        


                    </div>
                    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                    <div class=" bg-[#ea590d] flex-1 flex items-center justify-center gap-5 flex-row w-full  rounded-b-lg">
                        <div>
                            <button class="bg-white btn btn-white text-[#ea200d]" on:click={() => openViewAs(tutorial.uuid)}>
                                <svg fill="none" stroke="currentColor" stroke-width="1.5" class="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path>
                                </svg>

                            </button>
                        </div>


                        <div>
                            
                                <button class="bg-white btn btn-white text-[#ea200d]" on:click={() => deleteAs(tutorial.uuid)}>
                                    <svg fill="none" stroke="currentColor" stroke-width="1.5" class="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
                                    </svg>
                                </button>
                            
                        </div>
                    </div>
                    <progress class="progress progress-error relative bottom-0 hidden" id="progress-{tutorial.uuid}"></progress>
                </div>
            </div>
        {/each}

        <div class="card-grid glass btn w-full h-36" onclick="tutorial_view.showModal()">
                <div class="flex flex-col h-full w-full">
                        <div class="flex justify-center items-center h-full w-full">
                            <div class="text-[#ea200d]">
                                
                                <svg fill="none" class="h-24 w-24" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



</div>