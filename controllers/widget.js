var args = $.args;
var keyboardHeight = 0;

init();
function init() {
	var exclude = ['id', 'children', 'keyboardMargin'];
	$.container.applyProperties(_.omit(args, exclude));
	
	if (args.children) {
		_.each(args.children, function(child) {
			$.container.add(child);
		});
		
		delete args.id;
		delete args.children;
	}
	
	if (args.keyboardMargin == null) {
		args.keyboardMargin = 0;
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
		keyboardHeight = e.keyboardFrame.height + args.keyboardMargin;
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
