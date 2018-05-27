var C101_KinbakuClub_SlaveTwin_CurrentStage = 0;
var C101_KinbakuClub_SlaveTwin_TwinCaptured = false;
var C101_KinbakuClub_SlaveTwin_KidnappedTwin = "";			// The name of the kidnapped twin
var C101_KinbakuClub_SlaveTwin_TwinGagged = false;
var C101_KinbakuClub_SlaveTwin_TwinRestrained = false;
var C101_KinbakuClub_SlaveTwin_Kneeling = false;
var C101_KinbakuClub_SlaveTwin_TiedLegs = true;
var C101_KinbakuClub_SlaveTwin_Barefoot = false;
var C101_KinbakuClub_SlaveTwin_TiedAsymmetric = false;
var C101_KinbakuClub_SlaveTwin_TiedElbowsTouching = false;
var C101_KinbakuClub_SlaveTwin_Blushing = false;
var C101_KinbakuClub_SlaveTwin_SkirtPullDone = false;		// true after first time trying to remove skirt
var C101_KinbakuClub_SlaveTwin_SkirtRemoved = false;
var C101_KinbakuClub_SlaveTwin_UniformRemoved = false;
var C101_KinbakuClub_SlaveTwin_Blinded = false;
var C101_KinbakuClub_SlaveTwin_PlayerIsTooSubmissive = false;
var C101_KinbakuClub_SlaveTwin_PlayerHasArmbinder = false;
var C101_KinbakuClub_SlaveTwin_PlayerHasRope = false;
var C101_KinbakuClub_SlaveTwin_Jenna = true;				// false after talking about Jenna
var C101_KinbakuClub_SlaveTwin_Compliment = true;			// false after complimenting the twin
var C101_KinbakuClub_SlaveTwin_YouEnjoyIt = true;			// false after asking if she enjoys it
var C101_KinbakuClub_SlaveTwin_Underwear = false;			// true after exposing underwear and false after commenting on it
var C101_KinbakuClub_SlaveTwin_BoyfriendAlreadyMentioned = false; // used to prevent repeating boyfriend bondage conversation.
var C101_KinbakuClub_SlaveTwin_Boyfriend = false;			// true after she mentions him and false after talking about her boyfriend
var C101_KinbakuClub_SlaveTwin_BondageCompliment = true;	// false after saying the bondage suits the twin

// Calculates the scene parameters
function C101_KinbakuClub_SlaveTwin_CalcParams() {
	C101_KinbakuClub_SlaveTwin_TwinGagged = ActorIsGagged();
	C101_KinbakuClub_SlaveTwin_TwinRestrained = ActorIsRestrained();
	C101_KinbakuClub_SlaveTwin_TiedLegs = ActorHasInventory("TwoRopes");
	C101_KinbakuClub_SlaveTwin_UniformRemoved = ActorGetValue(ActorCloth) == "Underwear";
	C101_KinbakuClub_SlaveTwin_Blinded = ActorHasInventory("Blindfold");
	C101_KinbakuClub_SlaveTwin_PlayerIsTooSubmissive = ActorGetValue(ActorSubmission) < -2;
	C101_KinbakuClub_SlaveTwin_PlayerHasArmbinder = PlayerHasInventory("Armbinder");
	C101_KinbakuClub_SlaveTwin_PlayerHasRope = PlayerHasInventory("Rope")
}

