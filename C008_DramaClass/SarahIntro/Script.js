var C008_DramaClass_SarahIntro_CurrentStage = 0;
var C008_DramaClass_SarahIntro_AmandaMissing = false;
var C008_DramaClass_SarahIntro_IsDamsel = false;
var C008_DramaClass_SarahIntro_IsFree = true;
var C008_DramaClass_SarahIntro_IsRestrained = false;
var C008_DramaClass_SarahIntro_IsGagged = false;
var C008_DramaClass_SarahIntro_IsPlayRead = false;
var C008_DramaClass_SarahIntro_CanUntie = false;
var C008_DramaClass_SarahIntro_CanUngag = false;
var C008_DramaClass_SarahIntro_SlapDone = false;
var C008_DramaClass_SarahIntro_MasturbateCount = 0;
var C008_DramaClass_SarahIntro_ViolenceDone = false;
var C008_DramaClass_SarahIntro_OrgasmDone = false;

// Calculates the scene parameters
function C008_DramaClass_SarahIntro_CalcParams() {
	C008_DramaClass_SarahIntro_IsRestrained = ActorIsRestrained();
	C008_DramaClass_SarahIntro_IsGagged = ActorIsGagged();
	C008_DramaClass_SarahIntro_IsFree = (!C008_DramaClass_SarahIntro_IsRestrained && !C008_DramaClass_SarahIntro_IsGagged);
	C008_DramaClass_SarahIntro_IsPlayRead = (C008_DramaClass_SarahIntro_IsFree && ((Common_PlayerCrime == "AmandaStranded") || (C008_DramaClass_AmandaIntro_CurrentStage == 20)));
	C008_DramaClass_SarahIntro_CanUntie = (ActorHasInventory("Rope") && !Common_PlayerRestrained);
	C008_DramaClass_SarahIntro_CanUngag = (C008_DramaClass_SarahIntro_IsGagged && !Common_PlayerRestrained);
}

// Chapter 8 - Sarah Intro Load
function C008_DramaClass_SarahIntro_Load() {

	// Load the scene parameters
	ActorLoad("Sarah", "DressingRoom");
	LoadInteractions();
	C008_DramaClass_SarahIntro_CalcParams();
	
	// Check if Amanda is missing for this scene and if Sarah is the damsel
	C008_DramaClass_SarahIntro_AmandaMissing = (Common_PlayerCrime == "AmandaStranded");
	C008_DramaClass_SarahIntro_IsDamsel = (C008_DramaClass_JuliaIntro_SarahRole == "Damsel");
	
	// Sarah can ungag the player if needed at first
	if ((C008_DramaClass_SarahIntro_CurrentStage == 0) && (Common_PlayerGagged))
		C008_DramaClass_SarahIntro_CurrentStage = 100;

}

// Chapter 8 - Sarah Intro Run
function C008_DramaClass_SarahIntro_Run() {
	BuildInteraction(C008_DramaClass_SarahIntro_CurrentStage);
	DrawInteractionActor();
}

// Chapter 8 - Sarah Intro Click
function C008_DramaClass_SarahIntro_Click() {	

	// Regular and inventory interactions
	ClickInteraction(C008_DramaClass_SarahIntro_CurrentStage);
	var ClickInv = GetClickedInventory();
	
	// The player can whip her to help her strip
	if ((ClickInv == "Crop") && (C008_DramaClass_SarahIntro_CurrentStage == 10) && !Common_PlayerRestrained) {
		OveridenIntroText = GetText("CropToStrip");
		C008_DramaClass_SarahIntro_CurrentStage = 20;
		ActorChangeAttitude(0, 1);
		C008_DramaClass_SarahIntro_Strip();
	}

	// The player can whip her to help her find her costume
	if ((ClickInv == "Crop") && (C008_DramaClass_SarahIntro_CurrentStage == 0) && !Common_PlayerRestrained) {
		OveridenIntroText = GetText("CropToSearch");
		C008_DramaClass_SarahIntro_CurrentStage = 10;
		ActorChangeAttitude(0, 1);
		CurrentTime = CurrentTime + 60000;
	}
	
	// Sarah can tease the player if she wants to use a toy on stage 0 or 10
	if (((ClickInv == "Rope") || (ClickInv == "Cuffs") || (ClickInv == "TapeGag") || (ClickInv == "Ballgag") || (ClickInv == "ChastityBelt") || (ClickInv == "VibratingEgg")) && (C008_DramaClass_SarahIntro_CurrentStage < 20))
		OveridenIntroText = GetText("CostumeBeforeFun");

	// Sarah refuses but tease the player on stage 30
	if (((ClickInv == "Rope") || (ClickInv == "Cuffs") || (ClickInv == "TapeGag") || (ClickInv == "Ballgag") || (ClickInv == "ChastityBelt") || (ClickInv == "VibratingEgg")) && (C008_DramaClass_SarahIntro_CurrentStage == 30))
		OveridenIntroText = GetText("CostumeBlocksFun");
	
	// Sarah can be restrained on stage 20
	if (C008_DramaClass_SarahIntro_CurrentStage == 20) {
		ActorApplyRestrain(ClickInv, GetText(ClickInv));
		C008_DramaClass_SarahIntro_CalcParams();
		if (ClickInv == "Crop") C008_DramaClass_SarahIntro_ViolenceDone = true;
	}

}

