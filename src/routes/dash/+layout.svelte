<script lang="ts">
	import Li from '$lib/Li.svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import { initialize, signOut } from 'svelte-google-auth/client';
	import type { PageData } from './$types.js';

	export let data: PageData;
	initialize(data, invalidateAll);


	const signout =async () => {
		await signOut()
		goto('/auth/login')
	}

	const changePin = async (e: any) => {
		localStorage.setItem('pin', e.target.querySelector("input").value)
		change_pin.close()
	}
</script>



<div class="drawer lg:drawer-open">
	<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col bg-[#f3f2f3] min-h-screen">
		<label
		for="my-drawer-2"
		class="btn m-3 fixed left-0 z-20 btn-square btn-md btn-primary drawer-button lg:hidden text-base-100"
		>
		<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class="w-6 h-6"
		>
		<path
		stroke-linecap="round"
		stroke-linejoin="round"
		d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
		/>
	</svg>
</label>

<dialog id="change_pin" class="modal" dir="rtl">
		<form method="dialog" class="modal-box" on:submit|preventDefault={changePin}>
			<!-- svelte-ignore a11y-missing-content -->
			<h3 class="font-bold text-lg" id="tutorial-header">تغيير رمز الإتصال</h3> 

			<div class="w-full flex justify-center my-5">
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
			</div>
			
			<div class="modal-action flex justify-between">
				<button type="submit" class="btn">حفظ</button>
				<button type="button" onclick="change_pin.close()" class="btn">إغلاق</button>
			</div>
		</form>
</dialog>



		<slot />
	</div>
	<div class="drawer-side">
		<label for="my-drawer-2" class="drawer-overlay" />
		<ul
			class="menu p-4 w-64 min-h-full z-50 bg-white text-base-content text-md text-opacity-70 font-semibold"
		>
			<div class="dropdown">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label tabindex="0">
					<li class="">
						<!-- svelte-ignore a11y-missing-attribute -->
						<a class="flex flex-row p-4 hov-line ">
							<div class="text-md h-5 w-5">
								<img src="{data.auth.user?.picture}" class="rounded-full" alt="Google image">
							</div>
							المستخدم
						</a>
					</li>
				</label>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<ul
                    dir="rtl"
					tabindex="0"
					class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
				>
					<!-- svelte-ignore a11y-missing-attribute -->
					<li>
						<a onclick="change_pin.showModal()">
                        <svg height='20' width='20' fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"/>
</svg>


                    تغيير رمز الاتصال
                    </a></li>
					<!-- svelte-ignore a11y-missing-attribute -->
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<li on:click={() => signout()}><a class="text-error" >
                        <svg height='20' width='20' fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"></path>
</svg>
                    تسجيل الخروج
                    </a></li>
				</ul>
			</div>

			<Li text="لوحة التحكم" to="/overview">
				<svg
					width="20"
					height="20"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
					/>
				</svg>
			</Li>
			<br />

			<Li text="الكتب" to="/books">
				<svg
					width="20"
					height="20"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
					/>
				</svg>
			</Li>

			<Li text="الملحقات" to="/tutorials">
				<svg
					width="20"
					height="20"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
					/>
				</svg>
			</Li>

			<Li text="الإختبارات" to="/quizzes">
			
			<svg width='20' height='20' fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round" d="M4.745 3A23.933 23.933 0 003 12c0 3.183.62 6.22 1.745 9M19.5 3c.967 2.78 1.5 5.817 1.5 9s-.533 6.22-1.5 9M8.25 8.885l1.444-.89a.75.75 0 011.105.402l2.402 7.206a.75.75 0 001.104.401l1.445-.889m-8.25.75l.213.09a1.687 1.687 0 002.062-.617l4.45-6.676a1.688 1.688 0 012.062-.618l.213.09"></path>
</svg>
			</Li>
			
			<!-- <Li text="الطلبة" to="/students"> -->
				<!-- <svg -->
					<!-- width="20" -->
					<!-- height="20" -->
					<!-- fill="none" -->
					<!-- stroke="currentColor" -->
					<!-- stroke-width="1.5" -->
					<!-- viewBox="0 0 24 24" -->
					<!-- xmlns="http://www.w3.org/2000/svg" -->
					<!-- aria-hidden="true" -->
				<!-- > -->
					<!-- <path -->
						<!-- stroke-linecap="round" -->
						<!-- stroke-linejoin="round" -->
						<!-- d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" -->
					<!-- /> -->
				<!-- </svg> -->
			<!-- </Li> -->
						<br/>
			<Li text="الأدوات المساعدة" to="/utils">
			<svg width='20' height='20' fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"></path>
</svg>
			</Li>
		</ul>
	</div>
</div>
