<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>

    </div>

    <canvas id="draw-zone" @mousedown="startPainting" @mouseup="endPainting">

    </canvas>

  </div>
</template>

<script>

export default {

  data() {
    return {
      canvas: null,
      ctx: null
    }
  },
  methods: {
    startPainting(){
      this.ctx.beginPath()
      console.log(Math.random() * 200);
      this.ctx.moveTo(100 + Math.random() * 199,100)
      //this.ctx.lineTo(200,100)
      this.ctx.lineTo(200,150)
      this.ctx.closePath()
      this.ctx.stroke()
    },
    endPainting(){

    }
  },
  mounted() {
    this.canvas = document.getElementById("draw-zone");
    this.ctx = this.canvas.getContext("2d");

    // Resize canvas
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
  }

}

</script>

<style scoped>

</style>