<script lang="ts">
    const numberWords: Record<number, string> = {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six'
};

const rollDice = () => {
    return Math.floor(Math.random() * 6) + 1;
};

const changeNumber = () => {
    const rolls = 10; // Number of rolls
    let currentRoll = 0;

    const changeFace = () => {
        if (currentRoll < rolls) {
            const num = rollDice();
            console.log(num);

            // Hide all faces
            for (let i = 1; i <= 6; i++) {
                const element = document.getElementById(numberWords[i]);
                if (element) {
                    element.classList.add('hidden');
                }
            }

            const selectedElement = document.getElementById(numberWords[num]);
            if (selectedElement) {
                selectedElement.classList.remove('hidden');
            }

            currentRoll++;

            setTimeout(changeFace, 100);
        }
    };

    changeFace(); 
};


</script>



<div class="justify-center items-center h-56 w-56 card-grid grid-cols-3 grid cursor-pointer" on:click={changeNumber}>

    <div class="justify-center items-center h-56 w-56 flex hidden" id="one">
        <div class="dot" />
    </div> 


    <div class="justify-center items-center h-56 w-56 card-grid grid-cols-3 grid hidden" id="two">
        <div class="dot -left-[12px] relative"></div>
        <div class="dot -left-[12px] relative invisible"></div>
        <div class="dot -left-[12px] relative invisible"></div>
        <div class="dot -left-[12px] relative invisible"></div>
        <div class="dot -left-[12px] relative invisible"></div>
        <div class="dot -left-[12px] relative invisible"></div>
        <div class="dot -left-[12px] relative invisible"></div>
        <div class="dot -left-[12px] relative invisible"></div>
        <div class="dot -left-[12px] relative"></div>

    </div>

    <div class="justify-center items-center h-56 w-56 card-grid grid-cols-3 grid hidden" id="three">
        <div class="dot -left-[12px] relative"></div>
        <div class="dot -left-[12px] relative invisible"></div>
        <div class="dot -left-[12px] relative invisible"></div>
        <div class="dot -left-[12px] relative invisible"></div>
        <div class="dot -left-[12px] relative "></div>
        <div class="dot -left-[12px] relative invisible"></div>
        <div class="dot -left-[12px] relative invisible"></div>
        <div class="dot -left-[12px] relative invisible"></div>
        <div class="dot -left-[12px] relative"></div>

    </div>


    <div class="justify-center items-center h-56 w-56 card-grid grid-cols-3 grid hidden" id="four">
        <div class="dot -left-[12px] relative"></div>
        <div class="dot -left-[12px] relative invisible"></div>
        <div class="dot -left-[12px] relative "></div>
        <div class="dot -left-[12px] relative invisible"></div>
        <div class="dot -left-[12px] relative invisible"></div>
        <div class="dot -left-[12px] relative invisible"></div>
        <div class="dot -left-[12px] relative "></div>
        <div class="dot -left-[12px] relative invisible"></div>
        <div class="dot -left-[12px] relative"></div>

    </div>

    <div class="justify-center items-center h-56 w-56 card-grid grid-cols-3 grid hidden" id="five">
        <div class="dot -left-[12px] relative"></div>
        <div class="dot -left-[12px] relative invisible"></div>
        <div class="dot -left-[12px] relative "></div>
        <div class="dot -left-[12px] relative invisible"></div>
        <div class="dot -left-[12px] relative "></div>
        <div class="dot -left-[12px] relative invisible"></div>
        <div class="dot -left-[12px] relative "></div>
        <div class="dot -left-[12px] relative invisible"></div>
        <div class="dot -left-[12px] relative"></div>

    </div>

    <div class="justify-center items-center h-56 w-56 card-grid grid-cols-3 grid hidden" id="six">
        <div class="dot -left-[12px] relative"></div>
        <div class="dot -left-[12px] relative invisible"></div>
        <div class="dot -left-[12px] relative "></div>
        <div class="dot -left-[12px] relative "></div>
        <div class="dot -left-[12px] relative invisible"></div>
        <div class="dot -left-[12px] relative "></div>
        <div class="dot -left-[12px] relative "></div>
        <div class="dot -left-[12px] relative invisible"></div>
        <div class="dot -left-[12px] relative"></div>

    </div> 

</div>

<style>
	.dot {
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
		background-color: black;
        
	}

    
</style>
