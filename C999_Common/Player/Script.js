// Chapter Common - Player Load
function C999_Common_Player_Load() {
	LeaveIcon = "Leave";
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
	
	// Returns a fitting title
	if ((Love >= 10) && (Domme >= 10)) return "Miss popular";
	if ((Love >= 10) && (Domme <= -10)) return "Teacher's pet";
	if ((Love <= -10) && (Domme >= 10)) return "Bully";
	if ((Love <= -10) && (Domme <= -10)) return "Black sheep";
	if (Love >= 14) return "Beloved";
	if (Domme >= 14) return "Dominant";
	if (Love <= -14) return "Hated";
	if (Domme <= -14) return "Submissive";
	if ((Love >= 5) && (Domme >= 5)) return "Trendy";
	if ((Love >= 5) && (Domme <= -5)) return "Geeky";
	if ((Love <= -5) && (Domme >= 5)) return "Little boss";
	if ((Love <= -5) && (Domme <= -5)) return "Weirdo";
	if (Love >= 7) return "Nice girl";
	if (Domme >= 7) return "Tough cookie";
	if (Love <= -7) return "Disliked";
	if (Domme <= -7) return "Shy girl";
	return "None";

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
	DrawText(ctx, "Title: " + C999_Common_Player_GetTitle(), 300, 30, "black");
	DrawText(ctx, "Personal records", 300, 70, "black");
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