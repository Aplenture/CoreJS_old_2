/**
 * Aplenture/CoreJS
 * https://github.com/Aplenture/CoreJS
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/CoreJS/blob/main/LICENSE
 */

import { StringParameter } from "../parameters";
import { formatDuration, parseArgsFromString, parseArgsToString } from "../utils";
import { Command, CommandAction } from "./command";
import { Config } from "./config";
import { GlobalEventManager } from "./eventManager";
import { ParameterList } from "./parameterList";
import { Stopwatch } from "./stopwatch";

const COMMAND_HELP = 'help';

interface Options {
    readonly description?: string;
    readonly config?: Config;
    readonly fallback?: CommandAction<any>;
}

interface ToStringOptions {
    readonly prefix?: string;
    readonly globalParameters?: boolean;
}

export class Commander {
    public readonly description: string;
    public readonly config: Config;

    private readonly _commands: NodeJS.Dict<Command<any>> = {};
    private readonly _fallbackCommand: Command<any>;

    constructor(
        options: Options = {},
        public readonly eventManager = GlobalEventManager
    ) {
        this.description = options.description || "";
        this.config = options.config || new Config();
        this._fallbackCommand = {
            name: '',
            execute: options.fallback || (async () => `Unknown command. Type '${COMMAND_HELP}' to list all known commands.\n`)
        };

        if (!options.fallback) {
            this.set({
                name: COMMAND_HELP,
                execute: async args => this.toString(args.command && args.command.toString()),
                description: 'Lists all commands or returns details of specific <command>.',
                parameters: new ParameterList(
                    new StringParameter('command', 'Lists all commands with this prefix or returns details of specific command.', '')
                )
            });
        }
    }

    public get name(): string { return this.constructor.name; }
    public get commands(): NodeJS.ReadOnlyDict<Command<any>> { return this._commands; }

    public has(command: string): boolean {
        return !!this._commands[command.toLowerCase()];
    }

    public set(...commands: readonly Command<any>[]) {
        commands.forEach(command => this._commands[command.name.toLowerCase()] = command);
    }

    public remove(...commands: readonly string[]) {
        commands.forEach(command => delete this._commands[command.toLowerCase()]);
    }

    public clear() {
        for (const key in this._commands)
            delete this._commands[key];
    }

    public execute(command = "", args?: any) {
        return this.executeCommand(`${command} ${parseArgsToString(args)}`, command, args);
    }

    public executeLine(commandLine = "") {
        const split = commandLine.split(' ');
        const command = split[0] && 0 != split[0].indexOf('--')
            ? split[0]
            : '';

        const args = parseArgsFromString(commandLine.substring(command.length));

        return this.executeCommand(commandLine, command, args);
    }

    private async executeCommand(commandLine: string, command: string, args: NodeJS.Dict<any> = {}): Promise<any> {
        command = command.toLowerCase();

        const stopwatch = new Stopwatch();
        const instance = this._commands[command] || this._fallbackCommand;

        // manipulate args by command parameters
        if (instance.parameters)
            instance.parameters.parse(args, args);

        // manipulate args by global args
        this.config.write(args);

        stopwatch.start();

        const result = await instance.execute(args);

        stopwatch.stop();

        this.eventManager.onMessage.emit(this, `executed '${commandLine}' in ${formatDuration(stopwatch.duration, { seconds: true, milliseconds: true })}`);

        return result;
    }

    public toString(options: ToStringOptions = {}) {
        const prefix = (options.prefix || '').toLowerCase();
        const commandNames = Object.keys(this._commands).filter(command => 0 == command.indexOf(prefix));
        const commands = commandNames.map(name => this._commands[name]);

        let result = "";

        if (1 < commands.length && this.description)
            result += this.description + '\n\n';

        if (options.globalParameters) {
            const description = this.config.toString();

            if (description)
                result += 'Global parameters:\n' + description;
        }

        if (0 < commands.length)
            result += 'Command(s):\n' + commandNames
                .map((name, index) => `${name} - ${commands[index].description || ''}`)
                .join('\n') + '\n';

        if (1 == commands.length && commands[0].parameters) {
            const description = commands[0].parameters.toString();

            if (description)
                result += '\nCommand parameters:\n' + description;
        }

        if (0 == commands.length)
            result += 'No commands found!\n';

        return result;
    }

    public toJSON() {
        return {
            description: this.description,
            parameters: this.config.toJSON(),
            commands: Object.values(this.commands).map(command => ({
                name: command.name,
                description: command.description,
                parameters: command.parameters && command.parameters.toJSON()
            }))
        };
    }
}