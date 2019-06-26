const fetch = require('isomorphic-fetch')
const fs = require('fs-extra')
const chalk = require('chalk');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const args = require('minimist')(process.argv.slice(2));

const username = process.env.BSTACK_USERNAME
const accessKey = process.env.BSTACK_ACCESS_KEY
const isLocal = process.env.DOMAIN.indexOf('localhost') > -1
const getPath = (path = '') => {
    return process.env.DOMAIN + path
}

const branchUrl = getPath(args._[0])

const basicAuth = Buffer.from(`${username}:${accessKey}`).toString('base64')

const browserList = require('./browser-list.json')

const getShots = async (url) => {
    if (!url) {
        throw new Error('No URL set for this branch')
    }

    const response = await fetch('https://www.browserstack.com/screenshots', {
        method: 'POST',
        body: JSON.stringify({
            url: url,
            wait_time: 5,
            orientation: 'portrait',
            browsers: browserList,
            local: isLocal
        }),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Basic ${basicAuth}`
        }
    })

    const screenShots = await response.json()

    if (screenShots.message === 'Parallel limit reached') {
        throw new Error('Parallel limit reached! Try again later!')
    }

    const jobID = screenShots.job_id

    const getJob = async (id) => {
        const jobResponse = await fetch(`https://www.browserstack.com/screenshots/${id}.json`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Basic ${basicAuth}`
            }
        })

        const data = jobResponse.json()

        return data
    }

    const writeImages = async (imageUrl, filename) => {
        const res = await fetch(imageUrl)

        await new Promise((resolve, reject) => {
            const filePath = `./tmp/screenshots/${url.replace(/((http|https)(:\/\/))*(:\d{4})*/gi, '')}/`

            fs.mkdirSync(filePath, { recursive: true });

            const fileStream = fs.createWriteStream(`${filePath}${filename}`)

            res.body.pipe(fileStream)
            res.body.on('error', (err) => {
                reject(err)
                throw new Error('ERROR! writeImages failed!', err)
            })

            fileStream.on('finish', () => {
                resolve()
            })
        })
    }

    const downloadImages = async (screenshots) => {
        const downloads = await screenshots.forEach(async (shot) => {
            if (shot.state === 'done') {
                const urlParts = shot.image_url.split('/')
                const filename = urlParts[urlParts.length - 1]

                await writeImages(shot.image_url, filename)

                console.log(`\nDownloaded ${shot.device}: /tmp/screenshots/${filename}`)
            } else {
                console.log(`\nScreenshot timed out for ${shot.device}`)
            }
        })

        return downloads
    }

    const pollJob = async () => {
        const job = await getJob(jobID)

        if (job.message) {
            let output = job.message

            //TODO: add appropriate error message for Invalid job ID

            if (isLocal) {
                output += `
                    \n${chalk.yellow(`Ensure BrowserStackLocal is running for ${chalk.bold(`localhost testing`)}`)}
                    \n${chalk.green(`    ./BrowserStackLocal --key ${process.env.BSTACK_ACCESS_KEY}`)}
                `
            }

            throw new Error(output)
        }

        const awaitingDevices = job.screenshots.filter(x => x.state !== 'done').map(x => x.device)

        if (job.state !== 'done') {
            console.log(`\nAwaiting ${awaitingDevices.length} devices:\n${awaitingDevices}`)
            return await setTimeout(async () => await pollJob(), 3000)
        }

        await downloadImages(job.screenshots)
    }

    await pollJob()
}

getShots(branchUrl).catch(err => {
    console.log(err)
})
