<script lang="ts">
// @ts-nocheck

    import { onMount } from "svelte";
    import {invalidateAll } from '$app/navigation';
	import {initialize , getGapiClient} from 'svelte-google-auth/client';
	import type { PageData } from './$types.js';
    import {supabase as db} from '$lib/SupabaseClient.ts'
    import { v4 as uuidv4 } from 'uuid';

	export let data: PageData;
	initialize(data, invalidateAll);
    let loading = true
    onMount(async () => {
        // getGapiClient({
            // discoveryDocs: ['https://forms.googleapis.com/$discovery/rest?version=v1'],
        // }).then(gapi => {

            // gapi.forms.forms.responses.list({formId: "1L83Qi5clw7Sg5luojqYJrDAdABZOiiYj4cXYvD4mQWc"}).then(response => {
                // console.log(JSON.parse(response.body))
                
            // })
        // })

        await getQuizzes()
        loading = false
    });

    let quizs = []


    const getQuizzes = async () => {
        await db.from("quizzes")
            .select("*")
            .eq("subject", localStorage.getItem("subject-id"))
            .eq("pin", localStorage.getItem("pin"))
            .then((res) => quizs = res.data)
    }

    const createQuiz = async (e: SubmitEvent) => {
        
        document.querySelector("#tutorials_save").innerHTML = "<span class='loading loading-spinner'></span>";
        document.querySelector ("#tutorials_save").disabled = true
        document.querySelector ("#tutorials_close").disabled = true

        let form: FormData = new FormData(e.target as HTMLFormElement)
        await db.from("quizzes")
            .insert({
                uuid: uuidv4(),
                name: form.get("name"),
                link: form.get("link"),
                formid: form.get("id"),
                totalscore: form.get("total_score"),
                subject: localStorage.getItem("subject-id"),
                pin: localStorage.getItem("pin")
            }).then(async _res => {
                document.querySelector("#tutorials_save").innerHTML = "حفظ";
                document.querySelector ("#tutorials_save").disabled = false
                document.querySelector ("#tutorials_close").disabled = false

                await getQuizzes()
                quiz_view.close()
            })
    }
    
    const deleteQuiz = async (ID) => {
        quizs = quizs.filter((q) => {
            return q.uuid != ID
        })
        await db.from("quizzes")
        .delete()
        .match({
            uuid: ID
        })
        
    }
</script>


