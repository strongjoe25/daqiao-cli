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
        frames: ['=','+','*','/'].map(item => chalk.blue(item))
    }
})


// when setting all options in a single object
export async function clone(downloadUrl: string, prjName:string, options: string[]){
    const git: SimpleGit = simpleGit(simpleGitOptions);
    await logger(git.clone(downloadUrl,prjName,options), '正在下载中', {estimate: 5000})
    console.log('下载完成')
    console.log(chalk.blue('=============================='))
    console.log(chalk.blue('==欢迎下载daqiao-cli脚手架工具=='))
    console.log(chalk.blue('=============================='))
    const data = await figlet('欢迎使用 daqiao-cli脚手架')
    console.log(chalk.blue(data))

    log.success(`项目创建成功 ${chalk.blueBright(prjName)}`)
    log.success(`执行以下命令启动项目：`)
    log.info(`cd ${chalk.yellowBright(prjName)}`)
    log.info(`${chalk.yellowBright('pnpm install')}`)
    log.info(`${chalk.yellowBright('npm run dev')}`)
}