const youtubeHdConfig = {
	language: 'youtube',
	round: true,
	spacer: '',
	delimiter: ' '
};

module.exports = {
	description: 'Replies with the currently playing song',
	category: 'Voice',
	cooldown: 1000,
	run: async function(message) {
		const currentSong = this.playingSongs.get(message.guild.id);

		if(!this.voiceStreams.has(message.guild.id) || !message.guild.member(this.client.user).voiceChannel || !currentSong) return message.channel.send(':x: The bot isn\'t playing anything!');

		message.channel.send(`Now playing: \`${currentSong.video.title}\` by \`${currentSong.video.author}\` \`[${this.hd(Date.now() - currentSong.startedAt, youtubeHdConfig)} / ${this.hd(currentSong.video.duration, youtubeHdConfig)}]\`\nQueued by \`${this.client.users.has(currentSong.user) ? this.client.users.get(currentSong.user).tag : 'Unknown#0000'}\`\n\nURL: <${currentSong.url}>`);

	}
};
