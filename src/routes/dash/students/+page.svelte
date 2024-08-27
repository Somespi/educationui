<script lang="ts">
    //@ts-nocheck
	import { supabase } from "$lib/SupabaseClient";
	import { onMount } from "svelte";

    import { v4 as uuidv4 } from "uuid";

    let students: any[] = [];

    onMount(async () => {
        await getStudents();
    });

    const addStudent = async (e: SubmitEvent) => {
        //@ts-ignore
        document.querySelector("#students_save").innerHTML = "<span class='loading loading-spinner'></span>";
        //@ts-ignore
        document.querySelector ("#students_save").disabled = true
        //@ts-ignore
        document.querySelector ("#students_close").disabled = true

        let form: FormData = new FormData(e.target as HTMLFormElement)
        // await supabase.from("students").insert({
            // uuid: uuidv4(),
            // name: form.get("name"),
            // mail: form.get("mail"),
            // pin: localStorage.getItem("pin"),

        // }).then(_res => {
            // getStudents()
        // })


        //@ts-ignore
        document.querySelector("#students_save").innerHTML = "حفظ";
        //@ts-ignore
        document.querySelector ("#students_save").disabled = false
        //@ts-ignore
        document.querySelector ("#students_close").disabled = false
        students_view.close()
    }

    const getStudents = async () => {
        await supabase
            .from("students")
            .select("*")
            .eq("pin", localStorage.getItem("pin"))
            .then((res) => {
                students = res.data
            })
    }


    const openDetails = (uuid: string) => {
        document.querySelector("#students_details #student_name").innerHTML = students.find((t) => t.uuid == uuid).name
        document.querySelector("#students_details").showModal()
    }
</script>

<dialog id="students_view" class="modal" dir="rtl" >
		<form method="dialog" class="modal-box" id="create-channel-form" on:submit|preventDefault={addStudent}>
			<!-- svelte-ignore a11y-missing-content -->
			<h3 class="font-bold text-lg" id="students-header">إضافة طالب</h3>
			

            <div class="my-5">
                    <input
                    autocomplete="off"
                    type="text"
                    class="input input-bordered w-full"
                    name="name"
                    required
                    placeholder="إسم الطالب"
                    />

                    
                </div>

            
                    <input
                    autocomplete="off"
                    type="email"
                    class="input input-bordered w-full"
                    name="mail"
                    required
                    placeholder="البريد الإلكتروني للطالب"
                    />
        



			<div class="modal-action flex justify-between">
                <button type="submit" id="students_save" class="btn">حفظ</button>
				<button type="button" id="students_close" onclick="students_view.close()" class="btn">إغلاق</button>
			</div>
		</form>

</dialog>



<dialog id="students_details" class="modal" dir="rtl" open>
		<form method="dialog" class="modal-box" id="create-channel-form" >
			<!-- svelte-ignore a11y-missing-content -->
			<div id="view_content" class="hidden">
                
            </div>

            <div class="my-5">
                <div class="flex justify-start items-center">

                    <div>
                        <svg  class="w-20 h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
                        <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
                        </svg>
                    </div>

                    <div>
                        <h1 class="text-lg mx-2" id="student_name">
                            طالب
                        </h1>

                    </div>
                </div>

                <br>

                <div class="overflow-x-auto h-52 overflow-y-auto">
					<table class="table table-pin-rows">
						<!-- head -->
						<thead>
							<tr>
								<th />
								<th>الإسم</th>
								<th> درجات الإختبارات</th>
							</tr>
						</thead>
						<tbody>
							<!-- row 1 -->
							<tr>
								<th>1</th>
								<td class="exam_name"></td>
								<td>94</td>
								
							</tr>
							
						</tbody>
					</table>
				</div>

                    
                </div>

            


			<div class="modal-action flex justify-between">

				<button type="button" onclick="students_details.close()" class="btn">إغلاق</button>
			</div>
		</form>

</dialog>



<div class="mx-10 my-3">

    <div class="card-grid h-32 mb-5">
        <div class="flex flex-col">
            <div>
                <h1 class="text-xl pt-1 pb-1 pr-3 mr-3">الطلبة</h1>
                <hr>
            </div>

            <div class="flex mt-5 items-center gap-5 justify-start mr-5">
                <div>
                    <button class="btn btn-primary text-white" onclick="students_view.showModal()">
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"></path>
                        </svg>
                        إضافة طالب
                    </button>
                </div>


            </div>
        </div>
    </div>

    <div class="overflow-auto card-grid max-h-96 no-scrollbar">
					<table class="table table-pin-cols table-pin-rows">
						<thead>
							<tr>
								<th />
								<th>الإسم</th>
								<th>متوسط درجات الإختبارات</th>
                                <th/>
							</tr>
						</thead>
						<tbody>
							{#each students as student,i}
                            
							<tr>
								<th>{i}</th>
								<td>
                                    {student.name}
                                </td>
								<td>94%</td>
								<td>
                                    <button 
                                    
                                    class="btn btn-sm btn-ghost" on:click={() => openDetails(student.uuid)}>المزيد</button>
                                </td>
							</tr>
							{/each}
						</tbody>
					</table>
				</div>
</div>

<style>
    .no-scrollbar::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
</style>