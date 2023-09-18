import { Listener } from "@sapphire/framework";
import { Client } from "discord.js";
import { bold, red, blue, underline } from "kleur";
import { Database } from "../../structures/Database";
import { AhriLogger } from "../../structures/Logger"
const Ahri = new AhriLogger();

export class ReadyListener extends Listener {
    public constructor(context: Listener.Context, options: Listener.Options) {
        super(context, {
            ...options,
            once: true,
        });
    }

    public async run(client: Client) {

        try {
            let dbLatency: any
            const startTime = Date.now();
            await Database.$queryRaw`SELECT 1`;
            dbLatency = Date.now() - startTime;
            Ahri.success(bold().green(`[MYSQL]`) + ` Se ha conectado correctamente a ${blue(underline(`MySQL Database`))}` + `(${blue(`${dbLatency}ms`)})`)
        } catch (error) {
            Ahri.error(bold().red(`[MYSQL]`) + ` No se ha logrado la conexión a ${blue(underline(`MySQL Database`))}`)
        }

        return Ahri.start(`Logged in as ${blue(underline(client.user?.tag))} (${red(client.user?.id)}) in ${blue(client.guilds.cache.size)} guilds.`)
    }
}