import chalk from "chalk"
import createLogger from "progress-estimator"
import {log} from "./log"
import simpleGit, {SimpleGit, SimpleGitOptions} from "simple-git"
const figlet = require('figlet')


const simpleGitOptions: Partial<SimpleGitOptions> = {
   baseDir: process.cwd(),
   binary: 'git',
   maxConcurrentProcesses: 6,
   trimmed: false,
};

const logger = createLogger({
    spinner: {
        interval: 300,
        frames: ['=','+','*','/'].map(item => chalk.green(item))
    }
})


// when setting all options in a single object
export async function clone(downloadUrl: string, prjName:string, options: string[]){
    const git: SimpleGit = simpleGit(simpleGitOptions);
    await logger(git.clone(downloadUrl,prjName,options), '正在下载中', {estimate: 5000})
    console.log('下载完成')
    console.log('==============================')
    console.log('==欢迎下载daqiao-cli脚手架工具==')
    console.log('==============================')
    await figlet(chalk.green('daqiao cli'))

    log.info(`你可以执行命令${chalk.yellowBright('pnpm install')}来安装`)
    log.info(`你可以执行命令${chalk.yellowBright('npm run dev')}来运行`)
}