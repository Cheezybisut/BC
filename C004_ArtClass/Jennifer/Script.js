var C004_ArtClass_Jennifer_CurrentStage = 0;
var C004_ArtClass_Jennifer_JuliaStrip = false;
var C004_ArtClass_Jennifer_UnderwearDone = false;
var C004_ArtClass_Jennifer_NakedDone = false;
var C004_ArtClass_Jennifer_RopeDone = false;
var C004_ArtClass_Jennifer_GagDone = false;
var C004_ArtClass_Jennifer_KissReady = true;
var C004_ArtClass_Jennifer_TightenDone = false;
var C004_ArtClass_Jennifer_TickleDone = false;
var C004_ArtClass_Jennifer_CropDone = false;
var C004_ArtClass_Jennifer_TrustCommentDone = false;
var C004_ArtClass_Jennifer_EggCommentDone = false;
var C004_ArtClass_Jennifer_CanBegForRelease = false;
var C004_ArtClass_Jennifer_PityDone = false;
var C004_ArtClass_Jennifer_EggConfirm = false;
var C004_ArtClass_Jennifer_EggInside = false;

// Chapter 4 - Jennifer Load
function C004_ArtClass_Jennifer_Load() {

	// Load the scene parameters	
	ActorLoad("Jennifer", "ArtRoom");
	LoadInteractions();
	C004_ArtClass_Jennifer_EggConfirm = false;
	C004_ArtClass_Jennifer_JuliaStrip = (C004_ArtClass_ArtRoom_JuliaStage >= 2);
	
	// Jumps to the correct stage
	if ((C004_ArtClass_ArtRoom_ExtraModel == "Jennifer") && (C004_ArtClass_Jennifer_CurrentStage < 100)) C004_ArtClass_Jennifer_CurrentStage = 100;
	if ((C004_ArtClass_ArtRoom_ExtraModel != "") && (C004_ArtClass_ArtRoom_ExtraModel != "Jennifer")) C004_ArtClass_Jennifer_CurrentStage = 80;

	// If we allow the player to beg to be released
	C004_ArtClass_Jennifer_CanBegForRelease = ((C004_ArtClass_ArtRoom_ExtraModel == "Player") && Common_PlayerRestrained && Common_PlayerNotGagged);
	
}

// Chapter 4 - Jennifer Run
function C004_ArtClass_Jennifer_Run() {
	BuildInteraction(C004_ArtClass_Jennifer_CurrentStage);
}

