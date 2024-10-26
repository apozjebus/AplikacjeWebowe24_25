import * as http from 'http'
import * as mime from 'mime-types'
import * as fs from 'fs/promises'
import * as path from 'path'
import * as url from 'url'
import { ParsedUrlQuery } from 'querystring'
import { Stats } from 'fs'

const port: number = 3000
const hostname: string = '127.0.0.1'

const server: http.Server = http.createServer(async (req: http.IncomingMessage, res: http.ServerResponse) => {
    const parsedUrl: url.UrlWithParsedQuery = url.parse(req.url!, true)
    const pathname: string = parsedUrl.pathname!
    const query: ParsedUrlQuery = parsedUrl.query
    const method: string = req.method!

    switch (pathname) {
        case '/get_params': {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            const date: Date = new Date()
            const datePl: string = date.toLocaleDateString('pl-PL').replace(/\./g, '-')
            const timePl: string = date.toLocaleTimeString('pl-PL').replace(/:/g, '-')
            const fileName: string = `params_${datePl}_${timePl}.json`
            await fs.writeFile(fileName, JSON.stringify(query))
            res.end(JSON.stringify({'ok': 'ok'}))
            break
        }
        default: {
            const filePath: string = path.join(__dirname, `/assets/${pathname}`)
            try {
                const file: Buffer = await fs.readFile(filePath)
                res.writeHead(200, { 'Content-Type': await mime.lookup(filePath) || 'application/octet-stream' })
                res.end(file)
            } catch {
                res.writeHead(404, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({'error': 'Not found'}))
            }
        }
    }
})

server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`)
})