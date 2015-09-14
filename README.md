# Titanium UI - Keyboard toolbar

Keyboard toolbar can be used for message box in chat apps

![Textarea example](http://i.imgur.com/KvLEHgy.png)

====

View
	
	<Widget id="toolbar" src="com.imobicloud.keyboardtoolbar" onToggle="toolbarToggle">
		<Widget src="com.imobicloud.textarea" class="txt-message" maxHeight="100" hintText="Type your message" onResize="toolbarResize"/>
	    	<Button class="button-send">SEND</Button>
	</Widget>
	
Styles
	
	".txt-message": { height: Ti.UI.SIZE, top: 12, bottom: 12, left: 10, right: 75.5, backgroundColor: '#fff', borderRadius: 15 }			

Controller

	$.toolbar.init( window_view );   // call this function on first load
	$.toolbar.unload(); // call this function when window blurred
	$.toolbar.reload(); // call this function when window focussed

	function toolbarToggle(e) {
  		$.lv.bottom = e.height + 56;
	}

	function toolbarResize(e) {
  		$.lv.bottom = e.height + 56 + 12 + 12;
	}

Changes log:

