var keyboardHeight = 0;

init(arguments[0] || {});
function init(args) {
	var exclude = ['id', 'children'];
	$.container.applyProperties(_.omit(args, exclude));
	
	if (args.children) {
		_.each(args.children, function(child) {
			$.container.add(child);
		});
		
		delete args.id;
		delete args.children;
	}
}

exports.init = function(win) {
	if (OS_IOS) {
		Ti.App.addEventListener('keyboardframechanged', updateUI);
	} else {
		if (win.windowSoftInputMode == null) {
			win.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN | Ti.UI.Android.SOFT_INPUT_STATE_ALWAYS_HIDDEN;
		}
	}
};

exports.unload = function() {
	if (OS_IOS) {
		Ti.App.removeEventListener('keyboardframechanged', updateUI);
	}
};

function updateUI(e) {
	if (Ti.App.keyboardVisible) {
		keyboardHeight = e.keyboardFrame.height;
  		$.container.bottom = keyboardHeight;
  		$.trigger('toggle', { visible: true, height: keyboardHeight });
	} else {
		keyboardHeight = 0;
		$.container.bottom = 0;
		$.trigger('toggle', { visible: false, height: 0 });
	}
}

exports.getHeight = function() {
	return keyboardHeight;
};