// Chapter 4 - Jennifer Click
function C004_ArtClass_Jennifer_Click() {

	// Regular interactions
	ClickInteraction(C004_ArtClass_Jennifer_CurrentStage);
	var ClickInv = GetClickedInventory();

	// When the user wants to use any item and bondage isn't allowed
	if (!Common_BondageAllowed && ((ClickInv == "Rope") || (ClickInv == "Ballgag") || (ClickInv == "TapeGag") || (ClickInv == "Crop") || (ClickInv == "Cuffs") || (ClickInv == "VibratingEgg")) && Common_PlayerNotRestrained)
		OveridenIntroText = "(She pushes you back.)  What are|you doing?  We are supposed to paint.";

	// The player can convince Jennifer to help with a crop
	if (!Common_BondageAllowed && (C004_ArtClass_Jennifer_CurrentStage == 50) && (ClickInv == "Crop") && Common_PlayerNotRestrained) {
		C004_ArtClass_Jennifer_SandroComment();
		OveridenIntroText = "(You whip her quick.)  Ow!  Let me think.|Tell her of Sandro Botticelli The Birth of Venus.";
		ActorChangeAttitude(-1, 1);
		C004_ArtClass_Jennifer_CurrentStage = 60;
		CurrentTime = CurrentTime + 60000;
	}
	
	// When the user wants to use the rope
	if (Common_BondageAllowed && (C004_ArtClass_Jennifer_CurrentStage >= 120) && (ClickInv == "Rope") && !ActorHasInventory("Rope") && Common_PlayerNotRestrained) {
		if (ActorGetValue(ActorSubmission) < 3) {
			OveridenIntroText = "(She pushes you back and stares at you.)|Oh no!  you're not tying me up."			
		} else {
			OveridenIntroText = "(She tries to stop you but you overpower|her and restrain her body and arms.)";
			C004_ArtClass_Jennifer_CurrentStage = 130;
			C004_ArtClass_ArtRoom_JenniferStage = 3;
			ActorAddInventory("Rope");
			PlayerRemoveInventory("Rope", 1);
			CurrentTime = CurrentTime + 60000;
		}
	}
	
	// When the user wants to use a gag without tying her
	if (Common_BondageAllowed && ((ClickInv == "Ballgag") || (ClickInv == "TapeGag")) && !ActorHasInventory("Rope") && !ActorHasInventory("Ballgag") && !ActorHasInventory("TapeGag") && Common_PlayerNotRestrained)
		OveridenIntroText = "(She pushes your hand away.)  Oh no!";
		
	// When the user wants to use a ballgag	
	if (Common_BondageAllowed && (ClickInv == "Ballgag") && ActorHasInventory("Rope") && !ActorHasInventory("Ballgag") && Common_PlayerNotRestrained) {
		OveridenIntroText = "(She shuts her mouth so you have to|push it hard to be strap it in.)";
		C004_ArtClass_Jennifer_CurrentStage = 140;
		C004_ArtClass_Jennifer_Ungag();
		C004_ArtClass_ArtRoom_JenniferStage = 4;
		ActorAddInventory("Ballgag");
		PlayerRemoveInventory("Ballgag", 1);
		CurrentTime = CurrentTime + 60000;
	}

	// When the user wants to use a tape gag
	if (Common_BondageAllowed && (ClickInv == "TapeGag") && ActorHasInventory("Rope") && !ActorHasInventory("TapeGag") && Common_PlayerNotRestrained) {
		OveridenIntroText = "(She shakes her head from left to right|but you finally manage to tape her mouth.)";
		C004_ArtClass_Jennifer_CurrentStage = 150;
		C004_ArtClass_Jennifer_Ungag();
		C004_ArtClass_ArtRoom_JenniferStage = 5;
		ActorAddInventory("TapeGag");
		PlayerRemoveInventory("TapeGag", 1);
		CurrentTime = CurrentTime + 60000;
	}

	// When the user wants to use the crop
	if (Common_BondageAllowed && (ClickInv == "Crop") && ActorHasInventory("Rope") && Common_PlayerNotRestrained) {
		OveridenIntroText = "(You whip her with the crop a few|times.  She screams and cries in pain.)";
		if (C004_ArtClass_Jennifer_CropDone == false) { C004_ArtClass_Jennifer_CropDone = true; ActorChangeAttitude(-1, 1); }
		CurrentTime = CurrentTime + 60000;
	}
	
	// When the user wants to use the vibrating egg on Jennifer
	if (Common_BondageAllowed && (ClickInv == "VibratingEgg") && !ActorHasInventory("VibratingEgg") && ActorHasInventory("Rope") && Common_PlayerNotRestrained) {		
		if (C004_ArtClass_Jennifer_EggConfirm == false) {
			C004_ArtClass_Jennifer_EggConfirm = true;
			OveridenIntroText = "(You might not be able to recover the egg if|you insert it in Jennifer, click on it again to do it.)";
		} else {
			ActorAddInventory("VibratingEgg");
			PlayerRemoveInventory("VibratingEgg", 1);
			ActorChangeAttitude(-1, 0);
			OveridenIntroText = "(Jennifer sees the egg and tries to move away but|you're able to insert it.  She now trembles randomly.)";
			C004_ArtClass_Jennifer_EggInside = true;
		}
	}

}

// Chapter 4 - Jennifer Sandro Comment - Start Julia Stage 1
function C004_ArtClass_Jennifer_SandroComment() {
	if (C004_ArtClass_ArtRoom_JuliaStage == 0) 
		C004_ArtClass_ArtRoom_JuliaStage = 1;
}

// Chapter 4 - Jennifer Set Clothes Level
function C004_ArtClass_Jennifer_SetCloth(Stage, LoveMod, SubMod) {
	C004_ArtClass_ArtRoom_JenniferStage = Stage;
	if ((Stage == 1) && (C004_ArtClass_Jennifer_UnderwearDone == false)) { C004_ArtClass_Jennifer_UnderwearDone = true; ActorChangeAttitude(LoveMod, SubMod); }
	if ((Stage == 2) && (C004_ArtClass_Jennifer_NakedDone == false)) { C004_ArtClass_Jennifer_NakedDone = true; ActorChangeAttitude(LoveMod, SubMod); }
	if ((Stage == 3) && (C004_ArtClass_Jennifer_RopeDone == false)) { C004_ArtClass_Jennifer_RopeDone = true; ActorChangeAttitude(LoveMod, SubMod); }
	if ((Stage == 4) && (C004_ArtClass_Jennifer_GagDone == false)) { C004_ArtClass_Jennifer_GagDone = true; ActorChangeAttitude(LoveMod, SubMod); }
}