// Chapter 8 - Sarah Check Ungag - Sarah will ungag the player if she's submissive or loves her
function C008_DramaClass_SarahIntro_CheckUngag() {	
	if ((ActorGetValue(ActorLove)) > 0 || (ActorGetValue(ActorSubmission) > 0)) {
		PlayerUngag();
		OveridenIntroText = GetText("UngagPlayer");
	}
}

// Chapter 8 - Sarah Random Bondage - Sarah can tie up the player if she's not too submissive
function C008_DramaClass_SarahIntro_RandomBondage() {
	if (ActorGetValue(ActorSubmission) <= 2) {
		PlayerRandomBondage();
		OveridenIntroText = GetText("PlayerRandomBondage");
	}
}

// Chapter 8 - Sarah Strip
function C008_DramaClass_SarahIntro_Strip() {
	ActorSetCloth("Underwear");
	CurrentTime = CurrentTime + 60000;
}

// Chapter 8 - Sarah Costume
function C008_DramaClass_SarahIntro_Costume() {
	if (C008_DramaClass_SarahIntro_IsDamsel) ActorSetCloth("Damsel");
	else ActorSetCloth("Heroine");
}

// Chapter 8 - Sarah likes being slapped
function C008_DramaClass_SarahIntro_Slap() {
	if (!C008_DramaClass_SarahIntro_SlapDone) {
		ActorChangeAttitude(1, 0);
		C008_DramaClass_SarahIntro_SlapDone = true;
		C008_DramaClass_SarahIntro_ViolenceDone = true;
	}
}

// Chapter 8 - Sarah spank
function C008_DramaClass_SarahIntro_Spank() {
	C008_DramaClass_SarahIntro_ViolenceDone = true;
}

// Chapter 8 - Sarah Untie
function C008_DramaClass_SarahIntro_Untie() {
	ActorUntie();
}

// Chapter 8 - Sarah Ungag
function C008_DramaClass_SarahIntro_Ungag() {
	ActorUngag();
}

// Chapter 8 - Sarah Masturbate - Only works if restrained and not chaste
function C008_DramaClass_SarahIntro_Masturbate() {
	if (C008_DramaClass_SarahIntro_IsRestrained) {
		if (!ActorIsChaste()) {
			
			// She can get an orgasm with the vibrating egg or if she was hit
			C008_DramaClass_SarahIntro_MasturbateCount++;
			if (C008_DramaClass_SarahIntro_ViolenceDone || ActorHasInventory("VibratingEgg")) {				
				if ((C008_DramaClass_SarahIntro_MasturbateCount >= 3) && !C008_DramaClass_SarahIntro_OrgasmDone) {
					GetText("MasturbateOrgasm");
					ActorAddOrgasm();
					ActorChangeAttitude(1, 0);
					C008_DramaClass_SarahIntro_OrgasmDone = true;
				} else GetText("MasturbateGood");
			} else GetText("Masturbate");
			
		} else OveridenIntroText = GetText("MasturbateBelt");
	}
}

// Chapter 8 - Sarah Start Drama
function C008_DramaClass_SarahIntro_StartDrama() {
	SetScene("C008_DramaClass", "Transition");
}
