<template>
<svg preserveAspectRatio="none" version="1.1" id="CardSvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 884.9 1412.1" style="enable-background:new 0 0 884.9 1412.1;" xml:space="preserve" class="svg learningCard">
<g id="Group_561" transform="translate(52.67 3.969)">
	<!-- <line id="Line_103" class="st0" x1="78.9" y1="43.7" x2="86.7" y2="78.8"/> -->
	<!-- <path id="Path_459" class="st0" d="M85.7,74.3l1.9,8.3c1.3,5.8-1.9,11.7-7,13.1l0,0c-5.2,1.5-10.4-2.1-11.7-7.9l-1.9-8.3l-9.2-41" -->
		/>
	<path id="Rectangle_27" class="st1" d="M-15.3,55.6h810.3c20.6,0,37.3,18.7,37.3,41.8v1269c0,23.1-16.7,41.8-37.3,41.8H-15.3
		c-20.6,0-37.3-18.7-37.3-41.8V97.4C-52.7,74.3-36,55.6-15.3,55.6z"/>
	<path id="Rectangle_28" class="st2" d="M-15.3,55.6h5.3l0,0v1352.6l0,0h-5.3c-20.6,0-37.3-18.7-37.3-41.8c0,0,0,0,0,0V97.4
		C-52.7,74.3-36,55.6-15.3,55.6z"/>
	<path id="Path_460" class="st3" d="M161.4-0.1"/>
	<!-- <g id="Group_302" transform="translate(38.24 0.078)">
		<path id="Path_461" class="st0" d="M15.2,89.6L0.5,24.1C-1.8,13.7,3.8,3.1,13.1,0.5l0,0c9.3-2.6,18.7,3.7,21,14.1l6.5,28.9"/>
		<path id="Path_462" class="st0" d="M6.3,49.9L20,111.4c3.3,14.6,16.5,23.5,29.6,19.9l0,0c13.1-3.7,21-18.5,17.7-33.1L61,70.5"/>
	</g> -->
</g>
</svg>
</template>

<script>
export default {
    name: "CardSvg",
    props: ["color"]
}
</script>

<style type="text/css" scoped>
	.st0{fill:none;stroke:#708FA0;stroke-width:8;stroke-linecap:round;stroke-miterlimit:10;}
	.st1{fill:#FFFFFF;}
	.st2{fill:v-bind("color");}
	.st3{fill:none;stroke:#B3B3B3;stroke-width:8;stroke-miterlimit:10;}
	.svg {
  		position: absolute;
  		z-index: -1;
	}
	.learningCard {
		height: 100%;
		width: 100%;
		/* right: 0.4rem; */
	}
</style>