// Chapter 4 - Jennifer Untie
function C004_ArtClass_Jennifer_Untie() {
	C004_ArtClass_ArtRoom_JenniferStage = 2;
	ActorRemoveInventory("Rope");
	PlayerAddInventory("Rope", 1);
}

// Chapter 4 - Jennifer Ungag
function C004_ArtClass_Jennifer_Ungag() {
	C004_ArtClass_ArtRoom_JenniferStage = 3;
	if (ActorHasInventory("Ballgag")) {
		PlayerAddInventory("Ballgag", 1);
		ActorRemoveInventory("Ballgag");
	}
	ActorRemoveInventory("TapeGag");
}

// Chapter 4 - Jennifer Kiss
function C004_ArtClass_Jennifer_Kiss() {
	C004_ArtClass_Jennifer_KissReady = false;
	if (Common_PlayerGagged) OveridenIntroText = "(You try to kiss her with your gag|but it only creates an awkward situation.)"
}

// Chapter 4 - Jennifer Tighten
function C004_ArtClass_Jennifer_Tighten() {
	if (Common_PlayerNotRestrained) {
		if (C004_ArtClass_Jennifer_TightenDone == false) {
			if (C004_ArtClass_Jennifer_CurrentStage >= 140) OveridenIntroText = "(You tighten the knots while she|struggles and seems very nervous.)";
			else OveridenIntroText = "Aaargh!  Be careful!|(She seems very nervous.)";
			ActorChangeAttitude(-1, 1);
			C004_ArtClass_Jennifer_TightenDone = true;
		}
	} else {
		OveridenIntroText = "(You try to tighten Jennifer's bondage|but fail as the other students giggle.)";
	}
}

// Chapter 4 - Jennifer Tickle
function C004_ArtClass_Jennifer_Tickle() {
	if (C004_ArtClass_Jennifer_TickleDone == false) {
		if (Common_PlayerNotRestrained) OveridenIntroText = "(You tickle her in front of the class.|She cowers in shame and tries to kick you.)";
		else OveridenIntroText = "(You fumble a little but manage to tickle her.|She cowers in shame and tries to kick you..)";
		ActorChangeAttitude(-1, 0);
		C004_ArtClass_Jennifer_TickleDone = true;
	}
}

// Chapter 4 - Jennifer Trust Comment
function C004_ArtClass_Jennifer_TrustComment() {
	if (C004_ArtClass_Jennifer_TrustCommentDone == false) {
		C004_ArtClass_Jennifer_TrustCommentDone = true;
		ActorChangeAttitude(1, 0);
		OveridenIntroText = "I'll try to trust you then.|All of this is making me nervous.";
	}
}

// Chapter 4 - Jennifer Egg Comment
function C004_ArtClass_Jennifer_EggComment() {
	if (C004_ArtClass_Jennifer_EggCommentDone == false) {
		C004_ArtClass_Jennifer_EggCommentDone = true;
		ActorChangeAttitude(0, 1);
		OveridenIntroText = "But, but, but.  I, I.  Ok.|(She bows her head.)";
	}
}

// Chapter 4 - Jennifer Beg for Release
function C004_ArtClass_Jennifer_BegForRelease() {
	if (ActorGetValue(ActorLove) >= 3) {
		OveridenIntroText = "(She blushes and steps up to untie you.)|Here you go my friend, I bet that was humiliating.";
		PlayerUnlockInventory("Rope");
		PlayerAddInventory("Rope", 1);
		C004_ArtClass_Jennifer_CanBegForRelease = false;
		CurrentTime = CurrentTime + 60000;
	} else {
		OveridenIntroText = "(She's too nervous to move up to help you.)|(You need 3 love or more to get help from her.)";
	}
}

// Chapter 4 - Jennifer Pity
function C004_ArtClass_Jennifer_PityComment() {
	if (C004_ArtClass_Jennifer_PityDone == false) {
		ActorChangeAttitude(1, 0);
		C004_ArtClass_Jennifer_PityDone = true;
	}
}
