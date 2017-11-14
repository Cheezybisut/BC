var C008_DramaClass_Heroine_CurrentStage = 100;
var C008_DramaClass_Heroine_PlayerIsHeroine = false;
var C008_DramaClass_Heroine_PlayerIsDamsel = false;
var C008_DramaClass_Heroine_PlayerIsVillain = false;
var C008_DramaClass_Heroine_ForgetLineDone = false;
var C008_DramaClass_Heroine_SnapFingersDone = false;
var C008_DramaClass_Heroine_VillainCanTaunt = false;
var C008_DramaClass_Heroine_CanProposeTrio = false;
var C008_DramaClass_Heroine_IsGagged = false;
var C008_DramaClass_Heroine_DamselCanInteract = false;
var C008_DramaClass_Heroine_DamselCanBeg = false;

// Chapter 8 - Heroine Load
function C008_DramaClass_Heroine_Load() {

	// Checks if the player is the heroine & set the stage to the current global stage
	C008_DramaClass_Heroine_PlayerIsHeroine = (C008_DramaClass_JuliaIntro_PlayerRole == "Heroine");
	C008_DramaClass_Heroine_PlayerIsDamsel = (C008_DramaClass_JuliaIntro_PlayerRole == "Damsel");
	C008_DramaClass_Heroine_PlayerIsVillain = (C008_DramaClass_JuliaIntro_PlayerRole == "Villain");
	if (C008_DramaClass_Heroine_CurrentStage < 300) C008_DramaClass_Heroine_CurrentStage = C008_DramaClass_Theater_GlobalStage;
	C008_DramaClass_Heroine_VillainCanTaunt = (C008_DramaClass_Heroine_PlayerIsVillain && ActorSpecificInBondage("Sarah"));
	C008_DramaClass_Heroine_CanProposeTrio = (C008_DramaClass_Heroine_PlayerIsHeroine && (ActorSpecificGetValue("Sarah", ActorLove) >= 10) && (ActorSpecificGetValue("Amanda", ActorLove) >= 10))

	// Load the scene parameters
	if (!C008_DramaClass_Heroine_PlayerIsHeroine) ActorLoad(C008_DramaClass_Theater_Heroine, "Theater");
	LoadInteractions();
	LeaveIcon = "Leave";
	LeaveScreen = "Theater";
	C008_DramaClass_Heroine_IsGagged = ActorIsGagged();
	C008_DramaClass_Heroine_DamselCanInteract = (C008_DramaClass_Heroine_PlayerIsDamsel && !Common_PlayerGagged);
	C008_DramaClass_Heroine_DamselCanBeg = (C008_DramaClass_Heroine_PlayerIsDamsel && Common_PlayerGagged);

}

// Chapter 8 - Heroine Run
function C008_DramaClass_Heroine_Run() {
	BuildInteraction(C008_DramaClass_Heroine_CurrentStage);
	if ((C008_DramaClass_Heroine_CurrentStage != 226) && (C008_DramaClass_Heroine_CurrentStage != 260) && (C008_DramaClass_Heroine_CurrentStage != 290)) DrawInteractionActor();
}

// Chapter 8 - Heroine Click
function C008_DramaClass_Heroine_Click() {	

	// Regular and inventory interactions
	ClickInteraction(C008_DramaClass_Heroine_CurrentStage);
	var ClickInv = GetClickedInventory();

	// A second rope can be applied on the fight loser before the play is over
	if ((ClickInv == "Rope") && (C008_DramaClass_Heroine_CurrentStage == 280) && C008_DramaClass_Heroine_PlayerIsVillain)
		ActorApplyRestrain(ClickInv);

}

// Chapter 8 - Heroine - Sets the global stage and can alter Julia's mood
function C008_DramaClass_Heroine_GlobalStage(GlobalStage, LoveMod, SubMod) {
	C008_DramaClass_Theater_GlobalStage = GlobalStage;
	if (!C008_DramaClass_Heroine_SnapFingersDone || (SubMod <= 0)) ActorSpecificChangeAttitude("Julia", LoveMod, SubMod);
	if (SubMod > 0) C008_DramaClass_Heroine_SnapFingersDone = true;
	if (LoveMod < 0) C008_DramaClass_Theater_PerfectPlay = false;
	C008_DramaClass_Theater_SetPose();
}

// Chapter 8 - Heroine - When the player forgets her line
function C008_DramaClass_Heroine_ForgetLine() {
	if (!C008_DramaClass_Heroine_ForgetLineDone) {
		C008_DramaClass_Heroine_ForgetLineDone = true;
		C008_DramaClass_Theater_PerfectPlay = false;
		ActorSpecificChangeAttitude("Julia", 0, -1);
	}
}

// Chapter 8 - Heroine - When the heroine kisses the damsel, it finishes the play
function C008_DramaClass_Heroine_FinalKiss() {
	OverridenIntroImage = "../HugImages/HeroineSarahDamselPlayerKiss.jpg";
	ActorSpecificChangeAttitude("Sarah", 2, 0);
	ActorSpecificChangeAttitude("Amanda", -3, 0);
	C008_DramaClass_Theater_GlobalStage = 300;
	C008_DramaClass_Theater_Ending = "Kiss";
}

// Chapter 8 - Heroine - When the heroine hugs the damsel, it finishes the play
function C008_DramaClass_Heroine_FinalHug() {
	OverridenIntroImage = "../HugImages/HeroineSarahDamselPlayerHug.jpg";
	ActorSpecificChangeAttitude("Sarah", 1, 0);
	ActorSpecificChangeAttitude("Amanda", -1, 0);
	C008_DramaClass_Theater_GlobalStage = 300;
	C008_DramaClass_Theater_Ending = "Hug";
}

// Chapter 8 - Heroine - When the damsel kneels for the heroine, it finishes the play
function C008_DramaClass_Heroine_FinalDomme() {
	OverridenIntroImage = "../HugImages/HeroineSarahDamselPlayerDomme.jpg";
	ActorSpecificChangeAttitude("Sarah", 1, -2);
	ActorSpecificChangeAttitude("Amanda", -1, 0);
	C008_DramaClass_Theater_GlobalStage = 300;
	C008_DramaClass_Theater_Ending = "Domme";
}

// Chapter 8 - Heroine - When the heroine proposes a menage a trois, it finishes the play
function C008_DramaClass_Heroine_FinalTrio() {
	OverridenIntroImage = "../HugImages/HeroinePlayerVillainAmandaDamselSarahKiss.jpg";
	ActorSpecificChangeAttitude("Sarah", 1, 0);
	ActorSpecificChangeAttitude("Amanda", 1, 0);
	CurrentActor = "Sarah";
	ActorUntie();
	ActorUngag();
	ActorSetCloth("Damsel");
	CurrentActor = "";
	C008_DramaClass_Theater_GlobalStage = 300;
	C008_DramaClass_Theater_Ending = "Trio";
}

// Chapter 8 - Heroine - When the damsel begs to be released
function C008_DramaClass_Heroine_ReleasePlayer() {
	PlayerClothes("Damsel");
	PlayerUnlockInventory("Rope");
	PlayerUnlockInventory("ClothGag");
	C008_DramaClass_Heroine_DamselCanInteract = true;
	C008_DramaClass_Heroine_DamselCanBeg = false;
}

// Chapter 8 - Heroine - When the damsel surrenders and the play ends with two prisoners
function C008_DramaClass_Heroine_FinalTwoPrisoners() {
	C008_DramaClass_Theater_GlobalStage = 300;
	C008_DramaClass_Theater_Ending = "TwoPrisoners";
}