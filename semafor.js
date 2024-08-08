const interpret = (program, memory, maxSteps, onStep) => {    
    // initialize
    const p = parse(program)         // program
    const m = Array.isArray(memory)  // memory (registers)
                ? [memory[0] ? memory[0]-0 : 0, memory[1] ? memory[1]-0 : 0, memory[2] ? memory[2]-0 : 0] 
                : [0, 0, 0]
    const ms = maxSteps > 0 ? maxSteps : 10000 // TODO set to 0

    let pc = 0   // program counter
    let rc = 0   // register counter
    let s = true // semaphore, true => green, false => red    
    
    // execute
    let sc = 0   // step counter
    while (pc < p.length && (!ms || ++sc <= ms)) {
        const i = p[pc]

        switch (i.id) {
            case 'J': 
                if (m[rc] === 0) {
                    pc = (pc + i.attr * (s ? 1 : -1)) % p.length
                    pc = pc >= 0 ? pc : p.length + pc
                } else {
                    pc++
                }
                break
            case 'S': 
                s = !s
                pc++
                break
            case 'R':
                rc = (rc + (s ? 1 : -1)) % m.length
                rc = rc >= 0 ? rc : m.length + rc
                pc++
                break
            case 'C':
                m[rc] = Math.max(0, m[rc] + (s ? 1 : -1))
                pc++
                break
        }
        
        if (typeof onStep === 'function') onStep([...m])
    }

    if (maxSteps && sc > maxSteps) throw new Error('Maximal steps exceeded')

    return [...m]
}

// parse the program to AST
function parse(program) {
    if (!new RegExp('^(?:(?:[%!+]|^)(?:0|[1-9]\\d*)?)+$').test(program))
        throw new Error('Syntax error: invalid code')

    return (program.match(/([%!+]|\d+)/g) || [])
        .map(instr => {
            if (Number.isInteger(instr-0)) return new Instr('J', instr-0) // jump if zero
            
            switch (instr) {
                case '%': return new Instr('S') // semaphore flip
                case '!': return new Instr('R') // register move
                case '+': return new Instr('C') // counter
                default: throw new Error('Syntax error: invalid instruction ' + instr)
            }
        })
}

class Instr {
    constructor(id, attr) {
        this.id = id
        this.attr = attr
    }
}

module.exports = interpret