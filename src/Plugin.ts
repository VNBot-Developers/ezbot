import Bot from './Bot';

interface PluginInfo {
	name?: string;
	version?: string;
	description?: string;
}
const defaultInfo: PluginInfo = {
	name: 'Ezbot Plugin',
	version: '1.0.1',
};
export interface PluginCallback {
	(bot: Bot): void;
}
export class CustomPlugin {
	private info: PluginInfo;
	private callback: PluginCallback;
	constructor(info: PluginInfo, callback: PluginCallback) {
		if (!info) throw new Error('Info Plugin ?');
		this.info = {
			...defaultInfo,
			...info,
		};
		this.callback = callback;
	}
	static isPlugin(o: any): boolean {
		return o instanceof CustomPlugin;
	}
	active(bot: Bot) {
		if (!Bot.isBot(bot)) throw new Error('Need bot instance');
		this.callback(bot);
	}
	showIntro(): string {
		return `Active plugin: ${this.info.name || 'Anonymous'}@${this.info.version}`;
	}
}