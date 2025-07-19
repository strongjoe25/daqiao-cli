import fs from "fs-extra"
import path from "path"
import {select, input} from "@inquirer/prompts"
import {clone } from "../util/clone"

// 执行create指令， 创建项目，选择项目模板。从git上clone项目模板到本地，给出安装提示；
// 执行create指令， 执行系统命令目录的软链接，直接执行bin/index.js #!usr/bin/env node 使用node执行文件；选择项目模板。从git上clone项目模板到本地，给出安装提示；

interface TemplateInfo {
    name: string,
    downloadUrl: string,
    description: string,
    branch: string
}
const templates:Map<string, TemplateInfo> = new Map([
    [
        'VITE-TYPESCRIPT-VUE-template',
        {
            name: 'vue构建模板',
            downloadUrl: 'https://git.aerospacex.cn:821/safe_workspace/client/app_pages.git',
            description: "vue构建模板",
            branch: "main"
        }
    ],
    [
        'VITE-TYPESCRIPT-H5-template',
        {
            name: 'h5构建模板',
            downloadUrl: 'https://git.aerospacex.cn:821/safe_workspace/client/app_pages.git',
            description: "h5构建模板",
            branch: "main"
        }
    ],
])

const templateList = Array.from(templates).map((item: [string, TemplateInfo]) => {
    const [name, info] = item
    return {
        name,
        value: name,
        description: info.description
    }
})

async function isOverWritten(path:string){
    return await select({
        message: '是否覆盖?',
        choices: [
            {
                name: '覆盖',
                value: true
            },
            {
                name: '取消',
                value: false
            },
        ]
    })
}

export async function create(prjName:string){
    if(!prjName) prjName = await input({message: '请输入项目名称'})
    let filepath = path.resolve(process.cwd(), prjName)    
    if(filepath){
        const run = await isOverWritten(filepath)
        if(run){
            fs.rmdir(filepath)
        }
    }

    const templateName = await select({
        message:  '请选择模板',
        choices:templateList
    })
    const gitRepoInfo = templates.get(templateName)
    console.log('templateName=', templateName)
    console.log('gitRepoInfo=', gitRepoInfo)
    if(!gitRepoInfo) return
    await clone(gitRepoInfo.downloadUrl, prjName, ['-b', 'main'])
}