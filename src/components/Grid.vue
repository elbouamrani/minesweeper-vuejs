<template>
  <div>
    <div class="row" v-for="(row, index) in grid" :key="index">
      <Cell
        v-for="(item, jndex) in row"
        :key="jndex"
        :data="item"
        @cell-click="handleCellClick([index, jndex])"
        @cell-right-click="handleCellRightClick([index, jndex])"
      />
    </div>
  </div>
</template>

<script>
import Cell from "./Cell";

export default {
  name: "Grid",
  props: ["grid"],
  components: { Cell },
  methods: {
    handleCellClick(coords) {
      this.$emit("cell-click", coords);
    },
    handleCellRightClick(coords) {
      this.$emit("cell-right-click", coords);
    },
  },
};
</script>

<style>
.row {
  display: flex;
}
</style>