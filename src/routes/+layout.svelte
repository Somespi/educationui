<script lang="ts">
import TutorialsIcon from '$lib/icons/TutorialsIcon.svelte';
import ExamsIcon from '$lib/icons/ExamsIcon.svelte';
import UtilsIcon from '$lib/icons/UtilsIcon.svelte';
import BooksIcon from '$lib/icons/BooksIcon.svelte';
import OverviewIcon from '$lib/icons/OverviewIcon.svelte';
import PinIcon from '$lib/icons/PinIcon.svelte';
import SignOutIcon from '$lib/icons/SignOutIcon.svelte';
import Li from '$lib/Li.svelte';

const changePin = async (e: any) => {
    localStorage.setItem('pin', e.target.querySelector('input').value);

    change_pin.close();
};
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
                                            <input
                                                id="pin"
                                                class="input input-bordered w-full join-item font-mono"
                                                required
                                                placeholder="0000"
                                                />
                                        </div>
                                    </div>

                                    <div class="indicator">
                                        <div class="bg-[#ededed] h-full w-12 flex justify-center items-center join-item">
                                            <div>
                                                <svg
                                                    fill="none"
                                                    class="w-5 h-5"
                                                    stroke="currentColor"
                                                    stroke-width="1.5"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    aria-hidden="true"
                                                    >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                                                        />
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
                                                                            <a class="flex flex-row p-4 hov-line">
                                                                                <div class="text-md h-5 w-5">
                                                                                    <img
                                                                                        src="https://dummyimage.com/512x512.jpg"
                                                                                        class="rounded-full"
                                                                                        alt="Google image"
                                                                                        />
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
                                                                                <PinIcon></PinIcon>

                                                                                تغيير رمز الاتصال
                                                                            </a>
                                                                        </li>
                                                                        <!-- svelte-ignore a11y-missing-attribute -->
                                                                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                                                                        <li>
                                                                            <a class="text-error">
                                                                                <SignOutIcon></SignOutIcon>
                                                                                تسجيل الخروج
                                                                            </a>
                                                                        </li>
                                                                    </ul>
                                                                </div>

                                                                <Li text="لوحة التحكم" to="/overview">
                                                                    <OverviewIcon></OverviewIcon>
                                                                </Li>
                                                                <br />

                                                                <Li text="الكتب" to="/books">
                                                                    <BooksIcon></BooksIcon>
                                                                </Li>

                                                                <Li text="الملحقات" to="/tutorials">
                                                                    <TutorialsIcon></TutorialsIcon>
                                                                </Li>

                                                                <Li text="الإختبارات" to="/quizzes">
                                                                    <ExamsIcon></ExamsIcon>
                                                                </Li>
                                                                <br />
                                                                <Li text="الأدوات المساعدة" to="/utils">
                                                                    <UtilsIcon></UtilsIcon>
                                                                </Li>
                                                            </ul>
                                                        </div>
                                                        </div>

<style>
@import url('/app.css');
</style>
