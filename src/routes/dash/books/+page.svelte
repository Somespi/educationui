<script lang="ts">
	// @ts-nocheck
	import { supabase } from '$lib/SupabaseClient';
	import { onMount } from 'svelte';
	import axios, { formToJSON } from 'axios';

	// @ts-ignore
	let books = [];
	$: loading = true;

	onMount(async () => {
		await getBooks();
		loading = false;
            
	});

	async function getBooks() {
		await supabase
			.from('book')
			.select('*')
			.eq('pin', localStorage.getItem('pin'))
			.order('id', { ascending: false })
			.then(async (res) => {
				books = res.data;
			});
	}

	let sleep = async (ms: number): Promise => {
		return new Promise((resolve) => setTimeout(resolve, ms));
	};

	async function newBook(e: SubmitEvent) {
		document.querySelector('#btn_new_book').innerHTML =
			"<span class='loading loading-spinner'></span>";
		document.querySelector('#btn_new_book').disabled = true;
		document.querySelector('#close_new_book').disabled = true;
		document.querySelector('#form-zone')?.classList.add('hidden');
		document.querySelector('#progress-zone')?.classList.remove('hidden');
		document.querySelector('#progress-zone')?.classList.add('flex');
		await sleep(500);

		let form = new FormData(e.target as HTMLFormElement);
		let file: File = form.get('file');
		if (file) {
			const reader = new FileReader();

			reader.onload = async (event) => {
				let dataBuffer = event.target.result;

				console.log('sending request...');
				await supabase
					.from('book')
					.select('*', { count: 'exact' })
					.then(async (res) => {
						console.log(res);

						await supabase.storage
							.from('books')
							.upload(`${localStorage.getItem('pin')}/${file.name}`, dataBuffer, {
								cacheControl: '3600',
								upsert: true,
								contentType: 'application/pdf'
							})
							.then(async () => {
								await supabase
									.from('book')
									.insert({
										id: res.count + 1,
										name: form.get('name'),
										reference: supabase.storage
											.from('books')
											.getPublicUrl(`${localStorage.getItem('pin')}/${file.name}`).data.publicUrl,
										pin: localStorage.getItem('pin')
									})
									.then((all) => {
										document.querySelector('#btn_new_book').innerHTML = 'حفظ';
										document.querySelector('#btn_new_book').disabled = false;
										document.querySelector('#close_new_book').disabled = false;
										document.querySelector('#form-zone')?.classList.remove('hidden');
										document.querySelector('#progress-zone')?.classList.add('hidden');
										getBooks();
										new_book.close();
									});
							});
					});
			};

			reader.readAsArrayBuffer(file);
		}
	}

	const postBookName = async (e: SubmitEvent) => {
		document.querySelector('#btn_rename_book').disabled = true;
		document.querySelector('#close_rename_book').disabled = true;
		document.querySelector('#btn_rename_book').innerHTML =
			"<span class='loading loading-spinner'></span>";

		let form = new FormData(e.target as HTMLFormElement);
		await supabase
			.from('book')
			.update({
				name: form.get('name')
			})
			.match({
				id: form.get('id')
			})
			.then(() => {
				document.querySelector(`[data-id="${form.get('id')}"] #name`).innerHTML = form.get('name');
				document.querySelector('#btn_rename_book').innerHTML = 'حفظ';
				document.querySelector('#btn_rename_book').disabled = false;
				document.querySelector('#close_rename_book').disabled = false;
				rename_book.close();
			});
	};

	const renameBook = async (book_id: number) => {
		let id = document.querySelector('#id_rename_book') as HTMLInputElement;
		id.value = book_id;

		rename_book.showModal();
	};

	const deleteBook = async (book_id: number) => {
		books = books.filter((book) => {
			return book.id !== book_id;
		});
		await supabase.from('book').delete().match({
			id: book_id
		});
	};
</script>

