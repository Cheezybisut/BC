var C005_GymClass_Jennifer_CurrentStage = 0;
var C005_GymClass_Jennifer_PracticeMode = false;
var C005_GymClass_Jennifer_EasyMode = false;
var C005_GymClass_Jennifer_DefeatedHardMode = false;
var C005_GymClass_Jennifer_DefeatedHardModePerfect = false;
var C005_GymClass_Jennifer_DefeatedHardModeBonus = false;
var C005_GymClass_Jennifer_RopeGiven = false;
var C005_GymClass_Jennifer_EggInside = false;
var C005_GymClass_Jennifer_EggConfirm = false;
var C005_GymClass_Jennifer_EggCommentDone = false;
var C005_GymClass_Jennifer_AdorableCommentDone = false;
var C005_GymClass_Jennifer_CrotchRopeDone = false;
var C005_GymClass_Jennifer_TickleDone = false;
var C005_GymClass_Jennifer_SpankDone = false;
var C005_GymClass_Jennifer_CropDone = false;
var C005_GymClass_Jennifer_CrotchRopePlayerDone = false;
var C005_GymClass_Jennifer_CuddleDone = false;
var C005_GymClass_Jennifer_PlayerHasBallgag = false;
var C005_GymClass_Jennifer_PlayerHasTapeGag = false;
var C005_GymClass_Jennifer_Turnabout = false;

// Chapter 5 - Jennifer Load
function C005_GymClass_Jennifer_Load() {

	// Load the scene parameters
	ActorLoad("Jennifer", "GymClass");
	LoadInteractions();
	StartTimer(11.5 * 60 * 60 * 1000, CurrentChapter, "Outro");
	LeaveIcon = "";
	
	// Jennifer scene specific parameters
	C005_GymClass_Jennifer_EggInside = (ActorHasInventory("VibratingEgg"));
	C005_GymClass_Jennifer_EggConfirm = false;
	C005_GymClass_Jennifer_PlayerHasBallgag = (PlayerHasInventory("Ballgag"));
	C005_GymClass_Jennifer_PlayerHasTapeGag = (PlayerHasInventory("TapeGag"));
	
	// If the player can collect the hard mode bonus (better bonus if the match was perfect)
	if (C005_GymClass_Jennifer_DefeatedHardMode && !C005_GymClass_Jennifer_DefeatedHardModeBonus) {
		ActorChangeAttitude(1, 1);
		if (C005_GymClass_Jennifer_DefeatedHardModePerfect) {
			PlayerAddInventory("Ballgag", 1);
			ActorChangeAttitude(0, 1);
		}
		C005_GymClass_Jennifer_DefeatedHardModeBonus = true;
	}
	
	// If there's no egg, we skip the stage 0
	if (!C005_GymClass_Jennifer_EggInside && (C005_GymClass_Jennifer_CurrentStage == 0))
		C005_GymClass_Jennifer_CurrentStage = 5;

	// If the rope was given, we take it back if there was a defeat
	if ((C005_GymClass_Jennifer_RopeGiven == false) && (C005_GymClass_Jennifer_CurrentStage == 110)) {
		C005_GymClass_Jennifer_RopeGiven = true;
		PlayerAddInventory("Rope", 1);
	}
	
	// If the rope was given, we take it back if there was a defeat
	if ((C005_GymClass_Jennifer_RopeGiven == true) && (C005_GymClass_Jennifer_CurrentStage == 210)) {
		C005_GymClass_Jennifer_RopeGiven = false;
		PlayerRemoveInventory("Rope", 1);
	}

	// If the player won, we restrain Jennifer
	if ((C005_GymClass_Jennifer_CurrentStage == 400) && !ActorHasInventory("Rope") && PlayerHasInventory("Rope")) {
		PlayerRemoveInventory("Rope", 1);
		ActorAddInventory("Rope");		
	}

}

// Chapter 5 - Jennifer Run
function C005_GymClass_Jennifer_Run() {
	BuildInteraction(C005_GymClass_Jennifer_CurrentStage);
}

