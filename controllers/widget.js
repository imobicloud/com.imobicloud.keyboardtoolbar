var args = arguments[0] || {};

exports.init = function(win) {
	if (args.children) {
		_.each(args.children, function(child) {
			$.container.add(child);
		});
		
		args.id = null;
		args.children = null;
	}
	
	if (OS_IOS) {
		Ti.App.addEventListener('keyboardframechanged', updateUI);
	} else {
		win.windowSoftInputMode = Titanium.UI.Android.SOFT_INPUT_STATE_ALWAYS_VISIBLE | Titanium.UI.Android.SOFT_INPUT_ADJUST_PAN;
	}
};

exports.reload = function() {
	if (OS_IOS) {
		Ti.App.addEventListener('keyboardframechanged', updateUI);
	}
};

exports.unload = function() {
	if (OS_IOS) {
		Ti.App.removeEventListener('keyboardframechanged', updateUI);
	}
};

function updateUI(e) {
	if (Ti.App.keyboardVisible) {
		var keyboardHeight = e.keyboardFrame.height;
  		$.container.bottom = keyboardHeight;
  		$.trigger('toggle', { visible: true, height: keyboardHeight });
	} else {
		$.container.bottom = 0;
		$.trigger('toggle', { visible: false, height: 0 });
	}
}

