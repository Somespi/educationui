<script lang="ts">
	import Card from '$lib/Card.svelte';

// 	export let data;
// 	import Chart from 'chart.js/auto';
// 	let homework: any;
// 	let chart: number[] = [];
// 	let doruus: string,
// 	students_number: string = ' ';
// 	$: subjectID = '';
// 	$: pin = '';
// 	//@ts-ignore
// 	let ctx, myChart;
// 	let loading: boolean = true;
// 	let students: any[] = [];
// 	let quiz = [0, 0];
// 	let average = 0;
	
// 	let studentsList: { name: string; mail: string; uuid: string, pin: number | string }[] = []

// 	onMount(async () => {
// 		if (localStorage != undefined) {
// 			subjectID = localStorage.getItem('subject-id') as unknown as string;
// 			pin = localStorage.getItem('pin') as unknown as string;

// 			await supabase
// 				.from('quizzes')
// 				.select('*')
// 				.eq('subject', subjectID)
// 				.eq('pin', pin)
// 				.then(async (res) => {
// 					if (res.data && res.data.length != 0) {
// 					await getGapiClient({
// 						discoveryDocs: ['https://forms.googleapis.com/$discovery/rest?version=v1']
// 					}).then(async (gapi) => {
// 						//@ts-ignore
						
// 						await gapi.forms.forms.responses
// 						//@ts-ignore
// 							.list({ formId: res.data[0].formid ?? 0 })
// 							.then(async (response: { body: string; }) => {
// 								quiz[0] = JSON.parse(response.body).responses.length;
// 								for (const res of JSON.parse(response.body).responses) {
// 									quiz[1] += res.totalScore || 0;
// 									await supabase
// 										.from('students')
// 										.select('*')
// 										.eq('pin', pin)
// 										.eq('mail', res.respondentEmail)
// 										.then(async (res) => {
// 											//@ts-ignore
// 											students = [
// 												...students,
// 												//@ts-ignore
// 												{ name: res.data[0].name, lastMark: quiz[1] || 0 }
// 											];
// 										});
// 									console.log(students);
// 								}

// 								students = students.slice(0, 3);

// 								//@ts-ignore
// 								average = ((quiz[1] / quiz[0] / res.data[0].totalscore) * 100).toFixed(2);
// 								chart.push(quiz[1] / quiz[0]);
// 							});

// 						//@ts-ignore

// 						let resp = res.data.slice(1, res.data.length);
						
// 						let i = 0;
// 						for (const r of resp) {
// 							if (i == 4) break;

// 							//@ts-ignore
// 							await gapi.forms.forms.responses.list({ formId: r.formid }).then(async (response) => {
// 								let totalInc = JSON.parse(response.body).responses.length;
// 								let totalScore = 0;
// 								for (const res of JSON.parse(response.body).responses) {
// 									totalScore += res.totalScore || 0;
// 								}

// 								//@ts-ignore
// 								let average = (totalScore / totalInc).toFixed(2);

// 								chart.push(parseFloat(average as unknown as string));
// 								i++;
// 							});
// 						}
// 					});
// 		}});

// 			await supabase
// 				.from('tutorials')
// 				.select('*')
// 				.eq('subject', subjectID)
// 				.eq('pin', pin)
// 				.then(async (res) => {
// 					doruus = res.data?.length.toString() as unknown as string;
// 				});

// 			await supabase
// 				.from('students')
// 				.select('*')
// 				.eq('pin', pin)
// 				.then(async (res) => {
// 					students_number = res.data?.length.toString() as unknown as string;
// 				});

// 			const data_ = {
// 				fill: true,

// 				labels: [1, 2, 3, 4, 5],
// 				display: false,
// 				datasets: [
// 					{
// 						label: '',
// 						fill: true,
// 						data: chart,
// 						backgroundColor: ['#66cd8b'],
// 						borderColor: '#157145',
// 						borderWidth: 2,
// 						tension: 0.3
// 					}
// 				]
// 			};
// 			const config = {
// 				type: 'line',
// 				data: data_,
// 				label: '',
// 				options: {
// 					borderRadius: '30',
// 					responsive: true,
// 					cutout: '5%',
// 					spacing: 2,
// 					plugins: {
// 						legend: {
// 							position: 'bottom',
// 							display: false,
// 							labels: {
// 								padding: 0,
// 								font: {
// 									size: 14
// 								}
// 							}
// 						},
// 						label: {
// 							display: false
// 						},
// 						title: {
// 							display: false
// 						}
// 					}
// 				}
// 			};