// Chapter 101 - SlaveTwin Load
function C101_KinbakuClub_SlaveTwin_Load() {

	if (!C101_KinbakuClub_SlaveTwin_TwinCaptured) {
		if (C101_KinbakuClub_RopeGroup_LeftTwinKidnapped) {
			C101_KinbakuClub_SlaveTwin_KidnappedTwin = C101_KinbakuClub_RopeGroup_LeftTwin;
			C101_KinbakuClub_SlaveTwin_TiedElbowsTouching = true;
		}
		else {
			C101_KinbakuClub_SlaveTwin_KidnappedTwin = C101_KinbakuClub_RopeGroup_RightTwin;
			C101_KinbakuClub_SlaveTwin_TiedAsymmetric = true;
		}
		C101_KinbakuClub_SlaveTwin_TwinCaptured = true;
	}

	ActorLoad(C101_KinbakuClub_SlaveTwin_KidnappedTwin, "ClubRoom4");

	if (C101_KinbakuClub_SlaveTwin_CurrentStage == 0) {
		ActorAddInventory("Rope");
		ActorAddInventory("TwoRopes");
		ActorAddInventory("BallGag");
		LeaveIcon = "";
	}

	if (C101_KinbakuClub_SlaveTwin_CurrentStage == 15) C101_KinbakuClub_SlaveTwin_CurrentStage = 10;
	if (C101_KinbakuClub_SlaveTwin_CurrentStage >= 21) C101_KinbakuClub_SlaveTwin_CurrentStage = 20;
	if (C101_KinbakuClub_SlaveTwin_CurrentStage == 20) LucyCheck();
	if (Common_PlayerRestrained) {
		C101_KinbakuClub_SlaveTwin_CurrentStage = 5;
		if (ActorHasInventory("Blindfold")) C101_KinbakuClub_SlaveTwin_CurrentStage = 6;
	}
	if (!Common_PlayerRestrained && (C101_KinbakuClub_SlaveTwin_CurrentStage == 5 || C101_KinbakuClub_SlaveTwin_CurrentStage == 6)) C101_KinbakuClub_SlaveTwin_CurrentStage = 10;
	
	LoadInteractions();
	C101_KinbakuClub_SlaveTwin_CalcParams();
}

// Chapter 101 - SlaveTwin Run
function C101_KinbakuClub_SlaveTwin_Run() {
	BuildInteraction(C101_KinbakuClub_SlaveTwin_CurrentStage);

	
	// Build image when twin is locked in manacle collar
	if (C101_KinbakuClub_SlaveTwin_CurrentStage >= 5 && C101_KinbakuClub_SlaveTwin_CurrentStage <= 390) {

		if (!C101_KinbakuClub_SlaveTwin_Kneeling) {
			// Legs
			var TwinLegs = "";
			if (C101_KinbakuClub_SlaveTwin_TiedLegs) TwinLegs = "Tied";
			if (!C101_KinbakuClub_SlaveTwin_TiedLegs) TwinLegs = "Untied";
			DrawImage(CurrentChapter + "/" + CurrentScreen + "/TwinLegs" + TwinLegs + ".png", 820, 400);

			// Chastity belt
			if (ActorSpecificHasInventory(C101_KinbakuClub_SlaveTwin_KidnappedTwin, "ChastityBelt")) DrawImage(CurrentChapter + "/" + CurrentScreen + "/TwinChastityBelt.png", 830, 405);

			// Torso
			var TwinTorso = "Uniform";
			if (ActorSpecificGetValue(C101_KinbakuClub_SlaveTwin_KidnappedTwin, ActorCloth) == "Underwear") TwinTorso = "Underwear";
			if (!ActorSpecificIsRestrained(C101_KinbakuClub_SlaveTwin_KidnappedTwin)) TwinTorso = TwinTorso + "NoBondage";
			if (ActorSpecificHasInventory(C101_KinbakuClub_SlaveTwin_KidnappedTwin, "Rope")) {
				if (C101_KinbakuClub_SlaveTwin_TiedAsymmetric) TwinTorso = TwinTorso + "AsymmetricTie";
				if (C101_KinbakuClub_SlaveTwin_TiedElbowsTouching) TwinTorso = TwinTorso + "ElbowTie";
				if (!C101_KinbakuClub_SlaveTwin_TiedAsymmetric && !C101_KinbakuClub_SlaveTwin_TiedElbowsTouching) TwinTorso = TwinTorso + "BoxTie";
			}
			if (ActorSpecificHasInventory(C101_KinbakuClub_SlaveTwin_KidnappedTwin, "Cuffs")) TwinTorso = TwinTorso + "Cuffs";
			if (ActorSpecificHasInventory(C101_KinbakuClub_SlaveTwin_KidnappedTwin, "Armbinder")) TwinTorso = TwinTorso + "Armbinder";
			if (ActorSpecificHasInventory(C101_KinbakuClub_SlaveTwin_KidnappedTwin, "Manacles")) TwinTorso = TwinTorso + "Manacles";
			DrawImage(CurrentChapter + "/" + CurrentScreen + "/Twin" + TwinTorso + ".png", 770, 0);

			// Extras
			if (ActorSpecificGetValue(C101_KinbakuClub_SlaveTwin_KidnappedTwin, ActorCloth) == "Underwear" && ActorSpecificHasInventory(C101_KinbakuClub_SlaveTwin_KidnappedTwin, "ChastityBelt")) DrawImage(CurrentChapter + "/" + CurrentScreen + "/TwinChastityBelt.png", 830, 405);
			if (C101_KinbakuClub_SlaveTwin_Blushing) DrawImage(CurrentChapter + "/" + CurrentScreen + "/TwinBlush.png", 850, 130);
			if (ActorSpecificHasInventory(C101_KinbakuClub_SlaveTwin_KidnappedTwin, "Blindfold")) DrawImage(CurrentChapter + "/" + CurrentScreen + "/TwinBlindfold.png", 845, 105);
			if (ActorSpecificHasInventory(C101_KinbakuClub_SlaveTwin_KidnappedTwin, "BallGag")) DrawImage(CurrentChapter + "/" + CurrentScreen + "/TwinBallGag.png", 855, 65);
			if (ActorSpecificHasInventory(C101_KinbakuClub_SlaveTwin_KidnappedTwin, "ClothGag")) DrawImage(CurrentChapter + "/" + CurrentScreen + "/TwinClothGag.png", 850, 151);
			if (ActorSpecificHasInventory(C101_KinbakuClub_SlaveTwin_KidnappedTwin, "TapeGag")) DrawImage(CurrentChapter + "/" + CurrentScreen + "/TwinTapeGag.png", 867, 157);
			if (!C101_KinbakuClub_SlaveTwin_SkirtRemoved) DrawImage(CurrentChapter + "/" + CurrentScreen + "/TwinSkirt.png", 798, 385);
			if (!ActorSpecificIsRestrained(C101_KinbakuClub_SlaveTwin_KidnappedTwin)) DrawImage(CurrentChapter + "/" + CurrentScreen + "/TwinNoBondageHand.png", 770, 365);
		}

		if (C101_KinbakuClub_SlaveTwin_Kneeling) {
			// OverridenIntroImage = "TwinKneelingBackground.jpg";
		}
	}
}

