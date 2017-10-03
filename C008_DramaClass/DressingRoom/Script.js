var C008_DramaClass_DressingRoom_SarahImage = "";
var C008_DramaClass_DressingRoom_AmandaImage = "";

// Chapter 8 - Dressing Room Load
function C008_DramaClass_DressingRoom_Load() {
	
	// The player cannot leave the room
	LeaveIcon = "";
	
	// Prepare the images for Sarah & Amanda
	C008_DramaClass_DressingRoom_SarahImage = "Sarah";
	C008_DramaClass_DressingRoom_AmandaImage = "Amanda";
	if (Common_PlayerCrime == "SarahStranded") C008_DramaClass_DressingRoom_SarahImage = "";
	if (Common_PlayerCrime == "AmandaStranded") C008_DramaClass_DressingRoom_AmandaImage = "";

}

// Chapter 8 - Dressing Room Run
function C008_DramaClass_DressingRoom_Run() {

	// Draw the background image and the girls if they are available
	var ctx = document.getElementById("MainCanvas").getContext("2d");
	DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/Background.jpg", 0, 0);
	if (C008_DramaClass_DressingRoom_SarahImage != "") DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/" + C008_DramaClass_DressingRoom_SarahImage + ".png", 0, 0);
	if (C008_DramaClass_DressingRoom_AmandaImage != "") DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/" + C008_DramaClass_DressingRoom_AmandaImage + ".png", 800, 0);

}

// Chapter 8 - Dressing Room Click
function C008_DramaClass_DressingRoom_Click() {

	// When the user clicks on any character (screen is divided in 4, 3rd can be the player)
	if ((MouseX >= 0) && (MouseX <= 200) && (MouseY >= 400) && (MouseY <= 600)) SetScene(CurrentChapter, "HiddenCollar");
	if ((MouseX >= 200) && (MouseX <= 400) && (MouseY >= 10) && (MouseY <= 590) && (Common_PlayerCrime != "SarahStranded")) SetScene(CurrentChapter, "SarahIntro");
	if ((MouseX >= 400) && (MouseX <= 800) && (MouseY >= 10) && (MouseY <= 590)) SetScene(CurrentChapter, "Dressing");
	if ((MouseX >= 850) && (MouseX <= 1100) && (MouseY >= 10) && (MouseY <= 590) && (Common_PlayerCrime != "AmandaStranded")) SetScene(CurrentChapter, "AmandaIntro");

	// Checks if the user clicks on any regular item
	InventoryClick(GetClickedInventory(), "C008_DramaClass", "DressingRoom");

}