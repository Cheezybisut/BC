var C009_Library_Jennifer_CurrentStage = 0;
var C009_Library_Jennifer_IntroText = "";
var C009_Library_Jennifer_HasEgg = false;
var C009_Library_Jennifer_CanAskDate = true;
var C009_Library_Jennifer_IsArtist = false;
var C009_Library_Jennifer_CropDone = false;
var C009_Library_Jennifer_AlreadyReleased = false;
var C009_Library_Jennifer_LoadFromPlayerScreen = false;
var C009_Library_Jennifer_IsGagged = false;
var C009_Library_Jennifer_IsRestrained = false;
var C009_Library_Jennifer_CanUntie = false;
var C009_Library_Jennifer_CanUngag = false;
var C009_Library_Jennifer_CanAbuse = false;
var C009_Library_Jennifer_CanKiss = false;
var C009_Library_Jennifer_OrgasmDone = false;
var C009_Library_Jennifer_MastubateCount = 0;
var C009_Library_Jennifer_TickleDone = false;
var C009_Library_Jennifer_KissDone = false;
var C009_Library_Jennifer_SpankDone = false;

// Calculates the scene parameters
function C009_Library_Jennifer_CalcParams() {
	C009_Library_Jennifer_IsGagged = ActorIsGagged();
	C009_Library_Jennifer_IsRestrained = ActorIsRestrained();
	C009_Library_Jennifer_CanUntie = (ActorHasInventory("Rope") && !Common_PlayerRestrained);
	C009_Library_Jennifer_CanUngag = (C009_Library_Jennifer_IsGagged && !Common_PlayerRestrained);
	C009_Library_Jennifer_CanAbuse = (C009_Library_Jennifer_IsRestrained && !Common_PlayerRestrained);
	C009_Library_Jennifer_CanKiss = ((C009_Library_Jennifer_IsRestrained || (ActorGetValue(ActorLove) >= 5) || (PlayerGetSkillLevel("Seduction") >= 1)) && !Common_PlayerGagged && !C009_Library_Jennifer_IsGagged);
	OverridenIntroImage = "";
}

// Sets Jennifer pose depending on the stage
function C009_Library_Jennifer_SetPose() {
	ActorSetPose("");
	Common_PlayerPose = "";
	if ((C009_Library_Jennifer_CurrentStage < 130) || (C009_Library_Jennifer_CurrentStage == 180) || (C009_Library_Jennifer_CurrentStage == 410)) ActorSetPose("SitCouchLookFront");
	if ((C009_Library_Jennifer_CurrentStage >= 130) && (C009_Library_Jennifer_CurrentStage < 155)) ActorSetPose("LayCouchShy");
	if ((C009_Library_Jennifer_CurrentStage >= 155) && (C009_Library_Jennifer_CurrentStage < 180)) ActorSetPose("LayCouch");
	if ((C009_Library_Jennifer_CurrentStage == 171) || (C009_Library_Jennifer_CurrentStage == 174)) ActorSetPose("LayCouchShy");
	if (C009_Library_Jennifer_CurrentStage == 177) ActorSetPose("LayCouchSexy");
	if ((C009_Library_Jennifer_CurrentStage >= 200) && (C009_Library_Jennifer_CurrentStage < 300)) { ActorSetPose("SitCouchLookRight");	Common_PlayerPose = "SitCouchLookLeft"; }
}

