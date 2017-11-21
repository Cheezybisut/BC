var C000_Intro_CreatePlayer_ChapterToLoad = "C001_BeforeClass";

// Create Player Load
function C000_Intro_CreatePlayer_Load() {

	// No leave, the player must enter a name
	LeaveIcon = "";
	LeaveScreen = "";
	LoadText();
	
	// Creates a text box to enter the player name
	var InputName = document.createElement('input');
	InputName.setAttribute("ID", "InputName");
	InputName.setAttribute("name", "InputName");
	InputName.setAttribute("type", "text");
	InputName.setAttribute("value", "");
	InputName.setAttribute("maxlength", "20");
	InputName.setAttribute("style", "font-size:24px; font-family:Arial; position:fixed; padding-left:10px; left:200px; top:300px; width:500px; height:50px;");
	InputName.addEventListener("keypress", KeyDown);
	document.body.appendChild(InputName);
	InputName.focus();
	
}

// Create Player Run
function C000_Intro_CreatePlayer_Run() {
	
	// Draw the player image and the text input for the name
	var ctx = document.getElementById("MainCanvas").getContext("2d");
	DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/Player.jpg", 900, 0);
	DrawRect(ctx, 0, 0, 900, 600, "white");
	DrawRect(ctx, 300, 430, 300, 70, "#8c304e");
	DrawText(ctx, GetText("EnterName"), 450, 100, "black");
	DrawText(ctx, GetText("ValidChars"), 450, 200, "black");
	DrawText(ctx, GetText("Validate"), 450, 465, "white");
	
}

// Validate the name and starts the game
function C000_Intro_CreatePlayer_Validate() {
	var NewName = document.getElementById("InputName").value.trim();
	var letters = /^[a-zA-Z ]+$/;
	if (NewName.match(letters) && (NewName.length > 0) && (NewName.length <= 20)) {
		Common_PlayerName = NewName;
		document.getElementById("InputName").parentNode.removeChild(document.getElementById("InputName"));
		SetScene(C000_Intro_CreatePlayer_ChapterToLoad, "Intro");
	}
}

// Create Player Key Down
function C000_Intro_CreatePlayer_KeyDown() {
	if (KeyPress == 13) C000_Intro_CreatePlayer_Validate();
}

// Create Player Click
function C000_Intro_CreatePlayer_Click() {	
	if ((MouseX >= 300) && (MouseX <= 600) && (MouseY >= 430) && (MouseY <= 500)) C000_Intro_CreatePlayer_Validate();
}