<script lang="ts">
import Card from '$lib/Card.svelte';
</script>

<div class="mx-10">
    <div class="m-3">
        <div class="grid gap-8 grid-cols-1 md:grid-cols-4">
            <Card title="رمز الإتصال" descripion={'0000'} colour="blue" />
            <Card
                title="عدد الطلاب"
                descripion="{'0000'}<span class='mr-2 font-sans text-2xl'>طالبًا</span>"
                colour="green"
                />
                <Card title="معدل اكمال آخر إختبار" descripion="{34}%" colour="pink" />
                <Card title="عدد الملحقات الحالية" descripion={'33'} colour="purple" />
                </div>
                </div>

                <div class="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <div class="card-grid max-h-[22rem]">
                        <div class="m-3">
                            <h1 class="font-semibold text-lg">متوسط الدرجات لآخر الاختبارات</h1>
                        </div>
                    </div>

                    <div class="card-grid max-h-[22rem]">
                        <div class="m-3">
                            <div class="w-full flex justify-between text-center">
                                <div>
                                    <h1 class="font-semibold text-lg">الطلبة</h1>
                                </div>
                                <div>
                                    <button class="btn btn-sm btn-ghost">المزيد</button>
                                </div>
                            </div>

                            <div class="overflow-x-auto">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th />
                                            <th>الإسم</th>
                                            <th>درجات الإختبار الاخير</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {#each [
											"محمد",
											"احمد",
											"عبدالله",
										] as student, i}
                                        <tr>
                                            <th>{i}</th>
                                            <td>{student}</td>
                                            <td>{student}</td>
                                        </tr>
                                        {/each}
                                    </tbody>
                                </table>

                                <div class="btn btn-sm">إضافة طالب</div>
                                <div class="btn btn-sm mx-3">إزالة طالب</div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>

<style>
.card-grid {
    @apply rounded-lg bg-white shadow-sm;
}
</style>
