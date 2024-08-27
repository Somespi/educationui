<script lang="ts">
    export let title: string 
    export let descripion: string 
    export let colour: string
</script>
<style lang="scss">

    $pos: 30%;
    $rotation: -220deg;

    .card-over {
        @apply bg-base-200 w-full h-36 text-white rounded-xl ;
    }
    


    .blue-grad {
        background: hsla(184, 51%, 62%, 1);
        background: linear-gradient($rotation, hsla(184, 51%, 62%, 1) $pos, darken(hsla(184, 51%, 62%, 1), 10) 100%, hsla(265, 68%, 45%, 1) 100%);
        background: -moz-linear-gradient($rotation, hsla(184, 51%, 62%, 1) $pos, darken(hsla(184, 51%, 62%, 1), 10) 100%, hsla(265, 68%, 45%, 1) 100%);
        background: -webkit-linear-gradient($rotation, hsla(184, 51%, 62%, 1) $pos, darken(hsla(184, 51%, 62%, 1), 10) 100%, hsla(265, 68%, 45%, 1) 100%);
    }

    .green-grad {
        background: rgb(85,184,91);
        background: linear-gradient($rotation, rgb(85,184,91) $pos, darken(rgb(85,184,91), 10) 100%, hsla(265, 68%, 45%, 1) 100%);
        background: -moz-linear-gradient($rotation, rgb(85,184,91) $pos, darken(rgb(85,184,91), 10) 100%, hsla(265, 68%, 45%, 1) 100%);
        background: -webkit-linear-gradient($rotation, rgb(85,184,91) $pos, darken(rgb(85,184,91), 10) 100%, hsla(265, 68%, 45%, 1) 100%);
    
    }

    .pink-grad {
        background: #D85B98;
        background: linear-gradient($rotation, #D85B98 $pos, darken(#D85B98, 10) 100%, hsla(265, 68%, 45%, 1) 100%);
        background: -moz-linear-gradient($rotation, #D85B98 $pos, darken(#D85B98, 10) 100%, hsla(265, 68%, 45%, 1) 100%);
        background: -webkit-linear-gradient($rotation, #D85B98 $pos, darken(#D85B98, 10) 100%, hsla(265, 68%, 45%, 1) 100%);
    
    }

    .purple-grad {
        background: #A67EF8;
        background: linear-gradient($rotation, #A67EF8 $pos, darken(#A67EF8 , 10) 100%, hsla(265, 68%, 45%, 1) 100%);
        background: -moz-linear-gradient($rotation, #A67EF8 $pos, darken(#A67EF8 , 10) 100%, hsla(265, 68%, 45%, 1) 100%);
        background: -webkit-linear-gradient($rotation, #A67EF8 $pos, darken(#A67EF8 , 10) 100%, hsla(265, 68%, 45%, 1) 100%);
    
    }
</style>


<div class="card-over {colour}-grad">
            <div>
                <h2 class="m-3 mt-5">
                    {title}
                </h2> 

            <p class="font-mono text-4xl mr-3 font-medium">
                {@html descripion}
            </p>
            </div>
        </div>


