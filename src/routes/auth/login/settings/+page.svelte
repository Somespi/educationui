<script>
// @ts-nocheck

	import { goto } from "$app/navigation";
        import subjects from "../../../../json/subjects.json"

        const callback = () => {

        
            
            document.querySelector("#btn").innerHTML = "<span class='loading loading-spinner'></span>"

            let form = document.querySelector("#form");

            localStorage.setItem("subject-id", subjects[form?.querySelector("select")?.selectedIndex].id)
            localStorage.setItem("pin", document.querySelector("#pin")?.value)
            window.location.href = "/dash/overview"
        }
</script>


<section class="">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                        أكمل إعداد حسابك
                </h1>
                
                <form class="space-y-4 md:space-y-6" action="#"  id="form" on:submit={callback}>
                    <div class="join" dir="ltr">
                        <div>
                            <div dir="rtl">
                            <input id="pin" class="input input-bordered w-full join-item font-mono" required placeholder="0000"/>
                            </div>
                        </div>

                        <div class="indicator">
                            <div class="bg-[#ededed] h-full w-12 flex justify-center items-center join-item">
                                <div>
                                    <svg fill="none" class="w-5 h-5" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br>



                    <div class="join" dir="ltr">
                        <div>
                            <div dir="rtl">
                            <select class="input input-bordered join-item" required>
                                {#each subjects as subject}
                                    <option value={subject.id}>{subject.name}</option>
                                {/each}
                            </select>
                            </div>
                        </div>

                        <div class="indicator">
                            <div class="bg-[#ededed] h-full w-12 flex justify-center items-center join-item">
                                <div>
                                    <svg fill="none" class="w-5 h-5" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button class="w-full text-white btn btn-primary transition-all duration-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" on:click={() => callback()} id="btn">
                        متابعة
                </button>
                </form>
            </div>
        </div>
    </div>
    </section>