import {execFile} from 'child_process'

const cmd = 'npx prisma migrate save --name init --experimental && npx prisma migrate up --experimental'


const ef = execFile(cmd)