// Chapter 101 - SlaveTwin Click
function C101_KinbakuClub_SlaveTwin_Click() {

	// Regular and inventory interactions
	ClickInteraction(C101_KinbakuClub_SlaveTwin_CurrentStage);
	var ClickInv = GetClickedInventory();
	
	if (C101_KinbakuClub_SlaveTwin_CurrentStage >= 10 && C101_KinbakuClub_SlaveTwin_CurrentStage <= 390 && (ActorIsRestrained() || !C101_KinbakuClub_SlaveTwin_PlayerIsTooSubmissive)) {
		
		//Cuffs key removes all gags and ropes
		if ((ClickInv == "CuffsKey") && ActorHasInventory("Cuffs")) {
			ActorUngag();
			if (C101_KinbakuClub_SlaveTwin_TiedLegs) {
				C101_KinbakuClub_SlaveTwin_TiedLegs = false;
				ActorRemoveInventory("TwoRopes");
				PlayerAddInventory("Rope", 1);
			}
		}
		
		ActorApplyRestrain(ClickInv);

		// Applying rope
		if (ClickInv == "Rope" && !ActorIsRestrained()) {
			C101_KinbakuClub_SlaveTwin_CurrentStage = 15;
			OverridenIntroText = GetText("RopeHow");
		}

		// Apply leg ropes when twin has cuffs or armbinder
		if ((ClickInv == "Rope") && ActorIsRestrained()) ActorApplyRestrain("TwoRopes");

		// Applying chastity belt
		if (ClickInv == "ChastityBelt" && !ActorIsChaste() && C101_KinbakuClub_SlaveTwin_SkirtRemoved){
			if (!ActorIsRestrained() && ActorGetValue(ActorSubmission) < 2) OverridenIntroText = GetText("NoItem");
			else {
				if (C101_KinbakuClub_SlaveTwin_TiedLegs) OverridenIntroText = GetText("NotChastable");
				if (!C101_KinbakuClub_SlaveTwin_TiedLegs) {
					OverridenIntroText = GetText("FitChastityBelt");
					PlayerRemoveInventory("ChastityBelt", 1);
					ActorAddInventory("ChastityBelt");
					ActorChangeAttitude(0, 1);
					CurrentTime = CurrentTime + 60000;
				}
			}
		}

		// Applying vibrating egg
		if (ClickInv == "VibratingEgg" && !ActorIsChaste() && C101_KinbakuClub_SlaveTwin_SkirtRemoved && !ActorHasInventory("VibratingEgg")){
			if (!ActorIsRestrained() && ActorGetValue(ActorSubmission) < 2) OverridenIntroText = GetText("NoItem");
			else {
				OverridenIntroText = GetText("FitVibratingEgg");
				PlayerRemoveInventory("VibratingEgg", 1);
				ActorAddInventory("VibratingEgg");
				ActorChangeAttitude(0, 1);
				CurrentTime = CurrentTime + 30000;
			}
		}

		// Twin will remove any items if she can
		if (ActorIsGagged() && !ActorIsRestrained()) {
			ActorUngag()
			OverridenIntroText = GetText("TwinUngag");
		}
		if (ActorHasInventory("Blindfold") && !ActorIsRestrained()) {
			ActorRemoveInventory("Blindfold");
			PlayerAddInventory("Blindfold", 1);
			OverridenIntroText = GetText("TwinUnblindfold");
		}
	}

	if (!ActorIsRestrained() && C101_KinbakuClub_SlaveTwin_PlayerIsTooSubmissive && ClickInv) C101_KinbakuClub_SlaveTwin_SubmissivePlayer();
		
	if (ActorIsGagged() && C101_KinbakuClub_SlaveTwin_CurrentStage == 20) C101_KinbakuClub_SlaveTwin_CurrentStage = 10;
	
	C101_KinbakuClub_SlaveTwin_CalcParams();
}