// Chapter 5 - Jennifer Click
function C005_GymClass_Jennifer_Click() {
	
	// Regular interactions
	ClickInteraction(C005_GymClass_Jennifer_CurrentStage);
	
	// If we want to access player inventory (we can do it at every moment expect when Jennifer is tied up)
	if ((MouseX <= 74) || (C005_GymClass_Jennifer_CurrentStage < 400) || (C005_GymClass_Jennifer_CurrentStage >= 500)) {
		InventoryClick(GetClickedInventory(), "C005_GymClass", "Jennifer");
	}
	else {
		
		// Retrieve which item was clicked
		var ClickInv = GetClickedInventory();

		// When the user wants to use the crop
		if ((ClickInv == "Crop") && ActorHasInventory("Rope") && Common_PlayerNotRestrained) {
			OveridenIntroText = GetText("Crop");
			if (C005_GymClass_Jennifer_CropDone == false) { C005_GymClass_Jennifer_CropDone = true; ActorChangeAttitude(-1, 1); }
			CurrentTime = CurrentTime + 60000;
		}
		
		// When the user wants to use a ballgag	
		if ((ClickInv == "Ballgag") && ActorHasInventory("Rope") && !ActorHasInventory("Ballgag") && Common_PlayerNotRestrained && ((C005_GymClass_Jennifer_CurrentStage == 400) || (C005_GymClass_Jennifer_CurrentStage == 410) || (C005_GymClass_Jennifer_CurrentStage == 430))) {
			OveridenIntroText = GetText("Ballgag");
			C005_GymClass_Jennifer_CurrentStage = 420;
			C005_GymClass_Jennifer_Ungag();
			ActorAddInventory("Ballgag");
			PlayerRemoveInventory("Ballgag", 1);
			CurrentTime = CurrentTime + 60000;
		}

		// When the user wants to use a tape gag
		if ((ClickInv == "TapeGag") && ActorHasInventory("Rope") && !ActorHasInventory("TapeGag") && Common_PlayerNotRestrained && ((C005_GymClass_Jennifer_CurrentStage == 400) ||(C005_GymClass_Jennifer_CurrentStage == 410) || (C005_GymClass_Jennifer_CurrentStage == 420))) {
			OveridenIntroText = GetText("TapeGag");
			C005_GymClass_Jennifer_CurrentStage = 430;
			C005_GymClass_Jennifer_Ungag();
			ActorAddInventory("TapeGag");
			PlayerRemoveInventory("TapeGag", 1);
			CurrentTime = CurrentTime + 60000;
		}		
		
		// When the user wants to use the vibrating egg on Jennifer
		if ((ClickInv == "VibratingEgg") && !ActorHasInventory("VibratingEgg") && ActorHasInventory("Rope") && Common_PlayerNotRestrained) {		
			if (C005_GymClass_Jennifer_EggConfirm == false) {
				C005_GymClass_Jennifer_EggConfirm = true;
				OveridenIntroText = GetText("VibratingEggWarning");
			} else {
				ActorAddInventory("VibratingEgg");
				PlayerRemoveInventory("VibratingEgg", 1);
				ActorChangeAttitude(-1, 0);
				OveridenIntroText = GetText("VibratingEggInsert");
				C005_GymClass_Jennifer_EggInside = true;
			}
		}
		
	}
}

// Chapter 5 - Jennifer Start Practice
function C005_GymClass_Jennifer_StartPractice() {
	C005_GymClass_Jennifer_PracticeMode = true;
	SetScene(CurrentChapter, "GymFight");
}

// Chapter 5 - Jennifer Explain Mobile
function C005_GymClass_Jennifer_ExplainMobile() {
	if (IsMobile) 
		OveridenIntroText = GetText("ExplainMobile");
}

// Chapter 5 - Jennifer Get Rope
function C005_GymClass_Jennifer_GetRope() {
	PlayerAddInventory("Rope", 1);
	C005_GymClass_Jennifer_RopeGiven = true;
}

// Chapter 5 - Jennifer Start Fight
function C005_GymClass_Jennifer_StartFight() {
	C005_GymClass_Jennifer_PracticeMode = false;
	SetScene(CurrentChapter, "GymFight");
}

// Chapter 5 - Jennifer Start the winning fight
function C005_GymClass_Jennifer_StartWinFight(EasyMode) {
	C005_GymClass_Jennifer_EasyMode = EasyMode;
	SetScene(CurrentChapter, "WinFight");
}

// Chapter 5 - Jennifer Start the losing fight
function C005_GymClass_Jennifer_StartLoseFight(EasyMode) {
	C005_GymClass_Jennifer_EasyMode = EasyMode;
	SetScene(CurrentChapter, "LoseFight");
}

// Chapter 5 - Jennifer Egg Comment
function C005_GymClass_Jennifer_EggComment() {
	if (C005_GymClass_Jennifer_EggCommentDone == false) {
		C005_GymClass_Jennifer_EggCommentDone = true;
		ActorChangeAttitude(-1, 1);
	}
}

// Chapter 5 - Jennifer Adorable Comment
function C005_GymClass_Jennifer_AdorableComment() {
	if (C005_GymClass_Jennifer_AdorableCommentDone == false) {
		C005_GymClass_Jennifer_AdorableCommentDone = true;
		ActorChangeAttitude(1, 0);
	}
}

// Chapter 5 - Jennifer Tickle
function C005_GymClass_Jennifer_Tickle() {
	if (C005_GymClass_Jennifer_TickleDone == false) {
		C005_GymClass_Jennifer_TickleDone = true;
		ActorChangeAttitude(-1, 0);
	}
}

// Chapter 5 - Jennifer Spank
function C005_GymClass_Jennifer_Spank() {
	if (C005_GymClass_Jennifer_SpankDone == false) {
		C005_GymClass_Jennifer_SpankDone = true;
		ActorChangeAttitude(0, 1);
	}
}

