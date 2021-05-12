<template>
  <div
    class="cell"
    :class="{ flaged: data.flaged }"
    :style="style"
    @click="handleClick"
    @contextmenu="handleRightClick"
  >
    {{ content }}
  </div>
</template>

<script>
const styles = {
  mine: {
    exposed: {
      backgroundColor: "red",
    },
    default: {
      backgroundColor: "lightgray",
    },
  },
  empty: {
    exposed: {
      backgroundColor: "white",
    },
    default: {
      backgroundColor: "lightgray",
    },
  },
};

export default {
  name: "Cell",
  props: ["data"],
  methods: {
    handleClick() {
      this.$emit("cell-click");
    },
    handleRightClick(e) {
      e.preventDefault();
      this.$emit("cell-right-click");
    },
  },
  computed: {
    style() {
      const status = this.data.exposed ? "exposed" : "default";
      return styles[this.data.type][status];
    },
    content() {
      if (this.data.flaged) return "#";
      if (this.data.exposed && this.data.neighbors) return this.data.neighbors;
      return "";
    },
  },
};
</script>

<style>
.cell {
  --cell-size: 14pt;
  width: var(--cell-size);
  height: var(--cell-size);
  background-color: lightgray;
  border-width: 3pt;
  border-style: groove;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 10pt;
  font-family: arial;
}
.flaged {
  color: red;
  background-color: yellow !important;
}
</style>