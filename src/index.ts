import { Command } from "commander"
import {create} from "./command/create"
import {version} from "../package.json"

const program = new Command('daqiao')
program.version(version, '-v, --version')

program.command('create').description('创建一个项目').argument('[name]', '输入项目名称').action((dirname:string) => {
    create(dirname)
})

program.parse()