import { Button, ButtonGroup, Divider, Typography } from "@mui/material";
import { useState } from "react";

// 0 = empty
// 1 = cone
// 2 = cube

const GameGrid = (props) => {
  const [grid, setGrid] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const [colorGrid, setColor] = useState([
    ["gray", "gray", "gray", "gray", "gray", "gray", "gray", "gray", "gray"],
    ["gray", "gray", "gray", "gray", "gray", "gray", "gray", "gray", "gray"],
    ["gray", "gray", "gray", "gray", "gray", "gray", "gray", "gray", "gray"],
  ]);

  const updateColorGrid = (x, y, color) => {
    setColor((prevBoard) => {
      const colorGrid = [...prevBoard];
      colorGrid[x] = [...colorGrid[x]];
      colorGrid[x][y] = color;
      return colorGrid;
    });
  };

  function handleChange(x, y) {
    if (grid[x][y] < 2) grid[x][y] += 1;
    else grid[x][y] = 0;

    switch (true) {
      case grid[x][y] === 1:
        updateColorGrid(x, y, "yellow");
        break;

      case grid[x][y] === 2:
        updateColorGrid(x, y, "purple");
        break;

      default:
        updateColorGrid(x, y, "gray");
        break;
    }
    // console.log(grid);
    // console.log(colorGrid);
    // console.log(colorGrid[x][y]);
    // console.log(grid[x][y]);

    props.parentCallback(props.field.name, grid);
  }

  const buttons = [
    <div>
      <div>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          size="large"
        >
          <Button
            key="topLeftOne"
            value={"topLeftOne"}
            sx={{ backgroundColor: colorGrid[0][0] }}
            onClick={(e) => handleChange(0, 0)}
          >
            1
          </Button>
          <Button
            key="topMidOne"
            value={"topMidOne"}
            sx={{ backgroundColor: colorGrid[0][1] }}
            onClick={(e) => handleChange(0, 1)}
          >
            2
          </Button>
          <Button
            key="topRightOne"
            value={"topRightOne"}
            sx={{ backgroundColor: colorGrid[0][2] }}
            onClick={(e) => handleChange(0, 2)}
          >
            3
          </Button>

          <Divider orientation="vertical" />

          <Button
            key="topLeftTwo"
            value={"topLeftTwo"}
            sx={{ backgroundColor: colorGrid[0][3] }}
            onClick={(e) => handleChange(0, 3)}
          >
            1
          </Button>
          <Button
            key="topMidTwo"
            value={"topMidTwo"}
            sx={{ backgroundColor: colorGrid[0][4] }}
            onClick={(e) => handleChange(0, 4)}
          >
            2
          </Button>
          <Button
            key="topRightTwo"
            value={"topRightTwo"}
            sx={{ backgroundColor: colorGrid[0][5] }}
            onClick={(e) => handleChange(0, 5)}
          >
            3
          </Button>

          <Divider orientation="vertical" />

          <Button
            key="topLeftThree"
            value={"topLeftThree"}
            sx={{ backgroundColor: colorGrid[0][6] }}
            onClick={(e) => handleChange(0, 6)}
          >
            1
          </Button>
          <Button
            key="topMidThree"
            value={"topMidThree"}
            sx={{ backgroundColor: colorGrid[0][7] }}
            onClick={(e) => handleChange(0, 7)}
          >
            2
          </Button>
          <Button
            key="topRightThree"
            value={"topRightThree"}
            sx={{ backgroundColor: colorGrid[0][8] }}
            onClick={(e) => handleChange(0, 8)}
          >
            3
          </Button>
        </ButtonGroup>
      </div>
      <div>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          size="large"
        >
          <Button
            key="midLeftOne"
            value={"midLeftOne"}
            sx={{ backgroundColor: colorGrid[1][0] }}
            onClick={(e) => handleChange(1, 0)}
          >
            1
          </Button>
          <Button
            key="midMidOne"
            value={"midMidOne"}
            sx={{ backgroundColor: colorGrid[1][1] }}
            onClick={(e) => handleChange(1, 1)}
          >
            2
          </Button>
          <Button
            key="midRightOne"
            value={"midRightOne"}
            sx={{ backgroundColor: colorGrid[1][2] }}
            onClick={(e) => handleChange(1, 2)}
          >
            3
          </Button>

          <Divider orientation="vertical" />

          <Button
            key="midLeftTwo"
            value={"midLeftTwo"}
            sx={{ backgroundColor: colorGrid[1][3] }}
            onClick={(e) => handleChange(1, 3)}
          >
            1
          </Button>
          <Button
            key="midMidTwo"
            value={"midMidTwo"}
            sx={{ backgroundColor: colorGrid[1][4] }}
            onClick={(e) => handleChange(1, 4)}
          >
            2
          </Button>
          <Button
            key="midRightTwo"
            value={"midRightTwo"}
            sx={{ backgroundColor: colorGrid[1][5] }}
            onClick={(e) => handleChange(1, 5)}
          >
            3
          </Button>

          <Divider orientation="vertical" />

          <Button
            key="midLeftThree"
            value={"midLeftThree"}
            sx={{ backgroundColor: colorGrid[1][6] }}
            onClick={(e) => handleChange(1, 6)}
          >
            1
          </Button>
          <Button
            key="midMidThree"
            value={"midMidThree"}
            sx={{ backgroundColor: colorGrid[1][7] }}
            onClick={(e) => handleChange(1, 7)}
          >
            2
          </Button>
          <Button
            key="midRightThree"
            value={"midRightThree"}
            sx={{ backgroundColor: colorGrid[1][8] }}
            onClick={(e) => handleChange(1, 8)}
          >
            3
          </Button>
        </ButtonGroup>
      </div>
      <div>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          size="large"
        >
          <Button
            key="botLeftOne"
            value={"botLeftOne"}
            sx={{ backgroundColor: colorGrid[2][0] }}
            onClick={(e) => handleChange(2, 0)}
          >
            1
          </Button>
          <Button
            key="botMidOne"
            value={"botMidOne"}
            sx={{ backgroundColor: colorGrid[2][1] }}
            onClick={(e) => handleChange(2, 1)}
          >
            2
          </Button>
          <Button
            key="botRightOne"
            value={"botRightOne"}
            sx={{ backgroundColor: colorGrid[2][2] }}
            onClick={(e) => handleChange(2, 2)}
          >
            3
          </Button>

          <Divider orientation="vertical" />

          <Button
            key="botLeftTwo"
            value={"botLeftTwo"}
            sx={{ backgroundColor: colorGrid[2][3] }}
            onClick={(e) => handleChange(2, 3)}
          >
            1
          </Button>
          <Button
            key="botMidTwo"
            value={"botMidTwo"}
            sx={{ backgroundColor: colorGrid[2][4] }}
            onClick={(e) => handleChange(2, 4)}
          >
            2
          </Button>
          <Button
            key="botRightTwo"
            value={"botRightTwo"}
            sx={{ backgroundColor: colorGrid[2][5] }}
            onClick={(e) => handleChange(2, 5)}
          >
            3
          </Button>

          <Divider orientation="vertical" />

          <Button
            key="botLeftThree"
            value={"botLeftThree"}
            sx={{ backgroundColor: colorGrid[2][6] }}
            onClick={(e) => handleChange(2, 6)}
          >
            1
          </Button>
          <Button
            key="botMidThree"
            value={"botMidThree"}
            sx={{ backgroundColor: colorGrid[2][7] }}
            onClick={(e) => handleChange(2, 7)}
          >
            2
          </Button>
          <Button
            key="botRightThree"
            value={"botRightThree"}
            sx={{ backgroundColor: colorGrid[2][8] }}
            onClick={(e) => handleChange(2, 8)}
          >
            3
          </Button>
        </ButtonGroup>
      </div>
    </div>,
  ];

  return (
    <div className="w-75">
      <Typography>{props.field.question}</Typography>
      <Typography fontSize={"1.2rem"}>
        Yellow = Cone | Purple = Cube | Gray = None |
      </Typography>
      <br />
      <Typography fontSize={"1.2rem"}>
        Facing scoring grid: go left to right
      </Typography>
      {buttons}
    </div>
  );
};

export default GameGrid;