// Chapter 101 - SlaveTwin - Player can leave after twin is leashed.
function C101_KinbakuClub_SlaveTwin_CanLeave() {
	LeaveIcon = "Leave";
}

// Chapter 101 - SlaveTwin - When player is too submissive to use items
function C101_KinbakuClub_SlaveTwin_SubmissivePlayer() {
	OverridenIntroText = GetText("TooSubmissive");
	C101_KinbakuClub_SlaveTwin_CurrentStage = 9;
}

// Chapter 101 - SlaveTwin - Player tries to get help from the twin.
function C101_KinbakuClub_SlaveTwin_HelpMe() {
	if (ActorGetValue(ActorSubmission) > -10) ActorChangeAttitude(0, -1);
	if ((ActorGetValue(ActorLove) >= 3 || ActorGetValue(ActorSubmission) >= 3)) {
		if (ActorIsGagged()) OverridenIntroText = GetText("UnableToHelp");
		if (!ActorIsGagged() && ActorIsRestrained()) OverridenIntroText = GetText("SorryNoHelp");
		if (!ActorIsRestrained()) {
			if (PlayerHasLockedInventory("Manacles")) OverridenIntroText = GetText("ManaclesNoHelp");
			else {
				OverridenIntroText = GetText("WillHelp");
				C101_KinbakuClub_SlaveTwin_CurrentStage = 50;
			}
		}
	}
	if (C101_KinbakuClub_SlaveTwin_KidnappedTwin == "Heather" && ActorGetValue(ActorSubmission) <= 5 && !ActorIsRestrained() && !C101_KinbakuClub_SlaveTwin_Kneeling && !PlayerHasLockedInventory("Manacles")) {
		C101_KinbakuClub_SlaveTwin_CurrentStage = 55;
		OverridenIntroText = GetText("HeatherRevenge");
		ActorChangeAttitude(0, -1);
	}
}

