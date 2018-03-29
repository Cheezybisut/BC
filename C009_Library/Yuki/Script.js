var C009_Library_Yuki_CurrentStage = 0;
var C009_Library_Yuki_BookAlreadyFound = false;
var C009_Library_Yuki_DetentionBondage = false;
var C009_Library_Yuki_DetentionFighting = false;
var C009_Library_Yuki_IsolationMildred = false;
var C009_Library_Yuki_IsolationYuki = false;
var C009_Library_Yuki_IsolationPleasureYuki = false;
var C009_Library_Yuki_IsolationOrgasmYuki = false;
var C009_Library_Yuki_IsolationEarlyReleaseYuki = false;
var	C009_Library_Yuki_IsolationEscapeYuki = false;
var	C009_Library_Yuki_HasEgg = false;
var	C009_Library_Yuki_CanFindPlayer = true;
var C009_Library_Yuki_AllowSecondChance = true;
var C009_Library_Yuki_PenInHole = false;
var C009_Library_Yuki_AnnoyCount = 0;

// Chapter 9 Library - Yuki Load
function C009_Library_Yuki_Load() {

	// Load the scene parameters
	ActorLoad("Yuki", "Library");
	LoadInteractions();
	Common_SelfBondageAllowed = false;
	if (C009_Library_Yuki_CurrentStage >= 500) C009_Library_Library_CurrentZone = "008";
	else C009_Library_Library_CurrentZone = "007";
	
	// A few variables on what already happened
	C009_Library_Yuki_PenInHole = C009_Library_Search_PenInHole;
	C009_Library_Yuki_BookAlreadyFound = (C009_Library_Library_BookProgress > 40);
	C009_Library_Yuki_DetentionBondage = GameLogQuery("C001_BeforeClass", "Sidney", "PublicBondage");
	C009_Library_Yuki_DetentionFighting = (GameLogQuery("C001_BeforeClass", "Sidney", "FightVictory") || GameLogQuery("C001_BeforeClass", "Sidney", "FightDefeat"));
	C009_Library_Yuki_IsolationMildred = (GameLogQuery("C002_FirstClass", "Mildred", "Subdue") && GameLogQuery("C006_Isolation", "", "Isolation"));
	C009_Library_Yuki_IsolationYuki = (GameLogQuery("C002_FirstClass", "Yuki", "Drug") && GameLogQuery("C006_Isolation", "", "Isolation"));
	C009_Library_Yuki_IsolationPleasureYuki = GameLogQuery("C006_Isolation", "Yuki", "Pleasure");
	C009_Library_Yuki_IsolationOrgasmYuki = GameLogQuery("C006_Isolation", "Yuki", "Orgasm");
	C009_Library_Yuki_IsolationEarlyReleaseYuki = (GameLogQuery("C006_Isolation", "", "Release") && C009_Library_Yuki_IsolationYuki);
	C009_Library_Yuki_IsolationEscapeYuki = (GameLogQuery("C006_Isolation", "", "Escape") && C009_Library_Yuki_IsolationYuki);
	C009_Library_Yuki_HasEgg = ActorHasInventory("VibratingEgg");

	// The first dialog can be different depending on what happened before
	if ((C009_Library_Yuki_CurrentStage == 0) && C009_Library_Yuki_IsolationOrgasmYuki && C009_Library_Yuki_IsolationEarlyReleaseYuki) C009_Library_Yuki_CurrentStage = 10;
	if ((C009_Library_Yuki_CurrentStage == 0) && C009_Library_Yuki_IsolationEscapeYuki) C009_Library_Yuki_CurrentStage = 20;
	if ((C009_Library_Yuki_CurrentStage == 0) && C009_Library_Yuki_IsolationPleasureYuki && !C009_Library_Yuki_IsolationOrgasmYuki) C009_Library_Yuki_CurrentStage = 30;
	if ((C009_Library_Yuki_CurrentStage == 0) && C009_Library_Yuki_IsolationYuki) C009_Library_Yuki_CurrentStage = 40;
	if ((C009_Library_Yuki_CurrentStage == 0) && C009_Library_Yuki_IsolationMildred) C009_Library_Yuki_CurrentStage = 50;
	if ((C009_Library_Yuki_CurrentStage == 0) && C009_Library_Yuki_DetentionFighting) C009_Library_Yuki_CurrentStage = 60;
	if ((C009_Library_Yuki_CurrentStage == 0) && C009_Library_Yuki_DetentionBondage) C009_Library_Yuki_CurrentStage = 70;

}