{#if !loading}
<dialog id="quiz_view" class="modal" dir="rtl">
		<form method="dialog" class="modal-box" id="create-channel-form" on:submit|preventDefault={createQuiz}>
			<!-- svelte-ignore a11y-missing-content -->
			<h3 class="font-bold text-lg" id="quiz-header">إضافة اختبار</h3>
			

            <div class="my-5">
                    <input
                    autocomplete="off"
                    type="text"
                    class="input input-bordered w-full"
                    name="name"
                    required
                    placeholder="إسم الإختبار"
                    />

                    
                </div>

                <div class="mb-5"> 
                    <div class="join w-full" dir="ltr">

                        <label for="info" class="join-item btn" type="button"> 
                                <svg fill="none" class="h-5 w-5" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"></path>
                                </svg>
                        </label>

                        <input type="checkbox" class="modal-toggle" id="info"/>

                        <div class="modal" style="background-color: transparent !important;">
                            <div class="modal-box" dir="rtl">
                                <h3 class="font-bold text-lg">كيفية الحصول على المعرّف</h3>
                                <p class="py-4">
                                    قم بنسخ النص كما في الصورة التالية عند الدخول الى Google Form الخاص بك
                                    <center>
                                        <img src="/images/explain-info.png
                                        " alt="" class="rounded-none w-[90%] mt-3">
                                    </center>
                                </p>
                                <div class="modal-action">
                                <label for="info" class="btn">إغلاق</label>
                                </div>
                            </div>
                            </div>


                        <input
                        dir="rtl"
                        
                        autocomplete="off"
                        type="text"
                        class="input input-bordered join-item w-full"
                        name="id"
                        required
                        placeholder="معرّف Google Forms"
                        />



                    </div>
                </div>

                <div class="mb-5"> 
                    <div class="grid grid-cols-2 w-full space-x-2">
                        <div class="ml-3">

                            <input
                            dir="rtl"
                            autocomplete="off"
                            type="text"
                            class="input input-bordered join-item w-full"
                            name="link"
                            required
                            placeholder="رابط Google Forms"
                            />
                        </div>

                        <div>
                            <input
                            dir="rtl"
                            autocomplete="off"
                            type="number"
                            class="input input-bordered join-item w-full"
                            name="total_score"
                            required
                            placeholder="مجموع درجات الإختبار"
                            />
                        </div>
                    </div>



                    </div>



            <div class="w-full flex  justify-center items-center  flex-row">
                <div class="mx-3 text-opacity-10">
                    <h1 class="text-xl opacity-20">

                            Google
                        
                        Forms
                    </h1>
                </div>
                <img src="/images/google-forms.svg" alt="Google Forms" height="50" width="50" class="opacity-20" />
            </div>


			<div class="modal-action flex justify-between">
                <button type="submit" id="tutorials_save" class="btn">حفظ</button>
				<button type="button" id="tutorials_close" onclick="quiz_view.close()" class="btn">إغلاق</button>
			</div>
		</form>

</dialog>




<div class="mx-10 my-5">
    <div class="grid gap-8 grid-cols-1 md:grid-cols-4">
        {#each quizs as quiz}

            <div class="card-grid w-full h-36">
                <div class="flex flex-col h-full w-full">
                    <div class="h-16 w-full">
                        <div class="flex justify-between flex-row-reverse">
                            <div class="ml-3 h-11 w-11 rounded-tl-md bg-[#1d4ed8]" style="background-color: #1d4ed8;clip-path: polygon(0 0, 100% 0%, 100% 71%, 0% 100%);" />

                            <div class="m-3">
                                <h1 class="text-xl font-medium">
                                    {quiz.name}
                                </h1>
                            </div>
                        </div>
                        


                    </div>
                    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                    <div class=" flex-1 flex items-center justify-center gap-5 flex-row w-full  rounded-b-lg" style="background-color: #1d4ed8;">
                        <div>
                            <button class="bg-white btn btn-white " style="color: #1d33d8;" on:click={() => window.open(quiz.link)}>
                                <svg fill="none" stroke="currentColor" stroke-width="1.5" class="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path>
                                </svg>

                            </button>
                        </div>


                        <div>
                                <button class="bg-white btn btn-white " style="color: #1d33d8;" on:click={async() => await deleteQuiz(quiz.uuid)}>
                                    <svg fill="none" stroke="currentColor" stroke-width="1.5" class="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
                                    </svg>
                                </button>
                            
                        </div>
                    </div>
                </div>
            </div>
        {/each}

        <div class="card-grid glass btn w-full h-36" onclick="quiz_view.showModal()">
                <div class="flex flex-col h-full w-full">
                        <div class="flex justify-center items-center h-full w-full">
                            <div style="color: #1d4ed8;">
                                
                                <svg fill="none" class="h-24 w-24" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



</div>

{:else}
	<div class="mx-10 my-5">
		<div class="grid gap-8 grid-cols-1 md:grid-cols-4">
			{#each [0, 0] as _}
				<div class="rounded-lg animate-pulse bg-slate-50 w-full h-36">
					<div class="flex flex-col h-full w-full">
						<div class="h-16 w-full">
							<div class="flex justify-between flex-row-reverse">
								<div
									class="ml-3 h-11 w-11 rounded-tl-md bg-slate-100"
									style="clip-path: polygon(0 0, 100% 0%, 100% 71%, 0% 100%);"
								/>

								<div class="m-3">
									<div class="h-9  w-20 bg-slate-100"></div>
								</div>
							</div>
						</div>
						<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
						<div
							class=" bg-slate-100 flex-1 flex items-center justify-center gap-5 flex-row w-full rounded-b-lg"
						>
							<div>
								<div class="bg-slate-50 p-6 rounded-lg" />
							</div>
                            <div>
								<div class="bg-slate-50 p-6 rounded-lg" />
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
{/if}
