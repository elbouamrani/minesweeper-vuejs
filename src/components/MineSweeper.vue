<template>
  <div>
    <div>
      <span>total : {{ grid && grid.length * grid[0].length }}</span>
      &nbsp;|&nbsp;
      <span
        >grid : {{ grid && grid.length }} x {{ grid && grid[0].length }}</span
      >
      &nbsp;|&nbsp;
      <span>mineCount : {{ mineCount }}</span>
    </div>
    <hr />
    <div class="grid-container" v-if="grid">
      <Grid
        :grid="grid"
        @cell-click="handleCellClick"
        @cell-right-click="handleCellRightClick"
      />
    </div>
  </div>
</template>

<script>
import Grid from "./Grid";
import { GridGenerator, ClearCell } from "./../services/GridService";

export default {
  name: "MineSweeper",
  components: {
    Grid,
  },
  data() {
    return {
      grid: null,
      mineCount: null,
    };
  },
  methods: {
    handleCellClick(coords) {
      this.grid[coords[0]][coords[1]].exposed = true;
      if (this.grid[coords[0]][coords[1]].neighbors === 0) {
        ClearCell(this.grid, coords[0], coords[1]);
      }
    },
    handleCellRightClick(coords) {
      const cell = this.grid[coords[0]][coords[1]];
      cell.flaged = !cell.flaged;
    },
  },
  mounted() {
    const gen = GridGenerator(10, 20);
    this.grid = gen.grid;
    this.mineCount = gen.mineCount;
  },
};
</script>

