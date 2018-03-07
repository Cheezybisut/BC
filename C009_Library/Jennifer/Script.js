var C009_Library_Jennifer_CurrentStage = 0;
var C009_Library_Jennifer_IntroText = "";
var C009_Library_Jennifer_HasEgg = false;

// Chapter 9 Library - Jennifer Load
function C009_Library_Jennifer_Load() {

	// Load the scene parameters
	ActorLoad("Jennifer", "Library");
	LoadInteractions();

	// Sets the starting pose
	ActorSetPose("");
	if (C009_Library_Jennifer_CurrentStage < 200) ActorSetPose("SitCouchLookFront");
	if ((C009_Library_Jennifer_CurrentStage >= 200) && (C009_Library_Jennifer_CurrentStage < 300)) { ActorSetPose("SitCouchLookRight");	Common_PlayerPose = "SitCouchLookLeft"; }
	
	// Recalls the previous text if needed
	if (C009_Library_Jennifer_IntroText != "") OverridenIntroText = C009_Library_Jennifer_IntroText;
	C009_Library_Jennifer_IntroText = "";
	if (ActorHasInventory("VibratingEgg")) {
		C009_Library_Jennifer_HasEgg = true;
		ActorRemoveInventory("VibratingEgg");
	}

}

// Chapter 9 Library - Jennifer Run
function C009_Library_Jennifer_Run() {
	BuildInteraction(C009_Library_Jennifer_CurrentStage);
	if ((C009_Library_Jennifer_CurrentStage <= 190) && !C009_Library_Library_JenniferGone) DrawActor("Jennifer", 600, -150, 1);
	if (C009_Library_Jennifer_CurrentStage >= 200) { DrawActor("Jennifer", 600, 30, 0.6); DrawActor("Player", 850, 30, 0.6); }
}

// Chapter 9 Library - Jennifer Click
function C009_Library_Jennifer_Click() {	

	// Regular and inventory interactions
	ClickInteraction(C009_Library_Jennifer_CurrentStage);
	var ClickInv = GetClickedInventory();
	if (ClickInv == "Player") {
		C009_Library_Jennifer_IntroText = OverridenIntroText;
		InventoryClick(ClickInv, CurrentChapter, CurrentScreen);
	}

}

// Chapter 9 Library - Jennifer query to get the egg back
function C009_Library_Jennifer_QueryEgg() {
	C009_Library_Jennifer_HasEgg = false;
	if ((ActorGetValue(ActorLove) >= 5) || (ActorGetValue(ActorSubmission) >= 5) || (PlayerGetSkillLevel("Seduction") >= 1)) {
		OverridenIntroText = GetText("GetEgg");
		PlayerAddInventory("VibratingEgg");
	}		
}

// Chapter 9 Library - Jennifer - When the player leaves
function C009_Library_Jennifer_PlayerLeave() {
	SetScene(CurrentChapter, "Library");
}

// Chapter 9 Library - Jennifer - When Jennifer leaves
function C009_Library_Jennifer_JenniferLeave() {
	C009_Library_Library_JenniferGone = true;
}

// Chapter 9 Library - Jennifer Leave
function C009_Library_Jennifer_TestSitTogether() {
	if ((ActorGetValue(ActorLove) >= 5) || (ActorGetValue(ActorSubmission) >= 5) || (PlayerGetSkillLevel("Seduction") >= 1)) {
		OverridenIntroText = GetText("SitTogether");
		C009_Library_Jennifer_CurrentStage = 200;
		ActorSetPose("SitCouchLookRight");
		Common_PlayerPose = "SitCouchLookLeft";
	}
}
