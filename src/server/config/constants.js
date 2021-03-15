let C = {};

C.append = function(items, prefix) {
	items.forEach((item) => {
		let name = item.toUpperCase();
		if (prefix)
			name = prefix + "_" + name;
		C[name] = item;
	});
};

/**
 * User role constants
*/
C.append([
	"admin",
	"user",
	"guest"
], "ROLE");

module.exports = C;