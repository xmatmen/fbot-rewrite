module.exports = {
	description: 'Adds the shutterstock overlay to an image.',
	args: '(@user | Attachment | URL)',
	category: 'Fun',
	cooldown: 5000,
	run: async function (message, args) {
		const images = await this.utils.getImagesFromMessage(message, args);

		if (images.length === 0) return this.commandHandler.invalidArguments(message);

		let image = await this.utils.fetchImage(images[0]);
		if (image instanceof Error) return this.utils.handleCommandError(image, message);

                let overlay = await this.jimp.read('./assets/stock.png');
                overlay = await overlay.resize(image.bitmap.width, image.bitmap.height);
                image = await image.composite(overlay, 0, 0);

		image = await this.utils.getBufferFromJimp(image);

		message.channel.send({
			files: [{
				attachment: image,
				name: 'stock.png'
			}]
		});
	}
};