// 			loading = false;
// 			setTimeout( async () => {
// 				ctx = homework.getContext('2d');
// 				//@ts-ignore
// 				myChart = new Chart(ctx, config);
// 			}, 500)
// 		}

// 		setInterval(() => {
// 			pin = localStorage.getItem('pin') as unknown as string;
// 		}, 1000);
// 	});

// 	const changeSubject = (e: any) => {
// 		subjectID = e.target.value;
// 		localStorage.setItem('subject-id', e.target.value);
// 	};

// 	const addStudent = async (e: SubmitEvent) => {
// 		//@ts-ignore
// 		document.querySelector("#students_save").innerHTML = "<span class='loading loading-spinner'></span>";
//         //@ts-ignore
//         document.querySelector ("#students_save").disabled = true
//         //@ts-ignore
//         document.querySelector ("#students_close").disabled = true

//         let form: FormData = new FormData(e.target as HTMLFormElement)
//         await supabase.from("students").insert({
//             uuid: uuidv4(),
//             name: form.get("name"),
//             mail: form.get("mail"),
//             pin: pin,

//         }).then(_res => {
//             	getStudents()
// 		})

//         //@ts-ignore
//         document.querySelector("#students_save").innerHTML = "حفظ";
//         //@ts-ignore
//         document.querySelector ("#students_save").disabled = false
//         //@ts-ignore
//         document.querySelector ("#students_close").disabled = false
// 		//@ts-ignore
//         students_view.close()
//     }
	
// 	const getStudents = async () => {
// 		await supabase.from("students").select("*").eq("pin", pin).then((res) => {
// 			studentsList = res.data as unknown as any 
// 		})
// 	}

// 	const openStudents = () => {
// 		getStudents()
// 		//@ts-ignore
// 		students_lists.showModal()
// 	}


// 	const removeStudent = async (e: SubmitEvent) => {
// 		let form: FormData = new FormData(e.target as HTMLFormElement)
// 		await supabase.from("students").delete().match({
// 			"mail": form.get("mail"),
// 		}).then(_res => {
// 			studentsList = studentsList.filter((t) => t.mail != form.get("mail"))
// 		})
// 	}

// 	const openStudentsView = (e:SubmitEvent) => { 
// 		//@ts-ignore
// 		students_view.showModal()
// 	};

// 	const openStudentsDelete = (e: SubmitEvent) => {
// 		//@ts-ignore
// 		students_delete.showModal()
// 	}

</script>







	<div class="mx-10">
		<!-- <div class="w-full p-5 card-grid mt-5">
			<!-- <div class="flex flex-row items-center">
				<div>
					<h1>إختر المادة</h1>
				</div>

				
			</div> 
		</div> -->

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
					<h1 class=" font-semibold text-lg">متوسط الدرجات لآخر الاختبارات</h1>

				</div>
			</div>

			<div class="card-grid max-h-[22rem]">
				<div class="m-3">
					<div class="w-full flex justify-between text-center">
						<div>
							<h1 class=" font-semibold text-lg">الطلبة</h1>
						</div>

						<div>
							<button
								class="btn btn-sm btn-ghost"
							>
								 المزيد
							</button>
						</div>
					</div>

					<div class="overflow-x-auto">
						<table class="table">
							<!-- head -->
							<thead>
								<tr>
									<th />
									<th>الإسم</th>
									<th> درجات الإختبار الاخير</th>
								</tr>
							</thead>
							<tbody>
								<!-- row  -->
								{#each [] as student, i}
									<tr>
										<th>{i}</th>
										<td>{student}</td>
										<td>{student}</td>
									</tr>
								{/each}
							</tbody>
						</table>
						<div class="btn btn-sm" >
							إضافة طالب
						</div>

						<div class="btn btn-sm mx-3" >
							إزالة طالب
						</div>
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
