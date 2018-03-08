C999_Common_Player_ActiveTab = "";

// Chapter Common - Player Load
function C999_Common_Player_Load() {
	C999_Common_Player_ActiveTab = "Profile";
	LeaveIcon = "Leave";
	LoadText();
	PlayerSkillShowLevelUp = 0;
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

	// Draw the main frame
	DrawRect(ctx, 599, 0, 1, 600, "Black");
	DrawRect(ctx, 0, 0, 599, 600, "White");

	// Draw the profile tab (show the player name, title and skills)
	if (C999_Common_Player_ActiveTab == "Profile") {

		// Shows the basic info
		DrawRect(ctx, 300, 0, 300, 50, "black");
		DrawRect(ctx, 301, 0, 298, 49, "silver");
		DrawText(ctx, GetText("Profile"), 150, 25, "black");
		DrawText(ctx, GetText("Relationships"), 450, 25, "white");
		DrawText(ctx, GetText("Name") + " " + Common_PlayerName, 300, 90, "black");
		DrawText(ctx, GetText("Title") + " " + C999_Common_Player_GetTitle(), 300, 130, "black");

		// Shows the current lover and owner
		if (Common_PlayerOwner != "") DrawText(ctx, GetText("Lover") + " " + Common_PlayerLover, 300, 170, "black");
		else DrawText(ctx, GetText("Lover") + " " + GetText("NoLover"), 300, 170, "black");
		if (Common_PlayerOwner != "") DrawText(ctx, GetText("Owner") + " " + Common_PlayerOwner, 300, 210, "black");
		else DrawText(ctx, GetText("Owner") + " " + GetText("NoOwner"), 300, 210, "black");

		// List the skills
		DrawText(ctx, GetText("Skills"), 200, 270, "black");
		DrawText(ctx, GetText("Level"), 500, 270, "black");
		DrawRect(ctx, 30, 290, 539, 1, "Black");
		for (var S = 0; S < PlayerSkill.length; S++) {
			DrawText(ctx, GetText("Skill" + PlayerSkill[S][PlayerSkillName]), 200, 320 + S * 40, "black");
			DrawText(ctx, PlayerSkill[S][PlayerSkillLevel].toString(), 500, 320 + S * 40, "black");
		}

	}

	// Draw the relationships tab (show all known actors and their relationship with the player)
	if (C999_Common_Player_ActiveTab == "Relationships") {
		DrawRect(ctx, 0, 0, 300, 50, "black");
		DrawRect(ctx, 0, 0, 299, 49, "silver");
		DrawText(ctx, GetText("Profile"), 150, 25, "white");
		DrawText(ctx, GetText("Relationships"), 450, 25, "black");
		for (var A = 0; A < Actor.length; A++) {
			CurrentActor = Actor[A][ActorName];
			DrawActorStats(ctx, 300, A * 50 + 80);
		}
		CurrentActor = "";
	}

}

// Chapter Common - Player Click
function C999_Common_Player_Click() {
	
	// Can allow to click on inventory from the player screen
	InventoryClick(GetClickedInventory(), LeaveChapter, LeaveScreen);
	
	// Tab navigation
	if ((MouseX >= 1) && (MouseX <= 299) && (MouseY >= 1) && (MouseY <= 49)) C999_Common_Player_ActiveTab = "Profile";
	if ((MouseX >= 301) && (MouseX <= 599) && (MouseY >= 1) && (MouseY <= 49)) C999_Common_Player_ActiveTab = "Relationships";

}