// Chapter 5 - Jennifer - When the player tries Jennifer Crotch Rope
function C005_GymClass_Jennifer_CrotchRope() {
	if (C005_GymClass_Jennifer_CrotchRopeDone == false) {
		C005_GymClass_Jennifer_CrotchRopeDone = true;
		OveridenIntroText = GetText("CrotchRope");
		C005_GymClass_Jennifer_CurrentStage = parseInt(C005_GymClass_Jennifer_CurrentStage) + 40;
	}
}

// Chapter 5 - Jennifer Ungag
function C005_GymClass_Jennifer_Ungag() {
	ActorRemoveInventory("TapeGag");
	if (ActorHasInventory("Ballgag")) {
		ActorRemoveInventory("Ballgag");
		PlayerAddInventory("Ballgag", 1);
	}
}

// Chapter 5 - Jennifer Release
function C005_GymClass_Jennifer_Release() {
	C005_GymClass_Jennifer_Ungag();
	ActorRemoveInventory("Rope");
	PlayerAddInventory("Rope", 1);
}

// Chapter 5 - Jennifer End Chapter
function C005_GymClass_Jennifer_EndChapter() {
	SetScene(CurrentChapter, "Outro");
}

// Chapter 5 - Tape Gag Player
function C005_GymClass_Jennifer_TapeGagPlayer() {
	PlayerRemoveInventory("TapeGag", 1);
	PlayerLockInventory("TapeGag");
	C005_GymClass_Jennifer_PlayerHasTapeGag = (PlayerHasInventory("TapeGag"));
	CurrentTime = CurrentTime + 50000;
}

// Chapter 5 - Ballgag Player
function C005_GymClass_Jennifer_BallgagPlayer() {
	PlayerRemoveInventory("Ballgag", 1);
	PlayerLockInventory("Ballgag");
	C005_GymClass_Jennifer_PlayerHasBallgag = (PlayerHasInventory("Ballgag"));
	CurrentTime = CurrentTime + 50000;
}

// Chapter 5 - Ungag Player (Jennifer only does if the player is likeable and not submissive))
function C005_GymClass_Jennifer_UngagPlayer() {
	if (ActorGetValue(ActorLove) + ActorGetValue(ActorSubmission) >= 0) {
		OveridenIntroText = GetText("UngagPlayer");
		if (PlayerHasLockedInventory("Ballgag")) {
			PlayerUnlockInventory("Ballgag");
			PlayerAddInventory("Ballgag", 1);
		}
		PlayerUnlockInventory("TapeGag");
		C005_GymClass_Jennifer_CurrentStage = 510;
	}
}

// Chapter 5 - Release Player
function C005_GymClass_Jennifer_ReleasePlayer() {
	CurrentTime = CurrentTime + 50000;
	if (PlayerHasLockedInventory("Ballgag")) {
		PlayerUnlockInventory("Ballgag");
		PlayerAddInventory("Ballgag", 1);
	}
	PlayerUnlockInventory("TapeGag");
	PlayerUnlockInventory("Rope");
	PlayerClothes("Judo");
	C005_GymClass_Jennifer_CurrentStage = 600;
}

// Chapter 5 - Check to Release Player (Jennifer helps or put the player in trouble depending on the relationship)
function C005_GymClass_Jennifer_CheckReleasePlayer() {
	if (ActorGetValue(ActorLove) + ActorGetValue(ActorSubmission) >= 0) {
		OveridenIntroText = GetText("ReleasePlayer");
		C005_GymClass_Jennifer_ReleasePlayer();
	} else {
		if ((ActorGetValue(ActorLove) < 0) && (ActorGetValue(ActorSubmission) < 0)) {
			PlayerLockInventory("Ballgag");
			C005_GymClass_Jennifer_CurrentStage = 520;
			OveridenIntroText = GetText("GagPlayer");
		}
	}
}

// Chapter 5 - Crotch Rope Player
function C005_GymClass_Jennifer_CrotchRopePlayer() {
	if ((C005_GymClass_Jennifer_CrotchRopePlayerDone == false) && PlayerHasLockedInventory("VibratingEgg")) {
		if (Common_PlayerGagged) OveridenIntroText = GetText("PlayerOrgasmGagged");
		else OveridenIntroText = GetText("PlayerOrgasm");
		ActorAddOrgasm();
		CurrentTime = CurrentTime + 50000;
		C005_GymClass_Jennifer_CrotchRopePlayerDone = true;
		C005_GymClass_Jennifer_CurrentStage = parseInt(C005_GymClass_Jennifer_CurrentStage) + 40;
	}
}

// Chapter 5 - Jennifer Cuddle
function C005_GymClass_Jennifer_Cuddle() {
	if (C005_GymClass_Jennifer_CuddleDone == false) {
		C005_GymClass_Jennifer_CuddleDone = true;
		ActorChangeAttitude(1, 0);
	}
}

// Chapter 5 - Jennifer Orgasm
function C005_GymClass_Jennifer_Orgasm() {
	ActorAddOrgasm();
}