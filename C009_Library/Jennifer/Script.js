var C009_Library_Jennifer_CurrentStage = 0;
var C009_Library_Jennifer_IntroText = "";
var C009_Library_Jennifer_HasEgg = false;
var C009_Library_Jennifer_CanAskDate = true;

// Sets Jennifer pose depending on the stage
function C009_Library_Jennifer_SetPose() {
	ActorSetPose("");
	Common_PlayerPose = "";
	if ((C009_Library_Jennifer_CurrentStage < 130) || (C009_Library_Jennifer_CurrentStage == 180)) ActorSetPose("SitCouchLookFront");
	if ((C009_Library_Jennifer_CurrentStage >= 130) && (C009_Library_Jennifer_CurrentStage < 180)) ActorSetPose("LayCouch");
	if ((C009_Library_Jennifer_CurrentStage >= 200) && (C009_Library_Jennifer_CurrentStage < 300)) { ActorSetPose("SitCouchLookRight");	Common_PlayerPose = "SitCouchLookLeft"; }
}

// Chapter 9 Library - Jennifer Load
function C009_Library_Jennifer_Load() {

	// Load the scene parameters
	ActorLoad("Jennifer", "Library");
	LoadInteractions();

	// If the player left Jennifer while she was stripping, she will be clothed when the player comes back
	if ((C009_Library_Jennifer_CurrentStage >= 171) && (C009_Library_Jennifer_CurrentStage <= 179)) { ActorSetCloth("Clothed"); C009_Library_Jennifer_CurrentStage = 180; }
	C009_Library_Jennifer_SetPose();
	
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
	if (((C009_Library_Jennifer_CurrentStage < 130) || (C009_Library_Jennifer_CurrentStage == 180)) && !C009_Library_Library_JenniferGone) DrawActor("Jennifer", 600, -150, 1);
	if ((C009_Library_Jennifer_CurrentStage >= 130) && (C009_Library_Jennifer_CurrentStage < 180) && !C009_Library_Library_JenniferGone) DrawActor("Jennifer", 700, -20, 0.667);
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

// Chapter 9 Library - Jennifer - When the player wants to sit with her
function C009_Library_Jennifer_TestSitTogether() {
	if ((ActorGetValue(ActorLove) >= 5) || (ActorGetValue(ActorSubmission) >= 5) || (PlayerGetSkillLevel("Seduction") >= 1)) {
		OverridenIntroText = GetText("SitTogether");
		C009_Library_Jennifer_CurrentStage = 200;
		C009_Library_Jennifer_SetPose();
	}
}

// Chapter 9 Library - Jennifer when a new pose should be triggered
function C009_Library_Jennifer_NewPose() {
	C009_Library_Jennifer_SetPose();
}

// Chapter 9 Library - When Jennifer strips to her underwear
function C009_Library_Jennifer_StripUnderwear() {
	ActorSetCloth("Underwear");
	CurrentTime = CurrentTime + 50000;
}

// Chapter 9 Library - When the player asks Jen on a date, special answer at +15 love
function C009_Library_Jennifer_AskDate() {
	C009_Library_Jennifer_CanAskDate = false;
	if (ActorGetValue(ActorLove) >= 15) OverridenIntroText = GetText("GreatDate");
}