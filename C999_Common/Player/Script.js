// Chapter Common - Player Load
function C999_Common_Player_Load() {
	LeaveIcon = "Leave";
	LoadText();
}

// Returns the title for the player based on actor interactions
function C999_Common_Player_GetTitle() {

	// Get the total love and domme level
	var Love = 0;
	var Domme = 0;
	for (var A = 0; A < Actor.length; A++) {
		Love = Love + Actor[A][ActorLove];
		Domme = Domme + Actor[A][ActorSubmission];
	}

	// Return a fitting title (level 3)
	if ((Love >= 20) && (Domme >= 20)) return GetText("LoveDomme3");
	if ((Love >= 20) && (Domme <= -20)) return GetText("LoveSub3");
	if ((Love <= -20) && (Domme >= 20)) return GetText("HateDomme3");
	if ((Love <= -20) && (Domme <= -20)) return GetText("HateSub3");
	if (Love >= 30) return GetText("Love3");
	if (Domme >= 30) return GetText("Domme3");
	if (Love <= -30) return GetText("Hate3");
	if (Domme <= -30) return GetText("Sub3");
	
	// Return a fitting title (level 2)
	if ((Love >= 12) && (Domme >= 12)) return GetText("LoveDomme2");
	if ((Love >= 12) && (Domme <= -12)) return GetText("LoveSub2");
	if ((Love <= -12) && (Domme >= 12)) return GetText("HateDomme2");
	if ((Love <= -12) && (Domme <= -12)) return GetText("HateSub2");
	if (Love >= 16) return GetText("Love2");
	if (Domme >= 16) return GetText("Domme2");
	if (Love <= -16) return GetText("Hate2");
	if (Domme <= -16) return GetText("Sub2");

	// Return a fitting title (level 1)
	if ((Love >= 5) && (Domme >= 5)) return GetText("LoveDomme1");
	if ((Love >= 5) && (Domme <= -5)) return GetText("LoveSub1");
	if ((Love <= -5) && (Domme >= 5)) return GetText("HateDomme1");
	if ((Love <= -5) && (Domme <= -5)) return GetText("HateSub1");
	if (Love >= 7) return GetText("Love1");
	if (Domme >= 7) return GetText("Domme1");
	if (Love <= -7) return GetText("Hate1");
	if (Domme <= -7) return GetText("Sub1");

	// No title
	return GetText("NoTitle");

}

// Chapter Common - Player Run
function C999_Common_Player_Run() {

	// Paints the player picture
	DrawPlayerImage(0, 0);

	// Draw the player records, show every actors encountered
	var ctx = document.getElementById("MainCanvas").getContext("2d");
	DrawRect(ctx, 599, 0, 1, 600, "Black");
	DrawRect(ctx, 0, 0, 599, 600, "White");
	DrawRect(ctx, 30, 100, 539, 1, "Black");
	DrawText(ctx, GetText("Title") + " " + C999_Common_Player_GetTitle(), 300, 30, "black");
	DrawText(ctx, GetText("Records"), 300, 70, "black");
	for (var A = 0; A < Actor.length; A++) {
		CurrentActor = Actor[A][ActorName];
		DrawActorStats(ctx, 300, A * 60 + 130);
	}
	CurrentActor = "";

}

// Chapter Common - Player Click
function C999_Common_Player_Click() {
	
	// Can allow to click on inventory from the player screen
	InventoryClick(GetClickedInventory(), LeaveChapter, LeaveScreen);

}