// Chapter 101 - SlaveTwin - Twin uses players own items on her.
function C101_KinbakuClub_SlaveTwin_RandomBondage() {
	if (PlayerHasInventory("Cuffs") || PlayerHasInventory("Rope") || PlayerHasInventory("Armbinder") || PlayerHasInventory("BallGag") || PlayerHasInventory("TapeGag") || PlayerHasInventory("ClothGag")) {
		PlayerRandomBondage();
		CurrentTime = CurrentTime + 60000;
	} else {
		OverridenIntroText = GetText("GetSomeItems");
		C101_KinbakuClub_SlaveTwin_CurrentStage = 20;
	}
}

// Chapter 101 - SlaveTwin - remove the current slaves gag
function C101_KinbakuClub_SlaveTwin_RemoveYourGag() {
	PlayerUngag();
}

// Chapter 101 - SlaveTwin - remove the current slaves gag
function C101_KinbakuClub_SlaveTwin_RemoveGag() {
	ActorUngag();
}

// Chapter 101 - SlaveTwin - Stage changes if player knows she is talking to Heather
function C101_KinbakuClub_SlaveTwin_LucyCheck() {
	if (ActorGetValue(ActorName) == "Heather" && ActorGetValue(ActorHideName) == false) C101_KinbakuClub_SlaveTwin_CurrentStage = 100;
}

// Chapter 101 - SlaveTwin - Free twins arms and she will remove everything else appart from the manacels
function C101_KinbakuClub_SlaveTwin_AlmostFreed() {
	if (ActorHasInventory("Cuffs") || ActorHasInventory("Manacles")) {
		if (ActorHasInventory("Cuffs")) OverridenIntroText = GetText("CuffsNeedKey");
		if (ActorHasInventory("Manacles")) OverridenIntroText = GetText("NoManacleKey");
	} else {
		ActorUntie();
		C101_KinbakuClub_SlaveTwin_TiedAsymmetric = false;
		C101_KinbakuClub_SlaveTwin_TiedElbowsTouching = false;
		ActorUnblindfold();
		ActorUngag();
		if (C101_KinbakuClub_SlaveTwin_TiedLegs) C101_KinbakuClub_SlaveTwin_TiedLegs = false;
	}
}

// Chapter 101 - SlaveTwin - 
function C101_KinbakuClub_SlaveTwin_UntieLegs() {
	ActorRemoveInventory("TwoRopes");
	PlayerAddInventory("Rope", 1);
	CurrentTime = CurrentTime + 60000;
}



// Chapter 101 - SlaveTwin - When the player tries to pull the twins skirt down.
function C101_KinbakuClub_SlaveTwin_RemoveSkirt() {
	if (ActorIsRestrained()) {
		C101_KinbakuClub_SlaveTwin_SkirtRemoved = true;
		C101_KinbakuClub_SlaveTwin_Blushing = true;
		C101_KinbakuClub_SlaveTwin_Underwear = true;
		ActorChangeAttitude(0, 1);
	} else OverridenIntroText = GetText("NoSkirtRemove");
	if (!C101_KinbakuClub_SlaveTwin_SkirtPullDone) {
		C101_KinbakuClub_SlaveTwin_SkirtPullDone = true;
		ActorChangeAttitude(-1, 0);
	}
}

// Chapter 101 - SlaveTwin - Player tries to remove her uniform
function C101_KinbakuClub_SlaveTwin_RemoveUniform() {
	if (!ActorIsRestrained()) {
		if (ActorGetValue(ActorSubmission) >= 5) {
			ActorSetCloth("Underwear");
			if (!C101_KinbakuClub_SlaveTwin_SkirtRemoved) {
				C101_KinbakuClub_SlaveTwin_Underwear = true;
				C101_KinbakuClub_SlaveTwin_SkirtRemoved = true;
				ActorChangeAttitude(0, 1);
			}
			ActorChangeAttitude(0, 1);
			C101_KinbakuClub_SlaveTwin_Barefoot = true;
			C101_KinbakuClub_SlaveTwin_Blushing = true;
			OverridenIntroText = GetText("RemovingUniform");
		}
		else OverridenIntroText = GetText("NoUniformRemove");
	}
}

