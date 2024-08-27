<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { signIn, signOut, initialize } from 'svelte-google-auth/client';
	import type { PageData } from './$types.js';

	export let data: PageData;
	initialize(data, invalidateAll);

    async function callback() {
        await signIn([
						'openid',
						'profile',
						'email',
						'https://www.googleapis.com/auth/forms.responses.readonly'
					]);
        goto("/auth/login/settings")
    }
</script>


<section class="">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                        تسجيل الدخول إلى حسابك
                </h1>
                
                <br><br><br>
                <button class="w-full text-white btn btn-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center" on:click={() => callback()}>
                    تسجيل الدخول بإستخدام Google
                </button>
            </div>
        </div>
    </div>
    </section>