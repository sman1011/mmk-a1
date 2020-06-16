<script>

export default {
    name: "FloorMap",
    components: {  },
    
    props:{
        bgColor: { default: "rgb(194, 238, 155)" },
        outlineColor: { default: "rgb(106, 106, 106)" }
    },
    
    data(){ 
        return {
        }; 
    },
    
    methods:{
    }
}
</script>

<template>
    <div class="floor-map__cont">
    <svg xmlns="http://www.w3.org/2000/svg"  
        viewBox="0 0 98.305552 169.08616"
    >
        <g
            transform="translate(0,-127.91381)">

            <path
                v-bind:fill="bgColor"
                v-bind:stroke="outlineColor"
                style="stroke-width:0.5291667;"
                d="m 59.946211,128.17839 v 36.55207 H 8.095009 v 29.5672 H 36.66608 
                    v 49.3564 H 0.26458335 v 32.36079 L 52.115785,275.78213 v 20.95325 
                    h 45.925186 v -50.9859 H 55.290348 v -6.05353 H 96.136152 V 201.28209 
                    H 55.290348 v -6.98443 h 42.538653 v -66.11927 z"
            />
        </g>
    </svg>
</div>
</template>

<style>
</style>