// Chapter 101 - SlaveTwin - Lock the twins arms in the manacles
function C101_KinbakuClub_SlaveTwin_ManacleArms() {
	if (C101_KinbakuClub_SlaveTwin_PlayerIsTooSubmissive) C101_KinbakuClub_SlaveTwin_PlayerTooSubmissive();
	else {
		ActorAddInventory("Manacles");
		CurrentTime = CurrentTime + 60000;
	}
}

// Chapter 101 - SlaveTwin - Make the twin kneel and lock her legs in the manacles
function C101_KinbakuClub_SlaveTwin_ManacleLegs() {
	if (C101_KinbakuClub_SlaveTwin_PlayerIsTooSubmissive) C101_KinbakuClub_SlaveTwin_PlayerTooSubmissive();
	else {
		C101_KinbakuClub_SlaveTwin_Kneeling = true;
		CurrentTime = CurrentTime + 60000;
	}
}

// Chapter 101 - SlaveTwin - Tie her arms asymmetric
function C101_KinbakuClub_SlaveTwin_TieUp(TieStyle) {
	if (TieStyle == 1) C101_KinbakuClub_SlaveTwin_TiedAsymmetric = true;
	if (TieStyle == 2) C101_KinbakuClub_SlaveTwin_TiedElbowsTouching = true;
	ActorAddInventory("Rope");
	PlayerRemoveInventory("Rope", 1);
	CurrentTime = CurrentTime + 60000;
	if (ActorGetValue(ActorCloth) == "Underwear" && !ActorHasInventory("ChastityBelt")) OverridenIntroText = GetText("SquirmCrotchRope");
}

// Chapter 101 - SlaveTwin - Player asks for assistance to restrain her self
function C101_KinbakuClub_SlaveTwin_RestrainMe() {
	if (!ActorIsRestrained()) {
		OverridenIntroText = GetText("CanRestrainMe");
		C101_KinbakuClub_SlaveTwin_CurrentStage = 21;
	}
}

// Chapter 101 - SlaveTwin - Player has talked about Jenna
function C101_KinbakuClub_SlaveTwin_JennaDone() {
	C101_KinbakuClub_SlaveTwin_Jenna = false;
}

// Chapter 101 - SlaveTwin - Player has complimented the twin
function C101_KinbakuClub_SlaveTwin_ComplimentDone() {
	C101_KinbakuClub_SlaveTwin_Compliment = false;
}

// Chapter 101 - SlaveTwin - Player has asked if the twin enjoys this
function C101_KinbakuClub_SlaveTwin_YouEnjoyItDone() {
	C101_KinbakuClub_SlaveTwin_YouEnjoyIt = false;
}

// Chapter 101 - SlaveTwin - Player has talked the twin's underwear
function C101_KinbakuClub_SlaveTwin_UnderwearDone() {
	C101_KinbakuClub_SlaveTwin_Underwear = false;
	if (!C101_KinbakuClub_SlaveTwin_BoyfriendAlreadyMentioned) {
		C101_KinbakuClub_SlaveTwin_Boyfriend = true;
		C101_KinbakuClub_SlaveTwin_BoyfriendAlreadyMentioned = true;
	}
}

// Chapter 101 - SlaveTwin - Player has talked about the twin's boyfriend
function C101_KinbakuClub_SlaveTwin_BoyfriendDone() {
	C101_KinbakuClub_SlaveTwin_Boyfriend = false;
}

// Chapter 101 - SlaveTwin - Player has talked about the twin's boyfriend
function C101_KinbakuClub_SlaveTwin_BondageComplimentDone() {
	if (C101_KinbakuClub_SlaveTwin_BondageCompliment) ActorChangeAttitude(0, 1)
	C101_KinbakuClub_SlaveTwin_BondageCompliment = false;
}


// Chapter 101 - SlaveTwin - Twin helps player into armbinder
function C101_KinbakuClub_SlaveTwin_PlayerArmbinder() {
	PlayerRemoveInventory("Armbinder", 1);
	PlayerLockInventory("Armbinder");
}

