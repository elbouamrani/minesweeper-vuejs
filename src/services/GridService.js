export const GridGenerator = (height, width) => {
  const grid = [];
  let mineCount = 0;
  for (let index = 0; index < height; index++) {
    const row = [];
    for (let jndex = 0; jndex < width; jndex++) {
      const type = Math.random() > 0.08 ? "empty" : "mine";
      mineCount = type === "mine" ? mineCount + 1 : mineCount;
      row.push({
        type,
        index,
        jndex,
        neighbors: null,
        onEdge: false,
        exposed: false,
        cleared: false,
        flaged: false
      });
    }
    grid.push(row);
  }

  for (let index = 0; index < grid.length; index++) {
    for (let jndex = 0; jndex < grid[0].length; jndex++) {
      const neighbors = getNeighbors(grid, index, jndex);

      const closeMines = neighbors.reduce((acc, val) => {
        if (!val) return acc;
        return acc + (val.type === "mine" ? 1 : 0);
      }, 0);
      grid[index][jndex].neighbors = closeMines;
    }
  }

  return { grid, mineCount };
};

const getNeighbors = (grid, index, jndex) => {
  const neighbors = [];
  neighbors.push(getCell(grid, index, jndex - 1));
  neighbors.push(getCell(grid, index, jndex + 1));
  neighbors.push(getCell(grid, index - 1, jndex - 1));
  neighbors.push(getCell(grid, index - 1, jndex));
  neighbors.push(getCell(grid, index - 1, jndex + 1));
  neighbors.push(getCell(grid, index + 1, jndex - 1));
  neighbors.push(getCell(grid, index + 1, jndex));
  neighbors.push(getCell(grid, index + 1, jndex + 1));
  return neighbors;
};

const getCell = (grid, index, jndex) => {
  if (
    index < 0 ||
    jndex < 0 ||
    index >= grid.length ||
    jndex >= grid[0].length
  ) {
    return null;
  }
  return grid[index][jndex];
};

const getZeroNeighbors = (grid, index, jndex) => {
  return getNeighbors(grid, index, jndex).filter((cell) => {
    if (cell && cell.neighbors === 0 && !cell.cleared) {
      return true;
    }
    return false;
  });
};

export const ClearCell = (grid, index, jndex) => {
  grid[index][jndex].cleared = true;
  const neighbors = getNeighbors(grid, index, jndex).filter((cell) => {
    if (cell && !cell.cleared) {
      return true;
    }
    return false;
  });

  for (const neighbor of neighbors) {
    // console.log(neighbor);
    if (neighbor) {
      neighbor.exposed = true;
      if (neighbor.neighbors === 0) {
        neighbor.cleared = true;
        ClearCell(grid, neighbor.index, neighbor.jndex);
      }
    }
  }
};