// Chapter 9 Library - Yuki Run
function C009_Library_Yuki_Run() {
	BuildInteraction(C009_Library_Yuki_CurrentStage);
	if (C009_Library_Yuki_CurrentStage < 250) DrawInteractionActor();
	if ((C009_Library_Yuki_CurrentStage >= 270) && (C009_Library_Yuki_CurrentStage < 300)) DrawInteractionActor();
	if ((C009_Library_Yuki_CurrentStage >= 300) && (C009_Library_Yuki_CurrentStage < 320)) { DrawActor("Yuki", 480, 0, 1); DrawActor("Player", 720, 0, 1); }
}

// Chapter 9 Library - Yuki Click
function C009_Library_Yuki_Click() {

	// Regular and inventory interactions
	ClickInteraction(C009_Library_Yuki_CurrentStage);
	var ClickInv = GetClickedInventory();
	
	// Allows the player to access the menu if she could leave the scene
	if ((ClickInv == "Player") && (LeaveIcon != "")) {
		C009_Library_Yuki_IntroText = OverridenIntroText;
		InventoryClick(ClickInv, CurrentChapter, CurrentScreen);
	}

}

// Chapter 9 Library - Yuki - When the player leaves to find her book
function C009_Library_Yuki_PlayerLeaveForBook() {
	SetScene(CurrentChapter, "Library");
}

// Chapter 9 Library - Yuki Allow Leaving
function C009_Library_Yuki_AllowLeave() {
	LeaveIcon = "Leave";
}

// Chapter 9 Library - Yuki confiscates the Sweet Gwendoline magazine
function C009_Library_Yuki_NoMoreSweetGwendoline() {
	C009_Library_Search_MagazineConfiscated = true;
}

// Chapter 9 Library - Yuki can help to player to retrieve her pencil if she likes the player
function C009_Library_Yuki_TestForHelp() {
	if (ActorGetValue(ActorLove) >= 0) {
		OverridenIntroText = GetText("AcceptToHelp");
		C009_Library_Yuki_CurrentStage = 220;
		LeaveIcon = "";
	}
}

// Chapter 9 Library - Yuki will restrain the player is she's annoyed 3 times
function C009_Library_Yuki_AnnoyYuki() {
	C009_Library_Yuki_AnnoyCount++;
	if (C009_Library_Yuki_AnnoyCount >= 3) {
		PlayerLockInventory("Armbinder");
		OverridenIntroText = GetText("Annoyed");
		C009_Library_Yuki_CurrentStage = 300;
		LeaveIcon = "";
	}
}

// Chapter 9 Library - Yuki starts to crawl in the hole
function C009_Library_Yuki_CrawlInHole() {
	CurrentTime = CurrentTime + 50000;
}

// Chapter 9 Library - Yuki can get stuck in the hole
function C009_Library_Yuki_StuckInHole() {
	LeaveIcon = "Leave";
	C009_Library_Yuki_CanFindPlayer = false;
	C009_Library_Library_CurrentZone = "008";
}

// Chapter 9 Library - The player can leave for the regular hole scene
function C009_Library_Yuki_LeaveForHole() {
	C009_Library_Library_CurrentZone = "008";
	C009_Library_Search_CurrentStage = 85;
	SetScene(CurrentChapter, "Search");
}

// Chapter 9 Library - When Yuki gags the player
function C009_Library_Yuki_GagPlayer() {
	PlayerLockInventory("Gag");
	CurrentTime = CurrentTime + 50000;
}

// Chapter 9 Library - Wait 2 minutes
function C009_Library_Yuki_TwoMinutes() {
	CurrentTime = CurrentTime + 110000;	
}