// Chapter 9 Library - Jennifer Load
function C009_Library_Jennifer_Load() {

	// Load the scene parameters
	ActorLoad("Jennifer", "Library");
	LoadInteractions();
	C009_Library_Jennifer_IsArtist = (PlayerGetSkillLevel("Arts") >= 1);

	// Do not change the scene parameters if we are loading from the player screen
	if (!C009_Library_Jennifer_LoadFromPlayerScreen) {

		// If the player left Jennifer while she was stripping, she will be clothed when the player comes back, she will also run if left unrestrained
		if (C009_Library_Jennifer_CurrentStage == 400) { ActorSetCloth("Clothed"); C009_Library_Jennifer_CurrentStage = 410; }
		if ((C009_Library_Jennifer_CurrentStage >= 171) && (C009_Library_Jennifer_CurrentStage <= 179)) { ActorSetCloth("Clothed"); C009_Library_Jennifer_CurrentStage = 180; }
		if ((C009_Library_Jennifer_CurrentStage >= 300) && (C009_Library_Jennifer_CurrentStage < 400) && !ActorIsRestrained()) { C009_Library_Library_JenniferGone = true; C009_Library_Jennifer_CurrentStage = 190; }
		C009_Library_Jennifer_SetPose();

	} else C009_Library_Jennifer_LoadFromPlayerScreen = false;
	
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
	if ((C009_Library_Jennifer_CurrentStage < 130) || (C009_Library_Jennifer_CurrentStage == 180) || (C009_Library_Jennifer_CurrentStage == 410)) DrawActor("Jennifer", 600, -150, 1);
	if ((C009_Library_Jennifer_CurrentStage >= 130) && (C009_Library_Jennifer_CurrentStage < 180)) DrawActor("Jennifer", 700, -20, 0.667);
	if ((C009_Library_Jennifer_CurrentStage >= 200) && (C009_Library_Jennifer_CurrentStage < 300)) { DrawActor("Jennifer", 600, 30, 0.6); DrawActor("Player", 850, 30, 0.6); }
	if ((C009_Library_Jennifer_CurrentStage >= 300) && (C009_Library_Jennifer_CurrentStage <= 400)) DrawInteractionActor();
}

