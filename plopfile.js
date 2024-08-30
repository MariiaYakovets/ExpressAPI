module.exports = function (plop) {
	plop.setHelper("toUpperCase", function (text) {
		return text.charAt(0).toUpperCase() + text.slice(1);
	});
	plop.setHelper("toLowerCase", function (text) {
		return text.charAt(0).toLowerCase() + text.slice(1);
	});
	plop.setGenerator("Express module generator", {
		prompts: [{ type: "input", name: "name", message: "Module name" }],

		actions: [
			{
				type: "addMany",
				destination: "./src/{{name}}",
				base: "./plop/template/module",
				templateFiles: "./plop/template/module/*",
			},
		],
	});
};
