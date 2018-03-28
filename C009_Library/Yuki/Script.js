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

// Chapter 9 Library - Yuki Load
function C009_Library_Yuki_Load() {

	// Load the scene parameters
	ActorLoad("Yuki", "Library");
	LoadInteractions();
	Common_SelfBondageAllowed = false;
	C009_Library_Library_CurrentZone = "007";
	
	// A few variables on what already happened
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
	DrawInteractionActor();
}

// Chapter 9 Library - Yuki Click
function C009_Library_Yuki_Click() {

	// Regular and inventory interactions
	ClickInteraction(C009_Library_Yuki_CurrentStage);
	var ClickInv = GetClickedInventory();
	if (ClickInv == "Player") {
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