// Chapter 101 - SlaveTwin - Twin helps tie up player
function C101_KinbakuClub_SlaveTwin_PlayerRope() {
	PlayerClothes("Underwear")
	PlayerRemoveInventory("Rope", 1);
	PlayerLockInventory("Rope");
}

// Chapter 101 - SlaveTwin - Twin can get annoyed with submissive player changing her mind.
function C101_KinbakuClub_SlaveTwin_NoKidding() {
	if (C101_KinbakuClub_SlaveTwin_PlayerIsTooSubmissive) {
		if (PlayerHasInventory("Cuffs") || PlayerHasInventory("Rope") || PlayerHasInventory("Armbinder")) {
			PlayerRandomBondage();
			ActorChangeAttitude(0, -1);
			OverridenIntroText = GetText("SufferNoFools");
			CurrentTime = CurrentTime + 60000;
			C101_KinbakuClub_SlaveTwin_CurrentStage = 22;
		} else OverridenIntroText = GetText("ShameNoItems");		
	}
}

// Chapter 101 - SlaveTwin - If player can be egged or chaste, Twin will use them
function C101_KinbakuClub_SlaveTwin_FurtherBondage() {
	if (((PlayerHasInventory("VibratingEgg") && !PlayerHasLockedInventory("VibratingEgg")) || PlayerHasInventory("ChastityBelt")) && !Common_PlayerChaste && C101_KinbakuClub_SlaveTwin_KidnappedTwin == "Heather") {
		OverridenIntroText = GetText("NotDoneYet");
		LeaveIcon = "";
		C101_KinbakuClub_SlaveTwin_CurrentStage = 23;
	}
}

// Chapter 101 - SlaveTwin - Twin using egg and belt
function C101_KinbakuClub_SlaveTwin_EggAndBelt() {
	if (PlayerHasLockedInventory("VibratingEgg")) OverridenIntroText = GetText("JustChastityBelt");
	if (!PlayerHasInventory("ChastityBelt")) OverridenIntroText = GetText("JustVibratingEgg");
	if (PlayerHasInventory("VibratingEgg")) { PlayerRemoveInventory("VibratingEgg", 1); PlayerLockInventory("VibratingEgg"); }
	if (PlayerHasInventory("ChastityBelt")) { PlayerRemoveInventory("ChastityBelt", 1); PlayerLockInventory("ChastityBelt"); }
}

// Chapter 101 - SlaveTwin - Player gets away from the twin.
function C101_KinbakuClub_SlaveTwin_Leave() {
	SetScene(LeaveChapter, LeaveScreen);
}

// Chapter 101 - SlaveTwin - Twin mentions her boyfriend
function C101_KinbakuClub_SlaveTwin_MentionedBoyfriend() {
	if (!C101_KinbakuClub_SlaveTwin_BoyfriendAlreadyMentioned) {
		C101_KinbakuClub_SlaveTwin_Boyfriend = true;
		C101_KinbakuClub_SlaveTwin_BoyfriendAlreadyMentioned = true;
	}
}

// Chapter 101 - SlaveTwin - Lucy could tell you more about her last boyfriend
function C101_KinbakuClub_SlaveTwin_CanTellMore() {
	if (C101_KinbakuClub_SlaveTwin_KidnappedTwin == "Lucy" && (ActorGetValue(ActorLove) + (ActorGetValue(ActorSubmission) / 2)) >= 10) {
		OverridenIntroText = GetText("WillTellMore");
		C101_KinbakuClub_SlaveTwin_CurrentStage = 75;
	}
}


// Chapter 101 - SlaveTwin - The Twin helps
function C101_KinbakuClub_SlaveTwin_HelpPlayer() {
	if (!PlayerHasLockedInventory("Cuffs")) PlayerUnlockAllInventory();
	if (PlayerHasLockedInventory("Cuffs")) {
		C101_KinbakuClub_SlaveTwin_CurrentStage = 51;
		if (!Common_PlayerGagged) OverridenIntroText = GetText("NoKeys");
		if (Common_PlayerGagged) {
			OverridenIntroText = GetText("NoKeysRemoveGag");
			PlayerUngag()
		}
	}
}



// Chapter 101 - SlaveTwin - 
function C101_KinbakuClub_SlaveTwin_template() {
}