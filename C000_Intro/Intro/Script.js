// Intro Load
function C000_Intro_Intro_Load() {

	// Time is always 7:40 on the intro, no timer
	StopTimer(7.66666667 * 60 * 60 * 1000);
	
}

// Intro Run
function C000_Intro_Intro_Run() {
	
	// Paints the background
	var ctx = document.getElementById("MainCanvas").getContext("2d");
	DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/Background.jpg", -150, 0);
	DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/Player.jpg", 900, 0);

	// Draw the intro text
	DrawText(ctx, GetText("Intro1"), 450, 100, "White");
	DrawText(ctx, GetText("Intro2"), 450, 200, "White");
	DrawText(ctx, GetText("Intro3"), 450, 300, "White");
	DrawText(ctx, GetText("Intro4"), 450, 400, "White");
	DrawText(ctx, GetText("Intro5"), 450, 500, "White");

}

// Intro Click, jump to chapter selection
function C000_Intro_Intro_Click() {
	SetScene(CurrentChapter, "ChapterSelect");
}

// Intro Key Down
function C000_Intro_Intro_KeyDown() {

	// Special "z" cheat to get lots of items
	if (KeyPress == 122) {
		PlayerRemoveAllInventory();
		PlayerAddInventory("Cuffs", 4);
		PlayerAddInventory("CuffsKey", 1);
		PlayerAddInventory("Rope", 4);
		PlayerAddInventory("Ballgag", 4);
		PlayerAddInventory("TapeGag", 8);
		PlayerAddInventory("Collar", 4);
		PlayerAddInventory("Crop", 1);
		PlayerAddInventory("VibratingEgg", 4);
		PlayerAddInventory("ChastityBelt", 4);
	}
	
}