import { Command } from "commander"
import {create} from "./command/create"

const program = new Command()

program.command('create').description('创建一个项目').argument('[name]', '输入项目名称').action((dirname:string) => {
    create(dirname)
})

program.parse()