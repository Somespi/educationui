<script lang="ts">
    export let classes: string = '';
    export let text: string;


    const boldtext = () => {
        
    }
</script>




<div class="{classes} w-full rounded-md" dir="ltr">
    <div class="flex flex-col w-full">
        <div class="flex flex-row tools justify-center w-full">
            <div style="visibility: hidden;">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"/>
            </div>
        </div>
        <div class="h-60  border-r-2 border-l-2 overflow-auto border-b-2">
            <div class="outline-none m-3 h-52" placeholder="اكتب هنا" bind:textContent={text} dir="rtl" contenteditable="true">
            
            </div>
        </div>
    </div>
</div>


<style lang='scss'>
    .tools  {
        & div {
            cursor: pointer;
            padding: 0.2rem;
            &:hover {
                background-color: darken(white, 10%);
            }
            &:active {
                background-color: darken(white, 20%);
            }

        }
        background-color: darken(white, 5%);
    }
</style>