// Chapter 9 Library - Jennifer Click
function C009_Library_Jennifer_Click() {	

	// Regular and inventory interactions
	ClickInteraction(C009_Library_Jennifer_CurrentStage);
	var ClickInv = GetClickedInventory();
	if (ClickInv == "Player") {
		C009_Library_Jennifer_LoadFromPlayerScreen = true;
		C009_Library_Jennifer_IntroText = OverridenIntroText;
		InventoryClick(ClickInv, CurrentChapter, CurrentScreen);
	}

	// Jennifer can be restrained on stage 300 to 400
	if ((C009_Library_Jennifer_CurrentStage >= 300) && (C009_Library_Jennifer_CurrentStage < 400) && (ClickInv != "") && (ClickInv != "Player") && !Common_PlayerRestrained) {
	
		// If we must skip the chit chat to get to the action
		if (C009_Library_Jennifer_CurrentStage < 320) C009_Library_Jennifer_CurrentStage = 320;
	
		// Jennifer doesn't like the crop but becomes more submissive
		if ((ClickInv == "Crop") && (!C009_Library_Jennifer_CropDone)) {
			C009_Library_Jennifer_CropDone = true;
			OverridenIntroText = GetText("Crop");
			ActorChangeAttitude(-1, 1);
			return;
		}

		// Jennifer cannot be tied up if she's not at least submissive +5
		if ((ActorGetValue(ActorSubmission) < 5) && (ActorGetValue(ActorSubmission) >= 0) && (ClickInv != "CuffsKey")) {
			OverridenIntroText = GetText("RefuseBondage");
			return;
		}

		// Jennifer turns the table on the player if she's not submissive at all
		if ((ActorGetValue(ActorSubmission) < 0) && (ClickInv != "CuffsKey")) {
			OverridenIntroText = GetText("TurnTablesFromItem");
			C009_Library_Jennifer_RestrainPlayer();
			return;
		}
		
		// Apply the clicked restrain
		ActorApplyRestrain(ClickInv);
		C009_Library_Jennifer_CalcParams();

	}

	// On specific stages where Jennifer is naked, the player can get items to restrain her
	if (((ClickInv == "Rope") || (ClickInv == "Cuffs") || (ClickInv == "BallGag") || (ClickInv == "ClothGag") || (ClickInv == "TapeGag") || (ClickInv == "ChastityBelt") || (ClickInv == "VibratingEgg") || (ClickInv == "Crop") || (ClickInv == "Collar")) && (C009_Library_Jennifer_CurrentStage in {174:1,175:1,176:1,177:1,178:1})) {
		C009_Library_Jennifer_CurrentStage = 300;
		OverridenIntroText = GetText("JumpOffWorry");
		C009_Library_Jennifer_SetPose();
		ActorChangeAttitude(-1, 0);
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
	CurrentTime = CurrentTime + 50000;
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
function C009_Library_Jennifer_Strip(NewCloth) {
	ActorSetCloth(NewCloth);
	C009_Library_Jennifer_SetPose();
	CurrentTime = CurrentTime + 50000;
}

// Chapter 9 Library - When the player asks Jen on a date, special answer at +15 love
function C009_Library_Jennifer_AskDate() {
	C009_Library_Jennifer_CanAskDate = false;
	if (ActorGetValue(ActorLove) >= 15) OverridenIntroText = GetText("GreatDate");
}

// Chapter 9 Library - When the player draws Jennifer
function C009_Library_Jennifer_DrawJennifer(MinutesSpent) {
	if ((CurrentTime + (MinutesSpent * 60000)) <= (15.25 * 60 * 60 * 1000)) {
		CurrentTime = CurrentTime + (MinutesSpent * 60000);
		if ((MinutesSpent == 5) || (MinutesSpent == 15)) ActorChangeAttitude(PlayerGetSkillLevel("Arts"), 0);
		if (MinutesSpent == 30) ActorChangeAttitude(PlayerGetSkillLevel("Arts") + 1, 0);
		if ((MinutesSpent == 15) || (MinutesSpent == 30)) PlayerAddSkill("Arts", 1);
		C009_Library_Jennifer_SetPose();
	} else OverridenIntroText = GetText("NoTimeToDraw");
}

// Chapter 9 Library - Jennifer can restrain the player on a few occasions
function C009_Library_Jennifer_RestrainPlayer() {
	PlayerRandomBondage();
	CurrentTime = CurrentTime + 50000;
	C009_Library_Jennifer_CurrentStage = 400;
}

// Chapter 9 Library - If Jennifer isn't submissive, she can turn the tables on the player
function C009_Library_Jennifer_TestTurnTables() {
	if (ActorGetValue(ActorSubmission) < 0) {
		OverridenIntroText = GetText("TurnTablesFromTalk");
		C009_Library_Jennifer_RestrainPlayer();
	}
}

// Chapter 9 Library - The player can ask Jen to be released once
function C009_Library_Jennifer_TestRelease() {
	if (!C009_Library_Jennifer_AlreadyReleased && (ActorGetValue(ActorLove) >= 3)) {
		OverridenIntroText = GetText("AcceptRelease");
		PlayerReleaseBondage();
		ActorChangeAttitude(0, -2);
		C009_Library_Jennifer_AlreadyReleased = true;
	}
}

// Chapter 9 Library - Jennifer Tickle
function C009_Library_Jennifer_Tickle() {
	C009_Library_Jennifer_CalcParams();
	if (!C009_Library_Jennifer_TickleDone) {
		ActorChangeAttitude(-1, 0);
		C009_Library_Jennifer_TickleDone = true;
	}
}

// Chapter 9 Library - Jennifer Masturbate
function C009_Library_Jennifer_Masturbate() {
	C009_Library_Jennifer_CalcParams();
	C009_Library_Jennifer_MastubateCount++;
	if (ActorGetValue(ActorLove) >= 5) {
		if ((C009_Library_Jennifer_MastubateCount >= 3) && !C009_Library_Jennifer_OrgasmDone) {
			ActorAddOrgasm();
			ActorChangeAttitude(1, 0);
			C009_Library_Jennifer_OrgasmDone = true;
			OverridenIntroImage = "CouchLove.jpg";
			OverridenIntroText = GetText("MasturbateJenniferOrgasm");
		} else OverridenIntroText = GetText("MasturbateJenniferLove");
	} else OverridenIntroText = GetText("MasturbateJenniferNoLove");
}

// Chapter 9 Library - Jennifer untie
function C009_Library_Jennifer_Untie() {
	C009_Library_Jennifer_CalcParams();
	ActorUntie();
}

// Chapter 9 Library - Jennifer ungag
function C009_Library_Jennifer_Ungag() {
	C009_Library_Jennifer_CalcParams();
	ActorUngag();
}

// Chapter 9 Library - Jennifer kiss
function C009_Library_Jennifer_Kiss() {
	C009_Library_Jennifer_CalcParams();
	if (!C009_Library_Jennifer_KissDone && (PlayerGetSkillLevel("Seduction") >= 1)) {
		ActorChangeAttitude(1, 0);
		C009_Library_Jennifer_KissDone = true;
		OverridenIntroText = GetText("GreatKiss");
	}
}

// Chapter 9 Library - Jennifer spank
function C009_Library_Jennifer_Spank() {
	C009_Library_Jennifer_CalcParams();
	if (!C009_Library_Jennifer_SpankDone) {
		ActorChangeAttitude(-1, 1);
		C009_Library_Jennifer_SpankDone = true;
	}
}