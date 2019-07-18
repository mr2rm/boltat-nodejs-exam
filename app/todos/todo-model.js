const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
	text: {
		type: String,
		required: [true, "You should enter some text"],
		minlength: [5, "Text should be at least 5 characters"],
		trim: true
	},
	createDate: {
		type: Date,
		default: new Date()
	},
	completed: {
		type: Boolean,
		default: false
	},
	completedAt: {
		type: Date,
		default: null
	},
	_creator: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	_assign: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	}
});

module.exports = mongoose.model("Todo", todoSchema);