{#if !loading}
	<dialog id="new_book" class="modal" dir="rtl">
		<form class="modal-box" on:submit|preventDefault={newBook}>
			<!-- svelte-ignore a11y-missing-content -->
			<h3 class="font-bold text-lg" id="tutorial-header">تحميل كتاب جديد</h3>

			<div class="hidden items-center justify-center w-full" id="progress-zone">
				<progress class="progress progress-primary w-full h-3" />
			</div>

			<div class="w-full flex justify-center flex-col space-y-5 my-5" id="form-zone">
				<input
					type="text"
					class="input input-bordered w-full"
					name="name"
					required
					placeholder="إسم الكتاب"
				/>

				<div class=" items-center justify-center w-full flex">
					<label
						for="dropzone-file"
						class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
					>
						<div class="flex flex-col items-center justify-center pt-5 pb-6">
							<svg
								class="w-8 h-8 mb-4 text-gray-500"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 20 16"
							>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
								/>
							</svg>
							<p class="mb-2 text-sm text-gray-500">
								<span class="font-semibold">إضغط لتحميل الملف </span>أو اسحبه وأسقطه هنا
							</p>
						</div>
						<input
							required
							id="dropzone-file"
							type="file"
							class="hidden"
							name="file"
							multiple={false}
						/>
					</label>
				</div>
			</div>

			<div class="modal-action flex justify-between">
				<button type="submit" class="btn" id="btn_new_book">حفظ</button>
				<button type="button" onclick="new_book.close()" class="btn" id="close_new_book"
					>إغلاق</button
				>
			</div>
		</form>
	</dialog>

	<dialog id="rename_book" class="modal" dir="rtl">
		<form class="modal-box" on:submit|preventDefault={postBookName}>
			<!-- svelte-ignore a11y-missing-content -->
			<h3 class="font-bold text-lg" id="tutorial-header">إعادة تسمية الكتاب</h3>

			<div class="w-full flex justify-center flex-col space-y-5 my-5" id="form-zone">
				<input
					type="text"
					class="input input-bordered w-full"
					name="name"
					required
					autocomplete="off"
					placeholder="اسم الكتاب الجديد"
				/>

				<input type="text" name="id" id="id_rename_book" class="hidden" />
			</div>

			<div class="modal-action flex justify-between">
				<button type="submit" class="btn" id="btn_rename_book">حفظ</button>
				<button type="button" onclick="rename_book.close()" class="btn" id="close_rename_book"
					>إغلاق</button
				>
			</div>
		</form>
	</dialog>

	<div class="mx-10 my-5">
		<div class="grid gap-8 grid-cols-1 md:grid-cols-4">
			{#each books as book}
				<div class="card-grid w-full h-36" data-id={book.id}>
					<div class="flex flex-col h-full w-full">
						<div class="h-16 w-full">
							<div class="flex justify-between flex-row-reverse">
								<div
									class="ml-3 h-11 w-11 rounded-tl-md bg-[#66cd8b]"
									style="clip-path: polygon(100% 0, 100% 100%, 50% 71%, 0 100%, 0 0);"
								/>

								<div class="m-3">
									<h1 class="text-xl font-medium" id="name">
										{book.name}
									</h1>
								</div>
							</div>
						</div>
						<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
						<div
							class=" bg-[#66cd8b] flex-1 flex items-center justify-center gap-5 flex-row w-full rounded-b-lg"
						>
							<div class="lg:tooltip" data-tip="معاينة">
								<button
									class="bg-white btn btn-white text-neutral"
									on:click={() => window.open(book.reference)}
								>
									<svg
										fill="none"
										stroke="currentColor"
										class="h-5 w-5"
										stroke-width="1.5"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
										aria-hidden="true"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
										/>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
										/>
									</svg>
								</button>
							</div>

							<div class="lg:tooltip dropdown dropdown-right" data-tip="المزيد">
								<label tabindex="0">
									<button class="bg-white btn btn-white text-neutral">
										<svg
											fill="none"
											stroke="currentColor"
											class="h-5 w-5"
											stroke-width="1.5"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
											aria-hidden="true"
											><path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
											/><path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											/></svg
										>
									</button>
								</label>
								<ul
									tabindex="0"
									class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
								>
									<!-- svelte-ignore a11y-missing-attribute -->
									<li>
										<!-- svelte-ignore a11y-click-events-have-key-events -->
										<!-- svelte-ignore a11y-no-static-element-interactions -->
										<a on:click={() => renameBook(book.id)}>
											<svg
												fill="none"
												stroke="currentColor"
												class="h-5 w-5"
												stroke-width="1.5"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
												aria-hidden="true"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
												/>
											</svg>
											تغيير الإسم
										</a>
									</li>
									<!-- svelte-ignore a11y-missing-attribute -->
									<li>
										<!-- svelte-ignore a11y-click-events-have-key-events -->
										<!-- svelte-ignore a11y-no-static-element-interactions -->
										<a on:click={() => deleteBook(book.id)}>
											<svg
												fill="none"
												stroke="currentColor"
												class="h-5 w-5"
												stroke-width="1.5"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
												aria-hidden="true"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
												/>
											</svg>
											حذف
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			{/each}

			<div class="card-grid glass btn w-full h-36" onclick="new_book.showModal()">
				<div class="flex flex-col h-full w-full">
					<div class="flex justify-center items-center h-full w-full">
						<div class="text-primary">
							<svg
								fill="none"
								class="h-24 w-24"
								stroke="currentColor"
								stroke-width="1.5"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
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
									style="clip-path: polygon(100% 0, 100% 100%, 50% 71%, 0 100%, 0 0);"
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
