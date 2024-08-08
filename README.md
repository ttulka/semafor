# Semafor
Semafor is a minimalistic, Turing-complete esoteric programming language.

It operates on three unbounded registers with just four instructions.

The interpretation of the instructions depends on the state of the *semaphore*
 which can be either  *green* or *red*.
 The default state at the beginning of the runtime is *green*.

| Instr.   | Semaphore | Meaning |
| -------- | --------- | ------- |
| `%`      | *green*   | flip to *red* |
| `%`      | *red*     | flip to *green* |
| `!`      | *green*   | move to the register on right |
| `!`      | *red*     | move to the register on left |
| `+`      | *green*   | increment the value of the current register |
| `+`      | *red*     | decrement the value of the current register |
| *number* | *green*   | jump *number* instructions to the right if the current register is zero |
| *number* | *red*     | jump *number* instructions to the left if the current register is zero |

Anything other than the instructions is not allowed in the source code.

A program starts with the first instruction, the first register, and the semaphore in the *green* state as the initial defaults.

Will move to the first register:

```semafor
!!!
```

Will jump to the first instruction:

```semafor
!!!1
```

A program halts when there are no more instructions left to execute.

## Examples

### Infinite loop

Jumping 0 instructions means remaining on the current instruction and repeatedly executing it:

```semafor
0
```

Jumping 1 instruction in a program with only one instruction means repeatedly jumping to the same instruction:

```semafor
1
```

### Addition

Adds the values from the first and second registers together and stores the result in the first register:

```semafor
!!%%!!9%+!%+%!11%
```

### Hello World

### Hello World

For computing "Hello World" the numbers in the registers must be interpreted as letters.
 It can achieved by defining a simple alphabet:

| Letter | Value |
| :----: | :---: |
| ` `    | 1     |
| `d`    | 2     |
| `e`    | 3     |
| `H`    | 4     |
| `l`    | 5     |
| `o`    | 6     |
| `r`    | 7     |
| `W`    | 8     |

The following program sets the first register progressively to 4, 3, 5, 5, 6, 1, 8, 6, 7, 5, 2 which corresponds to "Hello World":

```semafor
++++     %!!!%7%+%!%8
+++      %!!!%7%+%!%8
+++++    %!!!%7%+%!%8
+++++    %!!!%7%+%!%8
++++++   %!!!%7%+%!%8
+        %!!!%7%+%!%8
++++++++ %!!!%7%+%!%8
++++++   %!!!%7%+%!%8
+++++++  %!!!%7%+%!%8
+++++    %!!!%7%+%!%8
++       %!!!%7%+%!%8
%
```

(Note that spaces and newlines were added arbitrarily and must be removed for the program to run correctly.)

## Turing completeness

Semafor is basically a register machine; it can quite trivially simulate a *program machine* (aka *program computer*) with INC, DEC, and JZ instructions.

Using the semaphore is a trick to keep the instruction set small. 
 However, we can expand the instruction set by incorporating the semaphore into the instructions as follows:

- `!>` (move right)
- `!<` (move left)
- `++` (increment)
- `+-` (decrement)
- +*n* (jump right)
- -*n* (jump left)

Using the relative number of instructions to determine the jump target eliminates the need for an argument in the JZ instruction, which otherwise requires an absolute instruction position.

It has been proven that two registers are sufficient for computational universality.

## JavaScript interpreter

```shell
npm i semafor-lang
```

```js
const semafor = require('semafor-lang')

// [0, 55, 1]
semafor(`!!%%!!9%+!%+%!11%`, [42, 13, 0])
```

## License

[MIT](LICENSE)
